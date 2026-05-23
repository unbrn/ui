import React, { forwardRef, useId, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import './Checkbox.css';
import { getAccentVariables } from '../../lib/colors';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'styles' | 'size'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 'sm' | 'default' | 'lg';
  color?: string;
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
      size = 'default',
      checked: controlledChecked,
      color,
      defaultChecked,
      onChange,
      disabled,
      id,
      classNames,
      styles,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    // Internal state to track check for animation
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

    const accentStyle = getAccentVariables(color);

    return (
      <div
        className={cn(
          "unburn-checkbox-root",
          isAnimating && (isChecked ? "unburn-checkbox-jar-on" : "unburn-switch-jar-off"), // Using switch animations for consistency or naming
          classNames?.root
        )}
        style={{ ...styles?.root, ...accentStyle }}
      >
        <div
          className={cn(
            "unburn-checkbox-container",
            description && "unburn-checkbox-container-with-description",
            disabled && "unburn-checkbox-disabled",
            classNames?.container
          )}
          style={styles?.container}
        >
          <div className={cn("unburn-checkbox-wrapper", `unburn-checkbox-wrapper-${size}`)}>
            <input
              type="checkbox"
              id={checkboxId}
              ref={ref}
              checked={controlledChecked}
              defaultChecked={defaultChecked}
              onChange={handleToggle}
              disabled={disabled}
              className="unburn-checkbox-input"

              {...props}
            />
            <div
              className={cn(
                "unburn-checkbox",
                `unburn-checkbox-${variant}`,
                `unburn-checkbox-${size}`,
                (variant === 'outlined' || variant === 'duo') && 'unburn-glass',
                error && "unburn-checkbox-error",
                className,
                classNames?.checkbox
              )}
              style={styles?.checkbox}
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className={cn("unburn-checkbox-indicator", `unburn-checkbox-indicator-${size}`, classNames?.indicator)}
                style={styles?.indicator}
              >
                <path
                  d="M3 7.5L5.5 10L11 4.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="unburn-checkbox-check-path"
                />
              </svg>
            </div>
          </div>
          {(label || description) && (
            <div className="unburn-checkbox-content">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={cn("unburn-checkbox-label", classNames?.label)}
                  style={styles?.label}
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn("unburn-checkbox-description", classNames?.description)}
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
            className={cn("unburn-checkbox-error-message", classNames?.error)}
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
