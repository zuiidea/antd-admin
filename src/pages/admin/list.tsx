import { Card, message } from 'antd';
import { startTransition, useDeferredValue, useEffect, useState } from 'react';

import useIsMounted from '@/hooks/useIsMounted';
import adminService from '@/services/admin';
import { Admin } from '@/types/admin';
import api from '@/utils/request';
import Filter from './components/Filter';

import AdminList from './components/List';
import AdminModal from './components/Modal';

export default function ListPage() {
  const [data, setData] = useState<Admin[]>([]);
  const [routes, setRoutes] = useState<
    Array<{ id: string; name?: string; route: string }>
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Admin | undefined>(undefined);

  const load = async () => {
    try {
      const resp = (await adminService.listAdmins()) as { data?: Admin[] };
      startTransition(() => {
        setData(resp?.data || []);
      });
    } catch (e) {
      message.warning('无法加载管理员列表，显示空数据');
    }
  };

  const isMounted = useIsMounted();
  useEffect(() => {
    (async () => {
      try {
        const r = await api('/routes');
        if (isMounted()) startTransition(() => setRoutes(r as any));
      } catch (e) {
        // ignore
      }
      await load();
    })();
  }, [isMounted]);

  const deferredData = useDeferredValue(data);

  const handleAdd = () => {
    setCurrentItem(undefined);
    setModalOpen(true);
  };

  const handleEdit = (item: Admin) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleDetail = (item: Admin) => {
    window.open(`/admin/${item.id}`, '_blank');
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteAdmin(String(id));
      await load();
      message.success('删除成功');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (values: Record<string, unknown>) => {
    try {
      const body = { ...values };
      if (Array.isArray(body.permissions))
        body.permissions = body.permissions.join(',');
      if (currentItem) {
        await adminService.updateAdmin(String(currentItem.id), body);
        message.success('更新成功');
      } else {
        await adminService.createAdmin(body);
        message.success('新增成功');
      }
      setModalOpen(false);
      await load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <Filter onAdd={handleAdd} />
      <AdminList
        data={deferredData}
        onEdit={handleEdit}
        onDetail={handleDetail}
        onDelete={handleDelete}
      />
      <AdminModal
        open={modalOpen}
        item={currentItem}
        routes={routes}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
      />
    </Card>
  );
}
