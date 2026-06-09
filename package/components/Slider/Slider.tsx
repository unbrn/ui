"use client";

import React, { useState, useEffect, forwardRef, useId, useRef, useCallback } from 'react';
import { cn } from '../../lib/utils';
import './Slider.css';
import { getAccentVariables } from '../../lib/colors';
import { Tooltip } from '../Tooltip/Tooltip';

export interface SliderProps {
  sliderValue?: number;
  sliderDefaultValue?: number;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderOnChange?: (value: number) => void;
  sliderOnChangeEnd?: (value: number) => void;
  sliderLabel?: React.ReactNode;
  sliderDescription?: React.ReactNode;
  sliderSize?: 'sm' | 'default' | 'lg';
  sliderAccentColor?: string;
  sliderShowTooltip?: boolean;
  sliderDisabled?: boolean;
  sliderId?: string;
  sliderClassName?: string;
  sliderStyle?: React.CSSProperties;
  classNames?: {
    sliderRoot?: string;
    sliderHeader?: string;
    sliderLabel?: string;
    sliderDescription?: string;
    sliderContainer?: string;
    sliderTrack?: string;
    sliderThumb?: string;
    sliderTooltip?: string;
  };
  styles?: {
    sliderRoot?: React.CSSProperties;
    sliderHeader?: React.CSSProperties;
    sliderLabel?: React.CSSProperties;
    sliderDescription?: React.CSSProperties;
    sliderContainer?: React.CSSProperties;
    sliderTrack?: React.CSSProperties;
    sliderThumb?: React.CSSProperties;
    sliderTooltip?: React.CSSProperties;
  };
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      sliderClassName,
      sliderStyle,
      sliderValue: controlledValue,
      sliderDefaultValue,
      sliderMin = 0,
      sliderMax = 100,
      sliderStep = 1,
      sliderOnChange,
      sliderOnChangeEnd,
      sliderDisabled = false,
      sliderLabel,
      sliderDescription,
      sliderSize = 'default',
      sliderAccentColor,
      sliderShowTooltip = false,
      classNames,
      styles,
      sliderId: customId,
    },
    ref
  ) => {
    const generatedId = useId();
    const sliderId = customId || generatedId;

    const [valueState, setValueState] = useState<number>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (sliderDefaultValue !== undefined) return sliderDefaultValue;
      return sliderMin;
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isChangingRef = useRef(false);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValueState(controlledValue);
      }
    }, [controlledValue]);

    const percentage = Math.min(Math.max(((valueState - sliderMin) / (sliderMax - sliderMin)) * 100, 0), 100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sliderDisabled) return;
      const nextValue = parseFloat(e.target.value);
      
      if (controlledValue === undefined) {
        setValueState(nextValue);
      }
      
      sliderOnChange?.(nextValue);
    };

    const handleDragStart = () => {
      if (sliderDisabled) return;
      setIsDragging(true);
      isChangingRef.current = true;
    };

    const handleDragEnd = useCallback(() => {
      if (sliderDisabled) return;
      setIsDragging(false);
      if (isChangingRef.current) {
        sliderOnChangeEnd?.(valueState);
        isChangingRef.current = false;
      }
    }, [sliderDisabled, sliderOnChangeEnd, valueState]);

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

    const accentStyle = getAccentVariables(sliderAccentColor);

    const getThumbSize = () => {
      switch (sliderSize) {
        case 'sm': return 14;
        case 'lg': return 24;
        default: return 18;
      }
    };

    const thumbSize = getThumbSize();
    const thumbWidth = thumbSize * 1.5;
    
    const tooltipPosition = `calc(${percentage}% + ${(0.5 - percentage / 100) * thumbWidth}px)`;

    const showTooltipContainer = sliderShowTooltip && !sliderDisabled && (isHovered || isDragging);

    return (
      <div
        className={cn(
          "unburn-slider-root",
          sliderDisabled && "unburn-slider-disabled",
          classNames?.sliderRoot
        )}
        style={{ ...sliderStyle, ...styles?.sliderRoot, ...accentStyle }}
      >
        {(sliderLabel || sliderDescription) && (
          <div className={cn("unburn-slider-header", classNames?.sliderHeader)} style={styles?.sliderHeader}>
            {sliderLabel && (
              <label
                htmlFor={sliderId}
                className={cn("unburn-slider-label", classNames?.sliderLabel)}
                style={styles?.sliderLabel}
              >
                {sliderLabel}
              </label>
            )}
            {sliderDescription && (
              <p
                className={cn("unburn-slider-description", classNames?.sliderDescription)}
                style={styles?.sliderDescription}
              >
                {sliderDescription}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "unburn-slider-container",
            `unburn-slider-container-${sliderSize}`,
            isDragging && "unburn-slider-container-active",
            classNames?.sliderContainer
          )}
          style={styles?.sliderContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            ref={ref}
            type="range"
            id={sliderId}
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            value={valueState}
            disabled={sliderDisabled}
            onChange={handleChange}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            className={cn(
              "unburn-slider-input",
              `unburn-slider-input-${sliderSize}`,
              sliderClassName,
              classNames?.sliderTrack
            )}
            style={{
              ...styles?.sliderTrack,
              '--slider-progress': `${percentage}%`
            } as React.CSSProperties}
          />

          <Tooltip
            tooltipContent={valueState}
            tooltipVisible={showTooltipContainer}
            tooltipPosition="top"
            tooltipAccentColor={sliderAccentColor}
            tooltipClassName={classNames?.sliderTooltip}
            styles={{ tooltipBubble: styles?.sliderTooltip }}
            tooltipStyle={{ left: tooltipPosition }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
