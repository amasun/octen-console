# 🎨 Octen 主题颜色 Token 规范 (Octen Theme Tokens)

本文档系统归纳了 **Octen Console** 的全套设计系统颜色 Token（Design Tokens），涵盖 **标准双主题体系（Light & Dark）** 及工业级控制台空间三阶暗色深度架构。

同目录下提供了详细的技术规范文档与配套的可视化交互式对照色卡：
- 📖 **详细规范**：👉 [`theme/COLOR_SPEC.md`](file:///x:/XCoding/Octen/03-console/theme/COLOR_SPEC.md)
- 🖥️ **新版交互色卡**：👉 [`theme/theme-color v1.1.html`](file:///x:/XCoding/Octen/03-console/theme/theme-color%20v1.1.html)（支持实时切换暗色、十六进制实时换算与点击复制 Token）
- 🌐 **本地在线预览**：`http://localhost:3333/theme/theme-color%20v1.1.html`

---

## 1. 核心设计原则 (Design Principles)

1. **统一双主题体系 (Dual-Theme Standard)**：
   - 彻底移除旧版偏蓝的 Octen Dark 方案，将 **TraeWork 中性极简黑灰阶梯** 与 **Octen 翡翠绿** 结合，形成官方唯一的标准 **Dark** 模式。
2. **三阶空间暗色深度 (3-Tier Dark Depth Architecture)**：
   - **外层工作区与 Ribbon (`--shell`)**：`#141414`
   - **主控制台工作台底板 (`.layout-pane`)**：`#1a1a1a`，配以 `rgba(255, 255, 255, 0.07)` 半透发丝微描边
   - **嵌入式产品功能卡片与代码槽 (`--subcard-bg`, `--code-bg`)**：`#161616`，边框同色嵌合
3. **Octen Cyber Emerald (品牌翡翠绿)**：
   - 浅色下使用深翡翠绿 `#039855` 保证白底可读；暗色下自动映射至高能荧光绿 `#60FF70` / `#32F08C`。
   - 悬浮至子卡片激活高亮绿描边与发光光晕（`box-shadow: 0 0 0 1px rgba(96,255,112,0.14), 0 8px 24px -4px rgba(0,0,0,0.45)`）。
4. **半透明中性纯白描边 (Translucent Border Scale)**：
   - 全面摒弃偏蓝硬编码色，采用纯白透明度阶梯：一级边框 `rgba(229, 229, 229, 0.10)`、输入框 `rgba(229, 229, 229, 0.16)`、强调聚焦描边 `rgba(229, 229, 229, 0.20)`。

---

## 2. 控制台架构层级 Tokens (Console Architecture Tokens)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 映射场景 |
| :--- | :--- | :--- | :--- |
| `--shell` | `#F5F5F5` | `#141414` | 全局外层底色、workspace 背景、侧边栏 Ribbon |
| `--layout-pane` / `--surface` | `#FFFFFF` | `#1A1A1A` | 控制台主面板卡片底色（14px 圆角） |
| `--layout-pane-border` | `1px solid #E7E7E7` | `1px solid rgba(255, 255, 255, 0.07)` | 主卡片外框微描边（发丝级轮廓界限） |
| `--subcard-bg` / `--code-bg` | `#FFFFFF` / `#F5F5F580` | `#161616` | 产品卡片（API、Application、MCP）与代码高亮视窗插槽底色 |
| `--subcard-border` | `1px solid #E7E7E7` | `1px solid #161616` | 嵌入式卡片边框（暗色下同色嵌合） |
| `--input-bg` | `#FFFFFF` | `#141414` | 单行/多行输入框、选择框及复合查询框插槽底色 |

---

## 3. 核心主题色 (Brand Theme Tokens)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 角色与场景 |
| :--- | :--- | :--- | :--- |
| `--primary` | `#039855` | `#60FF70` | 品牌主色，用于主 CTA 按钮、活动 Tab 文字、主要图标 |
| `--primary-lite` | `#00A63E` | `#60FF70` | 浅色次级高亮 |
| `--primary-muted` | `#03985587` | `rgba(96, 255, 112, 0.14)` | 品牌半透明背景（发光外圈微投影） |
| `--primary-tint-soft` | `hsl(111 92% 77%)` | `hsl(111 60% 62%)` | 浅绿柔和微光 |

---

## 4. 背景与表面 (Surfaces & Backgrounds)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 映射场景 |
| :--- | :--- | :--- | :--- |
| `--shell` | `#F5F5F5` | `#141414` | Platform 外壳与全局工作区底色 |
| `--background` | `#FCFCF8` | `#1A1A1A` | 页面主背景底色 |
| `--surface` | `#FFFFFF` | `#1A1A1A` | 核心卡片表面 (`.layout-pane`、表格底色) |
| `--surface-subtle` | `#F8FAFC` | `rgba(212, 212, 212, 0.06)` | 浅阶微调表面 (`slate-50`) |
| `--surface-muted` | `#F1F5F9` | `rgba(212, 212, 212, 0.08)` | 交互选中项、微高亮区域 |
| `--surface-strong` | `#E2E8F0` | `#2A2A2A` | 较强微表面、开关激活态底色 |
| `--card` | `oklch(1 0 0)` | `#1A1A1A` | 工作台主卡片 |
| `--popover` | `oklch(1 0 0)` | `#1C1C1C` | 浮动下拉菜单、账户弹窗底色 |
| `--surface-inverse`| `#0F172B` | `#FFFFFF` | 恒深反转区块 |

---

## 5. 文字层级 (Typography Colors)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 语义与层级 |
| :--- | :--- | :--- | :--- |
| `--foreground` / `--fg-body` | `#0F172B` | `#E5E5E5` | 核心正文（Brand Grey 200） |
| `--fg-strong` | `#0F172B` | `#FAFAFA` | 页面最高强调文本、大标题、主数据项（Brand Grey 50） |
| `--fg-secondary` | `#314158` | `#A1A1A1` | 次级标签、辅助信息（Text Disabled） |
| `--fg-tertiary` | `#45556C` | `#737373` | 小节弱化标签、元数据 |
| `--fg-muted` | `#62748E` | `#737373` | 非活动项、常规描述 |
| `--fg-faint` | `#90A1B9` | `#525252` | 禁用项、占位符、边注 |
| `--foreground-inverse` | `#FFFFFF` | `#171717` | 恒白文字（深底卡片或按钮上的文字） |

---

## 6. 边框与分隔线 (Borders & Dividers)

| Token 变量名 | 浅色 (Light) | 暗色 (Dark) | 应用规范 |
| :--- | :--- | :--- | :--- |
| `--border` | `oklch(0.922 0 0)` | `rgba(229, 229, 229, 0.10)` | 一级通用边框 |
| `--panel-border` | `#E7E7E7` | `rgba(229, 229, 229, 0.10)` | 主布局面板 1px 细微描边 |
| `--line` | `#E2E8F0` | `rgba(229, 229, 229, 0.10)` | 常规横线分割线 |
| `--line-subtle` | `#F1F5F9` | `rgba(229, 229, 229, 0.06)` | 极弱内部列表分割线 |
| `--input` | `oklch(0.922 0 0)` | `rgba(229, 229, 229, 0.16)` | 表单控件（输入框、选择框） |
| `--ring` | `oklch(0.708 0 0)` | `rgba(229, 229, 229, 0.20)` | 键盘聚焦光圈 (Focus Ring) |

---

## 7. 四大状态语义色 (Semantic Status Matrix)

| 语义分类 | 基础色 (`--{status}`) | 浅底表面 (`--surface`) | 描边 (`--border`) | 前景文字 (`--foreground`) |
| :--- | :--- | :--- | :--- | :--- |
| **成功 Success** | `#009966` / `#15A877` | `rgba(21, 168, 119, 0.14)` | `rgba(21, 168, 119, 0.26)` | `#2FB287` |
| **警告 Warning** | `#FE9A00` / `#FEA900` | `rgba(254, 169, 0, 0.14)` | `rgba(254, 169, 0, 0.26)` | `#FFB700` |
| **错误 Danger** | `#E7000B` / `#E8463A` | `rgba(232, 70, 58, 0.14)` | `rgba(232, 70, 58, 0.26)` | `#EA574C` |
| **信息 Info** | `#155DFC` / `#2F74FF` | `rgba(47, 116, 255, 0.14)` | `rgba(47, 116, 255, 0.26)` | `#4C88FF` |
