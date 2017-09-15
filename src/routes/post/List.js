import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      className: styles.image,
      width: 64,
      render: text => <img alt="Feture" width={26} src={text} />,
    }, {
      title: 'Title',
      dataIndex: 'title',
    }, {
      title: 'Author',
      dataIndex: 'author',
    }, {
      title: 'Categories',
      dataIndex: 'categories',
    }, {
      title: 'Tags',
      dataIndex: 'tags',
    }, {
      title: 'Visibility',
      dataIndex: 'visibility',
    }, {
      title: 'Comments',
      dataIndex: 'comments',
    }, {
      title: 'Views',
      dataIndex: 'views',
    }, {
      title: 'Date',
      dataIndex: 'date',
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default List
