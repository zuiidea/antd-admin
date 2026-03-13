/**
 * Menu 服务：菜单相关的后端 API 封装。
 *
 * 对 LLM 的说明：
 * - 提供列表、创建、更新、删除、排序等基本操作的封装函数。
 * - 返回值与参数类型参见 `src/types/menu.ts` 中的 `MenuItem` 与 `MenuFormValues`。
 */
import type { MenuFormValues, MenuItem } from '../types/menu';
import api from '../utils/request';

export async function listMenus(): Promise<MenuItem[]> {
  return api<MenuItem[]>('/menus');
}

export async function createMenu(values: MenuFormValues) {
  return api<MenuItem>('/menu', { method: 'POST', body: values });
}

export async function updateMenu(
  id: number | string,
  values: Partial<MenuFormValues>,
) {
  return api<MenuItem>(`/menu/${id}`, { method: 'PATCH', body: values });
}

export async function deleteMenu(id: number | string) {
  return api('/menu/delete', { method: 'POST', body: { id } });
}

export async function sortMenus(order: Array<number | string>) {
  return api('/menu/sort', { method: 'POST', body: { order } });
}

export default { listMenus, createMenu, updateMenu, deleteMenu, sortMenus };
