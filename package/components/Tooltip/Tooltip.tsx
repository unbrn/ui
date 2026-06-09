"use client";

import React, { useState, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import './Tooltip.css';
import { getAccentVariables } from '../../lib/colors';

export interface TooltipProps {
  tooltipContent: React.ReactNode;
  tooltipChildren?: React.ReactNode;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  tooltipVisible?: boolean;
  tooltipAccentColor?: string;
  tooltipVariant?: 'filled' | 'outlined' | 'duo';
  tooltipDisabled?: boolean;
  tooltipClassName?: string;
  tooltipStyle?: React.CSSProperties;
  classNames?: {
    tooltipRoot?: string;
    tooltipTrigger?: string;
    tooltipBubble?: string;
    tooltipArrow?: string;
  };
  styles?: {
    tooltipRoot?: React.CSSProperties;
    tooltipTrigger?: React.CSSProperties;
    tooltipBubble?: React.CSSProperties;
    tooltipArrow?: React.CSSProperties;
  };
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      tooltipClassName,
      tooltipStyle,
      tooltipContent,
      tooltipChildren,
      tooltipPosition = 'top',
      tooltipVisible: controlledVisible,
      tooltipAccentColor,
      tooltipVariant = 'filled',
      tooltipDisabled = false,
      classNames,
      styles,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const showTooltip = (controlledVisible !== undefined ? controlledVisible : isHovered) && !tooltipDisabled;
    const accentStyle = getAccentVariables(tooltipAccentColor);

    if (!tooltipChildren) {
      if (!showTooltip) return null;
      return (
        <div
          ref={ref}
          className={cn(
            "unburn-tooltip-bubble",
            "unburn-tooltip-bubble-standalone",
            `unburn-tooltip-bubble-${tooltipPosition}`,
            `unburn-tooltip-bubble-${tooltipVariant}`,
            tooltipClassName,
            classNames?.tooltipBubble
          )}
          style={{ ...tooltipStyle, ...styles?.tooltipBubble, ...accentStyle }}
        >
          <span className="unburn-tooltip-content">{tooltipContent}</span>
          <div className={cn("unburn-tooltip-arrow", classNames?.tooltipArrow)} style={styles?.tooltipArrow} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("unburn-tooltip-root", tooltipClassName, classNames?.tooltipRoot)}
        style={{ ...tooltipStyle, ...styles?.tooltipRoot, ...accentStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div 
          className={cn("unburn-tooltip-trigger", classNames?.tooltipTrigger)} 
          style={styles?.tooltipTrigger}
        >
          {tooltipChildren}
        </div>
        
        {showTooltip && (
          <div
            className={cn(
              "unburn-tooltip-bubble",
              `unburn-tooltip-bubble-${tooltipPosition}`,
              `unburn-tooltip-bubble-${tooltipVariant}`,
              classNames?.tooltipBubble
            )}
            style={{ ...styles?.tooltipBubble, ...accentStyle }}
          >
            <span className="unburn-tooltip-content">{tooltipContent}</span>
            <div className={cn("unburn-tooltip-arrow", classNames?.tooltipArrow)} style={styles?.tooltipArrow} />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
