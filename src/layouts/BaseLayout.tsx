import React from 'react'
import { useLocation } from '@/hooks'
import { queryLayout } from '@/utils'
import { config } from '@/configs'
import { Outlet } from 'umi'
import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout/index'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

const BaseLayout: React.FC = (props) => {
  const location = useLocation()
  const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]
  return <Container><Outlet /></Container>
}

export default BaseLayout
