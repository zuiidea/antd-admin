import React from 'react'
import { Layer } from '../../components/ui'
import { Table, Row, Col, Button, Card } from 'antd'
import styles from './ico.less'

const IcoPage = () => <div className='content-inner'>
  <Row gutter={32}>
    <Col lg={8} md={12}>
      <Card title='默认'>
        <Button type='primary'>打开Layer</Button>
      </Card>
    </Col>
  </Row>
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
