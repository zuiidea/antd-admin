/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { config, pathMatchRegexp } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'

const { Content } = Layout
const { Header, Bread } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  render() {
    const { app, location, dispatch, children } = this.props
    const { user, theme, routeList, permissions, collapsed } = app

    // Find a route that matches the pathname.
    const currentRoute = routeList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false

    // MenuParentId is equal to -1 is not a available menu.
    const menus = routeList.filter(_ => _.menuParentId !== '-1')

    const headerProps = {
      user,
      menus,
      collapsed,
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
      onCollapseChange(collapsed) {
        dispatch({
          type: 'app/handleCollapseChange',
          payload: collapsed,
        })
      },
    }

    const siderProps = {
      menus,
      theme,
      collapsed,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
      onCollapseChange(collapsed) {
        dispatch({
          type: 'app/handleCollapseChange',
          payload: collapsed,
        })
      },
    }

    return (
      <Fragment>
        <Layout>
          <MyLayout.Sider {...siderProps} />
          <Layout
            style={{ height: '100vh', overflow: 'scroll' }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread routeList={routeList} />
              {hasPermission ? children : <Error />}
            </Content>
            <BackTop
              className={styles.backTop}
              target={() => document.getElementById('primaryLayout')}
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
