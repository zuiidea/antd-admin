import { Form, Input } from "antd";
import type { FormInstance } from "antd/es/form";
import type { CreateUserRequest, User } from "@/api/schemas";
import { BaseFormModal } from "@/components/FormModal";

export type FormModalProps = {
  open: boolean;
  editingUser: User | null;
  form: FormInstance<CreateUserRequest>;
  confirmLoading: boolean;
  onCancel: () => void;
  onFinish: (values: CreateUserRequest) => void;
};

export function FormModal({
  open,
  editingUser,
  form,
  confirmLoading,
  onCancel,
  onFinish,
}: FormModalProps) {
  return (
    <BaseFormModal<CreateUserRequest>
      open={open}
      title={editingUser ? "Edit User" : "New User"}
      okText="OK"
      cancelText="Cancel"
      form={form}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please enter username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Mobile"
      >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
    </BaseFormModal>
  );
}
