import React from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './list.less'

class list extends React.Component {
  constructor (props) {
    super(props)
    this.enterAnim = [
      {
        opacity: 0,
        x: 30,
        backgroundColor: '#fffeee',
        duration: 0
      }, {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd
      }, {
        opacity: 1,
        x: 0,
        duration: 250,
        ease: 'easeOutQuad'
      }, {
        delay: 1000,
        backgroundColor: '#fff'
      }
    ]
    this.leaveAnim = [
      {
        duration: 250,
        opacity: 0
      }, {
        height: 0,
        duration: 200,
        ease: 'easeOutQuad'
      }
    ]
    const {current} = this.props.pagination
    this.currentPage = current
    this.newPage = current
  }

  getBodyWrapper = (body) => {
    // 切换分页去除动画;
    if (this.currentPage !== this.newPage) {
      this.currentPage = this.newPage
      return body
    }
    return (
      <TweenOneGroup component='tbody' className={body.props.className} enter={this.enterAnim} leave={this.leaveAnim} appear={false}>
        {body.props.children}
      </TweenOneGroup>
    )
  }

  onEnd = (e) => {
    e.target.style.height = 'auto'
  }

  async pageChange (pagination) {
    await this.props.onPageChange(pagination)
    this.newPage = pagination.current
  }

  render () {
    const {
      loading,
      dataSource,
      pagination,
      onDeleteItem,
      onEditItem
    } = this.props
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        width: 64,
        className: styles.avatar,
        render: (text) => <img width={24} src={text} />
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName'
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        render: (text) => <span>{text}岁</span>
      }, {
        title: '性别',
        dataIndex: 'isMale',
        key: 'isMale',
        render: (text) => <span>{text
              ? '男'
              : '女'}</span>
      }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
      }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record) => (
          <p>
            <a onClick={() => onEditItem(record)} style={{
              marginRight: 4
            }}>编辑</a>
            <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} loading={loading} onChange={::this.pageChange} pagination={pagination} simple rowKey={record => record.id} getBodyWrapper={this.getBodyWrapper} />
    </div>
  }
}

export default list
