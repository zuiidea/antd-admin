import React from 'react'
import { Ico } from '../../components/ui'
import { Table, Row, Col } from 'antd'
import styles from './ico.less'

const iconlist = ['Cherry', 'Cheese', 'Bread', 'Beer', 'Beet', 'Bacon', 'Banana', 'Asparagus', 'Apple']

const IcoPage = () => <div className='content-inner'>
  <ul className={styles.list}>
    {iconlist.map(item => <li key={item}><Ico className={styles.icon} type={item} /><span className={styles.name}>{item}</span></li>)}
  </ul>
  <h2 style={{margin: '16px 0'}}>Props</h2>
  <Row>
    <Col lg={18} md={24}>
      <Table rowKey={(record, key) => key}
        pagination={false}
        bordered
        scroll={{ x: 800 }}
        columns={[
          {
            title: '参数',
            dataIndex: 'props'
          },
          {
            title: '说明',
            dataIndex: 'desciption'
          },
          {
            title: '类型',
            dataIndex: 'type'
          },
          {
            title: '默认值',
            dataIndex: 'default'
          }
        ]}
        dataSource={[
          {
            props: 'type',
            desciption: '图标类型',
            type: 'String',
            default: '-'
          }]} />
    </Col>
  </Row>
</div>

export default IcoPage
