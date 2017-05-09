import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Switch } from 'antd'
import classnames from 'classnames'
import { config } from '../../utils'
import Menus from './Menu'
import Bread from './Bread'
import styles from './Main.less'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const { prefix } = config

const Main = ({ children, location, dispatch, app, menu }) => {
    const { user, siderFold, darkTheme, navOpenKeys } = app
    const changeOpenKeys = (openKeys) => {
        localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
        dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }

    const changeTheme = () => dispatch({ type: 'app/switchTheme' })
    const switchSider = () => dispatch({ type: 'app/switchSider' })

    const handleClickMenu = e => e.key === 'logout' && dispatch({ type: 'app/logout' })

    const menusProps = {
        menu,
        siderFold,
        darkTheme,
        location,
        navOpenKeys,
        changeOpenKeys,
    }

    return (
        <Layout className={styles.layout}>
            <Sider
                collapsible
                collapsed={siderFold}
                className={classnames(styles.sider, { [styles.light]: !darkTheme })}
            >
                <div className={styles.logo}>
                    <img alt={'logo'} src={config.logo} />
                    {siderFold ? '' : <span>{config.name}</span>}
                </div>
                <Menus {...menusProps} />
                {
                    !siderFold
                        ? <div className={styles.switchtheme}>
                            <span><Icon type="bulb" />切换主题</span>
                            <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
                        </div>
                        : undefined
                }
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    <div className={styles.siderbutton} onClick={switchSider}>
                        <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
                    </div>
                    <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
                        <SubMenu
                            style={{ float: 'right' }}
                            title={< span ><Icon type="user" />{user.username}</span>}
                        >
                            <Menu.Item key="logout">
                                <a>注销</a>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Bread {...{ menu, location }} />
                <Content className={styles.content}>
                    {children}
                </Content>
                <Footer className={styles.footer}>Ant Design Admin © 2017 zuiidea</Footer>
            </Layout>
        </Layout>
    );
}

export default Main