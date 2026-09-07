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
  - `index.html`: The main console application entry point (含无闪烁早期主题初始化脚本，无缝兼容 Light、Octen Dark、Trae Dark 及 Trae Cool 四套模式)。
  - `css/styles.css`: Custom styling, semantic color tokens, layout classes, and Prism Dual-Theme code styling（全量适配浅色 Light、Octen Dark、Trae Dark 以及 10% 冷色调中和的 Trae Cool 规范；严格采用 `theme/theme-color.html` 92 个 Token 命名，并在各模式下精准保真各自的原生色彩数值；搭载高对比暗色代码高亮引擎，彻底解决暗色下深字看不清问题）。
  - `js/core/syntax-highlight.js`: 语法高亮驱动模块（支持语言自动推断、行号渲染与语义类解耦，双主题模式下自动适配前景色与高亮配色）。
  - `js/core/tailwind-config.js`: Tailwind 配置扩展（注入 `primary`, `shell`, `surface`, `foreground`, `fg`, `border`, `panel-border`, `neutral`, `status`, `accent`, `chart` 等全部设计 Token 实用类，同时保持与老项目的向下兼容）。
  - `js/core/sidebar.js`: 侧边栏布局与交互（包含左上角品牌 Logo 支持暗色下动态渲染 `--primary-dark`、底部直出 4 格开发模式主题切换栏 `[DEV] Theme` 及账号弹出卡片）。
  - `js/core/theme.js`: 主题状态管理模块（支持 `light`、`dark` (Octen)、`dark-trae` (Trae)、`dark-cool` (Trae Cool 10% 冷色) 与 `system` 多模式切换、持久化储存与无缝样式派发）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（Cult UI 4 阶灰 + 翡翠绿体系，含可视化对照色卡 `theme-color.html`）。
- `TraeWork/`: TraeWork 设计系统与规范参考（指导 Octen Console 第三颜色模式 `dark-trae`，侧边栏与外层 workspace 背景统一采用纯粹深邃的 `#141414`，主卡片面板采用 `#171717`，纯白微透边框 `rgba(229,229,229,0.1)` 及中性排版梯度，同时完整保留当前暗色模式的高对比翡翠绿主色 `--primary: #60ff70`）。
- **Theme 4: Trae Cool (10% 冷色中和暗色主题)**:
  - **设计理念**: 以 `work.trae.cn` 的纯粹炭黑梯阶和通透现代架构为基底（占比 90%），中和 Octen 的深海蓝调，**适度注入约 10% 的冷色钛灰调（Cool Slate / Titanium Grey）**。
  - **核心色阶公式**:
    - `--shell`（外衬底与侧边栏）: `#22252a`（带有 6% 极微冷钛灰碳色，彻底消除死板无生气的纯炭黑感）
    - `--background` & `--surface` & `--card`（工作区与面板卡片）: `#15171c`（冷蓝石墨黑，RGB 21, 23, 28，微蓝冷色阶，提供卓越沉浸感与眼部舒适度）
    - `--border` & `--line`: `rgba(215, 228, 250, 0.11)`（微透冰白描边，精致冷冽）
    - `--foreground` / `--fg-body`: `#E2E6EE`（微冷银白正文字阶，高对比且不刺眼）
    - `--primary`: 完整保留 Octen 标志性翡翠绿 `#60ff70`
    - `--code-bg`: `#15171c`（融合 VS Code 冰蓝语法高亮体系）
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
  - **全暗色主题（Octen Dark, TraeWork Dark, Trae Cool Dark）多语言全覆盖**:
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


