import * as menuSvc from '../../src/services/menu';

export const meta = {
  id: 'menu:manage',
  name: 'Menu Management',
  description: '列出、创建、更新、删除与排序菜单项',
  inputs: {
    listMenus: {},
    createMenu: { values: 'MenuFormValues' },
    updateMenu: { id: 'number | string', values: 'Partial<MenuFormValues>' },
    deleteMenu: { id: 'number | string' },
    sortMenus: { order: 'Array<number | string>' },
  },
  outputs: 'JSON (see src/types/menu.ts for schema)',
};

export const actions = {
  async listMenus() {
    return menuSvc.listMenus();
  },
  async createMenu(values: any) {
    return menuSvc.createMenu(values);
  },
  async updateMenu(id: number | string, values: any) {
    return menuSvc.updateMenu(id, values);
  },
  async deleteMenu(id: number | string) {
    return menuSvc.deleteMenu(id);
  },
  async sortMenus(order: Array<number | string>) {
    return menuSvc.sortMenus(order);
  },
};

export default { meta, actions };
