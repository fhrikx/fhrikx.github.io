# papers/

把要在文章里内嵌展示的 PDF 放在这里，引用时用绝对路径：

```mdx
import PdfViewer from '../../components/PdfViewer.astro';

<PdfViewer src="/papers/my-paper.pdf" title="论文标题" />
```

约定理由：放在 `public/` 下的文件由 Astro 原样拷到站点根，不经过构建管线，
路径稳定（永远是 `/papers/文件名`），也方便直接给出下载链接。

可选参数：
- `height`：查看器高度，默认 `72vh`
- `download`：是否显示下载链接，默认 `true`
