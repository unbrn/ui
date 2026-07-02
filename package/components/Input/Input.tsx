"use client";

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Input.css';

export interface InputProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 1 | 2 | 3;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  kbd?: string;
  fullWidth?: boolean;
  progressLevel?: 0 | 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  accentColor?: string;
  classNames?: {
    root?: string;
    container?: string;
    element?: string;
    label?: string;
    description?: string;
    error?: string;
    icon?: string;
    progressContainer?: string;
    progressBar?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    container?: React.CSSProperties;
    element?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
    error?: React.CSSProperties;
    icon?: React.CSSProperties;
    progressContainer?: React.CSSProperties;
    progressBar?: React.CSSProperties;
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      description,
      error,
      variant = 'filled',
      size = 2,
      leftIcon,
      rightIcon,
      kbd,
      fullWidth = false,
      progressLevel,
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      placeholder,
      type = 'text',
      readOnly,
      classNames,
      styles,
      style,
      accentColor,
    },
    ref
  ) => {
    const generatedId = useId();
    const resolvedId = id || generatedId;
    const resolvedSize = size === 1 ? 'sm' : size === 3 ? 'lg' : 'default';
    const accentStyle = getAccentVariables(accentColor);

    return (
      <div
        className={cn(
          "unbrn-input-root",
          fullWidth && "unbrn-input-full-width",
          classNames?.root
        )}
        style={{ ...style, ...styles?.root, ...accentStyle }}
      >
        {label && (
          <label
            htmlFor={resolvedId}
            className={cn("unbrn-input-label", classNames?.label)}
            style={styles?.label}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "unbrn-input-container",
            `unbrn-input-container-${variant}`,
            `unbrn-input-container-${resolvedSize}`,
            (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
            error && "unbrn-input-container-error",
            disabled && "unbrn-input-container-disabled",
            classNames?.container
          )}
          style={styles?.container}
        >
          {leftIcon && (
            <div className={cn("unbrn-input-icon unbrn-input-icon-left", classNames?.icon)} style={styles?.icon}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={resolvedId}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
              "unbrn-input",
              className,
              classNames?.element
            )}
            style={styles?.element}
          />

          {(kbd || rightIcon) && (
            <div className="unbrn-input-right-section">
              {kbd && (
                <kbd className="unbrn-input-kbd">
                  {kbd}
                </kbd>
              )}
              {rightIcon && (
                <div className={cn("unbrn-input-icon unbrn-input-icon-right", classNames?.icon)} style={styles?.icon}>
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {progressLevel !== undefined && (
          <div className={cn("unbrn-input-progress-container", classNames?.progressContainer)} style={styles?.progressContainer}>
            <div
              className={cn(
                "unbrn-input-progress-bar unbrn-input-progress-bar-1",
                progressLevel >= 1 && "active",
                classNames?.progressBar
              )}
              style={styles?.progressBar}
            />
            <div
              className={cn(
                "unbrn-input-progress-bar unbrn-input-progress-bar-2",
                progressLevel >= 2 && "active",
                classNames?.progressBar
              )}
              style={styles?.progressBar}
            />
            <div
              className={cn(
                "unbrn-input-progress-bar unbrn-input-progress-bar-3",
                progressLevel >= 3 && "active",
                classNames?.progressBar
              )}
              style={styles?.progressBar}
            />
          </div>
        )}

        {description && !error && (
          <p
            className={cn("unbrn-input-description", classNames?.description)}
            style={styles?.description}
          >
            {description}
          </p>
        )}

        {error && (
          <span
            className={cn("unbrn-input-error-message", classNames?.error)}
            style={styles?.error}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
