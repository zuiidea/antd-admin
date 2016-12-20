import React, {PropTypes} from 'react'
import {Icon,Table} from 'antd'
import styles from './recentSales.less'
import {classnames} from '../../utils'

function recentSales(props) {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    }, {
      title: 'STATUS',
      dataIndex: 'status',
    }, {
      title: 'DATE',
      dataIndex: 'date',
    }, {
      title: 'PRICE',
      dataIndex: 'price',
    }
  ]
  return (
    <div className={styles.recentsales}>
      <Table columns={columns} key={(record,key)=>key} dataSource={props.data}/>
    </div>
  )
}

export default recentSales
