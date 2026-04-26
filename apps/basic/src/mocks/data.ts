import type { MenuItem, User } from "@/api/schemas";
import { APP_MENU_TREE } from "@/utils/appMenu";
import { vercelAvatarUrl } from "./utils";

const ADMIN_PERMISSIONS = [
  "user:view",
  "user:create",
  "user:edit",
  "user:delete",
  "admin:view",
  "admin:create",
  "admin:edit",
  "admin:delete",
];
const EDITOR_PERMISSIONS = ["user:view"];

export interface MockAuthUser extends User {
  password: string;
}

function permissionsFromRoles(roles: string[]): string[] {
  return roles.includes("admin") ? [...ADMIN_PERMISSIONS] : [...EDITOR_PERMISSIONS];
}

function uniquePermissions(permissions: string[]): string[] {
  return [...new Set(permissions)];
}

function createMockAuthUser(seed: {
  id: string;
  username: string;
  password: string;
  email: string | null;
  roles: string[];
  realName?: string | null;
  nickName?: string | null;
  mobile?: string | null;
  department?: string | null;
  role?: string | null;
  status?: number;
  remark?: string | null;
  createdBy?: string | null;
}): MockAuthUser {
  return {
    id: seed.id,
    username: seed.username,
    password: seed.password,
    avatar: vercelAvatarUrl(seed.username),
    email: seed.email,
    roles: seed.roles,
    permissions: permissionsFromRoles(seed.roles),
    realName: seed.realName ?? null,
    nickName: seed.nickName ?? null,
    mobile: seed.mobile ?? null,
    department: seed.department ?? null,
    role: seed.role ?? null,
    status: seed.status ?? 1,
    remark: seed.remark ?? null,
    lastLogin: null,
    createdBy: seed.createdBy ?? "system",
  };
}

const authUsers: MockAuthUser[] = [
  createMockAuthUser({
    id: "1",
    username: "admin",
    password: "admin",
    email: "ops.admin@northstar.io",
    roles: ["admin"],
    realName: "Li Si",
    nickName: "Super Admin",
    mobile: "13800000000",
    department: "Operations",
    role: "Administrator",
    remark: "Full access account",
  }),
  createMockAuthUser({
    id: "2",
    username: "guest",
    password: "guest",
    email: "guest@northstar.io",
    roles: ["editor"],
    realName: "Guest User",
    nickName: "Guest",
    mobile: "15100000000",
    department: "External",
    role: "Viewer",
    remark: "Read-only account",
  }),
  createMockAuthUser({
    id: "3",
    username: "zhao.ming",
    password: "zhao1234",
    email: "zhao.ming@northstar.io",
    roles: ["editor"],
    realName: "Zhao Ming",
    nickName: "Ming",
    department: "Product",
    role: "Editor",
  }),
];

let nextId = authUsers.length + 1;

const usersData: User[] = [
  {
    id: "u1",
    username: "olivia",
    avatar: vercelAvatarUrl("olivia"),
    email: "olivia@northstar.io",
    roles: ["editor"],
    permissions: ["user:view"],
    realName: "Olivia Martin",
    nickName: "Olivia",
    mobile: "13600000001",
    department: "Product",
    role: "Product Manager",
    status: 1,
    remark: null,
    lastLogin: null,
    createdBy: "seed",
  },
  {
    id: "u2",
    username: "jackson",
    avatar: vercelAvatarUrl("jackson"),
    email: "jackson@northstar.io",
    roles: ["editor"],
    permissions: ["user:view"],
    realName: "Jackson Lee",
    nickName: "JL",
    mobile: "13600000002",
    department: "Sales",
    role: "Sales Lead",
    status: 1,
    remark: null,
    lastLogin: null,
    createdBy: "seed",
  },
  {
    id: "u3",
    username: "isabella",
    avatar: vercelAvatarUrl("isabella"),
    email: "isabella@northstar.io",
    roles: ["editor"],
    permissions: ["user:view"],
    realName: "Isabella Nguyen",
    nickName: "Isa",
    mobile: "13600000003",
    department: "Marketing",
    role: "Campaign Specialist",
    status: 1,
    remark: null,
    lastLogin: null,
    createdBy: "seed",
  },
];

const adminsData: User[] = [
  {
    id: "a1",
    username: "admin",
    avatar: vercelAvatarUrl("admin"),
    email: "ops.admin@northstar.io",
    roles: ["admin"],
    permissions: ["*"],
    realName: "Li Si",
    nickName: "Super Admin",
    mobile: "13800000000",
    department: "Operations",
    role: "Administrator",
    status: 1,
    remark: "Full access account",
    lastLogin: null,
    createdBy: "system",
  },
  {
    id: "a2",
    username: "guest-admin",
    avatar: vercelAvatarUrl("guest-admin"),
    email: "guest.admin@northstar.io",
    roles: ["editor"],
    permissions: ["admin:view"],
    realName: "Guest Admin",
    nickName: "GA",
    mobile: "13800000001",
    department: "Support",
    role: "Support Admin",
    status: 1,
    remark: null,
    lastLogin: null,
    createdBy: "system",
  },
];

let nextUserId = usersData.length + 1;
let nextAdminId = adminsData.length + 1;
let menusData: MenuItem[] = JSON.parse(JSON.stringify(APP_MENU_TREE)) as MenuItem[];

function stripPassword(user: MockAuthUser): User {
  const { password: _password, ...rest } = user;
  return rest;
}

export function issueMockTokens(userId: string) {
  return {
    accessToken: `mock-access-token:${userId}`,
    refreshToken: `mock-refresh-token:${userId}`,
  };
}

export function parseUserIdFromAccessToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  if (!token.startsWith("mock-access-token:")) return null;
  return token.slice("mock-access-token:".length) || null;
}

export function parseUserIdFromRefreshToken(token: string | null | undefined): string | null {
  if (!token || !token.startsWith("mock-refresh-token:")) return null;
  return token.slice("mock-refresh-token:".length) || null;
}

export function listUsers(): User[] {
  return usersData.map((u) => ({ ...u }));
}

export function listAdmins(): User[] {
  return adminsData.map((u) => ({ ...u }));
}

export function findAdminById(adminId: string): User | undefined {
  return adminsData.find((u) => u.id === adminId);
}

export function findAdminByUsername(username: string): User | undefined {
  return adminsData.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
}

export function findUserById(userId: string): MockAuthUser | undefined {
  return authUsers.find((u) => u.id === userId);
}

export function findUserByUsername(username: string): MockAuthUser | undefined {
  return authUsers.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
}

export function authenticateUser(username: string, password: string): MockAuthUser | undefined {
  const user = findUserByUsername(username);
  if (!user || user.password !== password || user.status !== 1) return undefined;
  user.lastLogin = new Date().toISOString();
  return user;
}

export function registerUser(payload: {
  username: string;
  password: string;
  email?: string;
}): MockAuthUser {
  const user = createMockAuthUser({
    id: String(nextId++),
    username: payload.username,
    password: payload.password,
    email: payload.email ?? null,
    roles: ["editor"],
    realName: payload.username,
    nickName: payload.username,
    department: "Community",
    role: "Editor",
    remark: "Registered from mock auth endpoint",
    createdBy: "self-register",
  });
  user.lastLogin = new Date().toISOString();
  authUsers.push(user);
  return user;
}

export function createUser(payload: {
  username: string;
  email: string | null;
  mobile: string | null;
}): User {
  const user: User = {
    id: `u${nextUserId++}`,
    username: payload.username,
    avatar: vercelAvatarUrl(payload.username),
    email: payload.email,
    roles: ["editor"],
    permissions: permissionsFromRoles(["editor"]),
    realName: payload.username,
    nickName: payload.username,
    mobile: payload.mobile,
    department: "Operations",
    role: "User",
    status: 1,
    remark: null,
    lastLogin: null,
    createdBy: "users-page",
  };
  usersData.push(user);
  return { ...user };
}

export function createAdmin(payload: {
  username: string;
  password: string;
  email: string | null;
  roles: string[];
  permissions: string[];
  realName?: string | null;
  nickName?: string | null;
  mobile?: string | null;
  department?: string | null;
  role?: string | null;
  remark?: string | null;
  status?: number;
}): User {
  const roles = payload.roles.length ? payload.roles : ["editor"];
  const derivedPermissions = payload.permissions.length
    ? uniquePermissions(payload.permissions)
    : permissionsFromRoles(roles);
  const user: User = {
    id: `a${nextAdminId++}`,
    username: payload.username,
    avatar: vercelAvatarUrl(payload.username),
    email: payload.email,
    roles,
    permissions: derivedPermissions,
    realName: payload.realName ?? payload.username,
    nickName: payload.nickName ?? payload.username,
    mobile: payload.mobile ?? null,
    department: payload.department ?? "Administration",
    role: payload.role ?? (roles.includes("admin") ? "Administrator" : "Editor"),
    remark: payload.remark ?? null,
    status: payload.status ?? 1,
    lastLogin: null,
    createdBy: "admins-page",
  };
  adminsData.push(user);

  const authUser = createMockAuthUser({
    id: user.id,
    username: user.username,
    password: payload.password,
    email: user.email,
    roles: user.roles,
    realName: user.realName,
    nickName: user.nickName,
    mobile: user.mobile,
    department: user.department,
    role: user.role,
    status: user.status,
    remark: user.remark,
    createdBy: user.createdBy,
  });
  authUser.permissions = user.permissions;
  authUsers.push(authUser);

  return { ...user };
}

export function updateUser(userId: string, payload: Partial<User>): User | undefined {
  const user = usersData.find((u) => u.id === userId);
  if (!user) return undefined;
  if (payload.username != null) {
    user.username = payload.username;
    user.avatar = vercelAvatarUrl(payload.username);
  }
  if (payload.email !== undefined) user.email = payload.email;
  if (payload.roles) {
    user.roles = payload.roles;
    user.permissions = permissionsFromRoles(payload.roles);
  }
  if (payload.permissions) user.permissions = payload.permissions;
  if (payload.realName !== undefined) user.realName = payload.realName ?? null;
  if (payload.nickName !== undefined) user.nickName = payload.nickName ?? null;
  if (payload.mobile !== undefined) user.mobile = payload.mobile ?? null;
  if (payload.department !== undefined) user.department = payload.department ?? null;
  if (payload.role !== undefined) user.role = payload.role ?? null;
  if (payload.status !== undefined) user.status = payload.status;
  if (payload.remark !== undefined) user.remark = payload.remark ?? null;
  return { ...user };
}

export function updateAdmin(
  userId: string,
  payload: Partial<User> & { password?: string | null },
): User | undefined {
  const user = adminsData.find((u) => u.id === userId);
  if (!user) return undefined;
  if (payload.username != null) {
    user.username = payload.username;
    user.avatar = vercelAvatarUrl(payload.username);
  }
  if (payload.email !== undefined) user.email = payload.email;
  if (payload.roles) {
    user.roles = payload.roles;
    user.permissions = permissionsFromRoles(payload.roles);
  }
  if (payload.realName !== undefined) user.realName = payload.realName ?? null;
  if (payload.nickName !== undefined) user.nickName = payload.nickName ?? null;
  if (payload.mobile !== undefined) user.mobile = payload.mobile ?? null;
  if (payload.department !== undefined) user.department = payload.department ?? null;
  if (payload.role !== undefined) user.role = payload.role ?? null;
  if (payload.status !== undefined) user.status = payload.status;
  if (payload.remark !== undefined) user.remark = payload.remark ?? null;
  if (payload.permissions) {
    user.permissions = uniquePermissions(payload.permissions);
  }
  if (payload.roles && !payload.permissions) {
    user.permissions = permissionsFromRoles(payload.roles);
  }

  const authUser = authUsers.find((u) => u.id === userId);
  if (authUser) {
    authUser.username = user.username;
    authUser.avatar = user.avatar;
    authUser.email = user.email;
    authUser.roles = user.roles;
    authUser.permissions = user.permissions;
    authUser.realName = user.realName;
    authUser.nickName = user.nickName;
    authUser.mobile = user.mobile;
    authUser.department = user.department;
    authUser.role = user.role;
    authUser.status = user.status;
    authUser.remark = user.remark;
    if (payload.password && payload.password.trim().length > 0) {
      authUser.password = payload.password;
    }
  }

  return { ...user };
}

export function deleteAdmin(userId: string): boolean {
  const idx = adminsData.findIndex((u) => u.id === userId);
  if (idx === -1) return false;
  adminsData.splice(idx, 1);
  const authIdx = authUsers.findIndex((u) => u.id === userId);
  if (authIdx !== -1) {
    authUsers.splice(authIdx, 1);
  }
  return true;
}

export function deleteUser(userId: string): boolean {
  const idx = usersData.findIndex((u) => u.id === userId);
  if (idx === -1) return false;
  usersData.splice(idx, 1);
  return true;
}

export function toPublicUser(user: MockAuthUser): User {
  return stripPassword(user);
}

export function listMenus(): MenuItem[] {
  return JSON.parse(JSON.stringify(menusData)) as MenuItem[];
}

export function saveMenus(nextMenus: MenuItem[]): MenuItem[] {
  menusData = JSON.parse(JSON.stringify(nextMenus)) as MenuItem[];
  return listMenus();
}
