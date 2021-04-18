import user, { TUserAPI } from '@/services/user'
import createService, { TService } from '@/utils/createService'

const APIs = {
  ...user,
}

type RecordService<T> = {
  [P in keyof T]: TService
}
type TAPIService = RecordService<TUserAPI>
const APIService = {} as TAPIService
for (const key in APIs) {
  APIService[key] = createService(APIs[key])
}

export const {
  logoutUser,
  queryUser,
  updateUser,
  createUser,
  removeUser,
  removeUserList,
} = APIService

export interface IUserInfo {
  avatar: string
  id: number
  username: string
  permissions: {
    role?: string
    visit?: string[]
  }
}

export const queryUserInfo = createService<IUserInfo>(user.queryUserInfo)

export interface ILoginUserParams {
  password: string
  username: string
}

export const loginUser = createService<any, ILoginUserParams>(user.loginUser)

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
  list: IUserItem[]
  total: number
}

export interface IQueryUserListParams {
  page?: number
  pageSize?: number
}

export const queryUserList = createService<
  IUserListResult,
  IQueryUserListParams
>(user.queryUserList)
