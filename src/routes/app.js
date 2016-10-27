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

function App({children, location, dispatch,app}) {
  const {login, loading,loginButtonLoading} = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({
        type: 'app/login',
        payload: data,
      })
    },
  }

  return (
    <div>{login
        ? <div className={styles.layout}>
            <aside className={styles.sider}>
              <Sider/>
            </aside>
            <div className={styles.main}>
              <Header location={location}/>
              <Bread location={location}/>
              <div className={styles.container}>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
              <Footer/>
            </div>
          </div>
        : <Login {...loginProps}/>}</div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading:PropTypes.object,
  login: PropTypes.object,
}

function mapStateToProps({app}) {
  return {app}
}

export default connect(mapStateToProps)(App)
