# Octen Console Prototype

## 🛠 Tech Stack (技术栈)

- **Markup**: HTML5
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) (loaded via CDN for utility classes)
  - Vanilla CSS (custom properties, glassmorphism effects, semantic color palette in `css/styles.css`)
- **Scripting**: Vanilla JavaScript (ES6+, DOM manipulation for Modals, Tabs, and UI state)
- **Typography**: 
  - Primary UI: `Inter`, system fonts (`-apple-system`, `BlinkMacSystemFont`)
  - Code/Monospace: `JetBrains Mono`, `ui-monospace`, `SFMono-Regular`

## 📁 Project Structure

- `octen-console-prototype.html`: The original monolithic prototype file.
- `octen-console/`: The extracted and refactored Octen Console application.
  - `index.html`: The main console application entry point (含无闪烁早期主题初始化脚本)。
  - `css/styles.css`: Custom styling, semantic color tokens, and layout classes（全量适配浅色 Light、Octen Dark 及 TraeWork Dark 规范）。
  - `js/core/sidebar.js`: 侧边栏布局与交互（包含底部直出开发模式主题切换栏 `[DEV] Theme` 及账号弹出卡片）。
  - `js/core/theme.js`: 主题状态管理模块（支持 `light`、`dark` (Octen)、`dark-trae` (TraeWork) 与 `system` 多模式切换、持久化储存与无缝样式派发）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（Cult UI 4 阶灰 + 翡翠绿体系，含可视化对照色卡 `theme-color.html`）。
- `TraeWork/`: TraeWork 设计系统与规范参考（指导 Octen Console 第三颜色模式 `dark-trae`，基于 `work.trae.cn` 的中性黑阶 `#171717` / `#262626`、纯白微透边框 `rgba(229,229,229,0.1)` 及中性排版梯度，同时完整保留当前暗色模式的高对比翡翠绿主色 `--primary: #60ff70`）。
- `_archive/`: Contains old backups and deprecated files.

