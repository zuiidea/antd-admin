import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ProBasicLayout, {
  getMenuData,
  MenuDataItem,
  SettingDrawerProps,
} from '@ant-design/pro-layout'
import { Link, Outlet } from 'umi'
import { useLocation } from '@/hooks'
import { menus, menuIcon, config } from '@/configs'
import defaultSettings from '@/defaultSettings'
import type { MenuProps } from 'antd/es/menu'
import HeaderRightContent from './HeaderRightContent'

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

  return (
    <>
      <ProBasicLayout
        {...settings}
        title={config.title}
        logo={config.logo}
        menuDataRender={menuDataRender}
        menuItemRender={menuItemRender}
        menuProps={menuProps}
        rightContentRender={() => <HeaderRightContent />}
      >
        <Outlet />
      </ProBasicLayout>
    </>
  )
}

export default PrimaryLayout
