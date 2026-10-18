#!/usr/bin/env node
/**
 * Thin local/Agent UI gate for antd-admin templates.
 * Rules: R1 no-literal-color, R2 no-parallel-ui, R3 css-allowlist; W1 prefer-flex-layout (warn).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(appRoot, "src");

const CSS_ALLOWLIST = new Set([
  "src/index.css",
  "src/components/Aurora/index.css",
  "src/components/DataTable/index.css",
  "src/components/Layout/Sidebar/index.css",
  "src/components/Layout/UserMenu/index.css",
  "src/routes/login/index.css",
  "src/routes/_auth/dashboard/index.css",
]);

const PARALLEL_UI = [
  "@mui/",
  "@chakra-ui/",
  "@mantine/",
  "react-bootstrap",
  "@headlessui/",
  "vuetify",
];

const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;
const FLEX_DISPLAY_RE = /display:\s*['"]flex['"]|display:\s*['"]grid['"]/;
const IMPORT_RE = /from\s+['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

/** @type {{ kind: "error" | "warn"; rule: string; file: string; line: number; snippet: string }[]} */
const findings = [];

/**
 * @param {string} dir
 * @param {(abs: string, rel: string) => void} visit
 */
function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(abs, visit);
      continue;
    }
    const rel = path.relative(appRoot, abs).split(path.sep).join("/");
    visit(abs, rel);
  }
}

/**
 * @param {string} abs
 * @param {string} rel
 * @param {RegExp} re
 * @param {string} rule
 * @param {"error" | "warn"} kind
 */
function scanLines(abs, rel, re, rule, kind) {
  const text = fs.readFileSync(abs, "utf8");
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!re.test(line)) continue;
    findings.push({
      kind,
      rule,
      file: rel,
      line: i + 1,
      snippet: line.trim().slice(0, 120),
    });
  }
}

/**
 * @param {string} abs
 * @param {string} rel
 */
function scanParallelUi(abs, rel) {
  const text = fs.readFileSync(abs, "utf8");
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    IMPORT_RE.lastIndex = 0;
    let match;
    while ((match = IMPORT_RE.exec(line)) !== null) {
      const source = match[1] ?? match[2] ?? "";
      if (PARALLEL_UI.some((p) => source === p || source.startsWith(p))) {
        findings.push({
          kind: "error",
          rule: "no-parallel-ui",
          file: rel,
          line: i + 1,
          snippet: line.trim().slice(0, 120),
        });
      }
    }
  }
}

function isColorExcluded(rel) {
  if (rel.startsWith("src/theme/")) return true;
  if (rel.endsWith("/tokenBuilders.ts") || rel.endsWith("tokenBuilders.ts")) return true;
  return false;
}

walk(srcRoot, (abs, rel) => {
  if (rel.endsWith(".css")) {
    if (!CSS_ALLOWLIST.has(rel)) {
      findings.push({
        kind: "error",
        rule: "css-allowlist",
        file: rel,
        line: 1,
        snippet: `CSS file not in allowlist: ${rel}`,
      });
    }
    return;
  }

  if (!rel.endsWith(".ts") && !rel.endsWith(".tsx")) return;

  if (!isColorExcluded(rel)) {
    scanLines(abs, rel, COLOR_RE, "no-literal-color", "error");
  }
  scanParallelUi(abs, rel);
  scanLines(abs, rel, FLEX_DISPLAY_RE, "prefer-flex-layout", "warn");
});

const errors = findings.filter((f) => f.kind === "error");
const warns = findings.filter((f) => f.kind === "warn");

for (const f of findings) {
  const tag = f.kind === "error" ? "error" : "warn";
  console.log(`[${tag}] ${f.rule} ${f.file}:${f.line}: ${f.snippet}`);
}

if (errors.length > 0) {
  console.error(`verify:ui failed with ${errors.length} error(s), ${warns.length} warning(s)`);
  process.exit(1);
}

console.log(`verify:ui OK (${warns.length} warning(s))`);
