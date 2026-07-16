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
- `octen-broad-search/`: The extracted and refactored directory focusing on the "Broad Search" feature.
  - `index.html`: The main entry point for Broad Search.
  - `css/styles.css`: Extracted custom styles, CSS variables, and light/dark theme definitions.
- `_archive/`: Contains old backups and deprecated files.
