import useIsMounted from '@/hooks/useIsMounted';
import { getUser } from '@/services/user';
import type { User } from '@/types/user';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Spin,
  Statistic,
  Tag,
  message,
} from 'antd';

import { startTransition, useEffect, useState } from 'react';
import { useParams } from 'umi';

export default function UserDetail() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isMounted = useIsMounted();
  useEffect(() => {
    (async () => {
      try {
        const resp = await getUser(String(id));
        if (!isMounted()) return;
        startTransition(() => {
          setUser(resp || null);
        });
      } catch (e) {
        // log and continue
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
          minHeight: 240,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>
    );
  if (!user) return <Card style={{ margin: 16 }}>未找到用户</Card>;

  const gender =
    typeof user.isMale === 'boolean' ? (user.isMale ? '男' : '女') : '未知';

  return (
    <Card style={{ margin: 16 }} styles={{ body: { padding: 24 } }}>
      <Row gutter={16} align="middle">
        <Col
          xs={24}
          sm={12}
          md={18}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Avatar
            size={96}
            src={(user as any).avatar}
            style={{ marginRight: 16 }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>
              {user.name || user.nickName || user.id}{' '}
            </h2>
            <div style={{ marginTop: 8, color: 'rgba(0,0,0,0.45)' }}>
              {user.bio}
            </div>
            <div style={{ marginTop: 12 }}>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={() => message.info('编辑暂未实现')}
              >
                编辑
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard?.writeText(String(user.id));
                  message.success('已复制用户 ID');
                }}
              >
                复制 ID
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={6} md={6} style={{ marginTop: 12 }}>
          <Statistic title="最后登录" value={user.lastLogin || '-'} />
          <div style={{ marginTop: 12 }}>
            <Tag color={user.status === 'active' ? 'success' : 'default'}>
              {user.status === 'active' ? '活跃' : '未激活'}
            </Tag>
          </div>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} type="inner" title="详细信息">
        <Descriptions column={2} bordered>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
          <Descriptions.Item label="昵称">{user.nickName}</Descriptions.Item>
          <Descriptions.Item label="电话">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
          <Descriptions.Item label="性别">{gender}</Descriptions.Item>
          <Descriptions.Item label="手机型号">
            {(user as any).phoneModel || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
          <Descriptions.Item label="地址" span={2}>
            {user.address}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {user.createTime}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card style={{ marginTop: 16 }} type="inner" title="最近浏览">
        {(
          ((user as any).browsingHistory || []) as Array<{
            url: string;
            title: string;
            time: string;
          }>
        ).map((it) => (
          <div
            key={it.url}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{it.title || it.url}</div>
              <div style={{ color: 'rgba(0,0,0,0.45)' }}>{it.time}</div>
            </div>
            <a href={it.url} onClick={(e) => e.preventDefault()}>
              访问
            </a>
          </div>
        ))}
      </Card>
    </Card>
  );
}
