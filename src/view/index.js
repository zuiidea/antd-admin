import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import SignIn from './user/SignIn'
// import SignIn from '../components/Login'
import Breadcrumb from '../components/Breadcrumb'
import {ajax,config,logger} from '../utils/lib.js'
import {Spin, message} from 'antd'

const App = React.createClass({
  getInitialState: function () {
    return {
      // loading: true,
      // login: false,
      loading: false,
      login: true,
      userName: '未登录',
    }
  },
  componentWillMount() {

  },
  componentDidMount(){
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
            this.setState({loading: false, login: false})
          }
        }
      })
    }
  },
  loginSuccess (name, showMsg){
    logger.debug('callback logingSuccess, name = %s', name)
    if (showMsg)
      message.success('登录成功')
      this.setState({loading: false, login: true, userName: name})
  },
  render(){
    if (this.state.loading) {
      return <Spin spinning={this.state.loading} size="large"><SignIn loginSuccess={this.loginSuccess}/></Spin>
    } else if (!this.state.login) {
      return <SignIn loginSuccess={this.loginSuccess}/>
    }

    return (
      <div className="ant-layout-aside">
        <Sidebar/>
        <div id="main-content-div" className="ant-layout-main">
          <Spin spinning={this.state.loading} size="large">
            <Header userName={this.state.userName}/>
            <Breadcrumb {...this.props} />
            <div className="ant-layout-container">
              <div className="ant-layout-content">
                {this.state.loading ? '' : this.props.children}
              </div>
            </div>
            <Footer/>
          </Spin>
        </div>
      </div>
    )
  }
})

module.exports = App
