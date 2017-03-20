import './index.html'
import 'babel-polyfill'
import createLoading from 'dva-loading'
import dva from 'dva'

// 1. Initialize
const app = dva(createLoading())

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
