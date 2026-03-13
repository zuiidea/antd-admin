import * as dashSvc from '../../src/services/dashboard';

export const meta = {
  id: 'dashboard:view',
  name: 'Dashboard View',
  description: '获取仪表盘汇总数据',
  inputs: {},
  outputs: 'JSON summary data from /dashboard',
};

export const actions = {
  async getDashboard() {
    return dashSvc.getDashboard();
  },
};

export default { meta, actions };
