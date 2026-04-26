import { Button, Input, Select, theme } from "antd";
import { Plus, ShieldCheck } from "lucide-react";
import { forwardRef, useMemo } from "react";
import { FilterToolbar } from "@/components/FilterToolbar";

const FILTER_CONTROL_WIDTH = 220;

export type ToolbarProps = {
  keywordInput: string;
  onKeywordChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  onClearSearch: () => void;
  roleValue: string | undefined;
  onRoleChange: (role: string) => void;
  canCreate: boolean;
  onCreateClick: () => void;
};

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  {
    keywordInput,
    onKeywordChange,
    onSearch,
    onClearSearch,
    roleValue,
    onRoleChange,
    canCreate,
    onCreateClick,
  },
  ref,
) {
  const { token } = theme.useToken();

  const slots = useMemo(
    () => [
      {
        key: "keyword",
        minWidth: FILTER_CONTROL_WIDTH,
        children: (
          <Input.Search
            allowClear
            placeholder="Search admin"
            style={{ width: FILTER_CONTROL_WIDTH }}
            value={keywordInput}
            onChange={(e) => onKeywordChange(e.target.value)}
            onSearch={(v) => onSearch(v)}
            onClear={onClearSearch}
          />
        ),
      },
      {
        key: "role",
        minWidth: FILTER_CONTROL_WIDTH,
        children: (
          <Select
            allowClear
            placeholder="Role"
            style={{ width: FILTER_CONTROL_WIDTH }}
            prefix={<ShieldCheck size={token.fontSize} />}
            value={roleValue}
            onChange={(v) => onRoleChange(v ?? "")}
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
            ]}
          />
        ),
      },
    ],
    [keywordInput, onClearSearch, onKeywordChange, onRoleChange, onSearch, roleValue, token.fontSize],
  );

  return (
    <FilterToolbar
      ref={ref}
      slots={slots}
      actions={
        <Button
          type="primary"
          icon={<Plus size={token.fontSize} />}
          onClick={onCreateClick}
          disabled={!canCreate}
        >
          Create Admin
        </Button>
      }
      moreFiltersLabel="More filters"
      moreFiltersTitle="More filters"
    />
  );
});
