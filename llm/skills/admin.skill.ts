import * as adminSvc from '../../src/services/admin';

/**
 * Skill 元数据与封装 — Admin
 * 目的：为自动化代理或 LLM 提供明确的能力描述与可直接调用的包装函数。
 */
export const meta = {
  id: 'admin:manage',
  name: 'Admin Management',
  description: '登录/登出、获取当前管理员、管理管理员列表（增删改查）',
  inputs: {
    login: { adminname: 'string', password: 'string' },
    getAdmin: { id: 'string' },
    createAdmin: { values: 'object' },
    updateAdmin: { id: 'string', values: 'object' },
    deleteAdmin: { id: 'string' },
    deleteAdmins: { ids: 'string[]' },
    listAdmins: { params: 'object | undefined' },
  },
  outputs: 'JSON (see src/types/admin.ts for schema)',
};

export const actions = {
  async login(payload: { adminname: string; password: string }) {
    return adminSvc.login(payload);
  },
  async logout() {
    return adminSvc.logout();
  },
  async currentAdmin() {
    return adminSvc.currentAdmin();
  },
  async listAdmins(params?: Record<string, string | number | boolean>) {
    return adminSvc.listAdmins(params as any);
  },
  async createAdmin(values: Record<string, unknown>) {
    return adminSvc.createAdmin(values);
  },
  async getAdmin(id: string) {
    return adminSvc.getAdmin(id);
  },
  async updateAdmin(id: string, values: Record<string, unknown>) {
    return adminSvc.updateAdmin(id, values);
  },
  async deleteAdmin(id: string) {
    return adminSvc.deleteAdmin(id);
  },
  async deleteAdmins(ids: string[]) {
    return adminSvc.deleteAdmins(ids);
  },
};

export default { meta, actions };
