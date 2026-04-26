import { DEFAULT_GITHUB_REPO, ENV_REPO } from "./constants.js";
import { CliError } from "./errors.js";
import { resolveGitRef } from "./resolve-ref.js";
import path from "node:path";

export type ResolvedExampleSource = { gigetSource: string; displayName: string };

function defaultRepo(): string {
  const repo = process.env[ENV_REPO]?.trim() || DEFAULT_GITHUB_REPO;
  if (!repo) {
    throw new CliError("Default repository is not configured", "INVALID_INPUT");
  }
  return repo;
}

export function resolveExampleSource(input: {
  example?: string;
  examplePath?: string;
}): ResolvedExampleSource {
  const example = input.example?.trim();
  if (!example) {
    throw new CliError("example is required", "INVALID_INPUT");
  }

  const { examplePath } = input;
  const ref = resolveGitRef();

  if (/^https?:\/\//i.test(example)) {
    return { gigetSource: example, displayName: example };
  }

  const repo = defaultRepo();

  if (!example.includes("/")) {
    const sub = examplePath
      ? path.join("apps", example, examplePath).replace(/\\+/g, "/")
      : `apps/${example}`;
    const gigetSource = `github:${repo}/${sub}#${ref}`;
    return { gigetSource, displayName: example };
  }

  const pathPart = examplePath
    ? path.join(example, examplePath).replace(/\\+/g, "/")
    : example;
  const gigetSource = `github:${pathPart}#${ref}`;
  return { gigetSource, displayName: pathPart };
}
