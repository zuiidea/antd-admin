import config from '../config'

class Logger {

  static LOG_LEVEL_DEBUG = 1
  static LOG_LEVEL_INFO = 2
  static LOG_LEVEL_WARN = 3
  static LOG_LEVEL_ERROR = 4

  static loggerMap = new Map()

  static defaultLogger = new Logger()

  static getLogger(name) {
    if (name && name !== '') {
      if (Logger.loggerMap.has(name)) {
        return Logger.loggerMap.get(name)
      }
      const logger = new Logger(name)
      Logger.loggerMap.set(name, logger)
      return logger
    } else {
      return Logger.defaultLogger
    }
  }

  constructor(name) {
    this.name = name
    const configLogLevel = config.logLevel

    if (configLogLevel === 'debug') {
      this.logLevel = Logger.LOG_LEVEL_DEBUG
    } else if (configLogLevel === 'info') {
      this.logLevel = Logger.LOG_LEVEL_INFO
    } else if (configLogLevel === 'warn') {
      this.logLevel = Logger.LOG_LEVEL_WARN
    } else if (configLogLevel === 'error') {
      this.logLevel = Logger.LOG_LEVEL_ERROR
    } else {
      this.error('unsupported logLevel: %s, use INFO instead', configLogLevel)
      this.logLevel = Logger.LOG_LEVEL_INFO
    }
  }

  setLogLevel(newLogLevel) {
    if (isNaN(newLogLevel)) {
      this.error('setLogLevel error, not a number: %s', newLogLevel)
    }
    if (newLogLevel < 1 || newLogLevel > 4) {
      this.error('setLogLevel error, input = %s, must between 1 and 4', newLogLevel)
    }
    this.logLevel = newLogLevel
  }

  info(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_INFO) {
      return
    }
    if (this.name) {
      args.unshift(`${this.name}: ${pattern}`)
    } else {
      args.unshift(pattern)
      console.log.apply(console, args)
    }
  }

  error(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_ERROR) {
      return
    }
    args.unshift('background: red color: #bada55')
    if (this.name) {
      args.unshift(`%c${this.name}: ${pattern}`)
    } else {
      args.unshift(`%c${pattern}`)
      console.error.apply(console, args)
    }
  }

  debug(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_DEBUG) {
      return
    }
    args.unshift('background: black color: #bada55')
    if (this.name) {
      args.unshift(`%c${this.name}: ${pattern}`)
    } else {
      args.unshift(`%c${pattern}`)
      console.debug.apply(console, args)
    }
  }

  warn(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_WARN) {
      return
    }
    args.unshift('background: yellow color: black')
    if (this.name) {
      args.unshift(`%c${this.name}: ${pattern}`)
    } else {
      args.unshift(`%c${pattern}`)
      console.warn.apply(console, args)
    }
  }
}

export default Logger
