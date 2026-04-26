import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/login");
  await page.getByLabel(/Username|用户名/).fill("admin");
  await page.getByLabel(/Password|密码/).fill("admin");
  await page.getByRole("button", { name: /Sign In|登录/ }).click();
  await expect(page).toHaveURL(/dashboard/);
}

/** Navigate to the users page */
export async function gotoUsers(page: Page): Promise<void> {
  await page.goto("/users");
  await page.waitForSelector(".ant-table-thead");
}

/** Verify table headers are visible */
export async function verifyTableHeaders(page: Page): Promise<void> {
  const thead = page.locator(".ant-table-thead");
  await Promise.all([
    thead.getByText(/Username|用户名/).isVisible(),
    thead.getByText(/Email|邮箱/).isVisible(),
    thead.getByText(/Roles|角色/).isVisible(),
  ]);
}

/** Search for a user by keyword */
export async function searchUser(page: Page, keyword: string): Promise<void> {
  const searchInput = page.getByPlaceholder(/Search User|搜索用户/);
  await searchInput.fill(keyword);
  await searchInput.press("Enter");
  await page.waitForURL((url) => url.searchParams.get("keyword") === keyword);
}

/** Verify role-based filtering */
export async function verifyRoleFilter(page: Page, role: string): Promise<void> {
  await page.goto(`/users?role=${role}`);
  await page.waitForSelector(".ant-table-thead");
  const roleCell = page.getByRole("cell", { name: new RegExp(role, "i") });
  await roleCell.first().isVisible();
}
