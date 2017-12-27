import React from 'react'
import { DropOption, Page } from 'components'
import { Table, Row, Col, Card, message } from 'antd'

const DropOptionPage = () => (<Page inner>
  <Row gutter={32}>
    <Col lg={8} md={12}>
      <Card title="默认">
        <DropOption menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      </Card>
    </Col>
    <Col lg={8} md={12}>
      <Card title="样式">
        <DropOption menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} buttonStyle={{ border: 'solid 1px #eee', width: 60 }} />
      </Card>
    </Col>
    <Col lg={8} md={12}>
      <Card title="事件">
        <DropOption
          menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]}
          buttonStyle={{ border: 'solid 1px #eee', width: 60 }}
          onMenuClick={({ key }) => {
            switch (key) {
              case '1':
                message.success('点击了编辑')
                break
              case '2':
                message.success('点击了删除')
                break
              default:
                break
            }
          }}
        />
      </Card>
    </Col>
  </Row>
  <h2 style={{ margin: '16px 0' }}>Props</h2>
  <Row>
    <Col lg={18} md={24}>
      <Table
        rowKey={(record, key) => key}
        pagination={false}
        bordered
        scroll={{ x: 800 }}
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
          },
        ]}
        dataSource={[
          {
            props: 'menuOptions',
            desciption: '下拉操作的选项，格式为[{name:string,key:string}]',
            type: 'Array',
            default: '必选',
          },
          {
            props: 'onMenuClick',
            desciption: '点击 menuitem 调用此函数，参数为 {item, key, keyPath}',
            type: 'Function',
            default: '-',
          },
          {
            props: 'buttonStyle',
            desciption: '按钮的样式',
            type: 'Object',
            default: '-',
          },
          {
            props: 'dropdownProps',
            desciption: '下拉菜单的参数，可参考antd的【Dropdown】组件',
            type: 'Object',
            default: '-',
          },
        ]}
      />
    </Col>
  </Row>
</Page>)

export default DropOptionPage
