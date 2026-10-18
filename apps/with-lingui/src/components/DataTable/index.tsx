import { Table, theme } from "antd";
import type { TableProps } from "antd";
import type { CSSProperties, ReactElement, ReactNode, Ref } from "react";
import { useMemo } from "react";
import { DataTableEmpty } from "./DataTableEmpty";
import { DataTableSkeleton } from "./DataTableSkeleton";
import "./index.css";

export const DATA_TABLE_ROOT_CLASS = "data-table__table";

export type DataTableProps<RecordType extends object = object> = {
  lockScrollHeight?: boolean;
  maxHeight?: number;
  frameHeight?: number;
  layoutRef?: Ref<HTMLDivElement>;
  frameRef?: Ref<HTMLDivElement>;
  bottomExtra?: ReactNode;
} & TableProps<RecordType>;

export function DataTable<RecordType extends object = object>(
  props: DataTableProps<RecordType>,
): ReactElement {
  const {
    lockScrollHeight,
    maxHeight,
    frameHeight,
    layoutRef,
    frameRef,
    bottomExtra,
    rootClassName,
    style: tableStyle,
    ...tableProps
  } = props;

  const { token } = theme.useToken();

  const { loading, ...restTableProps } = tableProps;
  const spinLoading =
    loading === true ||
    (typeof loading === "object" &&
      loading !== null &&
      (loading as { spinning?: boolean }).spinning !== false);

  const outerStyle: CSSProperties = {
    flexGrow: 0,
    flexShrink: lockScrollHeight ? 0 : 1,
    flexBasis: "auto",
    minHeight: 0,
    maxHeight,
    ...(lockScrollHeight && frameHeight != null ? { height: frameHeight } : {}),
    alignSelf: "stretch",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const mergedRootClassName = [DATA_TABLE_ROOT_CLASS, rootClassName].filter(Boolean).join(" ");

  const mergedLocale = useMemo(
    () => ({
      ...restTableProps.locale,
      emptyText: restTableProps.locale?.emptyText ?? <DataTableEmpty />,
    }),
    [restTableProps.locale],
  );

  return (
    <div
      ref={layoutRef}
      style={{
        flex: "1 1 0%",
        minHeight: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: token.marginSM,
      }}
    >
      <div ref={frameRef} style={outerStyle}>
        <div
          className="data-table__inner"
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {spinLoading ? (
            <DataTableSkeleton<RecordType>
              columns={restTableProps.columns}
              rowSelection={restTableProps.rowSelection}
              pagination={restTableProps.pagination}
              size={restTableProps.size}
              scroll={restTableProps.scroll}
              rootClassName={mergedRootClassName}
              style={{ flex: 1, minHeight: 0, ...tableStyle }}
            />
          ) : (
            <Table<RecordType>
              {...restTableProps}
              locale={mergedLocale}
              loading={loading}
              rootClassName={mergedRootClassName}
              style={{ flex: 1, minHeight: 0, ...tableStyle }}
            />
          )}
        </div>
      </div>
      {bottomExtra}
    </div>
  );
}
