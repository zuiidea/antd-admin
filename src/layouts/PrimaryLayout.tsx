import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import ProBasicLayout, {
  getMenuData,
  MenuDataItem,
  SettingDrawerProps,
} from '@ant-design/pro-layout'
import { Link } from 'umi'
import { Dropdown, Menu, Avatar } from 'antd'
import { useLocation } from '@/hooks'
import { ConfigContext } from '@/utils/context'
import { menus, menuIcon, language, languages, config } from '@/configs'
import defaultSettings from '@/defaultSettings'
import { ISupportedLocales } from '@/typings'
import type { MenuProps } from 'antd/es/menu'
import styles from './index.less'

const renderMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && menuIcon[icon as string],
    children: children && renderMenuItem(children),
  }))

const PrimaryLayout: React.FC = (props) => {
  const location = useLocation()
  const [settings] = useState<SettingDrawerProps['settings']>(defaultSettings)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/'])
  const { pathname } = location
  const { breadcrumbMap, menuData } = useMemo(() => getMenuData(menus), [])
  const { language: locale, setLanguage } = useContext(ConfigContext)
  const currentLanguage = language[locale]

  useEffect(() => {
    const select = breadcrumbMap.get(pathname)
    if (select) {
      setOpenKeys((select as MenuDataItem)['pro_layout_parentKeys'])
      setSelectedKeys([(select as MenuDataItem)['key'] as string])
    }
  }, [breadcrumbMap, pathname])

  const menuDataRender = useCallback(() => renderMenuItem(menuData), [menuData])

  const menuItemRender = useCallback((menuItemProps, defaultDom) => {
    if (menuItemProps.isUrl || !menuItemProps.path) {
      return defaultDom
    }
    return <Link to={menuItemProps.path}>{defaultDom}</Link>
  }, [])

  const handleOnOpenChange = useCallback(
    (keys) => setOpenKeys(keys as string[]),
    []
  )

  const menuProps = useMemo<MenuProps>(
    () => ({
      selectedKeys,
      openKeys,
      onOpenChange: handleOnOpenChange,
    }),
    [handleOnOpenChange, openKeys, selectedKeys]
  )

  const rightContentRender = () => (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[currentLanguage.value]}
          onClick={(data) => {
            setLanguage(data.key as ISupportedLocales)
          }}
        >
          {languages.map((item) => (
            <Menu.Item key={item.key}>
              <Avatar size="small" style={{ marginRight: 8 }} src={item.flag} />
              {item.value}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <div className={styles.headerButton}>
        <Avatar size="small" src={currentLanguage.flag} />
      </div>
    </Dropdown>
  )

  return (
    <>
      <ProBasicLayout
        {...settings}
        title={config.title}
        logo={config.logo}
        menuDataRender={menuDataRender}
        menuItemRender={menuItemRender}
        menuProps={menuProps}
        rightContentRender={rightContentRender}
      >
        {props.children}
      </ProBasicLayout>
    </>
  )
}

export default PrimaryLayout
