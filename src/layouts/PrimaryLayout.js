/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout, ScrollBar } from 'components'
import { BackTop, Layout, Drawer } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { config, pathMatchRegexp } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'

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
    const { user, theme, routeList, permissions, collapsed } = app
    const { isMobile } = this.state
    const { onCollapseChange } = this

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
      menus,
      collapsed,
      onCollapseChange,
      avatar: user.avatar,
      username: user.username,
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
      <Fragment>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              visible={!collapsed}
              placement="left"
              width={200}
              style={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : (
            <Sider {...siderProps} />
          )}
          <div className={styles.container} id="primaryLayout">
            <ScrollBar
              option={{
                // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
                suppressScrollX: true,
              }}
            >
              <Header {...headerProps} />
              <Content className={styles.content}>
                <Bread routeList={routeList} />
                {hasPermission ? children : <Error />}
              </Content>
              <BackTop
                className={styles.backTop}
                target={() => document.querySelector('#primaryLayout>div')}
              />
              <GlobalFooter
                className={styles.footer}
                copyright={config.copyright}
              />
            </ScrollBar>
          </div>
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
