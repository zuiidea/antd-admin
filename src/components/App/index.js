import React from 'react';
import {Spin, message} from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Login from '../Login';
import Breadcrumb from '../Breadcrumb';
import './index.less';
import globalConfig from 'config.js';
import ajax from '../../utils/ajax';
import Logger from '../../utils/Logger';

const logger = Logger.getLogger('App');

/**
 * App组件
 * 定义整个页面的布局
 */
class App extends React.Component {

  // 全局的状态
  state = {
    loading: true,  // 是否在loading状态
    login: false,  // 是否登录
    userName: '未登录',  // 登录后的用户名
  };

  componentWillMount() {
    logger.debug('mount and add styles');
    // 为了兼容登录组件
    document.body.style.background = 'white';  // FIXME: gross hack
  }

  componentDidMount() {
    if (!this.state.login) {
      const hide = message.loading('正在获取用户信息...', 0);

      // 先去服务端验证下, 说不定已经登录了
      ajax.get(`${globalConfig.getAPIPath()}${globalConfig.login.getCurrentUser}`).end((err, res) => {

        // 注意这里, debug模式下每次刷新都必须重新登录
        if (ajax.isSuccess(res) && !globalConfig.debug) {
          hide();
          this.loginSuccess(res.body.data);
        } else {
          // 如果服务端说没有登录, 就要跳转到sso或者登录界面
          if (globalConfig.isSSO()) {
            // debug模式不支持调试单点登录
            // 因为没有单点登录的地址啊...跳不回来
            hide();
            logger.debug('not login, redirect to SSO login page');
            const redirect = encodeURIComponent(window.location.href);
            window.location.href = `${globalConfig.login.sso}${redirect}`;
          } else {
            hide();
            message.error('获取用户信息失败, 请重新登录');
            logger.debug('not login, redirect to Login component');
            this.setState({loading: false, login: false});
          }
        }
      });
    }
  }

  // 登录成功后的回调
  loginSuccess = (name, showMsg) => {
    logger.debug('callback logingSuccess, name = %s', name);
    if (showMsg)
      message.success('登录成功');
    document.body.style.background = 'white';  // FIXME: gross hack
    this.setState({loading: false, login: true, userName: name});
  }

  render() {
    // 显示一个加载中
    if (this.state.loading) {
      return <div className="center-div"><Spin spinning={this.state.loading} size="large"/></div>;
    }

    // 跳转到登录界面
    if (!this.state.login) {
      return <Login loginSuccess={this.loginSuccess}/>;
    }

    return (
      <div className="ant-layout-aside">
        {/*整个页面被一个ant-layout-aside的div包围, 分为sidebar/header/footer/content等几部分*/}
        <Sidebar />

        <div id="main-content-div" className="ant-layout-main">

          <Spin spinning={this.state.loading} size="large">
            <Header userName={this.state.userName}/>
            <Breadcrumb {...this.props} />

            {/*TODO: 这里要组件化*/}
            <div className="ant-layout-container">
              <div className="ant-layout-content">
                {this.state.loading ? '' : this.props.children}
              </div>
            </div>

            <Footer />
          </Spin>

        </div>
      </div>
    );
  }
}

export default App;
