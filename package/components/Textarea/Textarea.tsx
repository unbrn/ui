"use client";

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import './Textarea.css';

export interface TextareaProps {
  textareaLabel?: React.ReactNode;
  textareaDescription?: React.ReactNode;
  textareaError?: string;
  textareaVariant?: 'filled' | 'outlined' | 'duo';
  textareaFullWidth?: boolean;
  textareaShowCount?: boolean;
  textareaDisabled?: boolean;
  textareaId?: string;
  textareaMaxLength?: number;
  textareaValue?: string;
  textareaDefaultValue?: string;
  textareaOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaPlaceholder?: string;
  textareaClassName?: string;
  textareaStyle?: React.CSSProperties;
  classNames?: {
    textareaRoot?: string;
    textareaContainer?: string;
    textareaElement?: string;
    textareaLabel?: string;
    textareaDescription?: string;
    textareaError?: string;
    textareaFooter?: string;
    textareaCount?: string;
    textareaDragIndicator?: string;
  };
  styles?: {
    textareaRoot?: React.CSSProperties;
    textareaContainer?: React.CSSProperties;
    textareaElement?: React.CSSProperties;
    textareaLabel?: React.CSSProperties;
    textareaDescription?: React.CSSProperties;
    textareaError?: React.CSSProperties;
    textareaFooter?: React.CSSProperties;
    textareaCount?: React.CSSProperties;
    textareaDragIndicator?: React.CSSProperties;
  };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      textareaClassName,
      textareaStyle,
      textareaLabel,
      textareaDescription,
      textareaError,
      textareaVariant = 'filled',
      textareaFullWidth = false,
      textareaShowCount = false,
      textareaDisabled,
      textareaId: customId,
      textareaMaxLength,
      textareaValue,
      textareaDefaultValue,
      textareaOnChange,
      textareaPlaceholder,
      classNames,
      styles,
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = customId || generatedId;
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [currentLength, setCurrentLength] = React.useState(
      (textareaValue?.toString() || textareaDefaultValue?.toString() || "").length
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length);
      textareaOnChange?.(e);
    };

    const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
      if (textareaDisabled) return;

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
          textareaFullWidth && "unbrn-textarea-full-width",
          classNames?.textareaRoot
        )}
        style={{ ...textareaStyle, ...styles?.textareaRoot }}
      >
        {textareaLabel && (
          <label
            htmlFor={textareaId}
            className={cn("unbrn-textarea-label", classNames?.textareaLabel)}
            style={styles?.textareaLabel}
          >
            {textareaLabel}
          </label>
        )}

        <div
          ref={containerRef}
          className={cn(
            "unbrn-textarea-container",
            `unbrn-textarea-container-${textareaVariant}`,
            (textareaVariant === 'outlined' || textareaVariant === 'duo') && 'unbrn-glass',
            textareaError && "unbrn-textarea-container-error",
            textareaDisabled && "unbrn-textarea-container-disabled",
            classNames?.textareaContainer
          )}
          style={styles?.textareaContainer}
        >
          <textarea
            ref={ref}
            id={textareaId}
            disabled={textareaDisabled}
            maxLength={textareaMaxLength}
            onChange={handleChange}
            value={textareaValue}
            defaultValue={textareaDefaultValue}
            placeholder={textareaPlaceholder}
            className={cn(
              "unbrn-textarea",
              textareaClassName,
              classNames?.textareaElement
            )}
            style={styles?.textareaElement}
          />

          <div className={cn("unbrn-textarea-footer", classNames?.textareaFooter)} style={styles?.textareaFooter}>
            <div className={cn("unbrn-textarea-count", classNames?.textareaCount)} style={styles?.textareaCount}>
              {textareaShowCount && (
                <>
                  {currentLength}{textareaMaxLength ? `/${textareaMaxLength}` : ''}
                </>
              )}
            </div>

            <div
              className={cn("unbrn-textarea-drag", classNames?.textareaDragIndicator)}
              style={styles?.textareaDragIndicator}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
            >
              <span>DRAG</span>
              <div className="unbrn-textarea-drag-circle" />
            </div>
          </div>
        </div>

        {textareaDescription && !textareaError && (
          <p
            className={cn("unbrn-textarea-description", classNames?.textareaDescription)}
            style={styles?.textareaDescription}
          >
            {textareaDescription}
          </p>
        )}

        {textareaError && (
          <span
            className={cn("unbrn-textarea-error-message", classNames?.textareaError)}
            style={styles?.textareaError}
          >
            {textareaError}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
