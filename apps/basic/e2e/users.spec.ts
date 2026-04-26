import { test, expect } from "@playwright/test";
import {
  gotoUsers,
  verifyTableHeaders,
  searchUser,
  verifyRoleFilter,
} from "./helpers";

test.describe("User Management", () => {
  test.beforeEach(async ({ page }) => {
    await gotoUsers(page);
  });

  test("should display user table", async ({ page }) => {
    await verifyTableHeaders(page);
  });

  test("should search users", async ({ page }) => {
    await searchUser(page, "zhao.ming");
    await expect(page.getByText("zhao.ming", { exact: true })).toBeVisible();
  });

  test("should open create user modal", async ({ page }) => {
    await page.getByRole("button", { name: /Create User|创建用户/ }).click();
    await expect(page.getByRole("dialog").getByText(/New User|新建用户/)).toBeVisible();
  });
});

test.describe("User Management — role in URL", () => {
  test("should filter users by role", async ({ page }) => {
    await verifyRoleFilter(page, "admin");
  });
});
