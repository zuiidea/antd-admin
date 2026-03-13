import { Layout } from 'antd';
import React from 'react';

import TopbarControls from '@/components/TopbarControls';

const { Content } = Layout;

export default function PublicLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          right: 12,
          top: 12,
          zIndex: 20,
          display: 'flex',
          gap: 8,
        }}
      >
        <TopbarControls />
      </div>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 480 }}>{children}</div>
      </Content>
    </Layout>
  );
}
