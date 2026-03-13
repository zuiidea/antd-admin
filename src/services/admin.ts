/**
 * Admin 服务：封装关于管理员（admin）相关的后端 API 调用。
 *
 * 对 LLM 的说明：
 * - 导出函数均为对后端 REST 接口的轻量封装，返回值由 `src/utils/request.ts` 统一处理（JSON 解析与错误抛出）。
 * - 常用函数：`login`, `logout`, `currentAdmin`, `listAdmins`, `createAdmin`, `getAdmin`, `updateAdmin`, `deleteAdmin`, `deleteAdmins`。
 * - 参数与返回类型：尽量参考 `src/types/admin.ts` 中的 `Admin` / `AdminResponse` 定义以了解字段结构。
 *
 * 使用示例：
 * ```ts
 * const admin = await login({ adminname: 'root', password: 'pwd' });
 * const list = await listAdmins({ page: 1 });
 * ```
 */
import api from '../utils/request';

export async function login(values: { adminname: string; password: string }) {
  const payload = {
    username: values.adminname,
    password: values.password,
  };
  return api('/admin/login', { method: 'POST', body: payload });
}

export async function logout() {
  return api('/admin/logout');
}

export async function currentAdmin(): Promise<
  import('@/types/admin').Admin | undefined
> {
  return api('/admin');
}

export async function listAdmins(
  params?: Record<string, string | number | boolean>,
): Promise<{ data: import('@/types/admin').Admin[]; total?: number }> {
  return api<{ data: import('@/types/admin').Admin[]; total?: number }>(
    '/admins',
    { method: 'GET', params },
  );
}

export async function createAdmin(values: Record<string, unknown>) {
  return api('/admin', { method: 'POST', body: values });
}

export async function getAdmin(
  id: string,
): Promise<import('@/types/admin').Admin> {
  return api(`/admin/${id}`);
}

export async function updateAdmin(id: string, values: Record<string, unknown>) {
  return api(`/admin/${id}`, { method: 'PATCH', body: values });
}

export async function deleteAdmin(id: string) {
  return api(`/admin/${id}`, { method: 'DELETE' });
}

export async function deleteAdmins(ids: string[]) {
  return api('/admins/delete', { method: 'POST', body: { ids } });
}

export default {
  login,
  logout,
  currentAdmin,
  listAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  deleteAdmins,
};
