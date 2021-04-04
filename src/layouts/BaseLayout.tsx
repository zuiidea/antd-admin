import React from 'react'
import { useLocation } from '@/hooks'
import { queryLayout } from '@/utils'
import { config } from '@/configs'
import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

const BaseLayout: React.FC = props => {
  const location = useLocation()
  const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]
  return <Container>{props.children}</Container>
}

export default BaseLayout
