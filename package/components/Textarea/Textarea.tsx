"use client";

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import './Textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: 'filled' | 'outlined' | 'duo';
  fullWidth?: boolean;
  showCount?: boolean;
  classNames?: {
    root?: string;
    container?: string;
    textarea?: string;
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
    textarea?: React.CSSProperties;
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
      label,
      description,
      error,
      variant = 'filled',
      fullWidth = false,
      showCount = false,
      disabled,
      id,
      maxLength,
      value,
      defaultValue,
      onChange,
      classNames,
      styles,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [currentLength, setCurrentLength] = React.useState(
      (value?.toString() || defaultValue?.toString() || "").length
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length);
      onChange?.(e);
    };

    // Custom Resize Logic for both Mouse and Touch
    const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      
      const isTouch = 'touches' in e;
      const startY = isTouch ? e.touches[0].pageY : e.pageY;
      const startHeight = containerRef.current?.offsetHeight || 0;

      const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
        // Prevent default screen scrolling during mobile touch dragging
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
          "unburn-textarea-root",
          fullWidth && "unburn-textarea-full-width",
          classNames?.root
        )}
        style={styles?.root}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className={cn("unburn-textarea-label", classNames?.label)}
            style={styles?.label}
          >
            {label}
          </label>
        )}

        <div
          ref={containerRef}
          className={cn(
            "unburn-textarea-container",
            `unburn-textarea-container-${variant}`,
            error && "unburn-textarea-container-error",
            disabled && "unburn-textarea-container-disabled",
            classNames?.container
          )}
          style={styles?.container}
        >
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              "unburn-textarea",
              className,
              classNames?.textarea
            )}
            style={styles?.textarea}
            {...props}
          />

          <div className={cn("unburn-textarea-footer", classNames?.footer)} style={styles?.footer}>
            <div className={cn("unburn-textarea-count", classNames?.count)} style={styles?.count}>
              {showCount && (
                <>
                  {currentLength}{maxLength ? `/${maxLength}` : ''}
                </>
              )}
            </div>

            <div
              className={cn("unburn-textarea-drag", classNames?.dragIndicator)}
              style={styles?.dragIndicator}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
            >
              <span>DRAG</span>
              <div className="unburn-textarea-drag-circle" />
            </div>
          </div>
        </div>

        {description && !error && (
          <p
            className={cn("unburn-textarea-description", classNames?.description)}
            style={styles?.description}
          >
            {description}
          </p>
        )}

        {error && (
          <span
            className={cn("unburn-textarea-error-message", classNames?.error)}
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
