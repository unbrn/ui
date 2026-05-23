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
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  id?: string;
  color?: string;
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
      size = 'default',
      checked: controlledChecked,
      defaultChecked,
      onChange,
      disabled = false,
      id,
      classNames,
      styles,
      color
    },
    ref
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;

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

    const accentStyle = getAccentVariables(color);

    return (
      <div
        className={cn(
          "unburn-switch-root",
          isAnimating && (isChecked ? "unburn-switch-jar-on" : "unburn-switch-jar-off"),
          classNames?.root
        )}
        style={{ ...styles?.root, ...accentStyle }}
      >
        <div
          className={cn(
            "unburn-switch-container",
            disabled && "unburn-switch-disabled",
            classNames?.container
          )}
          style={styles?.container}
          onClick={handleToggle}
        >
          <div className={cn("unburn-switch-wrapper", `unburn-switch-wrapper-${size}`)}>
            <button
              type="button"
              id={switchId}
              ref={ref}
              role="switch"
              aria-checked={isChecked}
              aria-labelledby={label ? `${switchId}-label` : undefined}
              aria-describedby={description ? `${switchId}-desc` : undefined}
              disabled={disabled}
              onKeyDown={handleKeyDown}
              className={cn(
                "unburn-switch-track",
                `unburn-switch-track-${variant}`,
                `unburn-switch-track-${size}`,
                (variant === 'outlined' || variant === 'duo') && 'unburn-glass',
                isChecked && "unburn-switch-track-checked",
                className,
                classNames?.track
              )}
              style={styles?.track}
            >
              <div
                className={cn(
                  "unburn-switch-thumb",
                  `unburn-switch-thumb-${size}`,
                  isChecked && "unburn-switch-thumb-checked",
                  classNames?.thumb
                )}
                style={styles?.thumb}
              />
            </button>
          </div>
          {(label || description) && (
            <div className="unburn-switch-content">
              {label && (
                <label
                  id={`${switchId}-label`}
                  className={cn("unburn-switch-label", classNames?.label)}
                  style={styles?.label}
                  onClick={(e) => e.preventDefault()} // Clicks are handled by container
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  id={`${switchId}-desc`}
                  className={cn("unburn-switch-description", classNames?.description)}
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
