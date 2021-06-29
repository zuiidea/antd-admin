import React, { PureComponent } from 'react'
import { Menu, Table, Tooltip, Space, Dropdown } from 'antd'
import { t, Trans } from '@lingui/macro'
import styles from './List.less'
import { DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const Data = [
  {
    name: '导出任务',
    description: '任务描述',
    command: 'php -v',
    retry_interval: 180,
    retry_times: 3,
    timeout: 180,
    cron_expression: '@secondly',
    frequency: '{"mode":2, "extend":{count:3}}',
    bind_id: 1,
    tag: 'order',
    maximum_parallel_runnable_num: 3,
    id: 1
  },
  {
    name: '导出任务',
    description: '任务描述',
    command: 'php -v',
    retry_interval: 180,
    retry_times: 3,
    timeout: 180,
    cron_expression: '@secondly',
    frequency: '{"mode":2, "extend":{count:3}}',
    bind_id: 1,
    tag: 'order',
    maximum_parallel_runnable_num: 3,
    id: 2
  },
  {
    name: '导出任务',
    description: '任务描述',
    command: 'php -v',
    retry_interval: 180,
    retry_times: 3,
    timeout: 180,
    cron_expression: '2 0 2 0 0',
    frequency: '{"mode":2, "extend":{count:3}}',
    bind_id: 1,
    tag: 'order',
    maximum_parallel_runnable_num: 3,
    id: 3
  },
  {
    name: '导出任务',
    description: '任务描述',
    command: 'php -v',
    retry_interval: 180,
    retry_times: 3,
    timeout: 180,
    cron_expression: '@secondly',
    frequency: '{"mode":2, "extend":{count:3}}',
    bind_id: 1,
    tag: 'order',
    maximum_parallel_runnable_num: 3,
    id: 4
  },
  {
    name: '导出任务',
    description: '任务描述',
    command: 'php -v',
    retry_interval: 180,
    retry_times: 3,
    timeout: 180,
    cron_expression: '@secondly',
    frequency: '{"mode":2, "extend":{count:3}}',
    bind_id: 1,
    tag: 'order',
    maximum_parallel_runnable_num: 3,
    id: 5
  }
]

class List extends PureComponent {
  render() {
    const { onEditItem, ...tableProps } = this.props
    const columns = [
      {
        title: <Trans>Sn</Trans>,
        dataIndex: 'id',
        key: 'id',
        width: 70,
        fixed: 'left'
      },
      {
        title: <Trans>Task Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        width: 120,
        fixed: 'left',
        render: (text, row) => {
          return (
            <Tooltip title={t`Description` + ':' + row.description}>
              <a>{text}</a>
            </Tooltip>
          )
        }
      },
      {
        title: <Trans>Command</Trans>,
        dataIndex: 'command',
        width: 200,
        key: 'command'
      },
      {
        title: <Trans>Frequency</Trans>,
        dataIndex: 'frequency',
        width: 300,
        key: 'frequency'
      },
      {
        title: <Trans>Cron Expression</Trans>,
        dataIndex: 'cron_expression',
        width: 120,
        key: 'cron_expression'
      },
      {
        title: <Trans>Timeout</Trans>,
        dataIndex: 'timeout',
        key: 'timeout',
        width: 100
      },
      {
        title: <Trans>Retry Times</Trans>,
        dataIndex: 'retry_times',
        key: 'retry_times',
        width: 130
      },
      {
        title: <Trans>Retry Interval</Trans>,
        dataIndex: 'retry_interval',
        key: 'retry_interval',
        width: 130
      },
      {
        title: <Trans>Max Parallel Num</Trans>,
        dataIndex: 'maximum_parallel_runnable_num',
        key: 'maximum_parallel_runnable_num',
        width: 120
      },
      {
        title: <Trans>Task Id</Trans>,
        dataIndex: 'task_id',
        key: 'task_id',
        width: 100
      },
      {
        title: <Trans>Tag</Trans>,
        dataIndex: 'tag',
        key: 'tag'
      },
      {
        title: <Trans>Bind Id</Trans>,
        dataIndex: 'bind_id',
        key: 'bind_id',
        width: 100
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'Operation',
        fixed: 'right',
        render: () => (
          <Space split={'|'}>
            <a type={'link'} onClick={onEditItem}>
              编辑
            </a>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                更多 <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        )
      }
    ]

    const menu = (
      <Menu>
        <Menu.Item>复制任务</Menu.Item>
        <Menu.Item>手动触发</Menu.Item>
        <Menu.Item>手动结束</Menu.Item>
        <Menu.Item danger>删除任务</Menu.Item>
      </Menu>
    )

    return (
      <Table
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => t`Total ${total} Items`
        }}
        dataSource={Data}
        className={styles.table}
        columns={columns}
        simple
        scroll={{ x: 1700 }}
        rowKey={(record) => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object
}

export default List
