import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Spin, Table } from 'antd'
import { Page, ScrollBar } from 'components'
import styles from './index.less'
import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

const columns = [
  {
    title: '名称',
    dataIndex: 'dictName',
    key: 'dictName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
]

/**
 * 数据字典
 */
@connect(({ app, dict, loading }) => ({
  dict,
  loading: loading.effects['dict/query'],
}))
class Dict extends PureComponent {
  componentDidMount() {
    this.handleRefresh({ page: 1, pageSize: 10 })
  }

  handleRefresh = newQuery => {
    const { location, dispatch } = this.props
    const { query, pathname } = location
    const payload = {
      ...query,
      ...newQuery,
    }
    dispatch({
      type: 'dict/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  render() {
    const { dict, loading } = this.props
    const { list } = dict
    return (
      <Page loading={loading} inner>
        <Table columns={columns} dataSource={list} />
      </Page>
    )
  }
}

Dict.propTypes = {
  dict: PropTypes.object,
  loading: PropTypes.object,
}

export default Dict
