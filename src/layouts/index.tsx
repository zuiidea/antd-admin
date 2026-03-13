import { Outlet, useLocation } from 'umi';

import PrimaryLayout from './PrimaryLayout';
import PublicLayout from './PublicLayout';

export default function LayoutWrapper() {
  const { pathname } = useLocation();

  // Simple rule: use PublicLayout for authentication/public routes
  if (pathname.startsWith('/public') || pathname === '/login') {
    return (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    );
  }

  return (
    <PrimaryLayout>
      <Outlet />
    </PrimaryLayout>
  );
}
