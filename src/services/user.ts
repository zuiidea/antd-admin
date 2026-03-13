/**
 * User 服务：用户相关的后端 API 封装。
 *
 * 对 LLM 的说明：
 * - 提供分页/列表查询、创建、查询单个、更新、删除、批量删除等操作。
 * - 返回类型建议参考 `src/types/user.ts` 中的 `User` 和 `PagedResponse`。
 */
import type { PagedResponse, User } from '@/types/user';
import api from '../utils/request';

export async function listUsers(
  params?: Record<string, string | number | boolean>,
): Promise<PagedResponse<User>> {
  return api<PagedResponse<User>>('/users', { method: 'GET', params });
}

export async function createUser(
  values: Record<string, unknown>,
): Promise<User> {
  return api('/user', { method: 'POST', body: values });
}

export async function getUser(id: string): Promise<User> {
  return api(`/user/${id}`);
}

export async function updateUser(
  id: string,
  values: Record<string, unknown>,
): Promise<User> {
  return api(`/user/${id}`, { method: 'PATCH', body: values });
}

export async function deleteUser(id: string) {
  return api(`/user/${id}`, { method: 'DELETE' });
}

export async function deleteUsers(ids: string[]) {
  return api('/users/delete', { method: 'POST', body: { ids } });
}

export default {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteUsers,
};
