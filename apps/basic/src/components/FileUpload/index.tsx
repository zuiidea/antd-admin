import { Upload, App, theme } from "antd";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import { Upload as UploadIcon, Inbox } from "lucide-react";
import { useState } from "react";

export interface FileUploadProps {
  /** Upload endpoint URL */
  action?: string;
  /** Accepted MIME types, e.g. "image/*,.pdf" */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file count */
  maxCount?: number;
  /** Custom on-success callback */
  onSuccess?: (file: UploadFile, response: unknown) => void;
  /** Custom on-error callback */
  onError?: (file: UploadFile, error: unknown) => void;
  /** Button text */
  children?: React.ReactNode;
  /** Custom request override (e.g. MSW) */
  customRequest?: UploadProps["customRequest"];
  /** Control visibility of file list */
  showUploadList?: boolean;
}

/**
 * Drag-and-drop file upload component built on Ant Design Upload.
 * Supports size/type validation and visual feedback.
 */
export function FileUpload({
  action = "/api/files/upload",
  accept,
  maxSize = 10 * 1024 * 1024, // 10 MB
  multiple = false,
  maxCount = 5,
  onSuccess,
  onError,
  customRequest,
  children,
  showUploadList = true,
}: FileUploadProps) {
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const [uploading, setUploading] = useState(false);

  const beforeUpload = (file: File): boolean | Promise<File> => {
    const allowed = accept?.split(",").map((s) => s.trim());
    if (allowed?.length && !allowed.some((a) => matchMime(file, a))) {
      message.error(`File type not supported: ${file.type || file.name}`);
      return false;
    }

    if (file.size > maxSize) {
      const maxMB = (maxSize / (1024 * 1024)).toFixed(1);
      message.error(`File exceeds ${maxMB} MB limit: ${file.name}`);
      return false;
    }

    return true;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const { file } = info;

    if (file.status === "uploading") {
      setUploading(true);
    }

    if (file.status === "done") {
      setUploading(false);
      onSuccess?.(file, file.response);
    }

    if (file.status === "error") {
      setUploading(false);
      onError?.(file, file.error);
    }
  };

  return (
    <Upload.Dragger
      name="file"
      action={action}
      accept={accept}
      multiple={multiple}
      maxCount={maxCount}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={customRequest}
      showUploadList={showUploadList}
      style={{ padding: token.padding }}
    >
      <p className="ant-upload-drag-icon" style={{ marginBottom: token.marginSM }}>
        {uploading ? (
          <UploadIcon size={32} style={{ color: token.colorPrimary, opacity: 0.7 }} />
        ) : (
          <Inbox size={32} style={{ color: token.colorTextQuaternary }} />
        )}
      </p>
      <p className="ant-upload-text" style={{ fontWeight: 500 }}>
        {children || "Click or drag file to this area to upload"}
      </p>
      <p className="ant-upload-hint" style={{ color: token.colorTextSecondary }}>
        {accept
          ? `Supported: ${accept}. Max ${(maxSize / (1024 * 1024)).toFixed(1)} MB per file`
          : `Max ${(maxSize / (1024 * 1024)).toFixed(1)} MB per file`}
        {multiple ? `. Up to ${maxCount} files` : ""}
      </p>
    </Upload.Dragger>
  );
}

function matchMime(file: File, pattern: string): boolean {
  if (!pattern) return true;
  // Simple glob: "image/*"
  if (pattern.endsWith("/*")) {
    const base = pattern.slice(0, -2);
    return file.type.startsWith(base + "/");
  }
  // Extension match: ".pdf"
  if (pattern.startsWith(".")) {
    return file.name.toLowerCase().endsWith(pattern.toLowerCase());
  }
  // Exact MIME
  return file.type === pattern;
}
