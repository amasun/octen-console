# 🎨 Octen Console 新设计系统颜色规范 (Octen Design Tokens Specification)

> **版本**：v2.0 (2026 最新标准)  
> **适用范围**：Octen Console 核心控制台、营销页面、SDK 与开发者工具  
> **配套交互式色板**：👉 [`theme/theme-color v1.1.html`](file:///x:/XCoding/Octen/03-console/theme/theme-color%20v1.1.html) | 本地访问：`http://localhost:3333/theme/theme-color%20v1.1.html`

---

## 1. 架构理念与核心设计原则 (Design Principles)

1. **纯粹双主题体系 (Streamlined Dual-Theme System)**：
   - 彻底废除原偏蓝、混杂的旧版 Octen Dark 方案。
   - 正式由 **TraeWork 中性深邃黑灰阶梯** 与 **Octen 标志性高光翡翠绿** 共同构成官方标准 **Dark** 模式。
   - 仅提供 **Light** 与 **Dark** 两个核心状态（支持跟随操作系统的 **System** 自动切换）。

2. **五阶暗色空间深度体系 (5-Tier Dark Elevation Architecture)**：
   - **Tier 0 (外层底色 `--shell` / 输入框 `--input-bg`)**：`#141414` —— 极深中性黑，包裹全局工作区底板与侧边栏 Ribbon。
   - **Tier 0.5 (嵌入式产品功能卡片与代码插槽 `--subcard-bg` / `--code-bg`)**：`#161616` —— 微凹嵌合插槽黑，为 API / Application / MCP 子卡片及 Code 视窗提供沉浸式下沉感。
   - **Tier 1 (主控制台工作台底板 `--surface` / `.layout-pane`)**：`#1A1A1A` —— 通透温润的工业工作台基座，配以 `rgba(255, 255, 255, 0.08)` 微发丝半透描边。
   - **Tier 1.5 (次级区块与中性底 `--neutral-50` / `--neutral-100`)**：`#202020` / `#262626` —— 次级卡片、分段控件底。
   - **Tier 2 (浮动弹出层 `--popover`)**：`#262626` —— 下拉菜单、账号弹层、日历浮窗（拉开与 `#1A1A1A` 的级差），配以 `rgba(255, 255, 255, 0.12)` 边框与大景深立体阴影，形成真正的空间悬浮感。
   - **Tier 3 (强高亮操作块 `--surface-strong`)**：`#363636` —— DEV 激活胶囊、高亮切换滑块。

3. **Cyber Emerald 品牌主色交互**：
   - **Light Mode**：深翡翠绿 `#039855`，严格满足 WCAG AA 4.5:1 的白底可读性。
   - **Dark Mode**：高能荧光绿 `#60FF70` / `#32F08C`，在深邃暗色底板上释放前卫科技感。
   - **悬浮激活 (Hover Activation)**：暗色下悬浮子卡片时激活高亮绿描边（`border-color: #60ff70`），伴随柔和外发光投影（`box-shadow: 0 0 0 1px rgba(96,255,112,0.14), 0 8px 24px -4px rgba(0,0,0,0.45)`）。

4. **纯白半透明边框梯度 (Translucent Border Scale)**：
   - 抛弃带蓝紫倾向的 `#232a35`，全面采用中性白色半透明透明度阶梯：
     - 一级外框 / 面板边框：`rgba(229, 229, 229, 0.10)`
     - 细微内部线：`rgba(229, 229, 229, 0.06)`
     - 二级表单输入框边框：`rgba(229, 229, 229, 0.16)`
     - 聚焦强调描边：`rgba(229, 229, 229, 0.20)`

---

## 2. 空间与架构层级 Tokens (Console Architecture Tokens)

| Token 变量名 | 浅色模式 (Light) | 暗色模式 (Dark) | 典型应用场景 |
| :--- | :--- | :--- | :--- |
| `--shell` | `#F5F5F5` | `#141414` | 全局外层底色、workspace 背景、侧边栏 Ribbon |
| `--layout-pane` / `--surface` | `#FFFFFF` | `#1A1A1A` | 控制台主面板卡片底色（圆角 14px） |
| `--layout-pane-border` | `1px solid #E7E7E7` | `1px solid rgba(255, 255, 255, 0.08)` | 主卡片外框微描边（发丝级轮廓界限） |
| `--subcard-bg` / `--code-bg` | `#FFFFFF` / `#F5F5F580` | `#161616` | 产品卡片（API、Application、MCP）与代码高亮视窗插槽底色 |
| `--subcard-border` | `1px solid #E7E7E7` | `1px solid rgba(255, 255, 255, 0.08)` | 嵌入式卡片微描边 |
| `--input-bg` | `#FFFFFF` | `#141414` | 单行/多行输入框、选择框及复合查询框插槽底色 |
| `--popover` | `#FFFFFF` | `#262626` | 下拉菜单、气泡提示卡与用户账户弹窗（清晰浮空深度） |
| `--surface-strong` | `#E2E8F0` | `#363636` | DEV 模式激活胶囊、高亮操作块 |

---

## 3. 品牌主题色 (Brand Theme Tokens)

| Token 变量名 | 浅色模式 (Light) | 暗色模式 (Dark) | 角色与场景 |
| :--- | :--- | :--- | :--- |
| `--primary` | `#039855` | `#60FF70` | 品牌主色：CTA 按钮、激活状态、重要高亮 |
| `--primary-lite` | `#00A63E` | `#60FF70` | 浅色次级高亮、暗色沿用主绿 |
| `--primary-dark` | `#60FF70` | `#60FF70` | Logo 与暗色极光点缀 |
| `--primary-bright`| `#66FF69` | `#66FF69` | 强调光晕 / 徽章高亮 |
| `--primary-muted` | `#03985587` | `rgba(96, 255, 112, 0.14)` | 品牌半透明背景、发光外圈投影 |
| `--primary-tint-soft` | `hsl(111 92% 77%)` | `hsl(111 60% 62%)` | 浅绿柔和微光 |

---

## 4. 背景与表面 (Background & Surfaces)

| Token 变量名 | 浅色模式 (Light) | 暗色模式 (Dark) | 映射场景 |
| :--- | :--- | :--- | :--- |
| `--shell` | `#F5F5F5` | `#141414` | 外壳与 workspace 背景底色 |
| `--background` | `#FCFCF8` | `#1A1A1A` | 工作区主背景底色 |
| `--surface` | `#FFFFFF` | `#1A1A1A` | 主工作卡片表面 (`.layout-pane`) |
| `--surface-subtle` | `#F8FAFC` | `rgba(212, 212, 212, 0.06)` | 输入框 / 次级卡片微表面 |
| `--surface-muted` | `#F1F5F9` | `rgba(212, 212, 212, 0.08)` | 选中项 / 微高亮交互表面 |
| `--surface-strong` | `#E2E8F0` | `#363636` | 强强调中性表面、DEV 按钮选中底色 |
| `--card` | `oklch(1 0 0)` | `#1A1A1A` | 工作台主卡片 |
| `--popover` | `oklch(1 0 0)` | `#262626` | 浮动弹出层与菜单 (拉开空间悬浮深度) |
| `--surface-inverse`| `#0F172B` | `#FFFFFF` | 反转对比表面 |
| `--background-inverse`| `#111111` | `#F5F5F5` | 反转对比背景 |

---

## 5. 文字与排版阶梯 (Typography Foregrounds)

| Token 变量名 | 浅色模式 (Light) | 暗色模式 (Dark) | 语义与层级 |
| :--- | :--- | :--- | :--- |
| `--foreground` / `--fg-body` | `#0F172B` | `#E5E5E5` | 核心正文、主文本（TraeWork Brand Grey 200） |
| `--fg-strong` | `#0F172B` | `#FAFAFA` | 强高亮文字、大标题、核心数据（Brand Grey 50） |
| `--fg-secondary` | `#314158` | `#A1A1A1` | 次级说明、辅助标签、未激活项（Text Disabled） |
| `--fg-tertiary` | `#45556C` | `#737373` | 小节弱化标签、元数据（Text Tertiary） |
| `--fg-muted` | `#62748E` | `#737373` | 弱化描述文本、占位符 |
| `--fg-faint` | `#90A1B9` | `#525252` | 极弱辅助、不可用状态 |
| `--foreground-inverse` | `#FFFFFF` | `#171717` | 反转暗文字（在纯白按钮上的字色） |

---

## 6. 边框与分隔线 (Borders & Dividers)

| Token 变量名 | 浅色模式 (Light) | 暗色模式 (Dark) | 应用规范 |
| :--- | :--- | :--- | :--- |
| `--border` | `oklch(0.922 0 0)` | `rgba(229, 229, 229, 0.10)` | 一级通用边框 |
| `--line` | `#E2E8F0` | `rgba(229, 229, 229, 0.10)` | 内容分割横线 |
| `--line-subtle` | `#F1F5F9` | `rgba(229, 229, 229, 0.06)` | 弱化内部次级线条 |
| `--input` | `oklch(0.922 0 0)` | `rgba(229, 229, 229, 0.16)` | 二级表单输入框描边 |
| `--ring` | `oklch(0.708 0 0)` | `rgba(229, 229, 229, 0.20)` | 键盘焦点与强调外圈 |
| `--panel-border` | `#E7E7E7` | `rgba(229, 229, 229, 0.10)` | 面板主边框 |
| `--card-border` | `#E7E7E7` | `rgba(255, 255, 255, 0.08)` | Overview API/Application 嵌入式子卡片微描边 |
| `--neutral-border` | `#CFD9D6` | `rgba(229, 229, 229, 0.14)` | 中性强调边框 |

---

## 7. 中性色阶梯 (Neutral Palette)

| Token 变量名 | 浅色模式 (Light) | 暗色模式 (Dark) | 用途 |
| :--- | :--- | :--- | :--- |
| `--neutral-50` | `#F3F3F3` | `#202020` | 微弱次级背景底（拉开与工作台基底对比） |
| `--neutral-100` | `#EAEAEA` | `#262626` | 次级区块背景、分段控制滑槽底 |
| `--neutral-200` | `#E0E0E0` | `#303030` | 悬浮高亮微态 |
| `--neutral-300` | `#DBDBDB` | `#3E3E3E` | 中性强调分割块、激活滑块底 |
| `--neutral-muted` | `#A3A3A3` | `#737373` | 弱化图标与文字 |
| `--neutral-foreground` | `#727272` | `#A1A1A1` | 中性次级文字 |
| `--neutral-overlay` | `#00000006` | `rgba(212, 212, 212, 0.06)` | 半透明覆盖层 |

---

## 8. 语义状态色系统 (Semantic Status Tokens)

| 语义类型 | 基础主色 (`--{status}`) | 浅底表面 (`--surface`) | 描边 (`--border`) | 前景字 (`--foreground`) | 深强调 (`--heavy`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **成功 Success** | `#009966` / `#15A877` | `rgba(21, 168, 119, 0.14)` | `rgba(21, 168, 119, 0.26)` | `#2FB287` | `#E6FAF3` |
| **警告 Warning** | `#FE9A00` / `#FEA900` | `rgba(254, 169, 0, 0.14)` | `rgba(254, 169, 0, 0.26)` | `#FFB700` | `#FFF9ED` |
| **错误 Danger** | `#E7000B` / `#E8463A` | `rgba(232, 70, 58, 0.14)` | `rgba(232, 70, 58, 0.26)` | `#EA574C` | `#FFF0F0` |
| **信息 Info** | `#155DFC` / `#2F74FF` | `rgba(47, 116, 255, 0.14)` | `rgba(47, 116, 255, 0.26)` | `#4C88FF` | `#EBF2FF` |

---

## 9. 强调色与图表色系统 (Accents & Charts)

### 强调色 (Accents)
- `--accent-green`: `#00c950` / `#32F08C`
- `--accent-teal`: `#00bba7` / `#00B983`
- `--accent-cyan`: `hsl(189 94% 43%)` / `#00B6F5`
- `--accent-sky`: `hsl(200 98% 39%)` / `#3F85FF`
- `--accent-indigo`: `#615fff` / `#6A6FFF`
- `--accent-violet`: `#8e51ff` / `#9570FF`
- `--accent-pink`: `#f6339a` / `#F53CFF`
- `--accent-rose`: `#ff2056` / `#FF6B45`
- `--accent-orange`: `hsl(25 95% 53%)` / `#FF5D4D`
- `--accent-yellow`: `#f0b100` / `#F2A90C`
- `--accent-lime`: `#7ccf00` / `#5FC000`

### 图表色 (Charts)
- `--chart-broad-search`: `#0ea5e9` / `#6A6FFF`
- `--chart-search-calls`: `#14b8a6` / `#00B983`
- `--chart-content-tokens`: `#a855f7` / `#9570FF`
- `--chart-chat-tokens`: `#ec4899` / `#F53CFF`
- `--chart-embeddings`: `#f59e0b` / `#F2A90C`
- `--chart-vl-embeddings`: `#f97316` / `#FF5D4D`
- `--chart-extract`: `#3b82f6` / `#2F74FF`
- `--chart-application`: `#8b5cf6` / `#B15EF2`
- `--chart-image-search`: `#06b6d4` / `#00B6F5`
- `--chart-video-search`: `#6366f1` / `#3F85FF`
- `--chart-model`: `#22c55e` / `#60FF70`
- `--chart-collect`: `#84cc16` / `#5FC000`
- `--chart-total`: `#64748b` / `#A1A1A1`
- `--chart-grid`: `#e2e8f0` / `rgba(229, 229, 229, 0.08)`
- `--chart-axis`: `#64748b` / `#737373`
- `--chart-cursor`: `#f8fafc` / `#202020`
- `--chart-tooltip-bg`: `#ffffff` / `#202020`
- `--chart-tooltip-border`: `#e2e8f0` / `rgba(229, 229, 229, 0.12)`
- `--chart-tooltip-label`: `#1e293b` / `#FAFAFA`

---

## 10. 代码高亮引擎规范 (Syntax Highlighting)

| 语法高亮 Token | 浅色模式 (Light) | 暗色模式 (Dark) | 语法角色与优化细节 |
| :--- | :--- | :--- | :--- |
| `--code-bg` | `rgba(245, 245, 245, 0.5)` | `#161616` | 代码视窗插槽底色，完美契合产品子卡片 |
| `--code-base` | `#0A0A0A` | `#F0F6FC` | 常规代码文字 |
| `--code-numbers` | `#A3A3A3` | `#6E7681` | 行号基准色 |
| `--code-keyword` | `#CF222E` | `#79C0FF` | 关键字、控制流（暗色采用清透冰蓝，告别报错红） |
| `--code-string` | `#0A7A3C` | `#7EE787` | 字符串文本（浅淡柔和绿） |
| `--code-function` | `#8250DF` | `#D2A8FF` | 函数调用、方法名、Python 装饰器（优雅浅紫） |
| `--code-property` | `#0550AE` | `#79C0FF` | 对象键名、JSON Key、内置属性（清透冰蓝） |
| `--code-variable` | `#953800` | `#FFA657` | CLI 参数标识（-X, -H）、变量（温暖琥珀色） |
| `--code-comment` | `#6E7781` | `#8B949E` | 注释（斜体沉浸灰） |
| `--code-punctuation`| `#57606A` | `#C9D1D9` | 符号、标点、反斜杠 |
