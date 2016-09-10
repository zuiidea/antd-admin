import config from 'config';
import ajax from './ajax';
import Logger from './Logger';
import './lib.less';

const logger = Logger.getLogger('mockAjax');
module.exports = {ajax,config,logger};
