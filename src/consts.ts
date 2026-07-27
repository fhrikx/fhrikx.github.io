export const SITE_TITLE = '时空日志';
export const SITE_DESCRIPTION =
  '物理文献的总结与个人想法的记录';

export const SITE_TAGLINE =
  '一个用于记录的个人空间。在这里把读过的物理文献用自己的话重写一遍，也写下一些零散的想法。';

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/about', label: '关于' },
] as const;

/** 侧边栏外部链接，留空数组则不渲染整块 */
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/fhrikx' },
  { label: 'Email', href: 'mailto:fhrikx@hrfeng.uno' },
];
