import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './browser.less'

const status = {
  1: {
    color: Color.green,
  },
  2: {
    color: Color.red,
  },
  3: {
    color: Color.blue,
  },
  4: {
    color: Color.yellow,
  },
}

function Browser({ data }) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      className: styles.name,
    },
    {
      title: 'percent',
      dataIndex: 'percent',
      className: styles.percent,
      render: (text, it) => <Tag color={status[it.status].color}>{text}%</Tag>,
    },
  ]
  return (
    <Table
      pagination={false}
      showHeader={false}
      columns={columns}
      rowKey={(record, key) => key}
      dataSource={data}
    />
  )
}

Browser.propTypes = {
  data: PropTypes.array,
}

export default Browser
