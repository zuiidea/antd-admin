import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DeviceList from '../components/devices/list'
import DeviceSearch from '../components/devices/search'
import DeviceModal from '../components/devices/modal'

function Device ({ location, dispatch, devices }) {
  const { loading, list, pagination, currentItem, modalVisible, modalType, isMotion } = devices
  const { field, keyword } = location.query

  const deviceModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `devices/${modalType}`,
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: 'devices/hideModal'
      })
    }
  }

  const deviceListProps = {
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
        type: 'devices/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'devices/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }

  const deviceSearchProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/devices',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/devices'
      }))
    },
    onAdd () {
      dispatch({
        type: 'devices/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },
    switchIsMotion () {
      dispatch({type: 'devices/switchIsMotion'})
    }
  }

  const DeviceModalGen = () =>
    <DeviceModal {...deviceModalProps} />

  return (
    <div className='content-inner'>
      <DeviceSearch {...deviceSearchProps} />
      <DeviceList {...deviceListProps} />
      <DeviceModalGen />
    </div>
  )
}

Device.propTypes = {
  devices: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ devices }) {
  return { devices }
}

export default connect(mapStateToProps)(Device)
