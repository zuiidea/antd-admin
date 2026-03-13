import { Card, message } from 'antd';
import React, { useMemo, useState } from 'react';

import useIsMounted from '@/hooks/useIsMounted';
import * as menuService from '@/services/menu';
import type { MenuFormValues, MenuItem } from '@/types/menu';
import Filter from './components/Filter';
import MenuList from './components/List';
import MenuModal from './components/Modal';
import SortModal from './components/SortModal';

function mapTree(
  items: MenuItem[],
  fn: (item: MenuItem) => MenuItem,
): MenuItem[] {
  return items.map((item) => {
    const next = fn(item);
    if (!item.children?.length) return next;
    return { ...next, children: mapTree(item.children, fn) };
  });
}

function normalizeChildren(items?: MenuItem[]): MenuItem[] {
  if (!items || !items.length) return [];
  return items
    .map((it) => ({
      ...it,
      children: normalizeChildren(it.children) || undefined,
    }))
    .map((it) => ({
      ...it,
      children: it.children && it.children.length ? it.children : undefined,
    }));
}

function removeNode(items: MenuItem[], id: number): MenuItem[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      children: item.children ? removeNode(item.children, id) : undefined,
    }));
}

function updateNode(
  items: MenuItem[],
  id: number,
  updater: (node: MenuItem) => MenuItem,
): MenuItem[] {
  return items.map((item) => {
    if (item.id === id) return updater(item);
    if (!item.children?.length) return item;
    return { ...item, children: updateNode(item.children, id, updater) };
  });
}

function addNode(
  items: MenuItem[],
  parentId: number | null,
  node: MenuItem,
): MenuItem[] {
  if (parentId === null) return [...items, node];
  return items.map((item) => {
    if (item.id === parentId) {
      return { ...item, children: [...(item.children || []), node] };
    }
    if (!item.children?.length) return item;
    return { ...item, children: addNode(item.children, parentId, node) };
  });
}

function toParentOptions(items: MenuItem[]): Array<{
  title: string;
  value: number;
  children?: Array<{ title: string; value: number }>;
}> {
  return items.map((item) => ({
    title: item.title,
    value: item.id,
    children: item.children?.map((child) => ({
      title: child.title,
      value: child.id,
    })),
  }));
}

export default function SysMenuPage() {
  const [menus, setMenus] = useState<MenuItem[]>(() => []);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update'>('create');
  const [currentItem, setCurrentItem] = useState<MenuItem | undefined>(
    undefined,
  );
  const [sortOpen, setSortOpen] = useState(false);

  const parentOptions = useMemo(() => toParentOptions(menus), [menus]);

  const handleCreate = () => {
    setModalType('create');
    setCurrentItem(undefined);
    setModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setModalType('update');
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await menuService.deleteMenu(id);
      setMenus((prev) => normalizeChildren(removeNode(prev, id)));
      setSelectedRowKeys((prev) => prev.filter((k) => Number(k) !== id));
      message.success('删除成功');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (values: MenuFormValues) => {
    try {
      if (modalType === 'create') {
        const resp = await menuService.createMenu(values);
        const added = resp as MenuItem;
        setMenus((prev) =>
          normalizeChildren(addNode(prev, values.parentId, added)),
        );
        message.success('新增成功');
      } else if (currentItem) {
        await menuService.updateMenu(
          currentItem.id,
          values as Partial<MenuFormValues>,
        );
        setMenus((prev) =>
          normalizeChildren(
            updateNode(prev, currentItem.id, (node) => ({
              ...node,
              ...values,
            })),
          ),
        );
        message.success('修改成功');
      }
      setModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleSelectedStatus = () => {
    if (!selectedRowKeys.length) return;
    const selectedSet = new Set(selectedRowKeys.map((k) => Number(k)));
    setMenus((prev) =>
      normalizeChildren(
        mapTree(prev, (item) => {
          if (!selectedSet.has(item.id)) return item;
          return { ...item, status: item.status === 1 ? 0 : 1 };
        }),
      ),
    );
    message.success('选中项状态已切换');
  };

  const handleSortConfirm = async (updatedMenus: MenuItem[]) => {
    try {
      // attempt to persist ordering to API; API may accept different shapes
      try {
        await menuService.sortMenus(updatedMenus as any);
      } catch (e) {
        // ignore API errors but still update local state
      }

      // ensure sort fields are normalized and flatten structure to set state
      const normalize = (
        items: MenuItem[],
        parentId: number | null = null,
      ): MenuItem[] => {
        return items.map((it: MenuItem, idx: number) => ({
          ...it,
          parentId,
          sort: idx + 1,
          children: it.children ? normalize(it.children, it.id) : undefined,
        }));
      };

      const normalized: MenuItem[] = normalize(updatedMenus);
      setMenus(
        normalized.map((it: MenuItem) => ({
          ...it,
          children: it.children && it.children.length ? it.children : undefined,
        })),
      );
      setSortOpen(false);
      message.success('排序已更新');
    } catch (e) {
      console.error(e);
    }
  };

  // load menus from API on mount
  const isMounted = useIsMounted();
  React.useEffect(() => {
    (async () => {
      try {
        const list = await menuService.listMenus();
        if (isMounted()) setMenus(normalizeChildren(list as MenuItem[]));
      } catch (e) {
        // keep initial menus on error
      }
    })();
  }, [isMounted]);

  return (
    <Card>
      <Filter
        selectedCount={selectedRowKeys.length}
        onAdd={handleCreate}
        onSort={() => setSortOpen(true)}
        onToggleSelectedStatus={handleToggleSelectedStatus}
      />

      <MenuList
        dataSource={[...menus].sort((a, b) => a.sort - b.sort)}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedRowKeys}
        onEditItem={handleEdit}
        onDeleteItem={handleDelete}
      />

      <MenuModal
        open={modalOpen}
        type={modalType}
        item={currentItem}
        parentOptions={parentOptions}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
      />

      <SortModal
        open={sortOpen}
        menus={menus}
        onCancel={() => setSortOpen(false)}
        onConfirm={handleSortConfirm}
      />
    </Card>
  );
}
