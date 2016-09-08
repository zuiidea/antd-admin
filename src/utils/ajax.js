/**
 * 对superagent api的一个mock, 用于debug
 */

import Logger from './Logger';
import superagent from 'superagent';
import globalConfig from '../config';

// superagent的文档: http://visionmedia.github.io/superagent/#error-handling
// 常用的api形式: 只要mock这两种就可以了
// ajax.get(url).end(func(err,res))
// ajax.post(url).send(obj).end(func(err,res))

const logger = Logger.getLogger('mockAjax');

let currentUrl;  // 一个临时变量, 当前正在请求的url
const error = {};  // 理论上服务端不会返回error, 都是HTTP200
const result = {  // 暂存mock的ajax返回, 总共有5个字段
  success: true,
  code: 0,
  message: 'just a mock ;) ',
  total: 10000,
  data: {},
};

const successResult = (data) => {
  result.success = true;
  result.data = data;
  result.code = 0;
  result.message = '';
  result.total = 10000;
};

const errorResult = (code, message) => {
  result.success = false;
  result.data = {};
  result.code = code;
  result.message = message;
  result.total = 0;
};

// 从url中取出表名
const getTableNameFromUrl = (url) => {
  // url的格式是apiPath/{tableName}/[insert|update|delete]
  const apiPath = globalConfig.getAPIPath();
  let begin = apiPath.length + 1;
  while (url.charAt(begin) === '/') {
    begin++;
  }
  let end = begin;
  while (url.charAt(end) !== '/') {
    end++;
  }

  const tableName = url.substring(begin, end);
  logger.debug('getTableNameFromUrl: begin=%d, end=%d, tableName=%s', begin, end, tableName);

  return tableName;
};

// 根据某个表的dataSchema创造mock数据
const mockResult = (tableName, queryObj) => {
  logger.debug('begin to mock data for table %s', tableName);

  // 尝试加载schema文件
  let schema;
  try {
    schema = require(`../schema/${tableName}.dataSchema.js`);
  } catch (e) {
    logger.error('can not find dataSchema file for table %s', tableName);
    logger.error('%o', e);  // 这个方式有点不爽...但是如果不设置pattern, 就不能用样式了, 纠结...
    // 设置返回结果为失败
    errorResult(100, `can not find dataSchema file for table ${tableName}`);

    return;
  }

  // 一般来说, 传入的查询条件都是肯定会有page/pageSize的, 以防万一
  if (!queryObj.page) {
    queryObj.page = 1;
  }
  if (!queryObj.pageSize) {
    queryObj.pageSize = 50;
  }

  const tmp = [];
  for (let i = 0; i < queryObj.pageSize; i++) {
    const record = {};
    // 为了让mock的数据有些区别, 把page算进去
    schema.forEach((column)=> {
      if (column.dataType === 'int') {
        record[column.key] = 10000 * queryObj.page + i;
      } else if (column.dataType === 'float') {
        record[column.key] = 1.0 * queryObj.page + i * 0.01;
      } else if (column.dataType === 'varchar') {
        record[column.key] = `page=${queryObj.page} num=${i}`;
      } else if (column.dataType === 'datetime') {
        record[column.key] = new Date().plusDays(i).format('yyyy-MM-dd HH:mm:ss');
      } else {
        logger.error('unsupported dataType %s', column.dataType);
      }
    });
    tmp.push(record);
  }

  successResult(tmp);
};

// 开始mock supergent的各个方法

const end = (func) => {
  // 模拟一个延时
  // 总是感觉setTimeout有点low啊, 不知道有没有更好的办法
  setTimeout(func, 1500, null, {body: result});  // 延时执行func函数, 参数跟在最后
};

const get = (url) => {
  logger.debug('get url %s', url);
  currentUrl = url;

  // TODO: 要根据url返回不同的数据, 这里设置各种get的url
  if (url === `${globalConfig.getAPIPath()}${globalConfig.login.getCurrentUser}`)
    successResult('guest');  // debug模式下都是guest用户
  else
    errorResult(200, `unsupported url ${url}`);

  return {end};
};

const type = (str) => {
  logger.debug('set type = %s', str);
  return {send};
};

const send = (obj) => {
  logger.debug('send obj: %o', obj);

  // TODO: 要根据url返回不同的数据, 这里设置各种post的url
  if (currentUrl === `${globalConfig.getAPIPath()}${globalConfig.login.validate}`) {
    // 验证登录的用户名和密码
    if (obj.username === 'guest' && obj.password === 'guest') {
      successResult('guest');
    } else {
      errorResult(300, 'error username or password');
    }
  } else {
    // 如果不是登录请求, 目前只能是CRUD请求, 当然以后可能会扩展
    const tableName = getTableNameFromUrl(currentUrl);
    if (tableName) {
      // 要根据增删改查的情况分别模拟
      if (currentUrl.indexOf('select') > 0) {
        mockResult(tableName, obj);
      } else if (currentUrl.indexOf('insert') > 0) {
        mockResult(tableName, obj);
        const tmp = result.data[0];
        successResult(tmp);
      } else if (currentUrl.indexOf('update') > 0) {
        const tmp = currentUrl.indexOf('keys=');
        successResult(currentUrl.substring(tmp).split(',').length);
      } else {
        errorResult(400, `unsupported url ${currentUrl}`);
      }
    } else {
      errorResult(400, `unsupported url ${currentUrl}`);
    }
  }

  return {end};
};

const post = (url) => {
  logger.debug('post url %s', url);
  currentUrl = url;

  // TODO: 要根据url返回不同的数据, 这里设置各种post的url
  if (currentUrl.indexOf('delete') > 0) {
    const tmp = currentUrl.indexOf('keys=');
    successResult(currentUrl.substring(tmp).split(',').length);
  }

  return {send, type, end};
};

// 一个辅助的方法, superagent判断返回是否成功太麻烦了啊...要判断3个条件
const isSuccess = (res) => {
  if (res && res.body && res.body.success) {
    return true;
  } else {
    return false;
  }
};

// mock的版本只提供简单的API, 以后可能要扩展
const mockAjax = {get, post, isSuccess};

// 对superagent的API简单包装下
const realAjax = {
  get: function (url) {
    return this.innerConfig(superagent.get(url));
  },

  post: function (url) {
    return this.innerConfig(superagent.post(url));
  },

  // 一些全局的配置
  innerConfig: function (req) {
    let tmp = req;
    // 是否是跨域请求
    if (globalConfig.isCrossDomain()) {
      tmp = tmp.withCredentials();
    }
    // 设置全局的超时时间
    if (globalConfig.api.timeout && !isNaN(globalConfig.api.timeout)) {
      tmp = tmp.timeout(globalConfig.api.timeout);
    }
    return tmp;
  },

  isSuccess,
};

if (globalConfig.debug === true) {
  module.exports = mockAjax;
} else {
  module.exports = realAjax;
}
