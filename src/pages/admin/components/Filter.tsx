import { Button, Space } from 'antd';

type Props = {
  onAdd: () => void;
};

export default function Filter({ onAdd }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <Space>
        <Button type="primary" onClick={onAdd}>
          新增管理员
        </Button>
      </Space>
    </div>
  );
}
