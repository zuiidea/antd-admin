import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Link, useIntl } from 'umi'
import styles from './List.less'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: intl.formatMessage(
          {
            id: 'Are you sure delete this record?',
          }),
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    const intl = useIntl()
    const columns = [
      {
        title: intl.formatMessage({id: 'Avatar'}),
        dataIndex: 'avatar',
        key: 'avatar',
        width: 72,
        fixed: 'left',
        render: text => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: intl.formatMessage({id: 'Name'}),
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: intl.formatMessage({id: 'NickName'}),
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: intl.formatMessage({id: 'Age'}),
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: intl.formatMessage({id: 'Gender'}),
        dataIndex: 'isMale',
        key: 'isMale',
        render: text => <span>{text ? 'Male' : 'Female'}</span>,
      },
      {
        title: intl.formatMessage({id: 'Phone'}),
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: intl.formatMessage({id: 'Email'}),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: intl.formatMessage({id: 'Address'}),
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: intl.formatMessage({id: 'CreateTime'}),
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: intl.formatMessage({id: 'Operation'}),
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: intl.formatMessage(
                  {
                    id: 'Update',
                  }) },
                { key: '2', name: intl.formatMessage(
                  {
                    id: 'Delete',
                  }) },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => intl.formatMessage({name: 'Total '},{id: 'Avatar'}, { name: 'Items'}),
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
