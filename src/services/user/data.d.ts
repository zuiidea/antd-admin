
export interface IUserItem {
    address: string
    age: number
    avatar: string
    createTime: string
    email: string
    id: string
    isMale: boolean
    name: string
    nickName: string
    phone: string
  }
  export interface IUserListResult {
    data: IUserItem[]
    total: number
  }
  
  export interface IQueryUserListParams {
    page?: number
    pageSize?: number
  }