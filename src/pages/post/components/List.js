import React, { PureComponent } from 'react'
import { Table, Avatar } from 'antd'
import { withI18n } from '@lingui/react'

@withI18n()
class List extends PureComponent {
  render() {
    const { i18n, ...tableProps } = this.props
    const columns = [
      {
        title: i18n.t`Image`,
        dataIndex: 'image',
        width: 100,
        render: text => <Avatar shape="square" src={text} />,
      },
      {
        title: i18n.t`Title`,
        dataIndex: 'title',
      },
      {
        title: i18n.t`Author`,
        dataIndex: 'author',
      },
      {
        title: i18n.t`Categories`,
        dataIndex: 'categories',
      },
      {
        title: i18n.t`Tags`,
        dataIndex: 'tags',
      },
      {
        title: i18n.t`Visibility`,
        dataIndex: 'visibility',
      },
      {
        title: i18n.t`Comments`,
        dataIndex: 'comments',
      },
      {
        title: i18n.t`Views`,
        dataIndex: 'views',
      },
      {
        title: i18n.t`Publish Date`,
        dataIndex: 'date',
      },
    ]

    return (
      <div>
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            showTotal: total => i18n.t`Total ${total} Items`,
          }}
          bordered
          scroll={{ x: 1200, y: 'auto' }}
          columns={columns}
          simple
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default List
