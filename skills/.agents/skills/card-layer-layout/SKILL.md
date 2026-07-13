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
- **Styling**: Must use a clean, solid light grey (`#f3f4f6` or `oklch(96% 0 240)`) for high-contrast light modes, or a dark subtle vignette for dark modes. The goal is to provide a neutral ground that makes the white cards pop.
- **Rules**: Global outer-window controls (like titlebar buttons) and Outer Sidebars sit directly on this layer.

### B. The Floating Card Layer (Active Workspace Depth)
- **Role**: Wraps all primary interactive workspaces (e.g., Folder Tree, Main Content Area, Sidebar Panels).
- **Styling**: Cards are enclosed containers that must feature:
  - **Pronounced border-radii** (`12px` to `18px`).
  - **Soft, multi-layered shadows** to create an illusion of floating.
  - A high-contrast background color (e.g., pure white `#ffffff` or `oklch(100% 0 0)`) that stands out sharply against a slightly darker base background, creating a crisp, premium layer contrast.

### C. The Outer Control Ribbon (Card-Adjacent Depth)
- **Role**: Houses global navigation icons, toolbars, or **full left-side navigation sidebars**.
- **Styling**: It must reside **outside the workspace cards**, sitting directly on the Base Layer.
- **Rules**:
  - The Ribbon/Sidebar has **no solid background color** (it is transparent, letting the Base Layer show through). It is NOT a white floating card.
  - Hover states on ribbon buttons or sidebar links should trigger a soft, semi-transparent background bubble, rather than lighting up the entire column.

---

## 🎨 2. Standard CSS Variable System

Ensure the following design tokens are registered and consistently referenced:

```css
:root {
  /* --- Parametric Color Base --- */
  --bhue: 240; 
  
  /* --- Backgrounds --- */
  --bg-workspace: oklch(96.00% 0.002 var(--bhue)); /* Clean, solid light grey base */
  
  --background-primary: #ffffff;
  --background-secondary: #ffffff; /* High contrast pure white card base */
  
  /* --- Radii Scale --- */
  --radius-s: 6px; /* Buttons, tags, inner items */
  --radius-m: 8px; /* Inner panels, tabs, lists */
  --radius-l: 12px; /* Recommended floating card border-radius */
  
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
  padding: 0 var(--vl-layout-padding) var(--vl-layout-padding) 0; /* Gap at bottom and right */
  min-height: 0;
}

/* outer control bar */
.ribbon {
  display: flex;
  flex-direction: column;
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

/* floating card containers */
.pane {
  background: var(--background-secondary); /* Lighter card color */
  border-radius: var(--radius-l); /* Rounded floating card */
  box-shadow: var(--shadow-workspace); /* Glass border + drop shadow */
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}
```

---

## 🔍 4. Verification Checklist for AI Agents

When tasked to build or audit a card-layered visual interface:
1. **[ ] Ambient Depth**: Does the `body` use a clean, solid light grey (for high contrast light mode) or a subtle dark vignette (for dark mode)?
2. **[ ] Gap Isolation**: Are there pronounced Gaps/Paddings (e.g., `10px`) between the cards and the outer sidebar/screen edges? (Cards must NEVER touch the ribbon or each other directly).
3. **[ ] Outer Control Separation**: Does the left control ribbon or navigation sidebar sit directly on the base layer WITHOUT a white card background? (It must be transparent, blending into the base layer).
4. **[ ] Rounded Card Borders**: Do the panels (`.pane`, `.editor-pane`) have a rounded corner border-radius of `12px` (or `8px` for inner elements)?
5. **[ ] Card High-Contrast Separation**: Do the cards pop with a pure white background (`#ffffff`) and a fine shadow outline to separate them from the grey base, avoiding muddy "glass" inset shadows?
