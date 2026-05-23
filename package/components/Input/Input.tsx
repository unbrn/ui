"use client";

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 'sm' | 'default' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  progressLevel?: 0 | 1 | 2 | 3;
  classNames?: {
    root?: string;
    container?: string;
    input?: string;
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
    input?: React.CSSProperties;
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
      size = 'default',
      leftIcon,
      rightIcon,
      fullWidth = false,
      progressLevel,
      disabled,
      id,
      classNames,
      styles,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div
        className={cn(
          "unburn-input-root",
          fullWidth && "unburn-input-full-width",
          classNames?.root
        )}
        style={styles?.root}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn("unburn-input-label", classNames?.label)}
            style={styles?.label}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "unburn-input-container",
            `unburn-input-container-${variant}`,
            `unburn-input-container-${size}`,
            (variant === 'outlined' || variant === 'duo') && 'unburn-glass',
            error && "unburn-input-container-error",
            disabled && "unburn-input-container-disabled",
            classNames?.container
          )}
          style={styles?.container}
        >
          {leftIcon && (
            <div className={cn("unburn-input-icon unburn-input-icon-left", classNames?.icon)} style={styles?.icon}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "unburn-input",
              className,
              classNames?.input
            )}
            style={styles?.input}
            {...props}
          />

          {rightIcon && (
            <div className={cn("unburn-input-icon unburn-input-icon-right", classNames?.icon)} style={styles?.icon}>
              {rightIcon}
            </div>
          )}
        </div>

        {progressLevel !== undefined && (
          <div className={cn("unburn-input-progress-container", classNames?.progressContainer)} style={styles?.progressContainer}>
            <div
              className={cn(
                "unburn-input-progress-bar unburn-input-progress-bar-1",
                progressLevel >= 1 && "active",
                classNames?.progressBar
              )}
              style={styles?.progressBar}
            />
            <div
              className={cn(
                "unburn-input-progress-bar unburn-input-progress-bar-2",
                progressLevel >= 2 && "active",
                classNames?.progressBar
              )}
              style={styles?.progressBar}
            />
            <div
              className={cn(
                "unburn-input-progress-bar unburn-input-progress-bar-3",
                progressLevel >= 3 && "active",
                classNames?.progressBar
              )}
              style={styles?.progressBar}
            />
          </div>
        )}

        {description && !error && (
          <p
            className={cn("unburn-input-description", classNames?.description)}
            style={styles?.description}
          >
            {description}
          </p>
        )}

        {error && (
          <span
            className={cn("unburn-input-error-message", classNames?.error)}
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
