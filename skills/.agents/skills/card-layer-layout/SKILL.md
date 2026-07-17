---
name: card-layer-layout
version: 0.1
description: Guidelines for building modern card-layered UI layouts, canvas-based dashboards, multi-pane application layouts, or floating panel interfaces (like Obsidian, Linear, or Figma). Triggers on requests involving: Floating Panel, Card Layout, Z-Axis Elevation, Depth System, split panel layout, sidebar layout, white cards on gray background, high-contrast light mode UI, Z-depth shadows, outer toolbars, or dashboard structures.
---

# 🌌 Card-Layered Layout System (Obsidian Velocity Style)

This skill enforces a premium, next-generation visual design system characterized by **Base Layers**, **Z-Axis Floating Cards**, and **Outer Sidebars**. It eliminates flat, wire-frame partitions and replaces them with realistic physical depth.

---

## 📐 1. Core Architecture Principles

**⚠️ Color System Compatibility Rule:** If the user already has an existing color system or design tokens (e.g., custom Tailwind theme, semantic CSS variables), **you MUST preserve their colors and prioritize modifying ONLY the layout structure**. Apply the structural rules (gaps, border-radii, shadows, z-depth) without breaking their existing brand or semantic colors. Only adjust background contrast (Base Layer vs. Card Layer) if it does not conflict with their established design system.

To implement this layout, designers and developers must structure the UI using three distinct visual depths:

### A. The Base Layer (Background Depth)
- **Role**: Serves as the absolute bottom canvas of the application (e.g., HTML/body background, Titlebars).
- **Styling**: Must use a clean, solid neutral grey (`#F5F5F5` / `var(--bg-workspace)`) for high-contrast light modes, or a dark subtle vignette for dark modes. Global text color defaults to `#020617` (`var(--text-normal)`).
- **Rules**: Global outer-window controls (like titlebar buttons) and Outer Sidebars sit directly on this layer.

### B. The Floating Card Layer (Active Workspace Depth)
- **Role**: Wraps all primary interactive workspaces (e.g., Folder Tree, Main Content Area, Sidebar Panels).
- **Styling**: Cards (`.pane` / `.layout-pane`) are enclosed containers that must feature:
  - **Pronounced border-radius**: `border-radius: 16px`.
  - **Crisp subtle border contour**: `border: 1px solid #E7E7E7`.
  - **Pure white card background**: `background: #FFF` (`#ffffff`) that stands out sharply against the `#F5F5F5` base background.
  - High-contrast text color (`#020617`).

### C. The Outer Control Ribbon / Sidebar (.ribbon, .sidebar)
- **Role**: Houses global navigation icons, toolbars, or **full left-side navigation sidebars**.
- **Styling**: Both `.ribbon` and `.sidebar` must reside **outside the workspace cards**, sitting directly on the Base Layer.
- **Rules**:
  - Hover states on ribbon buttons or sidebar links trigger a soft, semi-transparent background bubble (`var(--background-modifier-hover)`), rather than lighting up the entire column.

### D. Multi-Pane Split Workspaces (Left/Right Layouts)
- **Role**: When building horizontal split views (e.g. Parameters on the left, Code/Response on the right).
- **DOM Naming**: The left and right blocks MUST explicitly use the `pane` or `layout-pane` class. (Do not use generic `bg-white rounded-md` cards).
- **Height constraint**: The left and right `pane` blocks MUST stretch to fill the height of the container (use `min-h-0`, `flex: 1`, or `h-full`).
- **Gap Control**: The parent container MUST explicitly control the gap between the panes, strictly set to `gap: 4px;`.
- **Split Handle**: A `<div class="split-handle"></div>` MUST be placed between the two panes to allow the user to resize them, while the parent container's `gap: 4px` manages the visual spacing.

---

## 🎨 2. Standard CSS Variable System

Ensure the following design tokens are registered and consistently referenced:

```css
:root {
  /* --- Global Backgrounds & Text (from octen-broad-search standard) --- */
  --bg-workspace: #F5F5F5; /* Clean, solid neutral grey base */
  --text-normal: #020617; /* High-contrast slate primary text */
  
  --background-primary: #ffffff;
  --background-secondary: #ffffff; /* Pure white card base (#FFF) */
  
  /* --- Typography --- */
  --font-ui: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-code: "JetBrains Mono", monospace;
  
  /* --- Card Pane Standard --- */
  --pane-bg: #FFF;
  --pane-border: 1px solid #E7E7E7;
  --pane-radius: 16px;
  
  /* --- Radii Scale --- */
  --radius-s: 6px; /* Buttons, tags, inner items */
  --radius-m: 8px; /* Inner panels, tabs, lists */
  --radius-l: 16px; /* Floating card border-radius */
  
  /* --- Gaps & Padding --- */
  --vl-layout-padding: 10px; /* Gap between cards and screen edges */
  --vl-inner-padding: 12px; /* Standard internal padding for cards */
  --ribbon-width: 56px;
  --titlebar-height: 36px;

  /* --- Z-Axis Depth Shadows --- */
  --shadow-outline: 0 0 0 1px rgba(0, 0, 0, 0.04); /* Soft outer stroke to separate white card */
  --shadow-normal: 0px 8px 30px 0px rgba(0, 0, 0, 0.05); /* Cleaner, wider float shadow */
  --shadow-workspace: var(--shadow-outline), var(--shadow-normal);
}
```

---

## 🏗️ 3. Layout Implementation Template

Use this HTML/CSS skeleton as the starting boilerplate for any card-layered dashboard:

### HTML
```html
<div class="app">
  <!-- Titlebar belongs to Base Layer -->
  <div class="titlebar">
    <div class="title">My App Dashboard</div>
  </div>

  <div class="workspace">
    <!-- Outer Sidebar: Transparent, sits on Base Layer -->
    <div class="ribbon">
      <button class="ribbon-btn active"><svg>...</svg></button>
      <button class="ribbon-btn"><svg>...</svg></button>
      <div class="ribbon-spacer"></div>
      <div class="ribbon-logo">V</div>
    </div>

    <!-- Workspace Body: Houses the floating cards -->
    <div class="workspace-body">
      <!-- Card 1: Navigation Pane -->
      <aside class="pane nav-pane">
        <div class="pane-header"><h2 class="pane-title">Files</h2></div>
        <div class="pane-body">...</div>
      </aside>

      <!-- Card 2: Main Workspace Canvas -->
      <main class="pane editor-pane">
        <div class="pane-body">...</div>
      </main>

      <!-- Card 3: Contextual Panel -->
      <aside class="pane sidebar-pane">
        <div class="pane-body">...</div>
      </aside>
    </div>
  </div>
</div>
```

### CSS
```css
/* base app frame */
.app {
  display: grid;
  grid-template-rows: var(--titlebar-height) 1fr;
  height: 100vh;
  width: 100vw;
  background: var(--bg-workspace); /* Base Layer Vignette */
}

/* workspace grid */
.workspace {
  display: grid;
  grid-template-columns: var(--ribbon-width) 1fr;
  padding: var(--vl-layout-padding) var(--vl-layout-padding) var(--vl-layout-padding) 0; /* 10px 10px 10px 0 padding for pane parent */
  min-height: 0;
}

/* 2-column split pane parent (parent controls 4px gap) */
.layout-columns.cols-2 {
  display: flex;
  flex-direction: row;
  padding: var(--vl-layout-padding) var(--vl-layout-padding) var(--vl-layout-padding) 0;
  box-sizing: border-box;
  gap: 4px; /* Parent strictly controls gap */
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
}
.layout-columns.cols-2 > .pane,
.layout-columns.cols-2 > .layout-pane {
  flex: 1 1 0%;
  min-width: 0 !important;
  max-width: 100%;
  height: 100%;
  min-height: 0;
}

/* Split handle in between panes */
.split-handle {
  position: relative;
  width: 0;
  margin: 0 -2px; /* Pulls panes together to preserve exactly 4px gap */
  flex-shrink: 0;
  cursor: col-resize;
  z-index: 50;
}
.split-handle::before {
  content: "";
  position: absolute;
  top: 0; bottom: 0;
  left: -2px; right: -2px;
  z-index: 50;
}

/* outer control bar / navigation sidebar (shared styles for .ribbon and .sidebar) */
.ribbon, .sidebar, .ribbon-sidebar {
  display: flex;
  flex-direction: column;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}
.ribbon {
  align-items: center;
  gap: 4px;
  padding: 8px 0 12px 8px;
}

.ribbon-btn {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-m);
  color: var(--icon-color);
  background: transparent; /* Flat on base layer */
  border: none;
  cursor: pointer;
  transition: background 0.15s ease-out;
}
.ribbon-btn:hover {
  background: rgba(255, 255, 255, 0.05); /* Soft bubble hover */
}

/* workspace body grid containing cards */
.workspace-body {
  display: grid;
  grid-template-columns: 260px 1fr 240px;
  gap: var(--vl-layout-padding); /* Gaps between cards */
  padding-left: var(--vl-layout-padding); /* Push cards away from Ribbon */
  min-height: 0;
}

/* floating card containers (.pane / .layout-pane) */
.pane, .layout-pane {
  background: #FFF;
  border-radius: 16px;
  border: 1px solid #E7E7E7;
  box-shadow: var(--shadow-workspace);
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

/* code & typography standard (JetBrains Mono) */
code {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.86em;
  background: var(--code-background, rgba(0, 0, 0, 0.035));
  padding: 0.18em 0.42em;
  border-radius: var(--radius-s, 6px);
  color: rgb(225, 60, 66);
}
pre {
  background: rgba(80, 75, 100, 0.12);
  padding: 16px 18px;
  border-radius: var(--radius-m, 8px);
  margin: 0 0 1em;
  overflow-x: auto;
}
pre code {
  background: none;
  padding: 0;
  color: var(--text-normal, #020617);
  line-height: 1.55;
}

/* code block containers (e.g. #bsa-code) */
.code-container, #bsa-code {
  border-radius: 8px;
  border: 1px solid #F5F5F5;
  background: rgba(245, 245, 245, 0.50);
}
```

---

## 🔍 4. Verification Checklist for AI Agents

When tasked to build or audit a card-layered visual interface:
1. **[ ] Ambient Depth**: Does the `body` use clean neutral grey `#F5F5F5` (`--bg-workspace`) with `#020617` primary text (`--text-normal`) for high-contrast light mode?
2. **[ ] Gap Isolation**: Are there pronounced Gaps/Paddings (`10px`) between cards and screen edges? (Cards must NEVER touch the ribbon or each other directly).
3. **[ ] Outer Control Separation**: Do both `.ribbon` and `.sidebar` sit directly on the base layer WITHOUT a white card background? (Transparent, blending into base layer).
4. **[ ] Card Borders & Radii**: Do the panels (`.pane`, `.layout-pane`) have `border-radius: 16px` and crisp contour `border: 1px solid #E7E7E7`?
5. **[ ] Card High-Contrast Separation**: Do the cards pop with pure white background (`#FFF` / `#ffffff`) against the `#F5F5F5` base?
6. **[ ] Typography & Code Styling**: Does code content (`code`, `pre`) use **`JetBrains Mono`** (`font-family: "JetBrains Mono", monospace`) with clear background spacing and line-height?
