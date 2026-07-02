"use client";

import React, { useState, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import './Tooltip.css';
import { getAccentVariables } from '../../lib/colors';

export interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  visible?: boolean;
  accentColor?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    trigger?: string;
    bubble?: string;
    arrow?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    trigger?: React.CSSProperties;
    bubble?: React.CSSProperties;
    arrow?: React.CSSProperties;
  };
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      style,
      content,
      children,
      position = 'top',
      visible: controlledVisible,
      accentColor,
      variant = 'filled',
      disabled = false,
      classNames,
      styles,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const showTooltip = (controlledVisible !== undefined ? controlledVisible : isHovered) && !disabled;
    const accentStyle = getAccentVariables(accentColor);
    const displayChildren = children;

    if (!displayChildren) {
      if (!showTooltip) return null;
      return (
        <div
          ref={ref}
          className={cn(
            "unbrn-tooltip-bubble",
            "unbrn-tooltip-bubble-standalone",
            `unbrn-tooltip-bubble-${position}`,
            `unbrn-tooltip-bubble-${variant}`,
            (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
            className,
            classNames?.bubble
          )}
          style={{ ...style, ...styles?.bubble, ...accentStyle }}
        >
          <span className="unbrn-tooltip-content">{content}</span>
          <div className={cn("unbrn-tooltip-arrow", classNames?.arrow)} style={styles?.arrow} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("unbrn-tooltip-root", className, classNames?.root)}
        style={{ ...style, ...styles?.root }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div
          className={cn("unbrn-tooltip-trigger", classNames?.trigger)}
          style={styles?.trigger}
        >
          {displayChildren}
        </div>

        {showTooltip && (
          <div
            className={cn(
              "unbrn-tooltip-bubble",
              `unbrn-tooltip-bubble-${position}`,
              `unbrn-tooltip-bubble-${variant}`,
              (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
              classNames?.bubble
            )}
            style={{ ...styles?.bubble, ...accentStyle }}
          >
            <span className="unbrn-tooltip-content">{content}</span>
            <div className={cn("unbrn-tooltip-arrow", classNames?.arrow)} style={styles?.arrow} />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
