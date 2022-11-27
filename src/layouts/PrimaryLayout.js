/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { connect } from 'umi'
import { MyLayout, GlobalFooter } from 'components'
import { Drawer, FloatButton, Layout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js'
const { pathToRegexp } = require("path-to-regexp")
import { config, getLocale } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'
import store from 'store'

const { Content } = Layout
const { Header, Bread, Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, location, dispatch, children } = this.props
    const { theme, collapsed, notifications } = app
    const user = store.get('user') || {}
    const permissions = store.get('permissions') || {}
    const routeList = store.get('routeList') || []
    const { isMobile } = this.state
    const { onCollapseChange } = this

    // Localized route name.

    const lang = getLocale()
    const newRouteList =
      lang !== 'en'
        ? routeList.map(item => {
            const { name, ...other } = item
            return {
              ...other,
              name: (item[lang] || {}).name || name,
            }
          })
        : routeList

    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathToRegexp(_.route).exec(location.pathname)
    )

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')

    const headerProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      avatar: user.avatar,
      username: user.username,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }

    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    return (
      (<Fragment>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              open={!collapsed}
              placement="left"
              width={200}
              rootStyle={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : (
            <Sider {...siderProps} />
          )}
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread routeList={newRouteList} />
              {hasPermission ? children : <Error />}
            </Content>
            <FloatButton.BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
          </div>
        </Layout>
      </Fragment>)
    );
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
