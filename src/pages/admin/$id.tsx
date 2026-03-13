import useIsMounted from '@/hooks/useIsMounted';
import { getAdmin } from '@/services/admin';
import type { Admin } from '@/types/admin';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  message,
  Row,
  Space,
  Spin,
  Tag,
} from 'antd';

import { useEffect, useState } from 'react';
import { useParams } from 'umi';

export default function AdminDetail() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const isMounted = useIsMounted();
  useEffect(() => {
    (async () => {
      try {
        const resp = await getAdmin(String(id));
        if (!isMounted()) return;
        setAdmin((resp as import('@/types/admin').Admin) || null);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted()) setLoading(false);
      }
    })();
  }, [id, isMounted]);

  if (loading)
    return (
      <div
        style={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>
    );
  if (!admin) return <Card style={{ margin: 16 }}>未找到管理员</Card>;
  const perms = admin.permissions
    ? String(admin.permissions)
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <Card style={{ margin: 16 }}>
      <Row gutter={24} align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Avatar src={admin.avatar} size={96} />
        </Col>
        <Col flex="auto">
          <div>
            <strong>用户名：</strong> {admin.username}
          </div>
          <div>
            <strong>姓名：</strong> {admin.real_name}
          </div>
          <div>
            <strong>昵称：</strong> {admin.nick_name}
          </div>
          <div style={{ marginTop: 8 }}>
            <Space>
              <Tag color={admin.status === 1 ? 'success' : 'default'}>
                {admin.status === 1 ? '已启用' : '已禁用'}
              </Tag>
              <Tag>{admin.role || '未设置角色'}</Tag>
              {admin.department ? (
                <Tag color="processing">{admin.department}</Tag>
              ) : null}
            </Space>
          </div>
          <div style={{ marginTop: 12 }}>
            <Space>
              <Button
                type="primary"
                onClick={() => message.info('重置密码已发送（模拟）')}
              >
                重置密码
              </Button>
              <Button
                onClick={() =>
                  message.info(
                    `${admin.status === 1 ? '禁用' : '启用'} 操作已模拟`,
                  )
                }
              >
                {admin.status === 1 ? '禁用账号' : '启用账号'}
              </Button>
            </Space>
          </div>
        </Col>
        <Col style={{ width: 260 }}>
          <div>
            <strong>最后登录：</strong>
          </div>
          <div style={{ color: 'rgba(0,0,0,0.65)' }}>
            {(admin as any).lastLogin || '-'}
          </div>
          <div style={{ marginTop: 8 }}>
            <strong>创建者：</strong> {(admin as any).createdBy || '-'}
          </div>
        </Col>
      </Row>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{admin.id}</Descriptions.Item>
        <Descriptions.Item label="手机">{admin.mobile}</Descriptions.Item>
        <Descriptions.Item label="备注">{admin.remark || ''}</Descriptions.Item>
      </Descriptions>

      <Card type="inner" title="权限列表" style={{ marginTop: 16 }}>
        {perms && perms.length ? (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {perms.map((p) => (
              <Tag key={String(p)} color="blue">
                {p}
              </Tag>
            ))}
          </div>
        ) : (
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>无权限</div>
        )}
      </Card>
    </Card>
  );
}
