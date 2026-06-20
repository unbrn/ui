"use client";

import React, { useState, useEffect, forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import './Switch.css';
import { getAccentVariables } from '../../lib/colors';

export interface SwitchProps {
  switchChecked?: boolean;
  switchDefaultChecked?: boolean;
  switchOnChange?: (checked: boolean) => void;
  switchDisabled?: boolean;
  switchLabel?: React.ReactNode;
  switchDescription?: React.ReactNode;
  switchVariant?: 'filled' | 'outlined' | 'duo';
  switchSize?: 'sm' | 'default' | 'lg';
  switchClassName?: string;
  switchId?: string;
  switchAccentColor?: string;
  classNames?: {
    switchRoot?: string;
    switchContainer?: string;
    switchTrack?: string;
    switchThumb?: string;
    switchLabel?: string;
    switchDescription?: string;
  };
  styles?: {
    switchRoot?: React.CSSProperties;
    switchContainer?: React.CSSProperties;
    switchTrack?: React.CSSProperties;
    switchThumb?: React.CSSProperties;
    switchLabel?: React.CSSProperties;
    switchDescription?: React.CSSProperties;
  };
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      switchClassName,
      switchLabel,
      switchDescription,
      switchVariant = 'filled',
      switchSize = 'default',
      switchChecked: controlledChecked,
      switchDefaultChecked,
      switchOnChange,
      switchDisabled = false,
      switchId,
      classNames,
      styles,
      switchAccentColor
    },
    ref
  ) => {
    const generatedId = useId();
    const resolvedId = switchId || generatedId;

    const [isChecked, setIsChecked] = useState(controlledChecked ?? switchDefaultChecked ?? false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (controlledChecked !== undefined) {
        setIsChecked(controlledChecked);
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 400);
        return () => clearTimeout(timer);
      }
    }, [controlledChecked]);

    const handleToggle = () => {
      if (switchDisabled) return;

      const nextChecked = !isChecked;

      if (controlledChecked === undefined) {
        setIsChecked(nextChecked);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);
      }

      switchOnChange?.(nextChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (switchDisabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    const accentStyle = getAccentVariables(switchAccentColor);

    return (
      <div
        className={cn(
          "unbrn-switch-root",
          isAnimating && (isChecked ? "unbrn-switch-jar-on" : "unbrn-switch-jar-off"),
          classNames?.switchRoot
        )}
        style={{ ...styles?.switchRoot, ...accentStyle }}
      >
        <div
          className={cn(
            "unbrn-switch-container",
            switchDisabled && "unbrn-switch-disabled",
            classNames?.switchContainer
          )}
          style={styles?.switchContainer}
          onClick={handleToggle}
        >
          <div className={cn("unbrn-switch-wrapper", `unbrn-switch-wrapper-${switchSize}`)}>
            <button
              type="button"
              id={resolvedId}
              ref={ref}
              role="switch"
              aria-checked={isChecked}
              aria-labelledby={switchLabel ? `${resolvedId}-label` : undefined}
              aria-describedby={switchDescription ? `${resolvedId}-desc` : undefined}
              disabled={switchDisabled}
              onKeyDown={handleKeyDown}
              className={cn(
                "unbrn-switch-track",
                `unbrn-switch-track-${switchVariant}`,
                `unbrn-switch-track-${switchSize}`,
                (switchVariant === 'outlined' || switchVariant === 'duo') && 'unbrn-glass',
                isChecked && "unbrn-switch-track-checked",
                switchClassName,
                classNames?.switchTrack
              )}
              style={styles?.switchTrack}
            >
              <div
                className={cn(
                  "unbrn-switch-thumb",
                  `unbrn-switch-thumb-${switchSize}`,
                  isChecked && "unbrn-switch-thumb-checked",
                  classNames?.switchThumb
                )}
                style={styles?.switchThumb}
              />
            </button>
          </div>
          {(switchLabel || switchDescription) && (
            <div className="unbrn-switch-content">
              {switchLabel && (
                <label
                  id={`${resolvedId}-label`}
                  className={cn("unbrn-switch-label", classNames?.switchLabel)}
                  style={styles?.switchLabel}
                  onClick={(e) => e.preventDefault()}
                >
                  {switchLabel}
                </label>
              )}
              {switchDescription && (
                <p
                  id={`${resolvedId}-desc`}
                  className={cn("unbrn-switch-description", classNames?.switchDescription)}
                  style={styles?.switchDescription}
                >
                  {switchDescription}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
