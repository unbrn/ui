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
          "unbrn-checkbox-root",
          isAnimating && (isChecked ? "unbrn-checkbox-jar-on" : "unbrn-checkbox-jar-off"),
          classNames?.checkboxRoot
        )}
        style={{ ...styles?.checkboxRoot, ...accentStyle, ...checkboxStyle }}
      >
        <div
          className={cn(
            "unbrn-checkbox-container",
            checkboxDescription && "unbrn-checkbox-container-with-description",
            checkboxDisabled && "unbrn-checkbox-disabled",
            classNames?.checkboxContainer
          )}
          style={styles?.checkboxContainer}
        >
          <div className={cn("unbrn-checkbox-wrapper", `unbrn-checkbox-wrapper-${checkboxSize}`)}>
            <input
              type="checkbox"
              id={resolvedId}
              ref={ref}
              checked={controlledChecked}
              defaultChecked={checkboxDefaultChecked}
              onChange={handleToggle}
              disabled={checkboxDisabled}
              className="unbrn-checkbox-input"
            />
            <div
              className={cn(
                "unbrn-checkbox",
                `unbrn-checkbox-${checkboxVariant}`,
                `unbrn-checkbox-${checkboxSize}`,
                (checkboxVariant === 'outlined' || checkboxVariant === 'duo') && 'unbrn-glass',
                checkboxError && "unbrn-checkbox-error",
                checkboxClassName,
                classNames?.checkboxCheckbox
              )}
              style={styles?.checkboxCheckbox}
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className={cn("unbrn-checkbox-indicator", `unbrn-checkbox-indicator-${checkboxSize}`, classNames?.checkboxIndicator)}
                style={styles?.checkboxIndicator}
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
          {(checkboxLabel || checkboxDescription) && (
            <div className="unbrn-checkbox-content">
              {checkboxLabel && (
                <label
                  htmlFor={resolvedId}
                  className={cn("unbrn-checkbox-label", classNames?.checkboxLabel)}
                  style={styles?.checkboxLabel}
                >
                  {checkboxLabel}
                </label>
              )}
              {checkboxDescription && (
                <p
                  className={cn("unbrn-checkbox-description", classNames?.checkboxDescription)}
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
            className={cn("unbrn-checkbox-error-message", classNames?.checkboxError)}
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
