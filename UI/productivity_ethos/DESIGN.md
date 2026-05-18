---
name: Productivity Ethos
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#464555'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is rooted in the philosophy of **Functional Minimalism**. It prioritizes cognitive ease and deep focus, stripping away ornamental distractions to elevate user content. The aesthetic is a hybrid of the structural clarity found in Notion and the task-oriented efficiency of Todoist.

The visual language communicates reliability and calm through generous whitespace, a restricted color palette, and a rigorous typographic scale. The goal is to evoke a sense of organized control, turning a chaotic to-do list into a structured, manageable workflow.

## Colors
This design system utilizes a high-utility palette designed for long-term legibility and focus. 

- **Primary:** A refined Indigo serves as the sole action color, drawing attention to critical tasks and "Create" actions without overwhelming the workspace.
- **Neutral/Surface:** The background uses an off-white tint to reduce eye strain compared to pure white. In dark mode, a deep charcoal is used rather than true black to maintain soft contrast.
- **Semantic:** Success (Emerald), Warning (Amber), and Error (Rose) are used sparingly, primarily for task priority indicators and status badges.

## Typography
**Inter** is the foundational typeface, selected for its exceptional legibility in data-heavy environments and its neutral, professional character. 

Hierarchy is established primarily through weight and size rather than color. Headlines use a tighter letter-spacing to appear more cohesive, while body text maintains standard spacing for maximum readability. Labels and "Meta" information use a medium weight at smaller sizes to ensure they remain functional without competing with primary task titles.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Navigation sidebars are fixed in width (240px–280px) to provide a stable anchor, while the main content area is fluid with a maximum readable width of 800px for task lists and documents.

A 4px baseline grid governs all spacing. Vertical rhythm is critical; task items should have consistent internal padding (12px to 16px) to ensure touch targets are accessible and the interface feels "airy." On mobile, margins compress to 16px, while desktop views expand to 32px or more to emphasize the minimalist aesthetic.

## Elevation & Depth
Depth is communicated through **Low-contrast Outlines** and **Ambient Shadows**. 

Avoid heavy shadows. Instead, use a single-pixel border in a light gray (`#E5E7EB`) for most containers. For interactive elements that require "lift" (like a task being dragged or a modal popover), apply a very soft, diffused shadow with a high blur radius (12px–20px) and low opacity (5%–8% black). 

Surface layering:
- **Level 0 (Background):** Off-white/Charcoal.
- **Level 1 (Cards/Sidebar):** White/Dark Gray with a 1px subtle border.
- **Level 2 (Popovers/Modals):** White/Dark Gray with ambient shadow.

## Shapes
The shape language is approachable yet disciplined. The standard corner radius is **8px** for most UI components like inputs, buttons, and task cards. 

Large containers like modals or main content areas should use **12px** (rounded-lg) to soften the overall interface. Interactive utility elements like "Add Task" buttons or search bars should never be fully pill-shaped; maintaining a consistent radius preserves the professional, structured feel of the design system.

## Components
- **Buttons:** Primary buttons use the Indigo accent with white text. Secondary buttons use a ghost style (border only) or a subtle gray fill.
- **Task Cards:** Clean rows with a 1px bottom border. Hover states are indicated by a subtle background color shift (1–2% darker/lighter) rather than a shadow change.
- **Input Fields:** Minimalist design with a focus state that highlights the border in Indigo. No heavy inner shadows.
- **Badges:** Small, rounded (4px) tags for priority. Use low-saturation background tints with high-saturation text for readability (e.g., Light Red background with Deep Red text for 'High Priority').
- **Sidebar:** Clean, vertical list with minimalist line-icons. Active states are indicated by a subtle background highlight and a 2px vertical "indicator" line on the left.
- **Checkboxes:** Circular or slightly rounded squares (4px). When checked, they should transition to the Primary Indigo with a white checkmark.