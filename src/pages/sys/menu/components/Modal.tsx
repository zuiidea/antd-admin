import type { MenuFormValues, MenuItem } from '@/types/menu';
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  TreeSelect,
} from 'antd';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  type: 'create' | 'update';
  item?: MenuItem;
  parentOptions: Array<{
    title: string;
    value: number;
    children?: Array<{ title: string; value: number }>;
  }>;
  onOk: (values: MenuFormValues) => void;
  onCancel: () => void;
};

const privilegeOptions = [
  { label: '增', value: 'create' },
  { label: '删', value: 'delete' },
  { label: '改', value: 'update' },
  { label: '查', value: 'query' },
];

export default function MenuModal({
  open,
  type,
  item,
  parentOptions,
  onOk,
  onCancel,
}: Props) {
  const [form] = Form.useForm<MenuFormValues>();

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      title: item?.title || '',
      icon: item?.icon || '',
      route: item?.route || '',
      status: item?.status ?? 1,
      parentId: item?.parentId ?? null,
      privilege: item?.privilege || [],
      remark: item?.remark || '',
      sort: item?.sort ?? 1,
    });
  }, [open, item, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onOk(values);
  };

  return (
    <Modal
      open={open}
      title={type === 'create' ? '新增模块' : '修改模块'}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Form.Item label="图标" name="icon">
          <Input placeholder="如: AppstoreOutlined" allowClear />
        </Form.Item>

        <Form.Item
          label="名称"
          name="title"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入菜单名称" allowClear />
        </Form.Item>

        <Form.Item
          label="路径"
          name="route"
          rules={[{ required: true, message: '请输入路径' }]}
        >
          <Input placeholder="如: /sys/menu" allowClear />
        </Form.Item>

        <Form.Item label="状态" name="status">
          <Radio.Group
            options={[
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 },
            ]}
          />
        </Form.Item>

        <Form.Item label="上一级" name="parentId">
          <TreeSelect
            allowClear
            treeDefaultExpandAll
            placeholder="--上一级--"
            treeData={parentOptions}
          />
        </Form.Item>

        <Form.Item label="权限" name="privilege">
          <Select
            mode="multiple"
            options={privilegeOptions}
            placeholder="选择权限"
          />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input placeholder="可以填入模块说明" allowClear />
        </Form.Item>

        <Form.Item label="排序" name="sort">
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
