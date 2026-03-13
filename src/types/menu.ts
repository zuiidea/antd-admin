export type MenuStatus = 0 | 1;

export type MenuItem = {
  id: number;
  title: string;
  icon?: string;
  route: string;
  status: MenuStatus;
  parentId: number | null;
  privilege: string[];
  remark?: string;
  sort: number;
  children?: MenuItem[];
};

export type MenuFormValues = {
  title: string;
  icon?: string;
  route: string;
  status: MenuStatus;
  parentId: number | null;
  privilege: string[];
  remark?: string;
  sort: number;
};
