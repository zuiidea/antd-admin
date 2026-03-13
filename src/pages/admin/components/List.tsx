import DropOption from '@/components/DropOption';
import { Avatar, Table } from 'antd';

import { Admin } from '@/types/admin';

type Props = {
  data: Admin[];
  onEdit: (item: Admin) => void;
  onDelete: (id: number) => void;
  onDetail: (item: Admin) => void;
};

export default function AdminList({ data, onEdit, onDetail, onDelete }: Props) {
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (_: unknown, record: Admin) => <Avatar src={record.avatar} />,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      render: (_: unknown, record: Admin) => (
        <a onClick={() => onDetail(record)}>{record.username}</a>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'real_name',
    },
    { title: '手机', dataIndex: 'mobile' },
    {
      title: '权限',
      dataIndex: 'permissions',
      render: (p: string[] | string | undefined) => p || '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (s: number) => (s === 1 ? '已启用' : '已禁用'),
    },
    {
      title: '操作',
      render: (_: unknown, record: Admin) => (
        <DropOption
          menuOptions={[
            { key: 'edit', label: '编辑' },
            { key: 'delete', label: '删除' },
          ]}
          onMenuClick={(key) => {
            if (key === 'edit') onEdit(record);
            if (key === 'delete') onDelete(record.id);
          }}
        ></DropOption>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      scroll={{ x: 'max-content' }}
    />
  );
}
