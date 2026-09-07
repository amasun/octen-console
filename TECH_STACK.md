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

