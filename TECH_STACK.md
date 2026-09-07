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
  - `css/styles.css`: Custom styling, semantic color tokens, and layout classes（全量适配浅色 Light、Octen Dark 及 TraeCode Dark 规范）。
  - `js/core/sidebar.js`: 侧边栏布局与交互（包含底部直出开发模式主题切换栏 `[DEV] Theme` 及账号弹出卡片）。
  - `js/core/theme.js`: 主题状态管理模块（支持 `light`、`dark` (Octen)、`dark-trae` (TraeCode) 与 `system` 多模式切换、持久化储存与无缝样式派发）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（Cult UI 4 阶灰 + 翡翠绿体系，含可视化对照色卡 `theme-color.html`）。
- `TraeCode/` (traecode): 独立暗色 IDE 与工作台设计系统规范（Nimbus Core / Dark-first 炭灰质感规范，提供 `--bg-base-default: #1A1B1D`、`--bg-base-secondary: #222427`、`rgba(224, 226, 242, 0.1)` 边框体系；Octen Console 在采纳其暗色规范的同时完整保留了当前暗色模式的翡翠绿主色 `--primary: #60ff70`）。
- `_archive/`: Contains old backups and deprecated files.

