# 🎨 Octen 主题颜色 Token 规范 (Octen Theme Tokens)

本文档系统归纳了 **Octen Console** 的全套设计系统颜色 Token（Design Tokens），涵盖 **Cult UI 4-Color 极简规范** 及跨亮/暗双模式的语义色彩映射。

同目录下提供了可视化的交互式对照色卡：👉 **[`theme/theme-color.html`](file:///x:/XCoding/Octen/03-console/theme/theme-color.html)**（支持实时一键切换暗色、十六进制实时换算与点击复制 Token）。

---

## 1. 核心设计原则 (Design Principles)

1. **Cult UI 4-Color Grayscale (极简 4 阶灰)**：
   - 界面的核心中性色聚焦在 `#0A0A0A`（主强调）、`#737373`（次强调）、`#A3A3A3`（弱强调）与 `#F5F5F5`（基底），避免色彩繁杂。
2. **High-Contrast Surface (高反差面板与卡片)**：
   - 浅色模式采用 `#F5F5F5` / `#FCFCF8` 作为外层 Shell 底色，叠加 `#FFFFFF` 纯白内容卡片，并以 `1px solid #E7E7E7` / `#DBDBDB` 进行轻量分割。
3. **Octen Cyber Emerald (品牌翡翠绿)**：
   - 浅色下使用深翡翠绿 `#039855` 保证在白底上的极致可读与合规对比度；暗色下自动映射至高光荧光绿 `#60FF70` / `#32F08C`。
4. **Data & Code Elegance (浅色代码优雅度)**：
   - 代码视窗统一使用 `.ui-code-container`，采用半透明柔和基底 `rgba(245, 245, 245, 0.50)`，配合 `JetBrains Mono` 字体输出浅色高亮。

---

## 2. 核心主题色 (Brand Theme Tokens)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 角色与场景 |
| :--- | :--- | :--- | :--- |
| `--primary` | `#039855` | `#60FF70` | 品牌主色，用于主 CTA 按钮、活动 Tab 文字、主要图标 |
| `--primary-lite` | `#00A63E` | `#60FF70` | 浅色次级高亮 |
| `--primary-muted` | `#03985587` | `#60FF7087` | 品牌半透明背景（53% Alpha） |
| `--primary-tint-soft` | `hsl(111 92% 77%)` | `hsl(111 60% 62%)` | 浅绿柔和微光 |
| `--badge-ea-bg` | `#E3FFE2` | `rgba(96,255,112,0.12)` | Early Access 徽章背景 |
| `--badge-ea-text` | `#1B9C62` | `#60FF70` | Early Access 徽章字色 |

---

## 3. 背景与表面 (Surfaces & Backgrounds)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 映射场景 |
| :--- | :--- | :--- | :--- |
| `--shell` | `#F5F5F5` | `#05070B` | Platform 外壳与全局工作区底色 (`--bg-workspace`) |
| `--background` | `#FCFCF8` | `#080B12` | 页面主背景底色 |
| `--surface` | `#FFFFFF` | `#0F1319` | 核心卡片表面 (`.layout-pane`、表格底色、弹窗) |
| `--surface-subtle` | `#F8FAFC` | `#12161D` | 浅阶微调表面 (`slate-50`) |
| `--surface-muted` | `#F1F5F9` | `#1A1F27` | 禁用块、弱化区域 (`slate-100`) |
| `--surface-strong` | `#E2E8F0` | `#232A35` | 较强微表面 (`slate-200`) |
| `--surface-inverse`| `#0F172B` | `#1F2733` | 恒深区块（深色代码块、媒体遮罩） |

---

## 4. 文字层级 (Typography Colors)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 语义与层级 |
| :--- | :--- | :--- | :--- |
| `--foreground` / `--fg-strong` | `#0F172B` | `#E8EAED` | 页面最高强调文本、大标题、主数据项 |
| `--fg-body` | `#1D293D` | `#D3D8E0` | 标准正文 (`slate-800`) |
| `--fg-secondary` | `#314158` | `#B9BFC9` | 次级标签、辅助信息 (`slate-700`) |
| `--fg-muted` | `#62748E` | `#8B95A5` | 非活动项、常规描述 (`slate-500`) |
| `--fg-faint` | `#90A1B9` | `#6F7A8A` | 禁用项、占位符、边注 (`slate-400`) |
| `--foreground-inverse` | `#FFFFFF` | `#E8EAED` | 恒白文字（深底卡片或按钮上的文字） |

---

## 5. 边框与分隔线 (Borders & Dividers)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 应用规范 |
| :--- | :--- | :--- | :--- |
| `--panel-border` | `#E7E7E7` | `#232A35` | 主布局面板 (`.layout-pane`) 1px 细微描边 |
| `--border-form` / `--neutral-300` | `#DBDBDB` | `#2F3742` | 表单控件（输入框、分段药丸组外框） |
| `--line` | `#E2E8F0` | `#232A35` | 常规横线分割线 (`slate-200`) |
| `--line-subtle` | `#F1F5F9` | `#1A1F27` | 极弱内部列表分割线 |
| `--ring` | `oklch(0.708 0 0)` | `#3D4756` | 键盘聚焦光圈 (Focus Ring) |

---

## 6. 四大状态语义色 (Semantic Status Matrix)

| 语义分类 | 基础色 (`--{status}`) | 浅底表面 (`--{status}-surface`) | 描边 (`--{status}-border`) | 前景文字 (`--{status}-foreground`) |
| :--- | :--- | :--- | :--- | :--- |
| **成功 Success** | `#009966` / `#34D399` | `hsl(142 76% 94%)` | `#A4F4CF` | `#007A55` / `#6EE7B7` |
| **警告 Warning** | `#FE9A00` / `#FBBF24` | `#FFFBEB` | `#FEE685` | `#BB4D00` / `#FCD34D` |
| **错误 Danger**  | `#E7000B` / `#FF6166` | `#FEF2F2` | `#FFC9C9` | `#C10007` / `#FCA5A5` |
| **信息 Info**    | `#155DFC` / `#60A5FA` | `hsl(214 100% 95%)` | `#BEDBFF` | `#1447E6` / `#93C5FD` |

---

## 7. 阴影与微光系统 (Elevation & Shadows)

```css
/* 轮廓微阴影 */
--shadow-outline: 0 0 0 1px rgba(0, 0, 0, 0.04);
--shadow-faint:   0px 3px 15px 0px rgba(0, 0, 0, 0.03);
--shadow-muted:   0px 3px 18px 0px rgba(0, 0, 0, 0.04);
--shadow-normal:  0px 8px 30px 0px rgba(0, 0, 0, 0.05); /* 核心浮起卡片阴影 */
--shadow-strong:  0px 6px 28px 0px rgba(0, 0, 0, 0.12); /* 模态弹窗主阴影 */

/* 组合阴影 */
--shadow-s: var(--shadow-outline), var(--shadow-normal);
--shadow-l: var(--shadow-outline), var(--shadow-strong);

/* 交互状态阴影 */
--shadow-input: 0 0 0 0.5px rgba(0, 0, 0, 0.08);
--shadow-input-active: 0 0 0 2.5px color-mix(in oklab, #039855 50%, transparent 75%);
```

---

## 8. 快速引入与调用指南

```html
<!-- 1. 在页面中引入或查看可视化色卡 -->
<a href="theme/theme-color.html" target="_blank">打开 Octen 可视化主题色卡</a>

<!-- 2. 在 CSS 中调用抽象语义 Token -->
<style>
.my-card {
  background: var(--surface, #ffffff);
  border: 1px solid var(--panel-border, #e7e7e7);
  border-radius: 16px;
  color: var(--foreground, #0f172b);
  box-shadow: var(--shadow-s);
}

.my-btn-primary {
  background: var(--primary, #039855);
  color: var(--foreground-inverse, #ffffff);
  border-radius: 8px;
  height: 32px;
}
</style>
```
