import React, {PropTypes} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import Login from './login'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import '../components/layout/common.less'
import {Spin,message} from 'antd'
function App({children, location, dispatch, app}) {
  const {login, loading, loginButtonLoading, user} = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({type: 'app/login', payload: data})
    }
  }

  const headerProps = {
    user,
    location,
    logout() {
      dispatch({type: 'app/logout'})
    }
  }

  return (
    <div>{login
        ? <div className={styles.layout}>
            <aside className={styles.sider}>
              <Sider/>
            </aside>
            <div className={styles.main}>
              <Header {...headerProps}/>
              <Bread location={location}/>
              <div className={styles.container}>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
              <Footer/>
            </div>
          </div>
        : <Spin tip="加载用户信息..." className={styles.spin} spinning={loading} size="large"><Login {...loginProps}/></Spin>}</div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  user: PropTypes.object
}

function mapStateToProps({app}) {
  return {app}
}

export default connect(mapStateToProps)(App)
