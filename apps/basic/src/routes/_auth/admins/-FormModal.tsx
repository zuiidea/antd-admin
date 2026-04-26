import { Form, Input, Select, Switch } from "antd";
import type { FormInstance } from "antd/es/form";
import type { CreateAdminRequest, Admin } from "@/api/admin";
import { BaseFormModal } from "@/components/FormModal";
import { APP_PERMISSION_OPTIONS } from "@/utils/appMenu";

export type AdminFormValues = Omit<CreateAdminRequest, "status"> & {
  password?: string;
  status?: boolean;
};

export type FormModalProps = {
  open: boolean;
  editingAdmin: Admin | null;
  form: FormInstance<AdminFormValues>;
  confirmLoading: boolean;
  onCancel: () => void;
  onFinish: (values: AdminFormValues) => void;
};

export function FormModal({
  open,
  editingAdmin,
  form,
  confirmLoading,
  onCancel,
  onFinish,
}: FormModalProps) {
  return (
    <BaseFormModal<AdminFormValues>
      open={open}
      title={editingAdmin ? "Edit Admin" : "New Admin"}
      okText="Save"
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
        name="password"
        label="Password"
        rules={
          editingAdmin
            ? [{ min: 6, message: "Password must be at least 6 characters" }]
            : [
                { required: true, message: "Please enter password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]
        }
        extra={editingAdmin ? "Leave blank to keep the current password" : undefined}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="realName" label="Real Name">
        <Input />
      </Form.Item>
      <Form.Item name="nickName" label="Nick Name">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ type: "email", message: "Invalid email" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="mobile" label="Mobile">
        <Input />
      </Form.Item>
      <Form.Item name="department" label="Department">
        <Input />
      </Form.Item>
      <Form.Item name="role" label="Title">
        <Input />
      </Form.Item>
      <Form.Item
        name="roles"
        label="Roles"
        rules={[{ required: true, message: "Please select roles" }]}
      >
        <Select
          mode="multiple"
          options={[
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
          ]}
        />
      </Form.Item>
      <Form.Item name="permissions" label="Permissions">
        <Select mode="multiple" options={[...APP_PERMISSION_OPTIONS]} />
      </Form.Item>
      <Form.Item name="remark" label="Remark">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item name="status" label="Enabled" valuePropName="checked" initialValue={true}>
        <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
      </Form.Item>
    </BaseFormModal>
  );
}
