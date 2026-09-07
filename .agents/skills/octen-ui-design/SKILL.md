---
name: octen-ui-design
description: Design guidelines and CSS patterns for Octen Console UI (Cult UI style, minimalist 4-color palette, segmented controls). Use this skill when modifying or creating new UI components in the Octen Console project.
---

# Octen Console Design Guidelines

## 1. Color System (Minimalist 4-Color Palette)
To maintain the "Cult UI" aesthetic, the interface must strictly adhere to a 4-color grayscale palette. Avoid using standard Tailwind grays (e.g., `slate-500`, `gray-400`).

- **Primary (`#0A0A0A`)**: High emphasis. Use for headings, active tab text, primary actions, and hover states for text.
- **Secondary (`#737373`)**: Medium emphasis. Use for standard body text, inactive tabs, menu items, and secondary labels.
- **Tertiary (`#A3A3A3`)**: Low emphasis. Use for placeholders, subtle icons, disabled text, and meta information.
- **Surface (`#F5F5F5`)**: Background emphasis. Use for secondary containers, segmented control backgrounds, and subtle hover states (or `#E5E5E5` for stronger hover).

*(Note: Syntax highlighting and specific brand/action colors like green or red are exempt from this limit).*

## 2. Component Abstractions

### Segmented Controls (Toggle Buttons) & Form Pills
When building tab switchers or form pills (like Time Basis), follow one of these structural patterns:

**1. Form Pills (.ui-pills)** (Preferred for form elements)
- **Container**: Use `.ui-pills`. It provides `display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; border-radius: 6px; border: 1px solid #dbdbdb; height: 32px; overflow: hidden;`
- **Items**: Use `.ui-pill`. It provides `font-size: 14px`, `height: 32px`, pure white inactive background with `#737373` text, and proper hover states.
- **Active State**: `.ui-pill.active` provides the green brand tint and text color.
- **Note**: This ensures perfectly equal-width segments (based on the longest word) that tightly hug the content without stretching to 100% width.

**2. Standard Segment Group (.seg-group)** (Preferred for module-level language toggles)
- **Container**: `.seg-group`.
- **Items**: `.seg-item`.

### Form Element Dimensions & Typography
- **Uniform Height**: All inline form components (buttons, dropdowns, date pickers, segmented controls) must have a uniform height of **32px**.
- **Date Range Buttons**: Buttons like `#bsa-date-btn` should use `text-sm` (14px font size) and be 32px high.
- **Typography**: Form elements should generally use 14px text (`text-sm`) instead of `text-xs` to maintain readability.

### Borders and Forms
- **Form Borders**: All form elements (inputs, segmented controls, dropdown borders) must use `#DBDBDB` for their border color (`border-[#dbdbdb]`) instead of Tailwind's default slate grays.
- **Borderless Preference**: For major structural areas (internal layout panes), prefer separating visual areas using background contrasts (e.g., a white pane on a surface background) rather than hard borders.
- **Tight Layouts**: Eliminate redundant paddings (`pt-1 pb-2`, etc.) on flex wrappers when the child elements already dictate the height and spacing. Keep alignments flush and compact.

### Typography (Tailwind Scale)
The project strictly enforces a 6-level typography scale based on Tailwind's defaults. Custom pixel sizes (e.g. `10px`, `13px`, `17px`, `text-[11px]`) are **strictly prohibited**.
- **xs (12px)**: Auxiliary text, badges, secondary table data, and tiny button labels (`text-xs`).
- **sm (14px)**: Primary body text, standard buttons, standard table data, menu items (`text-sm`).
- **base (16px)**: Form inputs, sub-headers, primary navigation items (`text-base`).
- **lg (18px)**: Standard panel headers, modal titles (`text-lg`).
- **xl (20px)**: Large modal titles or emphasis headers (`text-xl`).
- **4xl (36px)**: Heroic typography and splash screen headers (`text-4xl`).

## 4. Spacing Scale (Tailwind Default)
Always use the default Tailwind spacing scale for margins and paddings, relying on increments of 4px. Custom arbitrary spacing values should be avoided.
- **1 (4px)**: `p-1`, `m-1`, `gap-1`
- **2 (8px)**: `p-2`, `m-2`, `gap-2`
- **3 (12px)**: `p-3`, `m-3`, `gap-3`
- **4 (16px)**: `p-4`, `m-4`, `gap-4`
- **6 (24px)**: `p-6`, `m-6`, `gap-6`
- *(etc... following Tailwind's standard `0.25rem` multiplier scale)*

## 5. Layout Panes (Containers)
The primary layout panes (`.layout-pane`) must adhere to the following visual specifications:
- **Border Radius**: 16px (`rounded-2xl`)
- **Border**: 1px solid `#E7E7E7`
- **Background**: `#FFFFFF` (Pure White)
*(Note: These rules override standard border colors specifically for structural panes to create softer page boundaries).*

## 6. Code Block Containers
Containers for syntax-highlighted code or raw text areas (like `#bsa-code`) should use a subtle, semi-transparent background to blend seamlessly with pure white surfaces:
- **Border Radius**: 8px (`rounded-lg`)
- **Border**: 1px solid `#F5F5F5` (`border-[#f5f5f5]`)
- **Background**: `rgba(245, 245, 245, 0.50)` (`bg-[#f5f5f5]/50`)
