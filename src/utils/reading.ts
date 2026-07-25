/**
 * 阅读时间估算。
 *
 * 中文按字数计，英文按空格分词，两者加权后除以阅读速度。
 * 中文 ~400 字/分，英文 ~220 词/分。对纯中/纯英都合理，
 * 对中英混排取并集估算。
 */
export function readingTime(body: string): number {
  if (!body) return 1;
  // 去掉 Markdown 代码块与行内代码，避免把代码当正文计字
  const stripped = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ');

  // 中日韩统一表意文字（一-鿿）+ 全角标点（　-〿、＀-￯）
  const cjk =
    (stripped.match(/[一-鿿　-〿＀-￯]/g) || []).length;
  // 英文单词
  const words = (stripped.match(/[A-Za-z][A-Za-z'-]*/g) || []).length;

  const minutes = cjk / 400 + words / 220;
  return Math.max(1, Math.round(minutes));
}

export function formatReadingTime(body: string): string {
  return `${readingTime(body)} 分钟`;
}
