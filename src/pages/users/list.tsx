import useIsMounted from '@/hooks/useIsMounted';
import { listUsers } from '@/services/user';
import type { PagedResponse, User } from '@/types/user';
import { Card, Input, Table } from 'antd';

import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';

const { Search } = Input;

export default function UserList() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');

  const fetch = useCallback(
    async (p = page, ps = pageSize, k = keyword) => {
      setLoading(true);
      try {
        const resp = (await listUsers({
          page: p,
          pageSize: ps,
          name: k,
        })) as PagedResponse<User>;
        startTransition(() => {
          setData(resp?.data || []);
          setTotal(resp?.total ?? (resp?.data ? resp.data.length : 0));
        });
      } catch (e) {
        startTransition(() => {
          setData([]);
          setTotal(0);
        });
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize, keyword],
  );

  // defer large list rendering to avoid jank on immediate updates
  const deferredData = useDeferredValue(data);
  const deferredTotal = useDeferredValue(total);

  const isMounted = useIsMounted();
  useEffect(() => {
    (async () => {
      if (!isMounted()) return;
      await fetch(page, pageSize, keyword);
    })();
  }, [fetch, page, pageSize, keyword, isMounted]);

  const onDetail = (item: User) => {
    window.open(`/users/${item.id}`);
  };

  const handleTableChange = (p: { current?: number; pageSize?: number }) => {
    const nextPage = p.current || 1;
    const nextSize = p.pageSize || 10;
    startTransition(() => {
      setPage(nextPage);
      setPageSize(nextSize);
    });
    fetch(nextPage, nextSize, keyword);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_: unknown, record: User) => (
        <a onClick={() => onDetail(record)}>{record.name}</a>
      ),
    },
    { title: 'Nick', dataIndex: 'nickName' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Created', dataIndex: 'createTime' },
  ];

  return (
    <Card>
      <div
        style={{
          marginBottom: 12,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Search
          placeholder="Search name"
          onSearch={(v) => {
            setKeyword(v);
            setPage(1);
          }}
          enterButton
          allowClear
          style={{ width: 260 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={deferredData}
        rowKey={(r) => r.id}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total: deferredTotal,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </Card>
  );
}
