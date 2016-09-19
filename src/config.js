module.exports = {
  name: 'Ant Design 管理后台',
  footer: 'Ant Design Admin 版权所有 © 2016 由 zuiidea 支持',
  logoImg:'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  logoText:'Ant Design',
  debug: true,
  logLevel: 'debug',
  needLogin:true,

  api: {
    host: 'http://localhost:8080',
    path: '/api',
    timeout: 15000,
  },

  user: {
    info: '/getInfo',
    signIn: '/signIn',
    signOut:'/signOut',
  },
};
