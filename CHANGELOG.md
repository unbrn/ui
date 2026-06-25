# Changelog

All notable changes to @unbrn/ui will be documented in this file.

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