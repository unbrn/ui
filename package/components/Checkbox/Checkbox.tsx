import React, { forwardRef, useId, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import './Checkbox.css';
import { getAccentVariables } from '../../lib/colors';

export interface CheckboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 1 | 2 | 3;
  accentColor?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    container?: string;
    checkbox?: string;
    indicator?: string;
    label?: string;
    description?: string;
    error?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    container?: React.CSSProperties;
    checkbox?: React.CSSProperties;
    indicator?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
    error?: React.CSSProperties;
  };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      variant = 'filled',
      size = 2,
      checked: controlledChecked,
      accentColor,
      defaultChecked,
      onChange,
      disabled,
      id,
      classNames,
      styles,
      style
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

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (controlledChecked === undefined) {
        setIsChecked(e.target.checked);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);
      }
      onChange?.(e);
    };

    const resolvedSize = size === 1 ? 'sm' : size === 3 ? 'lg' : 'default';
    const accentStyle = getAccentVariables(accentColor);

    return (
      <div
        className={cn(
          "unbrn-checkbox-root",
          isAnimating && (isChecked ? "unbrn-checkbox-jar-on" : "unbrn-checkbox-jar-off"),
          classNames?.root
        )}
        style={{ ...styles?.root, ...accentStyle, ...style }}
      >
        <div
          className={cn(
            "unbrn-checkbox-container",
            description && "unbrn-checkbox-container-with-description",
            disabled && "unbrn-checkbox-disabled",
            classNames?.container
          )}
          style={styles?.container}
        >
          <div className={cn("unbrn-checkbox-wrapper", `unbrn-checkbox-wrapper-${resolvedSize}`)}>
            <input
              type="checkbox"
              id={resolvedId}
              ref={ref}
              checked={controlledChecked}
              defaultChecked={defaultChecked}
              onChange={handleToggle}
              disabled={disabled}
              className="unbrn-checkbox-input"
            />
            <div
              className={cn(
                "unbrn-checkbox",
                `unbrn-checkbox-${variant}`,
                `unbrn-checkbox-${resolvedSize}`,
                (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
                error && "unbrn-checkbox-error",
                className,
                classNames?.checkbox
              )}
              style={styles?.checkbox}
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className={cn("unbrn-checkbox-indicator", `unbrn-checkbox-indicator-${size}`, classNames?.indicator)}
                style={styles?.indicator}
              >
                <path
                  d="M3 7.5L5.5 10L11 4.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="unbrn-checkbox-check-path"
                />
              </svg>
            </div>
          </div>
          {(label || description) && (
            <div className="unbrn-checkbox-content">
              {label && (
                <label
                  htmlFor={resolvedId}
                  className={cn("unbrn-checkbox-label", classNames?.label)}
                  style={styles?.label}
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn("unbrn-checkbox-description", classNames?.description)}
                  style={styles?.description}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {error && (
          <span
            className={cn("unbrn-checkbox-error-message", classNames?.error)}
            style={styles?.error}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
