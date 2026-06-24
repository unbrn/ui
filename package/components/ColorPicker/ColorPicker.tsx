"use client";

import React, { useState, useEffect, useRef, forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import { Input } from '../Input/Input';
import { Slider } from '../Slider/Slider';
import { Pipette } from 'lucide-react';
import './ColorPicker.css';

export interface ColorPickerProps {
  colorPickerValue?: string;
  colorPickerDefaultValue?: string;
  colorPickerOnChange?: (color: string) => void;
  colorPickerDisabled?: boolean;
  colorPickerLabel?: React.ReactNode;
  colorPickerVariant?: 'filled' | 'outlined' | 'duo';
  colorPickerSize?: 'sm' | 'default' | 'lg';
  colorPickerAlign?: 'left' | 'center' | 'right';
  colorPickerClassName?: string;
  colorPickerStyle?: React.CSSProperties;
  colorPickerId?: string;
  colorPickerAccentColor?: string;
  colorPickerShowEyeDropper?: boolean;
  colorPickerShowAlpha?: boolean;
  classNames?: {
    colorPickerRoot?: string;
    colorPickerTrigger?: string;
    colorPickerPopover?: string;
    colorPickerInputContainer?: string;
  };
  styles?: {
    colorPickerRoot?: React.CSSProperties;
    colorPickerTrigger?: React.CSSProperties;
    colorPickerPopover?: React.CSSProperties;
    colorPickerInputContainer?: React.CSSProperties;
  };
}

// HSV color structure interface
interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

// Helper: Hex -> RGB (with alpha)
function hexToRgb(hex: string) {
  let cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3 || cleanHex.length === 4) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  let a = 1.0;
  if (cleanHex.length === 8) {
    a = parseInt(cleanHex.slice(6, 8), 16) / 255;
  }
  return {
    r: isNaN(r) ? 255 : r,
    g: isNaN(g) ? 255 : g,
    b: isNaN(b) ? 255 : b,
    a: isNaN(a) ? 1.0 : a
  };
}

// Helper: RGB -> HSV
function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

// Helper: HSV -> RGB
function hsvToRgb(h: number, s: number, v: number) {
  h /= 360;
  s /= 100;
  v /= 100;

  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Helper: RGB -> Hex (with optional alpha)
function rgbToHex(r: number, g: number, b: number, a: number = 1.0): string {
  const toHex = (c: number) => {
    const hex = Math.min(255, Math.max(0, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  const baseHex = '#' + toHex(r) + toHex(g) + toHex(b);
  if (a < 1.0) {
    const alphaHex = toHex(Math.round(a * 255));
    return baseHex + alphaHex;
  }
  return baseHex;
}

// Hex -> HSV wrapper
function hexToHsv(hex: string): HSV {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsv(r, g, b);
}

// HSV -> Hex wrapper
function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

// Helper: RGB -> HSL
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Helper: HSL -> RGB
function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r = l, g = l, b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Helper: HSL -> Hex
function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

// Format color to display string
function formatColorString(hex: string, format: 'hex' | 'rgb' | 'hsl', alpha: number = 1.0): string {
  if (format === 'hex') return hex.toUpperCase();
  const { r, g, b } = hexToRgb(hex);
  if (format === 'rgb') {
    if (alpha < 1.0) {
      return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2).replace(/\.?0+$/, '')})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
  const { h, s, l } = rgbToHsl(r, g, b);
  if (alpha < 1.0) {
    return `hsla(${h}, ${s}%, ${l}%, ${alpha.toFixed(2).replace(/\.?0+$/, '')})`;
  }
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Parse input string based on format
function parseColorInput(value: string, format: 'hex' | 'rgb' | 'hsl'): { hex: string; alpha: number } | null {
  const trimmed = value.trim();
  if (format === 'hex') {
    let hex = trimmed;
    if (!hex.startsWith('#')) hex = `#${hex}`;
    if (/^#[0-9A-F]{6}$/i.test(hex) || /^#[0-9A-F]{3}$/i.test(hex)) {
      return { hex, alpha: 1.0 };
    }
    if (/^#[0-9A-F]{8}$/i.test(hex) || /^#[0-9A-F]{4}$/i.test(hex)) {
      const { a } = hexToRgb(hex);
      return { hex: hex.slice(0, 7), alpha: a };
    }
  } else if (format === 'rgb') {
    const match = /^rgba?\(?\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)?$/i.exec(trimmed);
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      const a = match[4] ? parseFloat(match[4]) : 1.0;
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1.0) {
        return { hex: rgbToHex(r, g, b), alpha: a };
      }
    }
  } else if (format === 'hsl') {
    const match = /^hsla?\(?\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*(?:,\s*([\d.]+)\s*)?\)?$/i.exec(trimmed);
    if (match) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10);
      const l = parseInt(match[3], 10);
      const a = match[4] ? parseFloat(match[4]) : 1.0;
      if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100 && a >= 0 && a <= 1.0) {
        return { hex: hslToHex(h, s, l), alpha: a };
      }
    }
  }
  return null;
}

export const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  (
    {
      colorPickerClassName,
      colorPickerStyle,
      colorPickerValue: controlledValue,
      colorPickerDefaultValue,
      colorPickerOnChange,
      colorPickerDisabled = false,
      colorPickerLabel,
      colorPickerVariant = 'filled',
      colorPickerSize = 'default',
      colorPickerAlign = 'left',
      colorPickerId,
      colorPickerAccentColor,
      colorPickerShowEyeDropper = true,
      colorPickerShowAlpha = true,
      classNames,
      styles
    },
    ref
  ) => {
    const generatedId = useId();
    const resolvedId = colorPickerId || generatedId;

    const [color, setColor] = useState<string>(controlledValue ?? colorPickerDefaultValue ?? '#FFFFFF');
    const [alpha, setAlpha] = useState<number>(() => {
      const initial = controlledValue ?? colorPickerDefaultValue ?? '#FFFFFF';
      return hexToRgb(initial).a;
    });
    const [isOpen, setIsOpen] = useState(false);
    const [inputFormat, setInputFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
    const [textInputValue, setTextInputValue] = useState(() => formatColorString(color, 'hex', hexToRgb(color).a));
    const [hsv, setHsv] = useState<HSV>(() => hexToHsv(color));
    const [isEyeDropperSupported, setIsEyeDropperSupported] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>('bottom');

    useEffect(() => {
      setIsEyeDropperSupported(typeof window !== 'undefined' && 'EyeDropper' in window);

      const updateDefaultColor = () => {
        if (controlledValue === undefined && colorPickerDefaultValue === undefined) {
          const isLightTheme = typeof document !== 'undefined' &&
            document.documentElement.getAttribute('data-theme') === 'light';
          const targetColor = isLightTheme ? '#000000' : '#FFFFFF';
          setColor(targetColor);
          setHsv(hexToHsv(targetColor));
          setTextInputValue(targetColor);
        }
      };

      updateDefaultColor();

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-theme') {
            updateDefaultColor();
          }
        });
      });

      if (typeof document !== 'undefined') {
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme']
        });
      }

      return () => observer.disconnect();
    }, [controlledValue, colorPickerDefaultValue]);

    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const svPanelRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Redraw Saturation-Value Canvas when Hue changes
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Fill base HSL color
      ctx.fillStyle = `hsl(${hsv.h}, 100%, 50%)`;
      ctx.fillRect(0, 0, width, height);

      // Horizontal white gradient
      const whiteGrad = ctx.createLinearGradient(0, 0, width, 0);
      whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      whiteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = whiteGrad;
      ctx.fillRect(0, 0, width, height);

      // Vertical black gradient
      const blackGrad = ctx.createLinearGradient(0, height, 0, 0);
      blackGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      blackGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = blackGrad;
      ctx.fillRect(0, 0, width, height);
    }, [hsv.h, isOpen]);

    const getCombinedHex = (h: number, s: number, v: number, a: number) => {
      const { r, g, b } = hsvToRgb(h, s, v);
      return rgbToHex(r, g, b, a);
    };

    useEffect(() => {
      if (controlledValue !== undefined) {
        setColor(controlledValue);
        const parsed = hexToRgb(controlledValue);
        setHsv(rgbToHsv(parsed.r, parsed.g, parsed.b));
        setAlpha(parsed.a);
        setTextInputValue(formatColorString(controlledValue, inputFormat, parsed.a));
      }
    }, [controlledValue, inputFormat]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const popoverHeight = 320;

        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
          setPopoverPosition('top');
        } else {
          setPopoverPosition('bottom');
        }
      }
    }, [isOpen]);

    const updateColor = (newColor: string) => {
      if (colorPickerDisabled) return;

      const parsed = hexToRgb(newColor);
      const newHex = rgbToHex(parsed.r, parsed.g, parsed.b, parsed.a);

      if (controlledValue === undefined) {
        setColor(newHex);
        setAlpha(parsed.a);
      }
      setHsv(rgbToHsv(parsed.r, parsed.g, parsed.b));
      setTextInputValue(formatColorString(newHex, inputFormat, parsed.a));
      colorPickerOnChange?.(newHex);
    };

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setTextInputValue(val);

      const parsed = parseColorInput(val, inputFormat);
      if (parsed) {
        const fullHex = rgbToHex(
          hexToRgb(parsed.hex).r,
          hexToRgb(parsed.hex).g,
          hexToRgb(parsed.hex).b,
          parsed.alpha
        );
        if (controlledValue === undefined) {
          setColor(fullHex);
          setAlpha(parsed.alpha);
        }
        setHsv(hexToHsv(parsed.hex));
        colorPickerOnChange?.(fullHex);
      }
    };

    const togglePopover = () => {
      if (colorPickerDisabled) return;
      setIsOpen(prev => !prev);
    };

    const handleEyeDropper = async () => {
      if (typeof window === 'undefined' || !('EyeDropper' in window)) return;
      try {
        // @ts-expect-error - EyeDropper is a draft browser API not yet in global typescript lib
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          updateColor(result.sRGBHex);
        }
      } catch (error) {
        if (error && typeof error === 'object' && 'name' in error && error.name !== 'AbortError') {
          console.error(error);
        }
      }
    };

    const cycleInputFormat = () => {
      const nextFormat = inputFormat === 'hex' ? 'rgb' : inputFormat === 'rgb' ? 'hsl' : 'hex';
      setInputFormat(nextFormat);
      setTextInputValue(formatColorString(color, nextFormat, alpha));
    };

    const updateSvFromCoords = (clientX: number, clientY: number) => {
      if (!svPanelRef.current) return;
      const rect = svPanelRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
      const y = Math.min(Math.max(0, clientY - rect.top), rect.height);

      const s = Math.round((x / rect.width) * 100);
      const v = Math.round(100 - (y / rect.height) * 100);

      const newHex = getCombinedHex(hsv.h, s, v, alpha);

      setHsv(prev => ({ ...prev, s, v }));
      if (controlledValue === undefined) {
        setColor(newHex);
      }
      setTextInputValue(formatColorString(newHex, inputFormat, alpha));
      colorPickerOnChange?.(newHex);
    };

    const handleSvStart = (e: React.MouseEvent | React.TouchEvent) => {
      if (colorPickerDisabled) return;
      e.preventDefault();

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      updateSvFromCoords(clientX, clientY);

      const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
        const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
        const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
        updateSvFromCoords(moveX, moveY);
      };

      const handleEnd = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    };



    const activeAccentColor = colorPickerVariant === 'duo'
      ? color
      : (colorPickerAccentColor || undefined);

    const accentStyle = getAccentVariables(activeAccentColor) as React.CSSProperties & Record<string, string>;
    if (activeAccentColor) {
      const { r, g, b } = hexToRgb(activeAccentColor);
      accentStyle['--accent-color-rgb'] = `${r}, ${g}, ${b}`;
    }

    return (
      <div
        className={cn(
          "unbrn-color-picker-root",
          colorPickerDisabled && "unbrn-color-picker-disabled",
          classNames?.colorPickerRoot
        )}
        style={{ ...colorPickerStyle, ...styles?.colorPickerRoot, ...accentStyle }}
      >
        {colorPickerLabel && (
          <label
            htmlFor={resolvedId}
            className="unbrn-color-picker-label"
          >
            {colorPickerLabel}
          </label>
        )}

        <div className="unbrn-color-picker-wrapper">
          <button
            id={resolvedId}
            ref={(node) => {
              if (ref) {
                if (typeof ref === 'function') ref(node);
                else (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
              }
              (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }}
            type="button"
            disabled={colorPickerDisabled}
            onClick={togglePopover}
            className={cn(
              "unbrn-color-picker-trigger",
              `unbrn-color-picker-trigger-${colorPickerSize}`,
              `unbrn-color-picker-trigger-${colorPickerVariant}`,
              (colorPickerVariant === 'outlined' || colorPickerVariant === 'duo') && 'unbrn-glass',
              isOpen && "unbrn-color-picker-trigger-active",
              colorPickerClassName,
              classNames?.colorPickerTrigger
            )}
            style={styles?.colorPickerTrigger}
          >
            <span
              className="unbrn-color-picker-swatch-preview"
              style={{ backgroundColor: color }}
            />
            <span className="unbrn-color-picker-value-text">
              {formatColorString(color, inputFormat, alpha).toUpperCase()}
            </span>
          </button>

          {isOpen && (
            <div
              ref={popoverRef}
              className={cn(
                "unbrn-color-picker-popover",
                `unbrn-color-picker-popover-${popoverPosition}`,
                `unbrn-color-picker-popover-${colorPickerAlign}`,
                "unbrn-glass",
                classNames?.colorPickerPopover
              )}
              style={styles?.colorPickerPopover}
            >
              {/* Custom Saturation-Value Canvas Selector */}
              <div
                ref={svPanelRef}
                className="unbrn-color-picker-sv-panel"
                onMouseDown={handleSvStart}
                onTouchStart={handleSvStart}
              >
                <canvas
                  ref={canvasRef}
                  className="unbrn-color-picker-sv-canvas"
                  width={256}
                  height={140}
                />
                <div
                  className="unbrn-color-picker-sv-thumb"
                  style={{
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`,
                    backgroundColor: color,
                  }}
                />
              </div>

              {/* Sliders and Eyedropper Row */}
              <div className="unbrn-color-picker-sliders-row">
                {isEyeDropperSupported && colorPickerShowEyeDropper && (
                  <button
                    type="button"
                    onClick={handleEyeDropper}
                    className="unbrn-color-picker-eyedropper-btn"
                    title="Pick color from screen"
                  >
                    <Pipette size={18} />
                  </button>
                )}
                <div className="unbrn-color-picker-sliders-stack">
                  {/* Hue Rainbow Slider Selector */}
                  <div className="unbrn-color-picker-hue-container">
                    <Slider
                      sliderMin={0}
                      sliderMax={360}
                      sliderStep={1}
                      sliderValue={hsv.h}
                      sliderOnChange={(val) => {
                        const newHex = getCombinedHex(val, hsv.s, hsv.v, alpha);
                        setHsv(prev => ({ ...prev, h: val }));
                        if (controlledValue === undefined) {
                          setColor(newHex);
                        }
                        setTextInputValue(formatColorString(newHex, inputFormat, alpha));
                        colorPickerOnChange?.(newHex);
                      }}
                      sliderClassName="unbrn-color-picker-hue-slider"
                      sliderSize="sm"
                      sliderDisabled={colorPickerDisabled}
                    />
                  </div>

                  {/* Alpha Transparency Slider Selector */}
                  {colorPickerShowAlpha && (
                    <div className="unbrn-color-picker-alpha-container">
                      <Slider
                        sliderMin={0}
                        sliderMax={1}
                        sliderStep={0.01}
                        sliderValue={alpha}
                        sliderOnChange={(val) => {
                          const newHex = getCombinedHex(hsv.h, hsv.s, hsv.v, val);
                          setAlpha(val);
                          if (controlledValue === undefined) {
                            setColor(newHex);
                          }
                          setTextInputValue(formatColorString(newHex, inputFormat, val));
                          colorPickerOnChange?.(newHex);
                        }}
                        sliderClassName="unbrn-color-picker-alpha-slider"
                        sliderSize="sm"
                        sliderDisabled={colorPickerDisabled}
                        styles={{
                          sliderTrack: {
                            '--alpha-gradient': `linear-gradient(to right, transparent, ${hsvToHex(hsv.h, hsv.s, hsv.v)})`,
                          } as React.CSSProperties
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Format input and toggle Row */}
              <div
                className={cn("unbrn-color-picker-input-row", classNames?.colorPickerInputContainer)}
                style={styles?.colorPickerInputContainer}
              >
                <button
                  type="button"
                  onClick={cycleInputFormat}
                  className="unbrn-color-picker-format-btn"
                  title="Toggle color format"
                >
                  {inputFormat.toUpperCase()}
                </button>

                <div className="unbrn-color-picker-input-wrapper">
                  <Input
                    inputValue={textInputValue}
                    inputOnChange={handleTextInputChange}
                    inputPlaceholder={
                      inputFormat === 'hex' ? '#FFFFFF' :
                        inputFormat === 'rgb' ? 'rgb(255, 255, 255)' :
                          'hsl(0, 0%, 100%)'
                    }
                    inputSize="sm"
                    inputVariant="filled"
                    inputFullWidth
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
