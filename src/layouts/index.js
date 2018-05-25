import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import withRouter from 'umi/withRouter'
import App from './app'

export default withRouter((props) => {
  return (
    <LocaleProvider locale={enUS}>
      <App>
        { props.children }
      </App>
    </LocaleProvider>
  )
})
