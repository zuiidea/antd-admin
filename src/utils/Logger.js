import globalConfig from '../config';

/**
 * 日志工具类 <br/>
 *
 * <p>
 * 工程变大之后, 日志就很重要了, 总不能一直console.log.
 * 本来想看看有没有现成的工具, 找到一个log4js的库, 但只能用在node环境下, 浏览器环境下似乎没什么好用的.
 * 作为一个用惯了slf4j的人, 干脆自己写个吧, 练练手.
 * 目前有以下功能:
 *   <ul>
 *       <li>支持常用的日志级别: debug/info/warn/error, 说实话其他的级别极少用到</li>
 *       <li>支持变量替换: 类似slf4j中的logger.info("a={}",a)这种, 其实console本身已经支持的</li>
 *       <li>根据日志级别设置样式: debug是黑色, info是默认, warn是黄色, error是红色, 看起来清晰很多</li>
 *       <li>定义每个logger的名字: 也算是常规功能了吧</li>
 *   </ul>
 * 我是尽量按着slf4j的习惯来设计的, 目前还比较简单.
 * 不支持pattern/appender之类的, 但对于二手前端来说, 也算够用了.
 * </p>
 */
class Logger {

  // 定义一些预设的日志级别
  // 目前只有4种级别

  static LOG_LEVEL_DEBUG = 1;
  static LOG_LEVEL_INFO = 2;
  static LOG_LEVEL_WARN = 3;
  static LOG_LEVEL_ERROR = 4;

  /*暂存所有logger*/
  static loggerMap = new Map();

  /*默认的logger*/
  static defaultLogger = new Logger();

  /**
   * 获取一个Logger实例
   *
   * @param name
   * @returns {*}
   */
  static getLogger(name) {
    if (name && name !== '') {
      // 缓存
      if (Logger.loggerMap.has(name)) {
        return Logger.loggerMap.get(name);
      }

      const logger = new Logger(name);
      Logger.loggerMap.set(name, logger);
      return logger;
    } else {
      return Logger.defaultLogger;
    }
  }

  constructor(name) {
    this.name = name;  // logger的名字
    const configLogLevel = globalConfig.logLevel;

    if (configLogLevel === 'debug') {
      this.logLevel = Logger.LOG_LEVEL_DEBUG;
    } else if (configLogLevel === 'info') {
      this.logLevel = Logger.LOG_LEVEL_INFO;
    } else if (configLogLevel === 'warn') {
      this.logLevel = Logger.LOG_LEVEL_WARN;
    } else if (configLogLevel === 'error') {
      this.logLevel = Logger.LOG_LEVEL_ERROR;
    } else {
      // 默认都是info级别
      this.error('unsupported logLevel: %s, use INFO instead', configLogLevel);
      this.logLevel = Logger.LOG_LEVEL_INFO;
    }
  }

  /**
   * 设置日志级别, 只有4种级别可选
   *
   * @param newLogLevel 1~4之间的一个数字
   */
  setLogLevel(newLogLevel) {
    if (isNaN(newLogLevel)) {
      this.error('setLogLevel error, not a number: %s', newLogLevel);
    }

    if (newLogLevel < 1 || newLogLevel > 4) {
      this.error('setLogLevel error, input = %s, must between 1 and 4', newLogLevel);
    }

    this.logLevel = newLogLevel;
  }

  /**
   * 打印info日志
   *
   * @param pattern 日志格式, 支持%d/%s等占位符
   * @param args 可变参数, 用于替换pattern中的占位符
   */
  info(pattern, ...args) {
    // 先判断日志级别
    if (this.logLevel > Logger.LOG_LEVEL_INFO)
      return;

    if (this.name)
      args.unshift(`${this.name}: ${pattern}`);
    else
      args.unshift(pattern);
    console.log.apply(console, args);
  }

  /**
   * 打印error日志
   *
   * @param pattern
   * @param args
   */
  error(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_ERROR)
      return;

    args.unshift('background: red; color: #bada55;');
    if (this.name)
      args.unshift(`%c${this.name}: ${pattern}`);
    else
      args.unshift(`%c${pattern}`);
    console.error.apply(console, args);
  }

  /**
   * 打印debug日志
   *
   * @param pattern
   * @param args
   */
  debug(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_DEBUG)
      return;

    args.unshift('background: black; color: #bada55;');
    if (this.name)
      args.unshift(`%c${this.name}: ${pattern}`);
    else
      args.unshift(`%c${pattern}`);
    console.debug.apply(console, args);

  }

  /**
   * 打印warn日志
   *
   * @param pattern
   * @param args
   */
  warn(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_WARN)
      return;

    args.unshift('background: yellow; color: black;');
    if (this.name)
      args.unshift(`%c${this.name}: ${pattern}`);
    else
      args.unshift(`%c${pattern}`);
    console.warn.apply(console, args);
  }
}

export default Logger;
