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

### Segmented Controls (Toggle Buttons)
When building tab switchers or segmented controls, follow the "joined pill-group" structural pattern:
- **Container**: `inline-flex items-stretch border border-[#dbdbdb] rounded-[6px] p-px overflow-hidden`.
- **Items**: Must be separated by borders (e.g. `border-r border-[#dbdbdb]`), except for the last item.
- **Active State**: Brand tinted background (`bg-[#039855]/10`), primary brand text (`text-[#039855]`), and `font-medium`.
- **Inactive State**: Pure white background (`bg-white`), Secondary text color (`text-[#737373]`), and `font-normal`.
- **Interaction**: Inactive tabs can have subtle hover text color changes if needed.

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
