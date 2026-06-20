# Changelog

All notable changes to @unbrn/ui will be documented in this file.

## [2.0.0] - 2026-06-20
### Features
- **Added new Component (`ColorPicker`)**: Introduced a highly-interactive, premium color picker component with support for custom formats, visual spectrum selection, presets, and alpha channel configuration.
- **Introducing Background Shaders**:
  - Added the `LiquidChrome` background component (a highly-dynamic fluid chrome liquid canvas animation).
  - Added the `LumenBeam` background component (a premium interactive beam light shader effect).
  - Added the `SatinFlow` background component (a smooth, modern flowing color pattern animation).
- **Library Rebranding**: Rebranded the package from `@unburn/ui` to `@unbrn/ui` across all codebases, packages, imports, and references.
- **Redesigned Documentation Site**:
  - Overhauled the documentation homepage with a left-aligned hero layout, modern typography, and a fading Liquid Chrome background.
  - Redesigned the sticky header to include inline navigation links, a mobile-responsive search trigger, and Discord link integrations.
  - Unified sizing structures (`sm`, `default`, `lg`) and heights (`32px`/`42px`/`52px`) across inputs, buttons, and select dropdowns.

### Bug Fixes & Adjustments
- **Properties and API Validation**: Verified and corrected property tables across all component pages (including `Checkbox`, `Dock`, `Input`, `Slider`, and `VoiceAgent`) to ensure 100% alignment with actual TypeScript interfaces.
- **Textarea Class Typo**: Standardized styling class names in `Textarea.css` to use hyphens (`unbrn-textarea-*`), matching the React component classes.
- **Mobile Responsiveness**: Addressed multiple styling regressions on smaller viewports, including header spacing, padding alignments, and hero button stacking on the homepage.

## [1.5.3] - 2026-06-14
### Features
- **Added new Component (`Action`)**: Introduced a customizable popover and action-list component supporting flexible positions, alignments, controlled state, custom headers/footers, and custom accents.
- **Select Component Enhancements**:
  - Added support for item-specific leading icons (`selectOptionIcon`) and default trigger icons (`selectIcon`).
  - Added support for asynchronous loading state (`selectLoading`) featuring an elegant, responsive spinner and proper `aria-busy` state mapping.
  - Implemented dynamic positioning (`dropdownPosition`) that intelligently switches alignment to open `top` or `bottom` depending on available viewport height.
  - Integrated custom accent color configurations (`selectAccentColor`).
- **Dock Component Overrides**:
  - Implemented nested button context propagation (`ButtonContext`), enabling uniform styling (`dockButtonSize`, `dockButtonVariant`, `dockButtonAccentColor`) to propagate from `Dock` to all children buttons automatically.
  - Added corner positioning (`top-left`, `top-right`, `bottom-left`, `bottom-right`) for extra placement flexibility.
  - Added a `dockShowMenuToggle` flag to optionally hide the default menu/hamburger icon trigger.
- **Button Component Enhancements**:
  - Introduced a clean, subtle `ghost` variant (`buttonVariant="ghost"`).
  - Integrated `ButtonContext` support to seamlessly inherit sizing/variant configurations when nested inside parent wrappers (like `Dock`).
- **Standard React Children Support**: Added fallbacks to allow standard `children` arrays alongside custom layout props (`buttonChildren`, `alertChildren`, `badgeChildren`, `dockChildren`, `tooltipChildren`, `stepsChildren`, and `stepChildren`).
- **Enhanced Glassmorphism Aesthetics**:
  - Increased backdrop-filter blur on the core `.unbrn-glass` class to `20px` for a richer, more premium feel.
  - Automatically applied glass styling properties to `ButtonGroup`, `Select` dropdowns, outlined `CodeBlock`s, `Dropzone` panels, outlined/duo `Textarea` wrappers, and `Tooltip` bubbles.

### Bug Fixes & Adjustments
- **Docs Layout Simplification**: Refactored the `Props` layout tables to display a clean, flat list of component options instead of split prop groups, simplifying properties tables across all component pages.
- **Docs Maintenance**: Cleaned up obsolete layout and showcase references to the deleted "Video Embed" component, and updated previews for `Select` and `Dock` components to showcase new customization options.

## [1.5.2] - 2026-06-10
### Bug Fixes & Adjustments
- **Fixed Dock Collapse Button Styles**: Restored the missing built-in `.unbrn-dock-collapse-btn` CSS class to the collapse Button component in `Dock.tsx` so that it receives correct library styling.
- **Cleaned Up Unused Styles**: Removed unused CSS rules (`.unbrn-code-terminal-icon` in CodeBlock, `.unbrn-mobile-dock` in Dock, and `.unbrn-voice-status-badge` in VoiceAgent) to minimize styling footprint.
- **Quality & ESLint Improvements**:
  - Removed unused `err` parameters in `Button.tsx` catch blocks.
  - Type-narrowed the frequency data array in `VoiceAgent.tsx` to eliminate `as any` casting.
  - Wrapped color updates in `useCallback` to prevent component re-render loops in `VoiceAgent.tsx`.
  - Deferred synchronous state updates in docs `App.tsx` router effect using microtasks to prevent cascading render warnings.
  - Created proper `GitHubRelease` interfaces in `ChangelogPage.tsx` to ensure type-safe release mapping.

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
- **Core Library Launch**: Stable production release of `@unbrn/ui`.
- **New Components**: Introduced `CodeBlock` component for dynamic syntax-highlighted code panels.
- **Build Pipeline**: Configured production library bundling via Vite/DTS, multi-framework support, and ESM/CommonJS sub-path exports.

### Bug Fixes & Adjustments
- **Blur Effect Fix**: Resolved production build regressions affecting backdrop-filter blur effects.
