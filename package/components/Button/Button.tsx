"use client";

import React, { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Button.css';
import { getAccentVariables } from '../../lib/colors';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 'sm' | 'default' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  opacityLevel?: '25' | '50' | '75' | '100';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  color?: string;
  classNames?: {
    root?: string;
    icon?: string;
    loader?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    loader?: React.CSSProperties;
  };
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'filled',
      size = 'default',
      loading = false,
      fullWidth = false,
      opacityLevel = '100',
      icon,
      iconPosition = 'left',
      children,
      disabled,
      style,
      classNames,
      styles,
      color,
      ...props
    },
    ref
  ) => {
    const isIconOnly = (icon || loading) && !children;
    const accentStyle = getAccentVariables(color);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{ ...style, ...styles?.root, ...accentStyle }}
        className={cn(
          'unburn-btn',
          `unburn-btn-${variant}`,
          `unburn-btn-${size}`,
          `unburn-btn-opacity-${opacityLevel}`,
          (variant === 'outlined' || variant === 'duo') && 'unburn-glass',
          isIconOnly && 'unburn-btn-icon-only',
          fullWidth && 'unburn-btn-full-width',
          className,
          classNames?.root
        )}
        {...props}
      >
        {loading && (
          <Loader2
            className={cn("unburn-btn-loading-icon", !isIconOnly && "unburn-btn-icon-left", classNames?.loader)}
            size={16}
            style={styles?.loader}
          />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span
            className={cn(!isIconOnly && "unburn-btn-icon-left", classNames?.icon)}
            style={styles?.icon}
          >
            {icon}
          </span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span
            className={cn(!isIconOnly && "unburn-btn-icon-right", classNames?.icon)}
            style={styles?.icon}
          >
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
