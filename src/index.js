import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import { browserHistory } from 'dva/router'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError (error) {
    console.error('app onError -- ', error)
  }
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
