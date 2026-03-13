/**
 * Skills registry
 *
 * 目的：集中导出 llm/skills 下的 skill 模块，便于运行时自动发现或静态引入。
 * 导出：
 * - `skills`：按短名映射的 skill 模块集合。
 * - `listSkills()`：返回所有 skill 的 meta 数组，便于展示或自动选择。
 * - `getSkillById(id)`：基于 meta.id 查找对应 skill 模块。
 */
import admin from './admin.skill';
import dashboard from './dashboard.skill';
import menu from './menu.skill';
import user from './user.skill';

const skills: Record<string, any> = {
  admin,
  menu,
  user,
  dashboard,
};

export function listSkills() {
  return Object.values(skills).map((s) => s.meta);
}

export function getSkillById(id: string) {
  return Object.values(skills).find((s) => s.meta && s.meta.id === id);
}

export { skills };

export default skills;
