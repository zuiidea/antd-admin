/**
 * Dashboard 服务：获取仪表盘汇总数据的 API 封装。
 *
 * 对 LLM 的说明：
 * - `getDashboard()` 直接调用 `/dashboard`，返回后端提供的汇总 JSON 数据。
 */
import api from '../utils/request';

export async function getDashboard() {
  return api('/dashboard');
}

export default { getDashboard };
