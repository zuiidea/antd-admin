import React from 'react'
import { DataTable } from 'components'
import { Table, Row, Col, Card, Select } from 'antd'

class DataTablePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { filterCase: {
      gender: '',
    } }
  }

  handleSelectChange = (gender) => {
    this.setState({
      filterCase: {
        gender,
      },
    })
  }
  render () {
    const { filterCase } = this.state
    const staticDataTableProps = {
      dataSource: [{ key: '1', name: 'John Brown', age: 24, address: 'New York' }, { key: '2', name: 'Jim Green', age: 23, address: 'London' }],
      columns: [{ title: 'name', dataIndex: 'name' }, { title: 'Age', dataIndex: 'age' }, { title: 'Address', dataIndex: 'address' }],
      pagination: false,
    }

    const fetchDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          testPrams: 'test',
        },
        dataKey: 'results',
      },
      columns: [
        { title: 'Name', dataIndex: 'name', render: text => `${text.first} ${text.last}` },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }

    const caseChangeDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          testPrams: 'test',
          ...filterCase,
        },
        dataKey: 'results',
      },
      columns: [
        { title: 'Name', dataIndex: 'name', render: text => `${text.first} ${text.last}` },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }

    return (<div className="content-inner">
      <Row gutter={32}>
        <Col lg={12} md={24}>
          <Card title="默认">
            <DataTable pagination={false} />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card title="静态数据">
            <DataTable
              {...staticDataTableProps}
            />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card title="远程数据">
            <DataTable
              {...fetchDataTableProps}
            />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card title="参数变化">
            <Select placeholder="Please select gender" allowClear onChange={this.handleSelectChange} style={{ width: 200, marginBottom: 16 }}>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
            <DataTable
              {...caseChangeDataTableProps}
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
                props: 'fetch',
                desciption: '远程获取数据的参数',
                type: 'Object',
                default: '后面有空加上',
              }]}
          />
        </Col>
      </Row>
    </div>)
  }
}


export default DataTablePage
