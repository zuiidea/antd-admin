import { Button, Input, theme } from "antd";
import { Plus } from "lucide-react";
import { forwardRef, useMemo } from "react";
import { FilterToolbar } from "@/components/FilterToolbar";

const FILTER_CONTROL_WIDTH = 220;

export type ToolbarProps = {
  keywordInput: string;
  onKeywordChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  onClearSearch: () => void;
  canCreate: boolean;
  onCreateClick: () => void;
};

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { keywordInput, onKeywordChange, onSearch, onClearSearch, canCreate, onCreateClick },
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
            placeholder="Search User"
            style={{ width: FILTER_CONTROL_WIDTH }}
            value={keywordInput}
            onChange={(e) => onKeywordChange(e.target.value)}
            onSearch={(v) => onSearch(v)}
            onClear={onClearSearch}
          />
        ),
      },
    ],
    [keywordInput, onClearSearch, onKeywordChange, onSearch],
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
          Create User
        </Button>
      }
      moreFiltersLabel="More filters"
      moreFiltersTitle="More filters"
    />
  );
});
