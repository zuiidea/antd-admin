import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';

import useGlobalSync from '@/hooks/useGlobalSync';
import useIsMounted from '@/hooks/useIsMounted';
import adminService from '../services/admin';

import useGlobalStore from '../store/useGlobalStore';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useGlobalSync((s) => s.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const isMounted = useIsMounted();

  useEffect(() => {
    (async () => {
      try {
        const admin = (await adminService.currentAdmin()) as
          | import('@/types/admin').Admin
          | undefined;
        if (!isMounted()) return;
        if (admin) {
          useGlobalStore.getState().login();
          useGlobalStore.getState().setCurrentUser(admin);
        } else {
          useGlobalStore.getState().logout();
        }
      } catch (e) {
        useGlobalStore.getState().logout();
      } finally {
        if (isMounted()) setLoading(false);
      }
    })();
  }, [isMounted]);

  useEffect(() => {
    const path = history.location.pathname;
    if (!isLoggedIn && path !== '/login') {
      history.replace('/login');
    }
    if (isLoggedIn && path === '/login') {
      history.replace('/');
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
