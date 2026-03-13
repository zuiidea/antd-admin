import * as userSvc from '../../src/services/user';

export const meta = {
  id: 'user:manage',
  name: 'User Management',
  description: '用户列表/分页、创建、获取、更新、删除与批量删除',
  inputs: {
    listUsers: { params: 'object | undefined' },
    createUser: { values: 'object' },
    getUser: { id: 'string' },
    updateUser: { id: 'string', values: 'object' },
    deleteUser: { id: 'string' },
    deleteUsers: { ids: 'string[]' },
  },
  outputs: 'JSON (see src/types/user.ts for schema)',
};

export const actions = {
  async listUsers(params?: Record<string, string | number | boolean>) {
    return userSvc.listUsers(params as any);
  },
  async createUser(values: Record<string, unknown>) {
    return userSvc.createUser(values);
  },
  async getUser(id: string) {
    return userSvc.getUser(id);
  },
  async updateUser(id: string, values: Record<string, unknown>) {
    return userSvc.updateUser(id, values);
  },
  async deleteUser(id: string) {
    return userSvc.deleteUser(id);
  },
  async deleteUsers(ids: string[]) {
    return userSvc.deleteUsers(ids);
  },
};

export default { meta, actions };
