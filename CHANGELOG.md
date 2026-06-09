# Changelog

All notable changes to @unburn/ui will be documented in this file.

## [1.5.1] - 2026-06-10
### Breaking Changes
- **Strict Component Prefixing**: Renamed all component property keys to have self-documenting camelCase component-name prefixes (e.g. `buttonVariant`, `accordionItems`, `stepsItems`). This completely prevents naming conflicts and attribute pollution with standard native React/HTML attributes on root components.
- **Removed Components**: Deleted the deprecated `Tabs` and `VideoEmbed` components. Please use custom flex layouts or native HTML wrappers for embeds to reduce bundle size footprint.

### Features
- **Interactive Button Group Layouts**: Added support for `tabs` mode (with smooth draggable and slidable glassmorphic active indicators), `split` mode, and custom group layout variants in the `ButtonGroup` component.
- **VoiceAgent Live Simulation**: Added an interactive preview simulator for the `VoiceAgent` component to visualize status changes and audio analysis waves dynamically.
- **Styles & Customization Trees**: Added custom hierarchy trees and target documentation tables under component pages to list all inner key overrides (like `classNames` and `styles`).
- **Visual Syntax Highlighted Types**: Enhanced properties tables with type pill tags styled to resemble code editors, alongside robust wrapping for multi-value union options.

### Bug Fixes & Adjustments
- **Steps Timeline Connection**: Fixed vertical timeline connector alignment in the `Steps` component on mobile screens to ensure the line stretches correctly when text wraps.
- **Mobile Properties Refactor**: Converted side-by-side grouped tables into clean, stackable separated tables with a custom `title` prop override.
- **404 Routing Fix**: Fixed routing issues where page refreshes resulted in layout breakdown or 404 views.

## [1.5.0] - 2026-06-05
### Features
- **New Components**: Added `Steps`, `Tabs`, and `VoiceAgent` components to the UI library.
- **Component Accent Colors**: Added support for custom `accentColor` configuration properties across `Accordion`, `Alert`, `Badge`, and `Button`.
- **Theming Engine**: Implemented system-wide global accent state overrides for Next.js and Vite workspaces.
- **Site Favicon**: Updated documentation site favicon graphics.

## [1.4.0] - 2026-05-30
### Features
- **New Components**: Added `Slider` and `Tooltip` components to the core roster.
- **Fluid Slider Control**: Premium fluid range adjustments with live glassmorphic tooltip feeds.
- **Tooltip Popups**: Floating helper banners conforming to standard filled/outlined/duo styling variants.

## [1.3.0] - 2026-05-23
### Features
- **New Components**: Introduced the custom `VideoEmbed` component (a custom HTML5 custom video player with glassmorphic controls).
- **Import Adjustments**: Streamlined doc imports to utilize clean sub-paths.

## [1.2.0] - 2026-05-18
### Features
- **Visual Redesign**: Conducted a major website overhaul, restructuring page folders, improving navigation layouts, and redesigning showcase presentation cards.

## [1.1.1] - 2026-05-16
### Features
- **New Components**: Added `Dropzone` drag-and-drop file upload component supporting custom accept filters and file size checks.

## [1.0.0] - 2026-05-15
### Features
- **Core Library Launch**: Stable production release of `@unburn/ui`.
- **New Components**: Introduced `CodeBlock` component for dynamic syntax-highlighted code panels.
- **Build Pipeline**: Configured production library bundling via Vite/DTS, multi-framework support, and ESM/CommonJS sub-path exports.

### Bug Fixes & Adjustments
- **Blur Effect Fix**: Resolved production build regressions affecting backdrop-filter blur effects.
