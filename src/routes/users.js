import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/users/list'
import UserSearch from '../components/users/search'
import UserModal from '../components/users/modal'

function Users ({ location, dispatch, users }) {
  const { loading, list, pagination, currentItem, modalVisible, modalType, isMotion } = users
  const { field, keyword } = location.query

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: 'users/hideModal'
      })
    }
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    location,
    isMotion,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'users/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }

  const userSearchProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/users'
      }))
    },
    onAdd () {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },
    switchIsMotion () {
      dispatch({type: 'users/switchIsMotion'})
    }
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />

  return (
    <div className='content-inner'>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({users}) => ({users}))(Users)
