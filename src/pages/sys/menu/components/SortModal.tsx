import type { MenuItem } from '@/types/menu';
import { Button, Modal, Space, Table } from 'antd';
import { startTransition, useDeferredValue, useEffect, useState } from 'react';

type SortRow = {
  id: number;
  title: string;
  route?: string;
  sort: number;
  children?: SortRow[];
};

type Props = {
  open: boolean;
  menus: MenuItem[];
  onCancel: () => void;
  // now returns the updated tree with new sort order
  onConfirm: (updatedMenus: MenuItem[]) => void;
};

function toRows(menus: MenuItem[]): SortRow[] {
  return [...menus]
    .sort((a, b) => a.sort - b.sort)
    .map((m) => ({
      id: m.id,
      title: m.title,
      route: m.route || '/',
      sort: m.sort || 0,
      children: m.children ? toRows(m.children) : undefined,
    }));
}

export default function SortModal({ open, menus, onCancel, onConfirm }: Props) {
  const [rows, setRows] = useState<SortRow[]>([]);
  useEffect(() => {
    if (!open) return;
    startTransition(() => setRows(toRows(menus)));
  }, [open, menus]);

  const deferredRows = useDeferredValue(rows);

  const move = (list: SortRow[], idx: number, step: -1 | 1) => {
    const next = [...list];
    const target = idx + step;
    if (target < 0 || target >= next.length) return list;
    const t = next[idx];
    next[idx] = next[target];
    next[target] = t;
    return next.map((r, i) => ({ ...r, sort: i + 1 }));
  };

  const moveRoot = (idx: number, step: -1 | 1) =>
    setRows((prev) => move(prev, idx, step));

  const moveChild = (rootIdx: number, childIdx: number, step: -1 | 1) => {
    setRows((prev) => {
      const next = [...prev];
      const root = {
        ...next[rootIdx],
        children: prev[rootIdx].children ? [...prev[rootIdx].children] : [],
      };
      root.children = move(root.children || [], childIdx, step);
      next[rootIdx] = root;
      return next;
    });
  };

  const buildMenuTree = (rows: SortRow[]): MenuItem[] => {
    return rows.map(
      (r) =>
        ({
          id: r.id,
          title: r.title,
          route: r.route || '/',
          sort: r.sort,
          children: r.children ? buildMenuTree(r.children) : undefined,
        } as MenuItem),
    );
  };

  return (
    <Modal
      open={open}
      title="模块排序（根节点与子节点）"
      onCancel={onCancel}
      onOk={() => onConfirm(buildMenuTree(rows))}
      destroyOnHidden
      width={900}
      styles={{
        body: {
          maxHeight: '60vh',
          overflowY: 'auto',
        },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {deferredRows.map((r, idx) => (
          <div
            key={r.id}
            style={{
              marginBottom: 0,
              border: '1px solid #f0f0f0',
              padding: 8,
              borderRadius: 4,
              background: '#fff',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  minWidth: 0,
                }}
              >
                <strong
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {r.title}
                </strong>
                <span
                  style={{
                    color: '#888',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {r.route}
                </span>
              </div>
              <div>
                <Space>
                  <Button
                    size="small"
                    onClick={() => moveRoot(idx, -1)}
                    disabled={idx === 0}
                  >
                    上移
                  </Button>
                  <Button
                    size="small"
                    onClick={() => moveRoot(idx, 1)}
                    disabled={idx === rows.length - 1}
                  >
                    下移
                  </Button>
                </Space>
              </div>
            </div>
            {r.children && r.children.length ? (
              <div style={{ marginTop: 12, overflowX: 'auto' }}>
                <Table
                  size="small"
                  rowKey="id"
                  pagination={false}
                  dataSource={[...r.children].sort((a, b) => a.sort - b.sort)}
                  columns={[
                    { title: '排序', dataIndex: 'sort', width: 80 },
                    { title: '名称', dataIndex: 'title' },
                    { title: '路径', dataIndex: 'route' },
                    {
                      title: '操作',
                      width: 140,
                      render: (_, __, childIdx: number) => (
                        <Space>
                          <Button
                            size="small"
                            onClick={() => moveChild(idx, childIdx, -1)}
                            disabled={childIdx === 0}
                          >
                            上移
                          </Button>
                          <Button
                            size="small"
                            onClick={() => moveChild(idx, childIdx, 1)}
                            disabled={
                              !(r.children && r.children.length) ||
                              childIdx ===
                                (r.children ? r.children.length - 1 : 0)
                            }
                          >
                            下移
                          </Button>
                        </Space>
                      ),
                    },
                  ]}
                  style={{ minWidth: 600 }}
                  scroll={{ x: 'max-content' }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Modal>
  );
}
