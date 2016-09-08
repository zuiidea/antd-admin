import React from 'react';
import ReactDOM from 'react-dom';
import globalConfig from 'config';
import ajax from '../../utils/ajax';
import Logger from '../../utils/Logger';
import {message} from 'antd';
import './index.less';

const logger = Logger.getLogger('Login');

/**
 * 定义Login组件
 */
class Login extends React.Component {

  // 这个login组件是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
  // 不是react风格...
  // TODO: 以后要把这个login组件改掉

  handleSubmit = (e) => {
    e.preventDefault();  // 这个很重要, 防止跳转
    const hide = message.loading('正在验证...', 0);

    const username = ReactDOM.findDOMNode(this.refs.user).value;
    const password = ReactDOM.findDOMNode(this.refs.pass).value;
    logger.debug('username = %s, password = %s', username, password);

    const button = ReactDOM.findDOMNode(this.refs.button);
    button.setAttribute('disabled', 'true');  // 暂时屏蔽提交按钮, 防止用户重复点击

    // 服务端验证
    ajax.post(`${globalConfig.getAPIPath()}${globalConfig.login.validate}`).type('form').send({
      username,
      password,
    }).end((err, res) => {
      hide();
      logger.debug('login validate return: error %o result %o', err, res);

      if (ajax.isSuccess(res)) {
        // 如果登录成功, 调用回调函数, 把状态往上层组件传
        if (this.props.loginSuccess)
          this.props.loginSuccess(res.body.data, true);
        else
          message.info(`登录成功, 用户名: ${res.body.data}`);
      } else {
        message.error(`登录失败: ${res.body.message}, 请联系管理员`);
        button.removeAttribute('disabled');  // 登录失败的话, 重新让按钮可用, 让用户重新登录
      }
    });
  }

  componentWillMount() {
    logger.debug('mount and add styles');
    document.body.style.background = null;
  }

  componentWillUnmount() {
    logger.debug('unmount and clear styles');
    // 组件unmount时设置下样式, 不然其他组件的显示会有问题
    // TODO: 不知道有没有更好的办法
    document.body.style.background = 'white';
  }

  render() {
    return (
      <div>
        {/*debug模式下显示fork me on github*/}
        {globalConfig.debug &&
        <a href="https://github.com/jiangxy/react-antd-admin">
          <img style={{position: 'absolute', top: 0, right: 0, border: 0}}
               src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
               alt="Fork me on GitHub"
               data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
        </a>}

        <div className="login">
          <h1>{globalConfig.name}</h1>
          <form onSubmit={this.handleSubmit}>
            <input className="login-input" type="text" ref="user" name="u" placeholder="用户名" required="required"/>
            <input className="login-input" type="password" ref="pass" name="p" placeholder="密码" required="required"/>
            <button ref="button" type="submit" className="btn btn-primary btn-block btn-large">登录</button>
          </form>
        </div>

      </div>
    );
  }

}

export default Login;
