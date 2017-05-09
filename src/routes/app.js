import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from '../components'
import { config, menu } from '../utils'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import './app.less'
import NProgress from 'nprogress'


const { Main } = Layout

const App = ({ children, location, dispatch, app, loading }) => {
  // const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app

  NProgress.start()
  !loading.global && NProgress.done()

  // const headerProps = {
  //   menu,
  //   user,
  //   siderFold,
  //   location,
  //   isNavbar,
  //   menuPopoverVisible,
  //   navOpenKeys,
  //   switchMenuPopover() {
  //     dispatch({ type: 'app/switchMenuPopver' })
  //   },
  //   logout() {
  //     dispatch({ type: 'app/logout' })
  //   },
  //   switchSider() {
  //     dispatch({ type: 'app/switchSider' })
  //   },
  //   changeOpenKeys(openKeys) {
  //     dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
  //   },
  // }

  // const siderProps = {
  //   menu,
  //   siderFold,
  //   darkTheme,
  //   location,
  //   navOpenKeys,
  //   changeTheme() {
  //     dispatch({ type: 'app/switchTheme' })
  //   },
  //   changeOpenKeys(openKeys) {
  //     localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
  //     dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
  //   },
  // }

  // const breadProps = {
  //   menu,
  // }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }

  return (
    <div>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
        {config.iconFontUrl ? <script src={config.iconFontUrl}></script> : ''}
      </Helmet>
      <Main {...{ children, location, dispatch, app, menu }} />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)