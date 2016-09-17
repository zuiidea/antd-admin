import config from 'config'
import Logger from './logger'
import reqwest from 'reqwest'
import './lib.less'

function ajax(data){
  if(config.debug){
    console.log(data);
  }else {
    reqwest(data)
  }
}

module.exports = {
  config,
  ajax,
  Logger
}
