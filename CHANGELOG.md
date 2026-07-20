# Changelog

All notable changes to @unbrn/ui will be documented in this file.

## [2.2.0] - 2026-07-20
### Features & Refinements
- **Added "Arcade" Background**: Introduced the `Arcade` background component, a customizable, retro-themed WebGL shader animation with interactive grid effects, speed, noise, and color tuning.

## [2.1.0] - 2026-07-02
### Features & Refinements
- **Numeric Sizing System Overhaul**: Converted all size properties across all UI components from string literals (`"sm"`, `"default"`, `"lg"`) to numeric values (`1 | 2 | 3` or `1 | 2 | 3 | 4 | 5` for Avatar) to simplify layouts and standardize theming:
  - 3-tier components (`Button`, `Input`, `Select`, `Checkbox`, `ColorPicker`, `Dock`, `Slider`, `Switch`) now support `size={1} | {2} | {3}`.
  - Sizing classes resolved correctly via local helper functions mapping numeric props to their responsive CSS values (e.g. `.size-sm`, `.unbrn-badge-sm`, etc.).
- **Smart Theme Variables (`base.css`)**: Enhanced core design system variables to dynamically calculate secondary backgrounds, borders, muted text, and translucent glass backdrop elements using CSS `color-mix()` relative to the base `--bg-main` and `--text-main` values. Custom accents default to match main text/bg automatically.
- **Cleaned Component Props**: Standardized the properties across all 18 UI components, docs site examples, consumer app, and Next.js arcade app to use clean, unprefixed props (e.g., refactoring `SelectOption` properties from `optionLabel`/`optionIcon` to `label`/`icon`).
- **Responsive ColorPicker Swatches**: Sized the ColorPicker preview swatch responsive to trigger button sizing (e.g., `14px` for size 1, `18px` for size 2, `22px` for size 3).
- **Removed Size 3 from Action & Badge Components**: Restricted size props of `Action` and `Badge` components to `1 | 2`, cleaning up large item showcases and API documentation.
- **Removed Button Split Feature**: Deleted the `split` prop, related conditional group CSS rules, and showcase sections from `ButtonGroup` and `Button` components.

### Bug Fixes & Bundling Optimization
- **Vite Production Bundler & Duplicate React Fix**: Configured module resolution aliases (`react`, `react-dom`, `lucide-react`) and path normalization inside Vite's config. This deduplicates React/Lucide React instances during production builds in monorepo workspaces, completely resolving the blank page (`TypeError: Cannot read properties of null (reading 'useState')`) rendering issue on `npm run preview`.
- **Mobile Header Visibility Fix**: Prevented the header from hiding on scroll down on mobile viewports (`window.innerWidth <= 768`), ensuring consistent navigation visibility.
- **Mobile Spacing & Padding Adjustments**: 
  - Aligned `.home-page` mobile margins with the rest of the documentation layout by setting padding to `0 20px`.
  - Added `flexWrap: 'wrap'` to flex containers in component showcases to prevent horizontal scrolling/clipping on small viewports.

## [2.0.3] - 2026-06-30
### Features & Refinements
- **Redesigned Alert and Accordion Components**: Overhauled the visual design and layouts of `Alert` and `Accordion` components for improved aesthetics and usability.

## [2.0.2] - 2026-06-25
### Features & Refinements
- **Select Menu Overflow Handling**: Implemented horizontal fading masks (`mask-image`) for long text option labels, input text, and trigger values.
- **Select Layout Enhancements**: Refined layout spacing with standardized gaps and adjusted font size for large select triggers.

## [2.0.1] - 2026-06-24
### Features
- **Added Custom Accent Colors**: Added custom accent colors for `Input`, `Select`, and `Textarea` components.
- **Select Autocomplete**: Added autocomplete support to `Select`.
- **Sizing Support**: Added sizes to select items and `Action` components.

### Bug Fixes & Adjustments
- **Mobile Backgrounds**: Optimized background animations/shaders for mobile viewports.

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