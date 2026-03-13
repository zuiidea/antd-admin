import { Button, Space } from 'antd';

type Props = {
  selectedCount: number;
  onAdd: () => void;
  onSort: () => void;
  onToggleSelectedStatus: () => void;
};

export default function Filter({
  selectedCount,
  onAdd,
  onSort,
  onToggleSelectedStatus,
}: Props) {
  return (
    <Space style={{ marginBottom: 16 }}>
      <Button onClick={onAdd}>新增模块</Button>
      <Button onClick={onSort}>模块排序</Button>
      <Button
        type="primary"
        disabled={selectedCount === 0}
        onClick={onToggleSelectedStatus}
      >
        启用/禁用选中项{selectedCount > 0 ? ` (${selectedCount})` : ''}
      </Button>
    </Space>
  );
}
