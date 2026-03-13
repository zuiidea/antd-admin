import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import DropOption from './DropOption';

// Mock antd Dropdown to expose menu items for testing
jest.mock('antd', () => {
  return {
    Dropdown: ({ menu, children }: any) =>
      React.createElement(
        'div',
        null,
        React.createElement('div', { 'data-testid': 'trigger' }, children),
        React.createElement(
          'div',
          { 'data-testid': 'menu' },
          menu?.items?.map((it: any) =>
            React.createElement(
              'button',
              {
                key: it.key,
                'data-key': it.key,
                onClick: () => menu.onClick?.({ key: it.key }),
              },
              typeof it.label === 'string'
                ? it.label
                : React.createElement('span', null, it.label),
            ),
          ),
        ),
      ),
  };
});

jest.mock('@ant-design/icons', () => ({
  BarsOutlined: () => React.createElement('span', null, 'Bars'),
  DownOutlined: () => React.createElement('span', null, 'Down'),
}));

test('renders default trigger when no children provided', () => {
  render(<DropOption menuOptions={[]} />);
  const trigger = screen.getByTestId('trigger');
  // default trigger in component is an <a>
  expect(trigger.querySelector('a')).toBeTruthy();
});

test('wraps plain text children in a span', () => {
  render(<DropOption menuOptions={[]}>PlainChild</DropOption>);
  const trigger = screen.getByTestId('trigger');
  expect(screen.getByText('PlainChild')).toBeTruthy();
  expect(trigger.firstElementChild?.tagName.toLowerCase()).toBe('span');
});

test('clicking menu item calls onMenuClick with key', () => {
  const onMenuClick = jest.fn();
  render(
    <DropOption
      menuOptions={[{ key: 'one', label: 'One' }]}
      onMenuClick={onMenuClick}
    />,
  );
  const item = screen.getByText('One');
  fireEvent.click(item);
  expect(onMenuClick).toHaveBeenCalledWith('one');
});
