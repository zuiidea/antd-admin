import React from 'react'
import ReactDOM from 'react-dom'
import { ajax, config, Logger } from '../../utils/lib'
import { Icon, message, Table, Button, Row, Col, Dropdown, Menu } from 'antd'
import './list.less'

const logger = Logger.getLogger('List')

let List = React.createClass({
  getInitialState() {
    logger.info()
    const tableName = this.props.routes.pop().tableName
    return {
      tableName,
      pager:{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      },
      data:[],
      params:{},
      loading: false,
    };
  },
  componentDidMount() {
    this.fetch()
  },
  handleTableChange(pagination, filters, sorter) {
    let pager = this.state.pager
    pager.current = pagination.current
    this.setState({
      pagination: pager,
      params:{
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      }})
    this.fetch()
  },
  fetch() {
    const _this = this
    this.setState({loading: true})
    ajax({
      url: 'https://randomuser.me/api/',
      data: {
        results:10,
        ..._this.state.params
      },
      success: function (result) {
        const pager = _this.state.pager
        const params = _this.state.params
        pager.total = 200
        _this.setState({
          loading: false,
          data: result.results,
          pager,
          params})
      }
    })
  },
  render() {
    const columns = [
      {
        title: '头像',
        dataIndex: 'picture',
        width:64,
        className:'avatar-col',
        render: text => <img width='24' src={text.thumbnail} />,
      },{
      title: '姓名',
      dataIndex: 'name',
      sorter: true,
      render: text => `${text.first} ${text.last}`,
    }, {
      title: '性别',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    }, {
      title: '座机',
      dataIndex: 'cell',
    }, {
      title: '国家',
      dataIndex: 'nat',
    }, {
      title: '城市',
      dataIndex: 'location',
      render: text => text.city,
    },{
      title: '手机',
      dataIndex: 'phone',
    },{
      title: '邮箱',
      dataIndex: 'email',
    },{
      title: '时间',
      dataIndex: 'dob',
      render: text => new Date(text).format("yyyy-MM-dd hh:mm:ss"),
    },{
      title: '操作',
      dataIndex: 'login',
      render: (text,it) => {
        const menu = (
          <Menu>
            <Menu.Item>
              <a href='javascript:;'>编辑</a>
            </Menu.Item>
            <Menu.Item>
              <a href='javascript:;'>删除</a>
            </Menu.Item>
          </Menu>
        )
        return <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="javascript:;">
                  操作 <Icon type="down" />
                </a>
              </Dropdown>
      },
    }]
    return (
      <div>
      <Table
        bordered
        columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pager}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        className="list-table"
        size="small" />
    </div>
    )
  },
})

module.exports = List
