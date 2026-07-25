import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE_TITLE } from '../../consts';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description ?? '' },
  }));
}

// 加载 Noto Sans SC（含中文 + 拉丁）构建时从 jsDelivr 拉一次完整 TTF。
// GitHub Actions 构建环境有外网；本地构建也能拉到。拉取失败回退系统默认，
// 不阻断构建（仅 OG 图可能缺中文字形，但站点仍可上线）。
async function loadFont(): Promise<Buffer | null> {
  try {
    const res = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-700-normal.ttf',
    );
    if (!res.ok) return null;
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  }
}

const W = 1200;
const H = 630;

export async function GET({ props }: { props: { title: string; description: string } }) {
  const { title, description } = props;
  const font = await loadFont();
  const fonts = font
    ? [{ name: 'Noto Sans SC', data: font, weight: 700, style: 'normal' as const }]
    : [];

  // 标题过长时按字符估算缩小，避免溢出
  const titleSize = title.length > 28 ? 56 : title.length > 18 ? 68 : 80;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: W,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 96,
          backgroundColor: '#faf8f3',
          fontFamily: 'Noto Sans SC',
          color: '#1a1814',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: 14 },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: 'Noto Sans SC',
                      fontWeight: 600,
                      fontSize: 26,
                      color: '#1a1814',
                    },
                    children: SITE_TITLE,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      width: 56,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: '#ff5e00',
                    },
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: 'Noto Sans SC',
                      fontWeight: 700,
                      fontSize: titleSize,
                      lineHeight: 1.2,
                      letterSpacing: -1.5,
                      color: '#1a1814',
                    },
                    children: title,
                  },
                },
                description
                  ? {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Noto Sans SC',
                          fontWeight: 700,
                          fontSize: 30,
                          lineHeight: 1.4,
                          color: '#55504a',
                        },
                        children: description,
                      },
                    }
                  : null,
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #e3ddd2',
                paddingTop: 24,
                fontFamily: 'Noto Sans SC',
                fontSize: 22,
                color: '#8a847c',
              },
              children: [
                { type: 'div', props: { children: 'hrfeng.uno' } },
                { type: 'div', props: { children: 'Astro · KaTeX · 静态生成' } },
              ],
            },
          },
        ],
      },
    },
    { width: W, height: H, fonts },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } })
    .render()
    .asPng();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
