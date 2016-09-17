module.exports = {
  name: 'Ant Design 管理后台',
  footer: 'Ant Design Admin 版权所有 © 2016 由zuiidea支持',
  logoImg:'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  logoText:'Ant Design',
  debug: true,
  logLevel: 'debug',
  needLogin:false,

  api: {
    host: 'http://localhost',
    path: '/api',
    timeout: 15000,
  },

  login: {
    getCurrentUser: '/getCurrentUser',
    sso: '',
    validate: '/login',
    logout: '/logout',
  },

  /**
   * 是否要跨域请求
   *
   * @returns {boolean}
   */
  isCrossDomain: function () {
    if (this.api.host && this.api.host !== '') {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 是否单点登录
   *
   * @returns {boolean}
   */
  isSSO: function () {
    if (this.login.sso && this.login.sso !== '') {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 获得api请求的路径
   *
   * @returns {*}
   */
  getAPIPath: function () {
    if (this.tmpApiPath) { // 缓存
      return this.tmpApiPath;
    }

    const paths = [];

    // js的字符串处理真是麻烦
    if (this.isCrossDomain()) {
      // 去除结尾的'/'
      const tmp = this.api.host;
      let index = tmp.length - 1;
      // 如果超出指定的 index 范围，charAt返回一个空字符串
      while (tmp.charAt(index) === '/') {
        index--;
      }
      if (index < 0)
        paths.push('');
      else
        paths.push(tmp.substring(0, index + 1));
    } else {
      paths.push('');
    }

    if (this.api.path) {
      const tmp = this.api.path;
      let begin = 0;
      let end = tmp.length - 1;

      while (tmp.charAt(begin) === '/') {
        begin++;
      }
      while (tmp.charAt(end) === '/') {
        end--;
      }
      if (begin > end)
        paths.push('');
      else
        paths.push(tmp.substring(begin, end + 1));
    } else {
      paths.push('');
    }

    const tmpApiPath = paths.join('/');
    this.tmpApiPath = tmpApiPath;
    return tmpApiPath;
  },
};
