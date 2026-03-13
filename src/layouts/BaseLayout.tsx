import GlobalFooter from '@/components/GlobalFooter';
import config from '@/utils/config';
import { Layout as AntdLayout } from 'antd';
import React from 'react';

const { Content } = AntdLayout;

type Props = {
  sider?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function BaseLayout({
  sider,
  header,
  children,
  className,
}: Props) {
  return (
    <AntdLayout style={{ minHeight: '100vh' }} className={className}>
      {sider}
      <AntdLayout>
        {header}
        <Content className="app-content">{children}</Content>
        <GlobalFooter className="footer" copyright={config.copyright} />
      </AntdLayout>
    </AntdLayout>
  );
}
