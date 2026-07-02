"use client";

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Textarea.css';

export interface TextareaProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  fullWidth?: boolean;
  showCount?: boolean;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
  classNames?: {
    root?: string;
    container?: string;
    element?: string;
    label?: string;
    description?: string;
    error?: string;
    footer?: string;
    count?: string;
    dragIndicator?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    container?: React.CSSProperties;
    element?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
    error?: React.CSSProperties;
    footer?: React.CSSProperties;
    count?: React.CSSProperties;
    dragIndicator?: React.CSSProperties;
  };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      style,
      label,
      description,
      error,
      variant = 'filled',
      fullWidth = false,
      showCount = false,
      disabled,
      id: customId,
      maxLength,
      value,
      defaultValue,
      onChange,
      placeholder,
      classNames,
      styles,
      accentColor,
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const accentStyle = getAccentVariables(accentColor);

    const [currentLength, setCurrentLength] = React.useState(
      (value?.toString() || defaultValue?.toString() || "").length
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length);
      onChange?.(e);
    };

    const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      const isTouch = 'touches' in e;
      const startY = isTouch ? e.touches[0].pageY : e.pageY;
      const startHeight = containerRef.current?.offsetHeight || 0;

      const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
        if ('touches' in moveEvent) {
          if (moveEvent.cancelable) {
            moveEvent.preventDefault();
          }
        }
        const currentY = 'touches' in moveEvent ? moveEvent.touches[0].pageY : moveEvent.pageY;
        const deltaY = currentY - startY;
        if (containerRef.current) {
          containerRef.current.style.height = `${startHeight + deltaY}px`;
        }
      };

      const handleEnd = () => {
        window.removeEventListener('mousemove', handleMove as EventListener);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove as EventListener);
        window.removeEventListener('touchend', handleEnd);
        document.body.style.cursor = 'default';
      };

      window.addEventListener('mousemove', handleMove as EventListener);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove as EventListener, { passive: false });
      window.addEventListener('touchend', handleEnd);
      document.body.style.cursor = 'ns-resize';
    };

    return (
      <div
        className={cn(
          "unbrn-textarea-root",
          fullWidth && "unbrn-textarea-full-width",
          classNames?.root
        )}
        style={{ ...style, ...styles?.root, ...accentStyle }}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn("unbrn-textarea-label", classNames?.label)}
            style={styles?.label}
          >
            {label}
          </label>
        )}

        <div
          ref={containerRef}
          className={cn(
            "unbrn-textarea-container",
            `unbrn-textarea-container-${variant}`,
            (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
            error && "unbrn-textarea-container-error",
            disabled && "unbrn-textarea-container-disabled",
            classNames?.container
          )}
          style={styles?.container}
        >
          <textarea
            ref={ref}
            id={id}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={cn(
              "unbrn-textarea",
              className,
              classNames?.element
            )}
            style={styles?.element}
          />

          <div className={cn("unbrn-textarea-footer", classNames?.footer)} style={styles?.footer}>
            <div className={cn("unbrn-textarea-count", classNames?.count)} style={styles?.count}>
              {showCount && (
                <>
                  {currentLength}{maxLength ? `/${maxLength}` : ''}
                </>
              )}
            </div>

            <div
              className={cn("unbrn-textarea-drag", classNames?.dragIndicator)}
              style={styles?.dragIndicator}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
            >
              <span>DRAG</span>
              <div className="unbrn-textarea-drag-circle" />
            </div>
          </div>
        </div>

        {description && !error && (
          <p
            className={cn("unbrn-textarea-description", classNames?.description)}
            style={styles?.description}
          >
            {description}
          </p>
        )}

        {error && (
          <span
            className={cn("unbrn-textarea-error-message", classNames?.error)}
            style={styles?.error}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
