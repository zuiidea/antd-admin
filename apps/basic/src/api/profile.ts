export const PROFILE_ENDPOINTS = {
  get: "/api/auth/user",
  update: "/api/user/profile",
  changePassword: "/api/user/password",
  uploadAvatar: "/api/user/avatar",
} as const;
