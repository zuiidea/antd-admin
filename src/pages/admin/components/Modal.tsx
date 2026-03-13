import type { Admin } from '@/types/admin';
import { Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

type Props = {
  open: boolean;
  item?: Admin;
  routes: Array<{ id: string; name?: string; route: string }>;
  onCancel: () => void;
  onOk: (values: Record<string, unknown>) => void;
};

export default function AdminModal({
  open,
  item,
  routes,
  onCancel,
  onOk,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;
    const perms =
      item && item.permissions
        ? typeof item.permissions === 'string'
          ? (item.permissions as string)
              .split(',')
              .map((s: string) => s.trim())
              .filter(Boolean)
          : (item.permissions as string[])
        : [];
    form.setFieldsValue({
      username: item?.username,
      real_name: item?.real_name,
      nick_name: item?.nick_name,
      mobile: item?.mobile,
      permissions: perms,
    });
  }, [open, item, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (e) {
      // validation failed
    }
  };

  return (
    <Modal
      title={item ? '编辑管理员' : '新增管理员'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnHidden
    >
      <Form form={form} {...layout} initialValues={{ permissions: [] }}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          extra="新建或修改密码时填写，留空保持不变"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="real_name" label="姓名">
          <Input />
        </Form.Item>

        <Form.Item name="mobile" label="手机">
          <Input />
        </Form.Item>

        <Form.Item name="permissions" label="权限（选择路由）">
          <Select
            mode="multiple"
            options={routes.map((r) => ({
              label: r.name || r.route,
              value: r.route,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
