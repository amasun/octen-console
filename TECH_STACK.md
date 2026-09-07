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
  - `index.html`: The main console application entry point (含无闪烁早期主题初始化脚本)。
  - `css/styles.css`: Custom styling, semantic color tokens, layout classes, and Prism Dual-Theme code styling（全量适配浅色 Light、Octen Dark 及 TraeWork Dark 规范；严格采用 `theme/theme-color.html` 92 个 Token 命名，并在各模式下精准保真各自的原生色彩数值；搭载高对比暗色代码高亮引擎，彻底解决暗色下深字看不清问题）。
  - `js/core/syntax-highlight.js`: 语法高亮驱动模块（支持语言自动推断、行号渲染与语义类解耦，双主题模式下自动适配前景色与高亮配色）。
  - `js/core/tailwind-config.js`: Tailwind 配置扩展（注入 `primary`, `shell`, `surface`, `foreground`, `fg`, `border`, `panel-border`, `neutral`, `status`, `accent`, `chart` 等全部设计 Token 实用类，同时保持与老项目的向下兼容）。
  - `js/core/sidebar.js`: 侧边栏布局与交互（包含左上角品牌 Logo 支持暗色下动态渲染 `--primary-dark`、底部直出开发模式主题切换栏 `[DEV] Theme` 及账号弹出卡片）。
  - `js/core/theme.js`: 主题状态管理模块（支持 `light`、`dark` (Octen)、`dark-trae` (TraeWork) 与 `system` 多模式切换、持久化储存与无缝样式派发）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（Cult UI 4 阶灰 + 翡翠绿体系，含可视化对照色卡 `theme-color.html`）。
- `TraeWork/`: TraeWork 设计系统与规范参考（指导 Octen Console 第三颜色模式 `dark-trae`，基于 `work.trae.cn` 的中性黑阶 `#171717` / `#262626`、纯白微透边框 `rgba(229,229,229,0.1)` 及中性排版梯度，同时完整保留当前暗色模式的高对比翡翠绿主色 `--primary: #60ff70`）。
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
- **Syntax Highlighting (代码区域色彩规范)**:
  - **浅色模式**: 完整保持原生代码高亮体系不变（Prism/GitHub 原生规范）。
  - **双暗色模式（Octen Dark & TraeWork Dark）**: 关键字（`const`, `await`）、对象属性名（`method`, `headers`, `body`）、数字与常量全面采用 VS Code / GitHub 经典的**清透冰蓝（`#79c0ff`）**，操作符同样对齐冰蓝 `#79c0ff`，彻底消除红色的紧张与报错感，视觉平稳温和且具有现代编辑器的高级质感。

- **Composite Query Boxes (`#bsa-query-box`, `#ws-query-box`, `*-dz`)**:
  - **动态置灰交互**: 在 Query 输入框无文字时，执行按钮 `[▷ Run]` 与重置按钮 `[⟳ Clear]` 自动处于置灰不可用状态（`opacity-50 cursor-not-allowed`，`disabled`）；输入文字或选择建议词后自动激活为高亮可用状态。
  - **暗色模式父级高亮聚焦规范**: 双暗色模式（Octen Dark & TraeWork Dark）下彻底解除内层 `<textarea>` 的默认高亮边框和外阴影（`border: none !important; outline: none !important; box-shadow: none !important;`），将焦点聚焦反馈统一提升至最外层父容器边框（`focus-within` 响应 `var(--primary)` 与精细发光外圈），实现浑然一体的现代输入卡片质感。


