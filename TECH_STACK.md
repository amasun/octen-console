# Octen Console Prototype

## 🛠 Tech Stack (技术栈)

- **Markup**: HTML5
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) (loaded via CDN for utility classes)
  - Vanilla CSS (custom properties, glassmorphism effects, semantic color palette in `css/styles.css`)
- **Scripting**: Vanilla JavaScript (ES6+, DOM manipulation for Modals, Tabs, and UI state)
- **Typography**: 
  - Primary UI: `DM Sans`, system fonts (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`)
  - Code/Monospace: `JetBrains Mono`, `ui-monospace`, `SFMono-Regular`

## 📁 Project Structure

- `octen-console-prototype.html`: The original monolithic prototype file.
- `octen-console/`: The extracted and refactored Octen Console application.
  - `index.html`: The main console application entry point (含无闪烁早期主题初始化脚本，原生支持 Light 与 Dark 双主题体系及 System 自动跟随，并对历史缓存主题平滑兼容自动映射)。
  - `css/styles.css`: Custom styling, semantic color tokens, layout classes, and Prism Dual-Theme code styling（全面移除旧版偏蓝的 Octen Dark 方案，将 TraeWork 极简高质感中性黑方案全面晋升为标准 Dark 模式：外层底色 `#141414`、主工作台底板 `#1a1a1a`、嵌入式产品子卡片 `#161616`，结合微量透白发丝轮廓线与标志性 Octen 翡翠绿 `--primary: #60ff70`；搭载高对比暗色代码高亮引擎，彻底消除冗余覆盖）。
  - `js/core/syntax-highlight.js`: 语法高亮驱动模块（支持语言自动推断、行号渲染与语义类解耦，双主题模式下自动适配前景色与高亮配色）。
  - `js/core/tailwind-config.js`: Tailwind 配置扩展（注入 `primary`, `shell`, `surface`, `foreground`, `fg`, `border`, `panel-border`, `neutral`, `status`, `accent`, `chart` 等全部设计 Token 实用类，同时保持与老项目的向下兼容）。
  - `js/core/sidebar.js`: 侧边栏布局与交互（包含左上角品牌 Logo 支持暗色下动态渲染 `--primary-dark` 及底部账号弹出卡片内置 3 状态 `☀️ Light` / `🌙 Dark` / `💻 System` 快速切换行）。
  - `js/core/theme.js`: 主题状态管理模块（标准双主题引擎：支持 `light`、`dark` 与 `system` 模式切换、历史遗留方案平滑自动升级、持久化储存与无缝样式派发）。
- `octen-sidebar/`: 独立侧边栏工程化套件（专用于单独调整和测试侧边栏结构，支持数据驱动声明式配置、纯净双主题 Token 抽取、键盘无障碍及独立画板预览测试）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（包含最新 v2.0 详细设计规范文档 `COLOR_SPEC.md`、新一代交互色板 `theme-color v1.1.html` 以及原参照色卡 `theme-color.html`）。
- `handoff/`: 完整的交付/转交包目录，专为下游研发与设计对接准备（包含无代码纯设计规范说明文档 `README.md`、新版 92-Token 交互色板 `theme-color v1.1.html`、Token 规范文件 `COLOR_SPEC.md` 以及包含 Overview 与 Broad Search 完整交互的原型工程 `sample/`）。
- `TraeWork/`: TraeWork 设计系统与规范参考（作为标准 Dark 模式的核心基准：采用五阶空间暗色深度——外层工作区与输入框采用 `#141414`，产品子卡片采用 `#161616`，主工作台面板采用 `#1a1a1a`，浮动弹层与菜单拉开至 `#262626`，强强调胶囊提升至 `#363636`，纯白微透边框梯度与纯净中性排版灰阶，同时完整保留高对比翡翠绿主色 `--primary: #60ff70`）。
- `_archive/`: Contains old backups and deprecated files.

## 🎨 UI Component Standards (组件交互与视觉规范)

- **Action Buttons (`Run` & `Clear`)**:
  - **顺序规范**: `[▷ Run]` 在前（主动作/正向），`[⟳ Clear]` 在后（辅助动作/重置）。
  - **图标升级**:
    - `Run`: 采用纤细现代的线框镂空圆角播放三角（`polygon points="6 3 20 12 6 21 6 3"`，描边粗细 `stroke-width="2.2"`）。
    - `Clear`: 采用现代单向顺时针环形刷新箭头（`path d="M21 12a9 9 0 1 1-9-9..."`，统一 `2.2` 描边粗细）。
- **Single-line Inputs & Selects (`.ui-input`, `.ui-select`)**:
  - **高度规范**: 单行高度严格统一为 `36px`（`box-sizing: border-box; line-height: 34px; padding: 0 12px;`），多行 `textarea` 保留弹性自适应高度。
  - **无文字溢出**: 基于 `14px` 正文字体 `DM Sans` 计算基准线，上下垂直居中且留有充足行高余量，彻底消除文字上下被截断（clipping）或溢出容器的问题。
  - **去除浏览器上下箭头**: 全局应用 `-webkit-appearance: none;` 及 `-moz-appearance: textfield;`，彻底去除 Chrome/Edge/Firefox 等内置数字输入框的右侧上下步进箭头（spin buttons）。
  - **暗色模式输入框背景色规范 (`#141414`)**: 暗色模式下所有表单输入框（`.ui-input`、`input`、`select`、`.ui-select`）以及复合查询容器（`#bsa-query-box`、`#ws-query-box`、`[id$="-dz"]`）背景色统一由微透色升级为深邃沉浸黑 `#141414`（`--input-bg: #141414`），在主面板卡片底板 `#1a1a1a` 上形成内凹嵌合槽位质感，内部透明 textarea 保持透气，聚焦时触发高亮翡翠绿描边。
- **Syntax Highlighting (代码区域全语言色彩优化与规范)**:
  - **浅色模式**: 完整保持原生代码高亮体系不变（Prism/GitHub 原生规范）。
  - **全暗色主题（Octen Dark, TraeWork Dark）多语言全覆盖**:
    - **通用基底**: 关键字（`const`, `import`, `def`）、常量/布尔（`True`, `False`, `null`）与操作符全面采用 VS Code / GitHub 经典的**清透冰蓝（`#79c0ff`）**，彻底消除红色（`#cf222e`/`#ff7b72`）带来的报错感与视觉紧张。
    - **JavaScript / TypeScript**: 关键字为清透冰蓝 `#79c0ff`，对象属性键名（`method`, `headers`, `body`）为 `#79c0ff`，函数与 API 调用（`fetch`, `json`）为优雅浅紫 `#d2a8ff`，字符串为浅绿 `#7ee787`。
    - **Python 专项精细优化**:
      - 修复内置函数/类型（`print`, `len`, `dict`, `str`, `int`, `range` 等 `.token.builtin`）此前被误染为字符串绿色的问题，统一重定为清透冰蓝 `#79c0ff`；
      - 装饰器（`@retry`, `@app.route`）指定为函数浅紫 `#d2a8ff`；布尔值 `True`/`False`/`None` 在所有暗色主题下完整覆盖冰蓝 `#79c0ff`。
    - **cURL / Bash 专项精细优化**:
      - 修复此前 `curl`、`export`、`jq` 等命令行函数被染为绿色的问题，将命令主体指定为标志性冰蓝 `#79c0ff`，与普通字符串产生明确命令层级；
      - 参数标识符（`-X`, `-H`, `-d`, `--header`, `--url`）统一呈现为温暖琥珀色（`#ffa657`），与后接字符串或参数值层次分明；
      - 续行反斜杠 `\` 保持精致沉着标点银灰 `#c9d1d9`，Shebang（`#!/bin/bash`）呈现斜体沉浸注释灰 `#8b949e`。
    - **JSON 专项精细优化**: 键名（Key）保持清透冰蓝 `#79c0ff`，字符串值（Value）采用柔和天蓝 `#a5d6ff`，数值/布尔为冰蓝 `#79c0ff`。

- **Composite Query Boxes (`#bsa-query-box`, `#ws-query-box`, `*-dz`)**:
  - **动态置灰交互**: 在 Query 输入框无文字时，执行按钮 `[▷ Run]` 与重置按钮 `[⟳ Clear]` 自动处于置灰不可用状态（`opacity-50 cursor-not-allowed`，`disabled`）；输入文字或选择建议词后自动激活为高亮可用状态。
  - **暗色模式父级高亮聚焦规范**: 双暗色模式（Octen Dark & TraeWork Dark）下彻底解除内层 `<textarea>` 的默认高亮边框和外阴影（`border: none !important; outline: none !important; box-shadow: none !important;`），将焦点聚焦反馈统一提升至最外层父容器边框（`focus-within` 响应 `var(--primary)` 与精细发光外圈），实现浑然一体的现代输入卡片质感。

- **Main Card Layout Pane in Dark Mode (`.layout-pane` 主面板卡片暗色层级规范)**:
  - **新方案：工业控制台底板与微量发丝边框**: 暗色模式下主面板容器 `.layout-pane` 统一采用开阔通透的 `#1a1a1a` 作为控制台主工作台底色，边框采用微量半透明微描边（`border-color: rgba(255, 255, 255, 0.07) !important`），与外层工作区底色 `--shell`（`#141414`）形成细腻发丝级轮廓界限。

- **Overview Dashboard & Subcard Interactions (Overview 子卡片悬浮与暗色层级规范)**:
  - **新方案：嵌入式深色卡片 (`#161616`) 与区别于背景的微描边**: Overview 中所有子卡片（API、Application、Getting Started、Built with MCP）采用更深邃纯粹的 `#161616` 作为嵌入式插槽暗底；默认边框由原同色升级为**区别于背景的优雅微描边**（`border-color: rgba(255, 255, 255, 0.08) !important`），在 `#1a1a1a` 主面板上清晰界定卡片物理轮廓，极大提升卡片内文字标题、描述、图标与徽标的边缘锐度与立体质感。Application 子卡片底部操作区横向分隔线同步适配为微量半透微线（`rgba(255, 255, 255, 0.06)`）。
  - **暗色模式 Hover 高亮绿边框 (`.ov-card`)**: 悬浮至任何子卡片时，触发标志性翡翠绿高亮边框（`border-color: var(--primary) !important`，暗色下解析为 `#60ff70`），并伴随柔和外发光微投影（`box-shadow: 0 0 0 1px var(--primary-muted), 0 8px 24px -4px rgba(0, 0, 0, 0.45)`），右上角交互箭头同步点亮为高亮绿，形成极具未来感的“暗盒激活点亮”质感。
  - **Application 排版字号统一规范**: Application 卡片描述正文与底部操作项（Try now）从原 12px（`text-xs`）统一升级为 14px（`text-sm`），与 API 核心卡片正文字号视觉平衡一致。

- **Date Range Calendar Picker Dark Mode Synchronization (`.cal-pop`, `*-datepop`, `*-date-pop`)**:
  - **组件全暗色主题同步**: 在暗色模式下，日期范围选择器（Broad Search API、Web Search、Multimodal / Image / Video Search 等全模块）完整同步为暗色质感，彻底消除原生硬编码浅色背景及文字。
  - **容器悬浮层级**: 弹出框背景设为 `#1c1c1c`（浮于 `#1a1a1a` 主面板之上），描边使用细致微白半透 `rgba(229, 229, 229, 0.12)`，配合深邃漫反射外投影 `0 16px 40px rgba(0, 0, 0, 0.7)`。
  - **左侧预设栏 (Presets)**: 隔断线使用 `rgba(229, 229, 229, 0.1)`；未选中项为 `#a1a1a1`，悬浮底色 `#262626`；选中高亮项底色为品牌翡翠绿半透 `rgba(96, 255, 112, 0.14)`，文字为高亮绿 `#60ff70`。
  - **日期网格 (Calendar Grid)**: 月份标题为强高亮白 `#fafafa`，星期表头（DOW）为次级灰 `#737373`；本月常规日期为 `#e5e5e5`（悬浮为 `#262626` / `#fafafa`），跨月非本月日期为 `#525252`。
  - **高对比范围选中态**:
    - **起止选中日 (Start / End)**: 采用品牌绿高亮底色 `#60ff70`，文字反转为高对比沉浸黑 `#141414`（字重 600），清晰醒目。
    - **区间跨度日 (Mid Range)**: 采用半透浅绿底色 `rgba(96, 255, 112, 0.16)`，文字为 `#60ff70`，区段层次鲜明。
  - **操作按钮与触发项**:
    - `Clear` 按钮采用深色基底 `#262626` 配合 `rgba(229, 229, 229, 0.16)` 边框；
    - `Apply` 按钮采用品牌翡翠绿 `#60ff70` 配合黑字 `#141414`；
    - 外部触发选择框（`#bsa-date-btn`、`#ws-date-btn`、`[id$="-datebtn"]`）背景统一同步为表单沉浸黑 `#141414`，选中值显示明亮白，重置时呈现 `#737373`。

- **Overview Capability Matrix Sub-Tier Badges (`.subtier-badge`, Figma Node 14006:6748)**:
  - **参考 Figma 规范优化子组标题**: 在 Overview 能力矩阵面板（如 Search 多层级子组）中，将原有的文本管道符风格（`Search | Pulse`）优化为 Figma 14006:6748 规范的倾斜胶囊徽标样式。
  - **徽标视觉规格 (`.subtier-badge`)**:
    - **倾角造型**: `transform: skewX(-12deg)`，呈现极具科技与速度感的平行四边形倾斜质感。
    - **背景与边框**: 浅色模式采用极深黑基底 `#0d0d0d` 搭配 `#0a0a0a` 边框，白字高亮；暗色模式下反转为纯白高亮基底 `#ffffff` 搭配纯黑文字 `#0a0a0a`（圆角 `4px`，内边距 `1.5px 5.5px`），形成强烈反差的暗盒发光/视觉焦点质感。
    - **字体与排版**: 统一使用等宽字体 `'JetBrains Mono', monospace`，字重加粗 700，字号 11.5px；浅色下白字 `#ffffff`，暗色下黑字 `#0a0a0a`，紧凑单行对齐。
    - **无分割线流式布局**: 去除子组之间的硬质横向分割线，完全依靠卡片网格和呼吸间距（`gap-6`）进行自然视觉分区，整体界面更加轻盈通透。

- **Plan B Sidebar Search Group Redesign (`.search-group`, Figma Node 13942:158402 & 14006:6541)**:
  - **结构重构与三级子组**: 依据 Figma `13942:158402` 与 `14006:6541` 最新规范，全面重构 Plan B 侧边栏的 Search 大组（Frame: `Search group`）。Search 大组下设立 3 个子组：`PULSE`（Pulse Search，搭配 `lucideZap` 图标）、`FAST`（Web Search, Broad Search, Image Search, Video Search）及 `PREMIER`（News Search, Business Search, Place Search）。
  - **树形引导线与方块指示器**:
    - 每个子组标题（`PULSE`, `FAST`, `PREMIER`）左侧均配有一根自顶向下的 `1px` 垂直连接贯通线（`#D9D9D9` / 暗色 `rgba(255,255,255,0.12)`）与顶部 `5px x 5px` 小方块指示器（`.search-subtier-square`）。
    - 默认/未激活状态：方块为纯浅灰 `#D9D9D9`（暗色下 `rgba(255,255,255,0.25)`），子组标题为大写 12px 灰色 `#717680`。
  - **精准状态解耦（Hover 与 Click/Active 交互规范）**:
    - **激活/点击状态 (Active)**: 当某个子组包含当前激活的路由项时，该子组标题左侧方块点亮为标志性亮绿 `#2EA842`，子组标题同步变更为绿色 `#039855`（暗色模式 `#60ff70`），被激活的导航项背景呈现为 `#eaeaea`（暗色 `#262626`）。
    - **悬浮状态 (Hover)**: 鼠标悬停任意导航项时，**仅改变被悬停项目的背景底色**（`#eaeaea` / 暗色 `#262626`），小方块严格保持原有颜色不变（方块不随 hover 变色，仅由激活状态驱动），完全符合 Figma 设计意图。
    - **工程化双目录同步**: 完整同步更新 `octen-sidebar/` 与 `octen-sidebar/src/` 中的 `sidebar-config.js`、`sidebar-component.js` 以及 `sidebar.css`，保持全局一致性。
  - **Image Search 图标修正**: 按照设计最新矢量规范修正 `Image Search` 的 18x18 SVG 图标（图片相框 + 群山轮廓 + 聚焦放大镜），消除视口边界溢出问题，统一采用 `fill="currentColor"` 保持全主题自适应（浅色 `#171717`，暗色高对比 `#e5e5e5`）。


