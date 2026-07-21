/**
 * giscus 评论配置
 *
 * 启用步骤（约 3 分钟）：
 *  1. 在 GitHub 创建一个 public 仓库（或用现有仓库）
 *  2. 仓库 Settings → General → Features → 勾选 Discussions
 *  3. 安装 giscus app: https://github.com/apps/giscus
 *  4. 打开 https://giscus.app/zh-CN ，填入仓库名，复制生成的
 *     data-repo-id 和 data-category-id 到下方
 *
 * 在此之前，评论组件会处于"未配置"状态，文章页会显示一行提示
 * 而不是真正的评论区——所以构建不会报错，本地也能正常预览。
 */
export const GISCUS_CONFIG = {
  // 格式: "用户名/仓库名"，例如 "octocat/blog"
  repo: 'fhrikx/fhrikx.github.io' as string,
  repoId: 'R_kgDOPf2anA' as string,
  // Discussion 分类，推荐 "Announcements" 或 "General"
  category: 'Announcements',
  categoryId: 'DIC_kwDOPf2anM4DBl6M' as string,
  // mapping 决定如何把页面映射到 discussion
  mapping: 'pathname' as const,
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'zh-CN',
} as const;

/** 是否已配置完成（所有必填项非空） */
export const GISCUS_ENABLED: boolean =
  GISCUS_CONFIG.repo !== '' &&
  GISCUS_CONFIG.repoId !== '' &&
  GISCUS_CONFIG.categoryId !== '';
