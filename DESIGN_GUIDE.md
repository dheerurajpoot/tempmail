# TempMail - Design Guide

## Color System

### Primary Colors
- **Blue-600**: `#2563eb` - Main brand color, buttons, highlights
- **Blue-700**: `#1d4ed8` - Button hover state
- **Blue-100**: `#dbeafe` - Light background, hover states

### Neutral Colors
- **White**: `#ffffff` - Backgrounds, cards
- **Slate-50**: `#f8fafc` - Light backgrounds, hero sections
- **Slate-100**: `#f1f5f9` - Subtle backgrounds
- **Slate-200**: `#e2e8f0` - Borders, dividers
- **Slate-600**: `#475569` - Secondary text
- **Slate-900**: `#0f172a` - Primary text

### Accent Colors
- **Green-600**: `#16a34a` - Success, enabled states
- **Red-600**: `#dc2626` - Destructive, delete actions
- **Purple-600**: `#9333ea` - Secondary accent
- **Emerald-600**: `#059669` - Completion, positive actions

### Gradient Combinations
```css
/* Blue Gradient - Primary */
background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);

/* Green Gradient - Success */
background: linear-gradient(135deg, #16a34a 0%, #059669 100%);

/* Slate Gradient - Subtle */
background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
```

## Typography

### Font Family
- **Primary**: Geist Sans (variable weight)
- **Code**: Geist Mono

### Heading Styles
```
H1 - 60px (mobile: 36px) | Bold | Line-height 1.2
H2 - 48px (mobile: 32px) | Bold | Line-height 1.3
H3 - 32px (mobile: 24px) | Semibold | Line-height 1.4
H4 - 24px | Bold | Line-height 1.5
H5 - 20px | Semibold | Line-height 1.5
H6 - 16px | Semibold | Line-height 1.6
```

### Body Text
```
Large - 18px | Regular | Line-height 1.6
Base  - 16px | Regular | Line-height 1.6
Small - 14px | Regular | Line-height 1.5
XS    - 12px | Regular | Line-height 1.5
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing System

### Base Unit: 4px

**Scale:**
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- base: 12px (0.75rem)
- md: 16px (1rem)
- lg: 20px (1.25rem)
- xl: 24px (1.5rem)
- 2xl: 32px (2rem)
- 3xl: 40px (2.5rem)
- 4xl: 48px (3rem)

**Common Usage:**
- Component padding: 16px, 20px, 24px
- Element gaps: 8px, 12px, 16px
- Section margins: 24px, 32px, 48px
- Page padding: 16px (mobile), 24px (tablet), 32px (desktop)

## Border System

### Border Radius
- **Base**: 10px (0.625rem) - Cards, buttons
- **Rounded**: 8px - Input fields, small components
- **Full**: 50% - Circular elements, badges

### Border Width
- 1px - Standard borders
- 2px - Emphasis borders, hover states
- 4px - Left accent borders

### Border Colors
```
Default    - Slate-200 (#e2e8f0)
Hover      - Slate-300 (#cbd5e1)
Focus      - Blue-500 (#3b82f6)
Error      - Red-300 (#fca5a5)
Success    - Green-300 (#86efac)
```

## Shadow System

### Shadow Scales
```
None   - No shadow (default)
sm     - 0 1px 2px 0 rgba(0, 0, 0, 0.05)
base   - 0 1px 3px 0 rgba(0, 0, 0, 0.1)
md     - 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg     - 0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl     - 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

**Usage:**
- Cards: sm or md
- Buttons (hover): md
- Modals/Overlays: lg or xl
- Hover effects: increase shadow by 1 level

## Component Styles

### Buttons

**Primary Button**
```
Background: Blue-600
Text: White, Semibold
Padding: 8px 16px (sm), 12px 20px (lg)
Border: None
Radius: 8px
Shadow: sm
Hover: Blue-700, shadow md, translate Y -2px
```

**Secondary Button**
```
Background: Slate-100
Text: Slate-900, Semibold
Padding: 8px 16px (sm), 12px 20px (lg)
Border: 1px Slate-200
Radius: 8px
Hover: Slate-200, shadow sm
```

**Ghost Button**
```
Background: Transparent
Text: Slate-600, Regular
Padding: 8px 12px
Border: None
Hover: Slate-100 background
```

### Cards
```
Background: White or Gradient (white to slate-50)
Border: 1px Slate-200
Radius: 10px
Padding: 20px, 24px
Shadow: sm
Hover: shadow md, border Blue-200 transition
Transition: 300ms ease-in-out
```

### Input Fields
```
Background: White
Text: Slate-900
Border: 1px Slate-200
Radius: 8px
Padding: 10px 12px
Focus: Border Blue-500, shadow sm
```

### Navigation Items
```
Default: Slate-600 text
Hover: Slate-900, Blue-100 background
Padding: 8px 12px
Radius: 6px
Transition: 200ms ease-in-out
```

## Animation & Transitions

### Duration
- Quick: 150ms - Micro-interactions
- Standard: 200ms - Button hover, icon changes
- Smooth: 300ms - Card transitions, panels
- Slow: 500ms - Page transitions, modals

### Easing Functions
```
Ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) - Standard
Ease-out: cubic-bezier(0.0, 0, 0.2, 1) - Entrance
Ease-in: cubic-bezier(0.4, 0, 1, 1) - Exit
Linear: cubic-bezier(0, 0, 1, 1) - Rotate, spin
```

### Common Animations
```
Fade In: opacity 0→1, 300ms
Slide Up: translate Y 10px→0, opacity 0→1, 300ms
Scale: scale 0.95→1, opacity 0→1, 200ms
Soft Pulse: opacity 1→0.8→1, 2s infinite
Hover Lift: translate Y -2px, shadow increase
```

## Responsive Design

### Breakpoints
```
xs: 0px       (default)
sm: 640px     (small tablets)
md: 768px     (tablets)
lg: 1024px    (laptops)
xl: 1280px    (desktops)
2xl: 1536px   (wide screens)
```

### Layout Approach
- Mobile-first (xs breakpoint)
- Tablet enhancements (md breakpoint)
- Desktop polish (lg+ breakpoints)

### Grid System
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3+ columns

### Typography Scaling
```
H1: 36px → 48px → 60px
H2: 28px → 36px → 48px
Body: 14px → 15px → 16px
```

## Accessibility

### Color Contrast
- Normal text: 4.5:1 (AA standard)
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### Interactive Elements
- Minimum touch target: 44px × 44px
- Focus state: Visible outline or highlight
- Keyboard navigation: Logical tab order
- ARIA labels: On all interactive elements

### Spacing for Readability
- Line height: 1.5-1.6 for body text
- Letter spacing: Normal (1em)
- Max line width: 65-75 characters

## Icon System

### Icon Sizes
- xs: 14px - Inline with small text
- sm: 16px - Inline with body text, badges
- md: 20px - Default, form controls
- lg: 24px - Headings, prominent
- xl: 32px - Large buttons, highlights

### Icon Colors
- Inherit text color when inline
- Use brand color for CTAs
- Use accent color for actions
- Use slate-400 for disabled

## Code Examples

### Card Component
```jsx
<Card className="p-6 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
  <h3 className="font-bold text-lg text-slate-900">Title</h3>
  <p className="text-slate-600 mt-2">Description</p>
</Card>
```

### Button Styles
```jsx
// Primary
<Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
  Primary Button
</Button>

// Secondary
<Button className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200">
  Secondary Button
</Button>
```

### Hover Effects
```css
.btn-hover {
  @apply hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200;
}

.card-hover {
  @apply hover:shadow-lg hover:border-blue-200 transition-all duration-300;
}
```

## Dark Mode (Future)

When implementing dark mode:
- Invert colors appropriately
- Increase contrast for readability
- Use darker backgrounds
- Lighter text colors
- Adjusted shadows

---

**Created**: April 21, 2026
**Version**: 1.0
**Framework**: Next.js 16 + Tailwind CSS v4
