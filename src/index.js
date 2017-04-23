import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import 'babel-polyfill';
import './index.html';


// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError(error) {
    message.error(error.message);
  },
});

// 2. Model
app.model(require('./models/app'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
