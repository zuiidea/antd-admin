import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './recentSales.less'

const status = {
  1: {
    color: Color.green,
    text: 'SALE',
  },
  2: {
    color: Color.yellow,
    text: 'REJECT',
  },
  3: {
    color: Color.red,
    text: 'TAX',
  },
  4: {
    color: Color.blue,
    text: 'EXTENDED',
  },
}

function RecentSales({ data }) {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (text, it) => (
        <span style={{ color: status[it.status].color }}>${text}</span>
      ),
    },
  ]
  return (
    <div className={styles.recentsales}>
      <Table
        pagination={false}
        columns={columns}
        rowKey={(record, key) => key}
        dataSource={data.filter((item, key) => key < 5)}
      />
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.array,
}

export default RecentSales
