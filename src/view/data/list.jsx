import React from 'react'
import ReactDOM from 'react-dom'
import { ajax, config, Logger } from '../../utils/lib'
import { Icon, message, Table, Button, Row, Col } from 'antd'
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
      data:{},
      loading: false,
    };
  },
  componentDidMount() {
    this.fetch()
  },
  fetch() {
    const _this = this
    this.setState({loading: true})

    fetch('https://randomuser.me/api/')
    .then(function(response) {
      console.log(response);
    })
    // Ajax({
    //   url: contextPath + '/talent/index',
    //   data: {
    //     ..._this.state.params
    //   },
    //   success: function (result) {
    //     const pager = _this.state.pager
    //     const params = _this.state.params
    //     pager.total = result.total
    //     _this.setState({loading: false, data: result.talentList, pager, params})
    //   }
    // })
  },
  render() {
    return (
     <div />
    )
  },
})

module.exports = List

// <Table
//   bordered
//   columns={columns}
//   rowKey={record => record.id}
//   dataSource={this.state.data}
//   pagination={this.state.pager}
//   loading={this.state.loading}
//   onChange={this.handleTableChange}
//   size="small" />
