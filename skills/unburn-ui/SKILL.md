---
name: skills/unburn-ui
description: Instructions for AI agents building and styling applications with the @unburn/ui React component library.
---

# Unburn UI

This skill activates when you are writing code for a project that utilizes the `@unburn/ui` component library. `@unburn/ui` is a premium, minimalist React UI library crafted with "Soft Geometry," high-performance deep imports, and sleek glassmorphic aesthetics. 

**IMPORTANT**: Unburn UI does NOT use Tailwind CSS. It is strictly built using Vanilla CSS and highly optimized React components.

## When to use

Use this skill whenever a user asks you to:
- Build a user interface, page, or dashboard.
- Scaffold a new project using `@unburn/ui`.
- Add, style, or modify components from the `@unburn/ui` library.

## Architectural Guidelines

### 1. Zero Tailwind Policy
- **Never use Tailwind CSS classes** (`flex`, `p-4`, `text-center`, etc.) when working with `@unburn/ui`. 
- Use standard `style={{}}` objects in React or separate Vanilla `.css` files.

### 2. Deep Imports Requirement
To guarantee RSC (React Server Component) compatibility and optimal tree-shaking, you must import components using their specific module paths, rather than destructuring from the root index.

**❌ INCORRECT:**
```tsx
import { Button, Alert, Switch } from '@unburn/ui';
```

**✅ CORRECT:**
```tsx
import { Button } from '@unburn/ui/Button';
import { Alert } from '@unburn/ui/Alert';
import { Switch } from '@unburn/ui/Switch';
```

### 3. Global CSS Initialization
Every application using `@unburn/ui` must import the global stylesheet at the root level (e.g., in `main.tsx` or `App.tsx`):
```tsx
import '@unburn/ui/styles.css';
```

## Design Philosophy & Theming

Unburn UI is governed by CSS variables that power its themes. You should use these variables in your custom `style` objects to maintain visual consistency.

- **Backgrounds**: `var(--bg-main)` (Base), `var(--bg-secondary)` (Subtle offset)
- **Text**: `var(--text-main)` (Primary text), `var(--text-muted)` (Subtitles)
- **Borders**: `var(--border-color)`
- **Accents**: `var(--accent-color)` (Primary brand color), `var(--accent-text)` (Text over accent)
- **Geometry**: `var(--radius)` (Ultracurvy **`30px`** baseline for soft geometry)
- **Glassmorphism**: Always use `className="unburn-glass"` for instant, hardware-accelerated frosted glass (`backdrop-filter: blur(12px)`).

*To implement Dark Mode*, simply add `data-theme="dark"` to the `<html>` or `<body>` tag. The library will automatically invert all `var(--)` tokens.

## Three-Variant System

Every component is standardizing on exactly three styling variants:

1. **`filled`**: Solid accent background layered with `var(--filled-gradient)` for smooth theme adaptability.
2. **`outlined`**: Sleek frosted glass (`unburn-glass`) background wrapped in a dim, translucent border (`color-mix(in srgb, var(--accent-color) 15%, transparent)`).
3. **`duo`**: Similar to outlined but layered with a soft, elegant background tint (`color-mix(in srgb, var(--accent-color) 8%, transparent)`).

## Core Components Roster

You have access to the following 14 highly-polished components:

1. **`@unburn/ui/Accordion`**: Smooth, collapsible detail boxes.
2. **`@unburn/ui/Alert`**: Notification banners and warnings with level icons.
3. **`@unburn/ui/Avatar`**: User profile pictures with online/offline indicators.
4. **`@unburn/ui/Badge`**: Small pill-shaped status labels.
5. **`@unburn/ui/Button`**: Action triggers with loading state and customizable opacity.
6. **`@unburn/ui/Checkbox`**: Custom styled accessible checkboxes with proportional curves.
7. **`@unburn/ui/CodeBlock`**: Syntax highlighting with integrated copy mechanics.
8. **`@unburn/ui/Dock`**: Floating macOS-style navigation bars.
9. **`@unburn/ui/Dropzone`**: Drag-and-drop file upload areas with concentric spacing.
10. **`@unburn/ui/Input`**: Text fields with embedded icons and error states.
11. **`@unburn/ui/Select`**: Elegant glassmorphic dropdown menus.
12. **`@unburn/ui/Switch`**: Animated toggle switches with tactile click transitions and elastic physics.
13. **`@unburn/ui/Textarea`**: Expanding multi-line text boxes with limit counters.
14. **`@unburn/ui/VideoEmbed`**: A premium HTML5 custom video player with glassmorphic center play triggers and dock controls.

## Implementation Workflow

When asked to build a view using this library, follow this pattern:

1.  **Understand Requirements**: Identify which `@unburn/ui` components best map to the user's request.
2.  **Use Deep Imports**: Ensure every component is imported from its specific subpath.
3.  **Compose with Soft Geometry**: Structure layouts using standard CSS flexbox/grid. Apply `gap: '1rem'` and `padding: '2rem'` generously to let the soft UI breathe. 
4.  **Leverage Variables**: Do not hardcode hex colors for standard text or backgrounds. Always use `var(--text-main)` or `var(--bg-secondary)`.

## Example Usage

```tsx
import React from 'react';
import { Button } from '@unburn/ui/Button';
import { Switch } from '@unburn/ui/Switch';
import { Input } from '@unburn/ui/Input';

export default function SettingsPanel() {
  return (
    <div className="unburn-glass" style={{
      padding: '2rem',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      maxWidth: '400px'
    }}>
      <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 600 }}>Preferences</h2>
      
      <Input placeholder="Enter your username..." />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enable Notifications</span>
        <Switch color="#3b82f6" variant="filled" defaultChecked />
      </div>
      
      <Button variant="filled">Save Changes</Button>
    </div>
  );
}
```
