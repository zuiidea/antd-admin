import { Button, App, Tooltip } from "antd";
import { Download } from "lucide-react";
import { useCallback, useState } from "react";

export interface ExportButtonProps<TData extends Record<string, unknown>> {
  /** Data to export */
  data: TData[];
  /** Column definitions: header label and data key or custom accessor */
  columns: {
    title: string;
    dataIndex?: keyof TData & string;
    render?: (record: TData) => string;
  }[];
  /** Filename without extension */
  filename?: string;
  /** Button text */
  children?: React.ReactNode;
  /** Disable button */
  disabled?: boolean;
  /** Click handler before export (e.g. confirm) */
  onBeforeExport?: () => boolean | Promise<boolean>;
}

/**
 * Reusable CSV export button.
 * Works with any tabular data + column definitions.
 */
export function ExportButton<TData extends Record<string, unknown>>({
  data,
  columns,
  filename = "export",
  children = "Export CSV",
  disabled,
  onBeforeExport,
}: ExportButtonProps<TData>) {
  const { message } = App.useApp();
  const [exporting, setExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (onBeforeExport) {
      const ok = await onBeforeExport();
      if (!ok) return;
    }

    setExporting(true);

    try {
      // Build CSV content
      const header = columns.map((c) => `"${c.title}"`).join(",");

      const rows = data.map((record) =>
        columns
          .map((c) => {
            let value: unknown;
            if (c.render) {
              value = c.render(record);
            } else if (c.dataIndex) {
              value = record[c.dataIndex];
            } else {
              value = "";
            }
            // Escape quotes and wrap
            const str = String(value ?? "");
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(","),
      );

      const csv = [header, ...rows].join("\n");

      // Add BOM for Excel UTF-8 compatibility
      const bom = "\uFEFF";
      const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });

      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success(`Exported ${data.length} rows`);
    } catch {
      message.error("Export failed");
    } finally {
      setExporting(false);
    }
  }, [data, columns, filename, onBeforeExport, message]);

  return (
    <Tooltip title={`Export ${data.length} rows as CSV`}>
      <Button
        icon={<Download size={14} />}
        onClick={handleExport}
        loading={exporting}
        disabled={disabled || !data.length}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
