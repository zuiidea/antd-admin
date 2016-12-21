import React, {PropTypes} from 'react'
import {Icon,Table,Tag} from 'antd'
import styles from './browser.less'
import {classnames,color} from '../../utils'

const status = {
  1:{
    color:color.green
  },
  2:{
    color:color.red
  },
  3:{
    color:color.blue
  },
  4:{
    color:color.yellow
  },
}

function Browser(props) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      className:styles.name,
    }, {
      title: 'percent',
      dataIndex: 'percent',
      className:styles.percent,
      render:(text,it) => <Tag color={status[it.status].color}>{text}%</Tag>,
    },
  ]
  return <Table pagination={false} showHeader={false} columns={columns} key={(record,key)=>key} dataSource={props.data}/>
}

Browser.propTypes = {
  props: PropTypes.object
}

export default Browser
