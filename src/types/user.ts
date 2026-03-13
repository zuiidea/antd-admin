export type User = {
  id: number | string;
  name?: string;
  nickName?: string;
  phone?: string;
  age?: number;
  bio?: string;
  email?: string;
  address?: string;
  isMale?: boolean;
  createTime?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive';
};

export type PagedResponse<T> = {
  data: T[];
  total?: number;
};
