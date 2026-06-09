"use client";

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import './Input.css';

export interface InputProps {
  inputLabel?: React.ReactNode;
  inputDescription?: React.ReactNode;
  inputError?: string;
  inputVariant?: 'filled' | 'outlined' | 'duo';
  inputSize?: 'sm' | 'default' | 'lg';
  inputLeftIcon?: React.ReactNode;
  inputRightIcon?: React.ReactNode;
  inputKbd?: string;
  inputFullWidth?: boolean;
  inputProgressLevel?: 0 | 1 | 2 | 3;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  inputDisabled?: boolean;
  inputId?: string;
  inputValue?: string;
  inputDefaultValue?: string;
  inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder?: string;
  inputType?: string;
  inputReadOnly?: boolean;
  classNames?: {
    inputRoot?: string;
    inputContainer?: string;
    inputElement?: string;
    inputLabel?: string;
    inputDescription?: string;
    inputError?: string;
    inputIcon?: string;
    inputProgressContainer?: string;
    inputProgressBar?: string;
  };
  styles?: {
    inputRoot?: React.CSSProperties;
    inputContainer?: React.CSSProperties;
    inputElement?: React.CSSProperties;
    inputLabel?: React.CSSProperties;
    inputDescription?: React.CSSProperties;
    inputError?: React.CSSProperties;
    inputIcon?: React.CSSProperties;
    inputProgressContainer?: React.CSSProperties;
    inputProgressBar?: React.CSSProperties;
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputClassName,
      inputLabel,
      inputDescription,
      inputError,
      inputVariant = 'filled',
      inputSize = 'default',
      inputLeftIcon,
      inputRightIcon,
      inputKbd,
      inputFullWidth = false,
      inputProgressLevel,
      inputDisabled,
      inputId,
      inputValue,
      inputDefaultValue,
      inputOnChange,
      inputPlaceholder,
      inputType = 'text',
      inputReadOnly,
      classNames,
      styles,
      inputStyle
    },
    ref
  ) => {
    const generatedId = useId();
    const resolvedId = inputId || generatedId;

    return (
      <div
        className={cn(
          "unburn-input-root",
          inputFullWidth && "unburn-input-full-width",
          classNames?.inputRoot
        )}
        style={{ ...inputStyle, ...styles?.inputRoot }}
      >
        {inputLabel && (
          <label
            htmlFor={resolvedId}
            className={cn("unburn-input-label", classNames?.inputLabel)}
            style={styles?.inputLabel}
          >
            {inputLabel}
          </label>
        )}

        <div
          className={cn(
            "unburn-input-container",
            `unburn-input-container-${inputVariant}`,
            `unburn-input-container-${inputSize}`,
            (inputVariant === 'outlined' || inputVariant === 'duo') && 'unburn-glass',
            inputError && "unburn-input-container-error",
            inputDisabled && "unburn-input-container-disabled",
            classNames?.inputContainer
          )}
          style={styles?.inputContainer}
        >
          {inputLeftIcon && (
            <div className={cn("unburn-input-icon unburn-input-icon-left", classNames?.inputIcon)} style={styles?.inputIcon}>
              {inputLeftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={resolvedId}
            disabled={inputDisabled}
            readOnly={inputReadOnly}
            type={inputType}
            value={inputValue}
            defaultValue={inputDefaultValue}
            onChange={inputOnChange}
            placeholder={inputPlaceholder}
            className={cn(
              "unburn-input",
              inputClassName,
              classNames?.inputElement
            )}
            style={styles?.inputElement}
          />

          {(inputKbd || inputRightIcon) && (
            <div className="unburn-input-right-section">
              {inputKbd && (
                <kbd className="unburn-input-kbd">
                  {inputKbd}
                </kbd>
              )}
              {inputRightIcon && (
                <div className={cn("unburn-input-icon unburn-input-icon-right", classNames?.inputIcon)} style={styles?.inputIcon}>
                  {inputRightIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {inputProgressLevel !== undefined && (
          <div className={cn("unburn-input-progress-container", classNames?.inputProgressContainer)} style={styles?.inputProgressContainer}>
            <div
              className={cn(
                "unburn-input-progress-bar unburn-input-progress-bar-1",
                inputProgressLevel >= 1 && "active",
                classNames?.inputProgressBar
              )}
              style={styles?.inputProgressBar}
            />
            <div
              className={cn(
                "unburn-input-progress-bar unburn-input-progress-bar-2",
                inputProgressLevel >= 2 && "active",
                classNames?.inputProgressBar
              )}
              style={styles?.inputProgressBar}
            />
            <div
              className={cn(
                "unburn-input-progress-bar unburn-input-progress-bar-3",
                inputProgressLevel >= 3 && "active",
                classNames?.inputProgressBar
              )}
              style={styles?.inputProgressBar}
            />
          </div>
        )}

        {inputDescription && !inputError && (
          <p
            className={cn("unburn-input-description", classNames?.inputDescription)}
            style={styles?.inputDescription}
          >
            {inputDescription}
          </p>
        )}

        {inputError && (
          <span
            className={cn("unburn-input-error-message", classNames?.inputError)}
            style={styles?.inputError}
          >
            {inputError}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
