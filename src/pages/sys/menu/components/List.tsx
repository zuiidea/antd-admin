import DropOption from '@/components/DropOption';
import type { MenuItem } from '@/types/menu';
import type { TableColumnsType } from 'antd';
import { Space, Table, Tag } from 'antd';
import React from 'react';

type Props = {
  dataSource: MenuItem[];
  selectedRowKeys: React.Key[];
  onSelectChange: (keys: React.Key[]) => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (id: number) => void;
};

export default function MenuList({
  dataSource,
  selectedRowKeys,
  onSelectChange,
  onEditItem,
  onDeleteItem,
}: Props) {
  const normalizeChildren = (items?: MenuItem[]): MenuItem[] | undefined => {
    if (!items) return undefined;
    const next = items.map((it) => ({
      ...it,
      children: normalizeChildren(it.children),
    }));
    return next && next.length ? next : undefined;
  };
  const columns: TableColumnsType<MenuItem> = [
    { title: 'No.', dataIndex: 'id', width: 90 },
    { title: '名称', dataIndex: 'title', width: 180 },
    { title: '图标', dataIndex: 'icon', width: 180, render: (v) => v || '-' },
    { title: '路径', dataIndex: 'route', width: 260 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render: (status: number) =>
        status === 1 ? <Tag color="success">已启用</Tag> : <Tag>已禁用</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      width: 170,
      render: (_, record) => {
        const menuOptions = [
          { key: 'edit', label: <span>修改</span> },
          { key: 'delete', label: <span style={{ color: 'red' }}>删除</span> },
        ];

        const handleMenuClick = (key: string) => {
          if (key === 'edit') onEditItem(record);
          if (key === 'delete') onDeleteItem(record.id);
        };

        return (
          <Space>
            <DropOption
              menuOptions={menuOptions}
              onMenuClick={handleMenuClick}
            ></DropOption>
          </Space>
        );
      },
    },
  ];

  return (
    <Table<MenuItem>
      bordered
      rowKey="id"
      columns={columns}
      dataSource={(normalizeChildren(dataSource) || []) as MenuItem[]}
      pagination={false}
      rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
      scroll={{ x: 'max-content' }}
    />
  );
}
