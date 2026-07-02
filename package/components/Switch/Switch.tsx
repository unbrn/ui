"use client";

import React, { useState, useEffect, forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import './Switch.css';
import { getAccentVariables } from '../../lib/colors';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 1 | 2 | 3;
  className?: string;
  id?: string;
  accentColor?: string;
  classNames?: {
    root?: string;
    container?: string;
    track?: string;
    thumb?: string;
    label?: string;
    description?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    container?: React.CSSProperties;
    track?: React.CSSProperties;
    thumb?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
  };
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      variant = 'filled',
      size = 2,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      disabled = false,
      id,
      classNames,
      styles,
      accentColor
    },
    ref
  ) => {
    const generatedId = useId();
    const resolvedId = id || generatedId;

    const [isChecked, setIsChecked] = useState(controlledChecked ?? defaultChecked ?? false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (controlledChecked !== undefined) {
        setIsChecked(controlledChecked);
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 400);
        return () => clearTimeout(timer);
      }
    }, [controlledChecked]);

    const handleToggle = () => {
      if (disabled) return;

      const nextChecked = !isChecked;

      if (controlledChecked === undefined) {
        setIsChecked(nextChecked);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);
      }

      onChange?.(nextChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    const resolvedSize = size === 1 ? 'sm' : size === 3 ? 'lg' : 'default';
    const accentStyle = getAccentVariables(accentColor);

    return (
      <div
        className={cn(
          "unbrn-switch-root",
          isAnimating && (isChecked ? "unbrn-switch-jar-on" : "unbrn-switch-jar-off"),
          classNames?.root
        )}
        style={{ ...styles?.root, ...accentStyle }}
      >
        <div
          className={cn(
            "unbrn-switch-container",
            disabled && "unbrn-switch-disabled",
            classNames?.container
          )}
          style={styles?.container}
          onClick={handleToggle}
        >
          <div className={cn("unbrn-switch-wrapper", `unbrn-switch-wrapper-${resolvedSize}`)}>
            <button
              type="button"
              id={resolvedId}
              ref={ref}
              role="switch"
              aria-checked={isChecked}
              aria-labelledby={label ? `${resolvedId}-label` : undefined}
              aria-describedby={description ? `${resolvedId}-desc` : undefined}
              disabled={disabled}
              onKeyDown={handleKeyDown}
              className={cn(
                "unbrn-switch-track",
                `unbrn-switch-track-${variant}`,
                `unbrn-switch-track-${resolvedSize}`,
                (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
                isChecked && "unbrn-switch-track-checked",
                className,
                classNames?.track
              )}
              style={styles?.track}
            >
              <div
                className={cn(
                  "unbrn-switch-thumb",
                  `unbrn-switch-thumb-${resolvedSize}`,
                  isChecked && "unbrn-switch-thumb-checked",
                  classNames?.thumb
                )}
                style={styles?.thumb}
              />
            </button>
          </div>
          {(label || description) && (
            <div className="unbrn-switch-content">
              {label && (
                <label
                  id={`${resolvedId}-label`}
                  className={cn("unbrn-switch-label", classNames?.label)}
                  style={styles?.label}
                  onClick={(e) => e.preventDefault()}
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  id={`${resolvedId}-desc`}
                  className={cn("unbrn-switch-description", classNames?.description)}
                  style={styles?.description}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
