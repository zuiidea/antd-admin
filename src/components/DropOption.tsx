import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React from 'react';

type Option = { key: string; label: React.ReactNode };

interface DropOptionProps {
  menuOptions: Option[];
  onMenuClick?: (key: string) => void;
  children?: React.ReactNode;
}

const DropOption: React.FC<DropOptionProps> = ({
  menuOptions,
  onMenuClick,
  children,
}) => {
  const items = menuOptions.map((o) => ({ key: o.key, label: o.label }));

  const menu = {
    items,
    onClick: ({ key }: { key: string }) => onMenuClick?.(key),
  };

  // ensure Dropdown receives a single React element as child
  let triggerNode: React.ReactElement;
  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    triggerNode = children as React.ReactElement;
  } else if (children) {
    // wrap non-element children (like plain text) in a span
    triggerNode = <span>{children}</span>;
  } else {
    triggerNode = (
      <a onClick={(e) => e.preventDefault()}>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </a>
    );
  }

  return (
    <Dropdown menu={menu} trigger={['click']}>
      {triggerNode}
    </Dropdown>
  );
};

export default DropOption;
