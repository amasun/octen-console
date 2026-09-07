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
  - `css/styles.css`: Custom styling, semantic color tokens, and layout classes（全量适配基于 `theme-color.html` 的深色与浅色模式）。
  - `js/core/theme.js`: 主题状态管理模块（支持 Light / Dark / System 三态切换、持久化储存与系统偏好监听）。
- `theme/`: Octen Console 现行主题规范与抽象颜色 Token（Cult UI 4 阶灰 + 翡翠绿体系，含可视化对照色卡 `theme-color.html`）。
- `TraeCode/` (traecode): 独立暗色 IDE 与工作台设计系统参考（Nimbus Core / Dark-first IDE & Dashboard 规范，仅作为参考索引归档，不影响或改变 Octen Console 现行主题）。
- `_archive/`: Contains old backups and deprecated files.
