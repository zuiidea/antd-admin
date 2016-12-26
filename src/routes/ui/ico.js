import React, { PropTypes } from 'react'
import {Ico} from '../../components/ui'
import {Table} from 'antd'
import styles from './ico.less'

const iconlist = ['Cherry','Cheese','Bread','Beer','Beet','Bacon','Banana','Asparagus','Apple']

const IcoPage = () => <div className="content-inner">
  <ul className={styles.list}>
    {iconlist.map ( item =><li key={item}><Ico className={styles.icon} type={item} /><span className={styles.name}>{item}</span></li>)}
  </ul>
  <h2 style={{margin:'16px 0'}}>Props</h2>
  <Table rowKey={(record,key) => key}
        pagination={false}
        bordered
        columns={[
          {
            title: '参数',
            dataIndex: 'props',
          },
          {
            title: '说明',
            dataIndex: 'desciption',
          },
          {
            title: '类型',
            dataIndex: 'type',
          },
          {
            title: '默认值',
            dataIndex: 'default',
          }
        ]}
        dataSource={[
          {
            props:'type',
            desciption:'图标类型',
            type:'string',
            default:'-'
          }]} />
</div>

export default IcoPage
