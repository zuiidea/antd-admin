import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from './login'
import { Layout } from '../components'
import { Spin } from 'antd'
import { classnames, config } from '../utils'
import { Helmet } from 'react-helmet'
import '../components/skin.less'

const { Header, Bread, Footer, Sider, styles } = Layout

const App = ({ children, location, dispatch, app, loading }) => {
  const { login, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk (data) {
      dispatch({ type: 'app/login', payload: data })
    },
  }

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  return (
    <div>
      <Helmet>
        <title>ANTD ADMIN</title>
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
        {config.iconFontUrl ? <script src={config.iconFontUrl}></script> : ''}
      </Helmet>
      {login
        ? <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
          {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div> :
        <div className={styles.spin}>
          <Spin tip="加载用户信息..." spinning={loading} size="large">
            <Login {...loginProps} />
          </Spin>
        </div>}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App)
