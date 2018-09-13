import React, { PureComponent } from 'react'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import BaseLayout from './BaseLayout'

class Layout extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <BaseLayout>{this.props.children}</BaseLayout>
      </LocaleProvider>
    )
  }
}

export default Layout
