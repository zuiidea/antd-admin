import { Skeleton, Table, theme } from "antd";
import type { TableProps } from "antd";
import type { ColumnGroupType, ColumnsType, ColumnType } from "antd/es/table";
import type { GlobalToken } from "antd/es/theme/interface";
import type { CSSProperties } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

function rowHeight(size: TableProps["size"]): number {
  if (size === "large") return 56;
  if (size === "middle") return 48;
  return 40;
}

function numericScrollY(scroll: TableProps<object>["scroll"]): number | undefined {
  const y = scroll?.y;
  return typeof y === "number" && Number.isFinite(y) && y > 0 ? y : undefined;
}

function clampRows(bodyHeight: number, rowH: number): number {
  return Math.max(3, Math.floor(bodyHeight / rowH));
}

function initialRowCount(scroll: TableProps<object>["scroll"], size: TableProps["size"]): number {
  const y = numericScrollY(scroll);
  return y != null ? clampRows(y, rowHeight(size)) : 10;
}

export type DataTableSkeletonProps<RecordType extends object> = Pick<
  TableProps<RecordType>,
  "columns" | "rowSelection" | "pagination" | "size" | "scroll" | "rootClassName" | "style"
> & {
  rowCount?: number;
};

function isActionColumn<RecordType extends object>(col: ColumnType<RecordType>): boolean {
  return (
    col.key === "actions" ||
    col.dataIndex === "actions" ||
    (typeof col.title === "string" && col.title.toLowerCase() === "actions")
  );
}

function isIdColumn<RecordType extends object>(col: ColumnType<RecordType>): boolean {
  return col.key === "id" || col.dataIndex === "id";
}

function isColumnGroup<RecordType extends object>(
  col: ColumnType<RecordType> | ColumnGroupType<RecordType>,
): col is ColumnGroupType<RecordType> {
  return "children" in col && Array.isArray(col.children) && col.children.length > 0;
}

function actionSkeletonDiameter<RecordType extends object>(col: ColumnType<RecordType>): number {
  if (typeof col.width === "number") {
    return Math.min(24, Math.max(20, col.width - 36));
  }
  return 22;
}

const DATA_CELL_MIN = 48;

function dataCellMinWidth<RecordType extends object>(col: ColumnType<RecordType>): number {
  const cap = typeof col.minWidth === "number" ? col.minWidth : col.width;
  if (typeof cap !== "number") return DATA_CELL_MIN;
  return Math.max(DATA_CELL_MIN, Math.min(cap, 320));
}

function cellJustify(align: ColumnType<object>["align"]): CSSProperties["justifyContent"] {
  if (align === "right") return "flex-end";
  if (align === "center") return "center";
  return "flex-start";
}

function skeletonInputBarStyle(
  token: GlobalToken,
  opts: { floor: number; maxWidth: number | string; flex: string },
): CSSProperties {
  return {
    width: "100%",
    minWidth: opts.floor,
    maxWidth: opts.maxWidth,
    height: token.controlHeightSM,
    borderRadius: token.borderRadiusSM,
    flex: opts.flex,
  };
}

function mapSkeletonColumn<RecordType extends object>(
  col: ColumnType<RecordType> | ColumnGroupType<RecordType>,
  token: GlobalToken,
): ColumnType<RecordType> | ColumnGroupType<RecordType> {
  if (isColumnGroup(col)) {
    return {
      ...col,
      children: (col.children as ColumnsType<RecordType>).map((child) =>
        mapSkeletonColumn(child, token),
      ),
    };
  }

  const c = col as ColumnType<RecordType>;
  return {
    ...c,
    sorter: false,
    sortOrder: undefined,
    render: () => {
      if (isActionColumn(c)) {
        const w = actionSkeletonDiameter(c);
        return (
          <span
            style={{
              display: "flex",
              width: "100%",
              justifyContent: cellJustify(c.align),
              lineHeight: 1,
            }}
          >
            <Skeleton.Button
              active
              size="small"
              shape="circle"
              style={{ width: w, height: w, minWidth: w, flexShrink: 0 }}
            />
          </span>
        );
      }

      const justify = cellJustify(c.align);
      const id = isIdColumn(c);

      if (id) {
        const floor = 28;
        const maxBar = typeof c.width === "number" ? Math.max(28, Math.min(c.width - 10, 52)) : 40;
        return (
          <Skeleton.Input
            active
            size="small"
            style={skeletonInputBarStyle(token, {
              floor,
              maxWidth: maxBar,
              flex: "0 1 auto",
            })}
          />
        );
      }

      const floor = dataCellMinWidth(c);
      const bar = skeletonInputBarStyle(token, {
        floor,
        maxWidth: "100%",
        flex: "1 1 auto",
      });

      return (
        <div
          style={{
            width: "100%",
            minWidth: floor,
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: justify,
            boxSizing: "border-box",
            ...(c.ellipsis ? { overflow: "hidden" as const } : {}),
          }}
        >
          <Skeleton.Input active size="small" style={bar} />
        </div>
      );
    },
  };
}

export function DataTableSkeleton<RecordType extends object = object>({
  columns,
  rowSelection,
  pagination,
  size = "small",
  scroll,
  rootClassName,
  style,
  rowCount,
}: DataTableSkeletonProps<RecordType>) {
  const { token } = theme.useToken();
  const frameRef = useRef<HTMLDivElement>(null);
  const [measuredRows, setMeasuredRows] = useState(() => initialRowCount(scroll, size));

  useLayoutEffect(() => {
    if (rowCount != null) return;

    const y = numericScrollY(scroll);
    if (y != null) {
      setMeasuredRows(clampRows(y, rowHeight(size)));
      return;
    }

    const el = frameRef.current;
    if (!el) return;

    const rowH = rowHeight(size);
    const measure = () => {
      const thead = el.querySelector<HTMLElement>(".ant-table-thead");
      const pag = pagination === false ? null : el.querySelector<HTMLElement>(".ant-pagination");
      const theadH = thead?.offsetHeight ?? 39;
      const pagH = pag ? pag.offsetHeight + 8 : 0;
      const bodyH = Math.max(0, el.clientHeight - theadH - pagH - 2);
      setMeasuredRows((prev) => {
        const next = clampRows(bodyH, rowH);
        return prev === next ? prev : next;
      });
    };

    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(el);
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(measure);
    });

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [rowCount, pagination, scroll?.y, size]);

  const effectiveRowCount = rowCount ?? measuredRows;

  const skeletonColumns = useMemo(() => {
    if (!columns?.length) return [];
    return (columns as ColumnsType<RecordType>).map((col) => mapSkeletonColumn(col, token));
  }, [columns, token]);

  const skeletonData = useMemo(
    () =>
      Array.from({ length: effectiveRowCount }, (_, i) => ({
        __sk: String(i),
      })) as unknown as RecordType[],
    [effectiveRowCount],
  );

  const skeletonPagination = useMemo((): TableProps<RecordType>["pagination"] => {
    if (pagination === false) return false;
    if (typeof pagination === "object" && pagination !== null) {
      return {
        ...pagination,
        disabled: true,
        onChange: undefined,
        onShowSizeChange: undefined,
      };
    }
    return {
      current: 1,
      pageSize: 10,
      total: 100,
      disabled: true,
      showSizeChanger: true,
      showTotal: () => (
        <Skeleton.Input active size="small" style={{ width: 88, height: token.fontSize }} />
      ),
    };
  }, [pagination, token.fontSize]);

  const selection =
    rowSelection != null
      ? { ...rowSelection, getCheckboxProps: () => ({ disabled: true }) }
      : undefined;

  return (
    <div
      ref={frameRef}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      <Table<RecordType>
        rootClassName={rootClassName}
        style={{ flex: 1, minHeight: 0, width: "100%" }}
        size={size}
        columns={skeletonColumns}
        dataSource={skeletonData}
        rowKey={(record) => String((record as unknown as { __sk: string }).__sk)}
        pagination={skeletonPagination}
        rowSelection={selection}
        scroll={scroll}
        showSorterTooltip={false}
      />
    </div>
  );
}
