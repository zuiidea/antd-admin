export type Admin = {
  id: number;
  username?: string;
  real_name?: string;
  nick_name?: string;
  mobile?: string;
  avatar?: string;
  department?: string;
  role?: string;
  status?: number;
  permissions?: string[] | string;
  remark?: string;
};

/** 现已约定后端统一返回 data 字段，调用方直接接收 data */
export type AdminResponse = Admin | undefined;
