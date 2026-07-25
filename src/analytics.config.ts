/**
 * Cloudflare Web Analytics 配置
 *
 * 启用步骤（约 2 分钟）：
 *  1. 登录 Cloudflare dashboard → Web Analytics
 *  2. Add a site → 填入 hrfeng.uno → 复制生成的 JS snippet
 *  3. 把 snippet 里 data-cf-beacon 的 token 填到下方 CF_ANALYTICS_TOKEN
 *
 * 未填 token 时，BaseHead 不会输出任何统计脚本——站点照常上线、无隐私负担。
 * 填了 token 后，每个页面会加载一段轻量 beacon（无 cookie、不存 IP）。
 *
 * 注意：如果 hrfeng.uno 走了 Cloudflare 代理，CF 会自动注入 beacon，
 * 此时再手动加同一段也是兼容的（CF 去重，不会双倍计数）。
 */
export const CF_ANALYTICS_TOKEN = '' as string;

/** 是否启用（token 非空即启用） */
export const CF_ANALYTICS_ENABLED: boolean = CF_ANALYTICS_TOKEN !== '';
