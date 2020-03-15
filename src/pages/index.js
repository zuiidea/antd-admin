import React, { PureComponent } from 'react'
import { Redirect, useIntl } from 'umi'

class Index extends PureComponent {
  render() {
    return <Redirect to={intl.formatMessage(
      {
        id: '/dashboard',
      }) } />
  }
}

export default Index
