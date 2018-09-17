/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { classnames, config, pathMatchRegexp } from 'utils'
import Error from '../pages/404'

const { Content, Sider } = Layout
const { Header, Bread, styles } = MyLayout
const { prefix } = config

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  render() {
    const { children, dispatch, app, location } = this.props
    const {
      user,
      siderFold,
      darkTheme,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      menuList,
      permissions,
    } = app
    let { pathname } = location
    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
    const current = menuList.filter(item =>
      pathMatchRegexp(item.route || '', pathname)
    )
    const hasPermission = current.length
      ? permissions.visit.includes(current[0].id)
      : false

    const headerProps = {
      menuList,
      user,
      location,
      siderFold,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      switchMenuPopover() {
        dispatch({ type: 'app/switchMenuPopver' })
      },
      logout() {
        dispatch({ type: 'app/logout' })
      },
      switchSider() {
        dispatch({ type: 'app/switchSider' })
      },
      changeOpenKeys(openKeys) {
        dispatch({
          type: 'app/handleNavOpenKeys',
          payload: { navOpenKeys: openKeys },
        })
      },
    }

    const siderProps = {
      menuList,
      location,
      siderFold,
      darkTheme,
      navOpenKeys,
      changeTheme() {
        dispatch({ type: 'app/switchTheme' })
      },
      changeOpenKeys(openKeys) {
        window.localStorage.setItem(
          `${prefix}navOpenKeys`,
          JSON.stringify(openKeys)
        )
        dispatch({
          type: 'app/handleNavOpenKeys',
          payload: { navOpenKeys: openKeys },
        })
      },
    }

    const breadProps = {
      menuList,
      location,
    }

    return (
      <Fragment>
        <Layout
          className={classnames({
            [styles.dark]: darkTheme,
            [styles.light]: !darkTheme,
          })}
        >
          {!isNavbar ? (
            <Sider trigger={null} collapsible collapsed={siderFold}>
              {siderProps.menuList.length === 0 ? null : (
                <MyLayout.Sider {...siderProps} />
              )}
            </Sider>
          ) : null}
          <Layout
            style={{ height: '100vh', overflow: 'scroll' }}
            id="PrimaryLayoutContainer"
          >
            <Header {...headerProps} />
            <Content>
              <Bread {...breadProps} />
              {hasPermission ? children : <Error />}
            </Content>
            <BackTop
              target={() => document.getElementById('PrimaryLayoutContainer')}
            />
            <GlobalFooter copyright={config.copyright} />
          </Layout>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
