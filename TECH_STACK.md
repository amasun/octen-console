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
  - `index.html`: The main console application entry point.
  - `css/styles.css`: Custom styling, semantic color tokens, and layout classes.
- `theme/`: Abstracted design and color tokens documentation (`README.md`) for Octen Console (Cult UI 4-color palette).
- `tradecode/`: Independent dark-first design system and theme reference documentation (`README.md`) aligned with TraeCode / Nimbus Core.
- `_archive/`: Contains old backups and deprecated files.
