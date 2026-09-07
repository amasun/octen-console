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
  - `index.html`: The main console application entry point (含无闪烁早期主题初始化脚本，无缝兼容 Light、Octen Dark 及 Trae Dark 三套模式)。
  - `css/styles.css`: Custom styling, semantic color tokens, layout classes, and Prism Dual-Theme code styling（全量适配浅色 Light、Octen Dark 及 Trae Dark 规范；严格采用 `theme/theme-color.html` 92 个 Token 命名，并在各模式下精准保真各自的原生色彩数值；搭载高对比暗色代码高亮引擎，彻底解决暗色下深字看不清问题）。
  - `js/core/syntax-highlight.js`: 语法高亮驱动模块（支持语言自动推断、行号渲染与语义类解耦，双主题模式下自动适配前景色与高亮配色）。
  - `js/core/tailwind-config.js`: Tailwind 配置扩展（注入 `primary`, `shell`, `surface`, `foreground`, `fg`, `border`, `panel-border`, `neutral`, `status`, `accent`, `chart` 等全部设计 Token 实用类，同时保持与老项目的向下兼容）。
  - `js/core/sidebar.js`: 侧边栏布局与交互（包含左上角品牌 Logo 支持暗色下动态渲染 `--primary-dark`、底部直出 3 格开发模式主题切换栏 `[DEV] Theme` 及账号弹出卡片）。
  - `js/core/theme.js`: 主题状态管理模块（支持 `light`、`dark` (Octen)、`dark-trae` (Trae) 与 `system` 模式切换、持久化储存与无缝样式派发）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（Cult UI 4 阶灰 + 翡翠绿体系，含可视化对照色卡 `theme-color.html`）。
- `TraeWork/`: TraeWork 设计系统与规范参考（指导 Octen Console 第三颜色模式 `dark-trae`，侧边栏与外层 workspace 背景统一采用纯粹深邃的 `#141414`，主卡片面板采用 `#171717`，纯白微透边框 `rgba(229,229,229,0.1)` 及中性排版梯度，同时完整保留当前暗色模式的高对比翡翠绿主色 `--primary: #60ff70`）。
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
  - **背景与边框同色微提亮规范**: 暗色模式下，主面板卡片容器 `.layout-pane` 背景色在保持与边框同色（无生硬外边框线）的前提下微幅提亮（Octen Dark 下微提亮至 `--surface: #141922`，Trae Dark 下微提亮至 `--surface: #1a1a1a`），使主卡片比外层工作台底色 `--shell`（`#05070b` / `#141414`）更加清晰立体的同时，严格低于内层子卡片背景色 `--neutral-100`（`#1f242d` / `#202020`），形成极致和谐的“工作区底色 < 主卡片 < 子卡片”三阶灰度秩序。

- **Overview Dashboard & Subcard Interactions (Overview 子卡片悬浮与暗色层级规范)**:
  - **暗色模式 Hover 高亮绿边框 (`.ov-card`)**: 悬浮至 API、Application、Getting Started 及 Built with MCP 等所有子卡片时，边框统一高亮为标志性翡翠绿（`border-color: var(--primary) !important`，暗色下解析为 `#60ff70`），并伴随柔和外发光微投影（`box-shadow: 0 0 0 1px var(--primary-muted), 0 8px 24px -4px rgba(0, 0, 0, 0.45)`），右上角交互箭头同步点亮为高亮绿。亮色模式下优雅过渡至品牌绿 `#039855`。
  - **API & Application 子卡片背景与边框同色灰度阶梯 (`.ov-api-card`, `.ov-app-card`)**: 暗色模式下，主卡片背景为 `--surface`，8 个 API 子卡片及 4 个 Application 子卡片统一采用设计系统标准灰度 Token `--neutral-100`（明显亮于主卡片背景：Dark 下为 `#1f242d`，Trae 下为 `#202020`）；默认状态下卡片外边框与卡片背景完全同色（`border-color: var(--neutral-100) !important`），呈现极简无缝的块面层级，并在 Hover 时平滑点亮高亮绿边框。
  - **Application 排版字号统一规范**: Application 卡片描述正文与底部操作项（Try now）从原 12px（`text-xs`）统一升级为 14px（`text-sm`），与 API 核心卡片正文字号视觉平衡一致。



