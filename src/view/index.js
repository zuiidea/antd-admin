import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import SignIn from './user/SignIn'
import Breadcrumb from '../components/Breadcrumb'
import './index.less'
import { ajax, config, Logger } from '../utils/lib.js'
import { Spin, message, Icon } from 'antd'

const logger = Logger.getLogger('App')

const App = React.createClass({
  getInitialState() {
    return {
      loading: true,
      login: false,
      // loading: false,
      // login: true,
      userName: '未登录',
      collapse: false,
    }
  },
  componentDidMount() {
    if (!this.state.login) {
      const hide = message.loading('正在获取用户信息...', 0)
      ajax.get(`${config.getAPIPath()}${config.login.getCurrentUser}`).end((err, res) => {
        if (ajax.isSuccess(res) && !config.debug) {
          hide()
          this.loginSuccess(res.body.data)
        } else {
          if (config.isSSO()) {
            hide()
            logger.debug('not login, redirect to SSO login page')
            const redirect = encodeURIComponent(window.location.href)
            window.location.href = `${config.login.sso}${redirect}`
          } else {
            hide()
            message.error('获取用户信息失败, 请重新登录')
            logger.debug('not login, redirect to Login component')
            this.setState({
              loading: false,
              login: false,
            })
          }
        }
      })
    }
  },
  loginSuccess(name, showMsg) {
    logger.debug('callback logingSuccess, name = %s', name)
    if (showMsg) {
      message.success('登录成功')
    }
    this.setState({
      loading: false,
      login: true,
      userName: name,
    })
  },
  render() {
    if (this.state.loading) {
      return (<Spin spinning={this.state.loading} size="large">
                <SignIn loginSuccess= {this.loginSuccess} />
              </Spin>)
    } else if (!this.state.login) {
      return <SignIn loginSuccess={this.loginSuccess} />
    }
    const collapse = this.state.collapse
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
      <aside className="ant-layout-sider">
        <Sidebar />
        <div className="ant-aside-action" onClick={this.onCollapseChange}>
          {collapse ? <Icon type="right" /> : <Icon type="left" />}
        </div>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
            <Header userName={this.state.userName} />
          </div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb {...this.props} />
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div style={{ height: 220 }}>
              {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
          </div>
        </div>
      </div>
    )
  },
})

module.exports = App
