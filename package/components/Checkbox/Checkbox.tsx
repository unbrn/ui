import React, { forwardRef, useId, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import './Checkbox.css';
import { getAccentVariables } from '../../lib/colors';

export interface CheckboxProps {
  checkboxLabel?: React.ReactNode;
  checkboxDescription?: React.ReactNode;
  checkboxError?: string;
  checkboxVariant?: 'filled' | 'outlined' | 'duo';
  checkboxSize?: 'sm' | 'default' | 'lg';
  checkboxAccentColor?: string;
  checkboxChecked?: boolean;
  checkboxDefaultChecked?: boolean;
  checkboxOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxDisabled?: boolean;
  checkboxId?: string;
  checkboxClassName?: string;
  checkboxStyle?: React.CSSProperties;
  classNames?: {
    checkboxRoot?: string;
    checkboxContainer?: string;
    checkboxCheckbox?: string;
    checkboxIndicator?: string;
    checkboxLabel?: string;
    checkboxDescription?: string;
    checkboxError?: string;
  };
  styles?: {
    checkboxRoot?: React.CSSProperties;
    checkboxContainer?: React.CSSProperties;
    checkboxCheckbox?: React.CSSProperties;
    checkboxIndicator?: React.CSSProperties;
    checkboxLabel?: React.CSSProperties;
    checkboxDescription?: React.CSSProperties;
    checkboxError?: React.CSSProperties;
  };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checkboxClassName,
      checkboxLabel,
      checkboxDescription,
      checkboxError,
      checkboxVariant = 'filled',
      checkboxSize = 'default',
      checkboxChecked: controlledChecked,
      checkboxAccentColor,
      checkboxDefaultChecked,
      checkboxOnChange,
      checkboxDisabled,
      checkboxId,
      classNames,
      styles,
      checkboxStyle
    },
    ref
  ) => {
    const generatedId = useId();
    const resolvedId = checkboxId || generatedId;

    const [isChecked, setIsChecked] = useState(controlledChecked ?? checkboxDefaultChecked ?? false);
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
      checkboxOnChange?.(e);
    };

    const accentStyle = getAccentVariables(checkboxAccentColor);

    return (
      <div
        className={cn(
          "unburn-checkbox-root",
          isAnimating && (isChecked ? "unburn-checkbox-jar-on" : "unburn-checkbox-jar-off"),
          classNames?.checkboxRoot
        )}
        style={{ ...styles?.checkboxRoot, ...accentStyle, ...checkboxStyle }}
      >
        <div
          className={cn(
            "unburn-checkbox-container",
            checkboxDescription && "unburn-checkbox-container-with-description",
            checkboxDisabled && "unburn-checkbox-disabled",
            classNames?.checkboxContainer
          )}
          style={styles?.checkboxContainer}
        >
          <div className={cn("unburn-checkbox-wrapper", `unburn-checkbox-wrapper-${checkboxSize}`)}>
            <input
              type="checkbox"
              id={resolvedId}
              ref={ref}
              checked={controlledChecked}
              defaultChecked={checkboxDefaultChecked}
              onChange={handleToggle}
              disabled={checkboxDisabled}
              className="unburn-checkbox-input"
            />
            <div
              className={cn(
                "unburn-checkbox",
                `unburn-checkbox-${checkboxVariant}`,
                `unburn-checkbox-${checkboxSize}`,
                (checkboxVariant === 'outlined' || checkboxVariant === 'duo') && 'unburn-glass',
                checkboxError && "unburn-checkbox-error",
                checkboxClassName,
                classNames?.checkboxCheckbox
              )}
              style={styles?.checkboxCheckbox}
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className={cn("unburn-checkbox-indicator", `unburn-checkbox-indicator-${checkboxSize}`, classNames?.checkboxIndicator)}
                style={styles?.checkboxIndicator}
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
          {(checkboxLabel || checkboxDescription) && (
            <div className="unburn-checkbox-content">
              {checkboxLabel && (
                <label
                  htmlFor={resolvedId}
                  className={cn("unburn-checkbox-label", classNames?.checkboxLabel)}
                  style={styles?.checkboxLabel}
                >
                  {checkboxLabel}
                </label>
              )}
              {checkboxDescription && (
                <p
                  className={cn("unburn-checkbox-description", classNames?.checkboxDescription)}
                  style={styles?.checkboxDescription}
                >
                  {checkboxDescription}
                </p>
              )}
            </div>
          )}
        </div>
        {checkboxError && (
          <span
            className={cn("unburn-checkbox-error-message", classNames?.checkboxError)}
            style={styles?.checkboxError}
          >
            {checkboxError}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
