import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

const app = dva({
  history: window.g_history,
});
window.g_app = app;
app.use(createLoading());

app.model({ ...(require('E:/antd-admin/src/models/app.js').default) });
app.model({ ...(require('E:/antd-admin/src/models/dashboard.js').default) });
app.model({ ...(require('E:/antd-admin/src/models/login.js').default) });
app.model({ ...(require('E:/antd-admin/src/models/post.js').default) });
app.model({ ...(require('E:/antd-admin/src/models/user.js').default) });
app.model({ ...(require('E:/antd-admin/src/models/user/detail.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
