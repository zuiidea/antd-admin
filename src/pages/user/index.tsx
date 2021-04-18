import React, { useState, useEffect } from 'react'
import { Avatar, Button, Table } from 'antd'
import { Link } from 'umi'
import { useRequest } from '@/hooks'
import { queryUserList } from '@/services'
import type {
  IUserItem,
  IUserListResult,
  IQueryUserListParams,
} from '@/services'
import { Trans } from '@lingui/macro'
import { ColumnType } from '@/typings'
import styles from './index.less'

const columns: ColumnType<IUserItem>[] = [
  {
    title: <Trans>Avatar</Trans>,
    dataIndex: 'avatar',
    key: 'avatar',
    width: '7%',
    fixed: 'left',
    render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
  },
  {
    title: <Trans>Name</Trans>,
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
  },
  {
    title: <Trans>NickName</Trans>,
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: <Trans>Age</Trans>,
    dataIndex: 'age',
    width: '6%',
    key: 'age',
  },
  {
    title: <Trans>Gender</Trans>,
    dataIndex: 'isMale',
    key: 'isMale',
    width: '7%',
    render: (text) => <span>{text ? 'Male' : 'Female'}</span>,
  },
  {
    title: <Trans>Phone</Trans>,
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: <Trans>Email</Trans>,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: <Trans>Address</Trans>,
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: <Trans>CreateTime</Trans>,
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: <Trans>Operation</Trans>,
    key: 'operation',
    fixed: 'right',
    width: '12%',
    render: (text, record) => {
      return (
        <>
          <Button type="link">Update</Button>
          <Button type="link">Delete</Button>
        </>
      )
    },
  },
]

const UserPage: React.FC = () => {
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const {
    data: { list, total },
    loading,
    run: runQueryUserList,
  } = useRequest<IUserListResult, IQueryUserListParams>(queryUserList, {
    initialData: {
      list: [],
      total: 0,
    },
    manual: true,
  })

  useEffect(() => {
    runQueryUserList({
      page: current,
      pageSize,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pageSize])

  const pagination = {
    current,
    pageSize,
    total,
    showTotal: (total) => `Total ${total} Items`,
  }

  return (
    <div className={styles.error}>
      <Table
        bordered
        loading={loading}
        dataSource={list}
        columns={columns}
        className={styles.table}
        scroll={{ x: 1200 }}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={(page) => {
          setCurrent(page.current as number)
          setPageSize(page.pageSize as number)
        }}
      />
    </div>
  )
}

export default UserPage
