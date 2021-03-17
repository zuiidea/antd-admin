import React, { PureComponent } from 'react'
import { Table, Avatar } from 'antd'
import { t } from "@lingui/macro"
import { Ellipsis } from 'components'
import styles from './List.less'

class List extends PureComponent {
  render() {
    const { ...tableProps } = this.props
    const columns = [
      {
        title: t`Image`,
        dataIndex: 'image',
        render: text => <Avatar shape="square" src={text} />,
      },
      {
        title: t`Title`,
        dataIndex: 'title',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: t`Author`,
        dataIndex: 'author',
      },
      {
        title: t`Categories`,
        dataIndex: 'categories',
      },
      {
        title: t`Tags`,
        dataIndex: 'tags',
      },
      {
        title: t`Visibility`,
        dataIndex: 'visibility',
      },
      {
        title: t`Comments`,
        dataIndex: 'comments',
      },
      {
        title: t`Views`,
        dataIndex: 'views',
      },
      {
        title: t`Publish Date`,
        dataIndex: 'date',
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => t`Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
