import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect, history } from 'umi'
import { t } from '@lingui/macro'
import { Page } from '../../components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import TaskModal from './components/Modal'

@connect(({ taskLog, loading }) => ({ taskLog, loading }))
class taskLog extends PureComponent {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  handleRefresh = (newQuery) => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery
        },
        { arrayFormat: 'repeat' }
      )
    })
  }

  get modalProps() {
    const { dispatch, taskLog, loading } = this.props
    const { currentItem, modalVisible, modalType } = taskLog

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      cancelText: '取消',
      okText: '保存',
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `${modalType === 'create' ? t`Create Task` : t`Update User`}`,
      centered: true,
      width: 800,
      onOk: (data) => {
        dispatch({
          type: `user/${modalType}`,
          payload: data
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'user/hideModal'
        })
      }
    }
  }

  get listProps() {
    const { dispatch, taskLog, loading } = this.props
    const { list, pagination } = taskLog

    return {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: (page) => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        })
      },
      onDeleteItem: (id) => {
        dispatch({
          type: 'user/delete',
          payload: id
        }).then(() => {
          this.handleRefresh({
            page: list.length === 1 && pagination.current > 1 ? pagination.current - 1 : pagination.current
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'update',
            currentItem: item
          }
        })
      }
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query
      },
      onFilterChange: (value) => {
        this.handleRefresh({
          ...value
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create'
          }
        })
      }
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <TaskModal {...this.modalProps} />
      </Page>
    )
  }
}

taskLog.propTypes = {
  taskLog: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default taskLog
