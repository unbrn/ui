import { parseColor } from './colors';

export interface ThemeConfig {
  bgMain?: string;
  bgSecondary?: string;
  borderColor?: string;
  textMain?: string;
  textMuted?: string;
  accentColor?: string;
  accentText?: string;
  bgGlass?: string;
  radius?: string;
}

/**
 * Apply a custom theme dynamically by writing CSS variables to the document element or a target element.
 */
export const applyTheme = (theme: ThemeConfig, element?: HTMLElement) => {
  if (typeof window === 'undefined') return;
  const el = element || document.documentElement;

  if (theme.bgMain) el.style.setProperty('--bg-main', theme.bgMain);
  if (theme.bgSecondary) el.style.setProperty('--bg-secondary', theme.bgSecondary);
  if (theme.borderColor) el.style.setProperty('--border-color', theme.borderColor);
  if (theme.textMain) el.style.setProperty('--text-main', theme.textMain);
  if (theme.textMuted) el.style.setProperty('--text-muted', theme.textMuted);
  if (theme.bgGlass) el.style.setProperty('--bg-glass', theme.bgGlass);
  if (theme.radius) el.style.setProperty('--radius', theme.radius);

  if (theme.accentColor) {
    el.style.setProperty('--accent-color', theme.accentColor);
    if (!theme.accentText) {
      const parsed = parseColor(theme.accentColor);
      const isLight = parsed ? parsed.isLight : false;
      el.style.setProperty('--accent-text', isLight ? '#000000' : '#ffffff');
    }
  }
  if (theme.accentText) el.style.setProperty('--accent-text', theme.accentText);
};

/**
 * Reset and remove any dynamically set custom theme variables.
 */
export const resetTheme = (element?: HTMLElement) => {
  if (typeof window === 'undefined') return;
  const el = element || document.documentElement;

  const vars = [
    '--bg-main',
    '--bg-secondary',
    '--border-color',
    '--text-main',
    '--text-muted',
    '--bg-glass',
    '--radius',
    '--accent-color',
    '--accent-text',
  ];

  vars.forEach(v => el.style.removeProperty(v));
};
