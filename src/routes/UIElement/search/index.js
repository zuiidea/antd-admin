import React from 'react'
import { Search } from 'components'
import { Table, Row, Col, Card } from 'antd'

const SearchPage = () => (<div className="content-inner">
  <Row gutter={32}>
    <Col lg={8} md={12}>
      <Card title="默认">
        <Search />
      </Card>
    </Col>
    <Col lg={8} md={12}>
      <Card title="附带选择">
        <Search
          {...{
            select: true,
            selectOptions: [
              { value: 'components', name: '组件' },
              { value: 'page', name: '页面' },
            ],
            selectProps: {
              defaultValue: 'components',
            },
          }}
        />
      </Card>
    </Col>
    <Col lg={8} md={12}>
      <Card title="大小">
        <Search size="large" style={{ marginBottom: 16 }} />
        <Search size="small" />
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
            props: 'size',
            desciption: '设置Search大小，可选值为 【small】 【large】 或者不设',
            type: 'String',
            default: '-',
          },
          {
            props: 'select',
            desciption: '设置是否有选择器',
            type: 'Boolean',
            default: 'false',
          },
          {
            props: 'selectOptions',
            desciption: '选择器的选项，格式为[{name:"",value:""}]或者[{value:""}]',
            type: 'Array',
            default: '-',
          },
          {
            props: 'selectProps',
            desciption: '选择器的属性，可参考antd的【Select】组件',
            type: 'Object',
            default: '-',
          },
          {
            props: 'onSearch',
            desciption: '点击搜索按钮, 按Enter键或者点击清除时的回调',
            type: 'Function({keyword:string,field:string})',
            default: '-',
          },
        ]}
      />
    </Col>
  </Row>
</div>)

export default SearchPage
