"use client";

import React, { useState, useEffect, forwardRef, useId, useRef, useCallback } from 'react';
import { cn } from '../../lib/utils';
import './Slider.css';
import { getAccentVariables } from '../../lib/colors';
import { Tooltip } from '../Tooltip/Tooltip';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: 1 | 2 | 3;
  accentColor?: string;
  showTooltip?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    header?: string;
    label?: string;
    description?: string;
    container?: string;
    track?: string;
    thumb?: string;
    tooltip?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    header?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
    container?: React.CSSProperties;
    track?: React.CSSProperties;
    thumb?: React.CSSProperties;
    tooltip?: React.CSSProperties;
  };
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      style,
      value: controlledValue,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      onChangeEnd,
      disabled = false,
      label,
      description,
      size = 2,
      accentColor,
      showTooltip = false,
      classNames,
      styles,
      id: customId,
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;

    const [valueState, setValueState] = useState<number>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return min;
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isChangingRef = useRef(false);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValueState(controlledValue);
      }
    }, [controlledValue]);

    const percentage = Math.min(Math.max(((valueState - min) / (max - min)) * 100, 0), 100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const nextValue = parseFloat(e.target.value);

      if (controlledValue === undefined) {
        setValueState(nextValue);
      }

      onChange?.(nextValue);
    };

    const handleDragStart = () => {
      if (disabled) return;
      setIsDragging(true);
      isChangingRef.current = true;
    };

    const handleDragEnd = useCallback(() => {
      if (disabled) return;
      setIsDragging(false);
      if (isChangingRef.current) {
        onChangeEnd?.(valueState);
        isChangingRef.current = false;
      }
    }, [disabled, onChangeEnd, valueState]);

    useEffect(() => {
      const handleGlobalMouseUp = () => {
        if (isDragging) {
          handleDragEnd();
        }
      };

      if (isDragging) {
        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('touchend', handleGlobalMouseUp);
      }

      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchend', handleGlobalMouseUp);
      };
    }, [isDragging, handleDragEnd]);

    const resolvedSize = size === 1 ? 'sm' : size === 3 ? 'lg' : 'default';
    const accentStyle = getAccentVariables(accentColor);

    const getThumbSize = () => {
      switch (size) {
        case 1: return 14;
        case 3: return 24;
        default: return 18;
      }
    };

    const thumbSize = getThumbSize();
    const thumbWidth = thumbSize * 1.5;

    const position = `calc(${percentage}% + ${(0.5 - percentage / 100) * thumbWidth}px)`;

    const showTooltipContainer = showTooltip && !disabled && (isHovered || isDragging);

    return (
      <div
        className={cn(
          "unbrn-slider-root",
          disabled && "unbrn-slider-disabled",
          classNames?.root
        )}
        style={{ ...style, ...styles?.root, ...accentStyle }}
      >
        {(label || description) && (
          <div className={cn("unbrn-slider-header", classNames?.header)} style={styles?.header}>
            {label && (
              <label
                htmlFor={id}
                className={cn("unbrn-slider-label", classNames?.label)}
                style={styles?.label}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn("unbrn-slider-description", classNames?.description)}
                style={styles?.description}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "unbrn-slider-container",
            `unbrn-slider-container-${resolvedSize}`,
            isDragging && "unbrn-slider-container-active",
            classNames?.container
          )}
          style={styles?.container}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            ref={ref}
            type="range"
            id={id}
            min={min}
            max={max}
            step={step}
            value={valueState}
            disabled={disabled}
            onChange={handleChange}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            className={cn(
              "unbrn-slider-input",
              `unbrn-slider-input-${size}`,
              className,
              classNames?.track
            )}
            style={{
              ...styles?.track,
              '--slider-progress': `${percentage}%`
            } as React.CSSProperties}
          />

          <Tooltip
            content={valueState}
            visible={showTooltipContainer}
            position="top"
            accentColor={accentColor}
            className={classNames?.tooltip}
            styles={{ bubble: styles?.tooltip }}
            style={{ left: position }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
