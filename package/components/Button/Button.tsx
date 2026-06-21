/* eslint-disable react-refresh/only-export-components */
"use client";

import React, { forwardRef, useState, useLayoutEffect, useRef } from 'react';

import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Button.css';
import { getAccentVariables } from '../../lib/colors';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonVariant?: 'filled' | 'outlined' | 'duo' | 'ghost';
  buttonSize?: 'sm' | 'default' | 'lg';
  buttonLoading?: boolean;
  buttonFullWidth?: boolean;
  buttonOpacityLevel?: '25' | '50' | '75' | '100';
  buttonIcon?: React.ReactNode;
  buttonIconPosition?: 'left' | 'right';
  buttonAccentColor?: string;
  buttonActive?: boolean;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  buttonDisabled?: boolean;
  buttonOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonChildren?: React.ReactNode;
  children?: React.ReactNode;
  buttonId?: string;
  classNames?: {
    buttonRoot?: string;
    buttonIcon?: string;
    buttonLoader?: string;
  };
  styles?: {
    buttonRoot?: React.CSSProperties;
    buttonIcon?: React.CSSProperties;
    buttonLoader?: React.CSSProperties;
  };
}

export const ButtonContext = React.createContext<{
  buttonSize?: 'sm' | 'default' | 'lg';
  buttonVariant?: 'filled' | 'outlined' | 'duo' | 'ghost';
  buttonAccentColor?: string;
}>({});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonClassName,
      buttonVariant,
      buttonSize,
      buttonLoading = false,
      buttonFullWidth = false,
      buttonOpacityLevel = '100',
      buttonIcon,
      buttonIconPosition = 'left',
      buttonChildren,
      children,
      buttonDisabled,
      buttonStyle,
      classNames,
      styles,
      buttonAccentColor,
      buttonActive = false,
      buttonOnClick,
      buttonType = 'button',
      buttonId,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(ButtonContext);
    const resolvedVariant = buttonVariant ?? context.buttonVariant ?? 'filled';
    const resolvedSize = buttonSize ?? context.buttonSize ?? 'default';
    const resolvedAccentColor = buttonAccentColor ?? context.buttonAccentColor;

    const resolvedChildren = buttonChildren ?? children;
    const isIconOnly = (buttonIcon || buttonLoading) && !resolvedChildren;
    const accentStyle = getAccentVariables(resolvedAccentColor);

    return (
      <button
        ref={ref}
        id={buttonId}
        type={buttonType}
        onClick={buttonOnClick}
        disabled={buttonDisabled || buttonLoading}
        style={{ ...buttonStyle, ...styles?.buttonRoot, ...accentStyle }}
        className={cn(
          'unbrn-btn',
          `unbrn-btn-${resolvedVariant}`,
          `unbrn-btn-${resolvedSize}`,
          `unbrn-btn-opacity-${buttonOpacityLevel}`,
          (resolvedVariant === 'outlined' || resolvedVariant === 'duo') && 'unbrn-glass',
          isIconOnly && 'unbrn-btn-icon-only',
          buttonFullWidth && 'unbrn-btn-full-width',
          buttonActive && 'unbrn-btn-active',
          buttonClassName,
          classNames?.buttonRoot
        )}
        {...props}
      >
        {buttonLoading && (
          <Loader2
            className={cn("unbrn-btn-loading-icon", !isIconOnly && "unbrn-btn-icon-left", classNames?.buttonLoader)}
            size={16}
            style={styles?.buttonLoader}
          />
        )}
        {!buttonLoading && buttonIcon && buttonIconPosition === 'left' && (
          <span
            className={cn(!isIconOnly && "unbrn-btn-icon-left", classNames?.buttonIcon)}
            style={styles?.buttonIcon}
          >
            {buttonIcon}
          </span>
        )}
        {resolvedChildren}
        {!buttonLoading && buttonIcon && buttonIconPosition === 'right' && (
          <span
            className={cn(!isIconOnly && "unbrn-btn-icon-right", classNames?.buttonIcon)}
            style={styles?.buttonIcon}
          >
            {buttonIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonGroupProps {
  buttonGroupChildren: React.ReactNode;
  buttonGroupClassName?: string;
  buttonGroupStyle?: React.CSSProperties;
  buttonGroupSplit?: boolean;
  buttonGroupTabs?: boolean;
  buttonGroupVariant?: 'filled' | 'outlined' | 'duo';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttonGroupChildren,
  buttonGroupClassName,
  buttonGroupStyle,
  buttonGroupSplit = false,
  buttonGroupTabs = false,
  buttonGroupVariant = 'filled'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    height: 0,
    top: 0,
    opacity: 0,
  });

  const startXRef = useRef(0);
  const startLeftRef = useRef(0);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const [dragLeft, setDragLeft] = useState<number | null>(null);
  const snapTimeoutRef = useRef<number | null>(null);
  const lastClosestIndexRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!buttonGroupTabs) return;

    const updateIndicator = () => {
      const container = containerRef.current;
      if (!container) return;

      const activeEl = container.querySelector('.unbrn-btn-active') as HTMLElement;
      if (activeEl) {
        setIndicatorStyle({
          left: `${activeEl.offsetLeft}px`,
          width: `${activeEl.offsetWidth}px`,
          height: `${activeEl.offsetHeight}px`,
          top: `${activeEl.offsetTop}px`,
          opacity: 1,
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();

    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [buttonGroupChildren, buttonGroupTabs]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!buttonGroupTabs) return;
    if (e.button !== 0) return; // Only left-click / main touch

    if (snapTimeoutRef.current !== null) {
      clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = null;
    }

    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector('.unbrn-btn-active') as HTMLElement;
    if (!activeEl) return;

    const buttons = Array.from(container.querySelectorAll('.unbrn-btn')) as HTMLElement[];
    const activeIndex = buttons.indexOf(activeEl);
    lastClosestIndexRef.current = activeIndex !== -1 ? activeIndex : null;

    startXRef.current = e.clientX;
    startLeftRef.current = activeEl.offsetLeft;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !buttonGroupTabs) return;

    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector('.unbrn-btn-active') as HTMLElement;
    if (!activeEl) return;

    const deltaX = e.clientX - startXRef.current;

    // Start dragging only after exceeding the threshold (5px)
    if (!isDraggingRef.current && Math.abs(deltaX) > 5) {
      isDraggingRef.current = true;
      setIsDraggingState(true);
      setDragLeft(startLeftRef.current);

      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }

    if (isDraggingRef.current) {
      let newLeft = startLeftRef.current + deltaX;

      const padding = 3;
      const minLeft = padding;
      const maxLeft = container.clientWidth - activeEl.offsetWidth - padding;

      if (newLeft < minLeft) newLeft = minLeft;
      if (newLeft > maxLeft) newLeft = maxLeft;

      setDragLeft(newLeft);

      // Trigger selection haptic when dragging across tab boundaries
      const indicatorCenter = newLeft + activeEl.offsetWidth / 2;
      const buttons = Array.from(container.querySelectorAll('.unbrn-btn')) as HTMLElement[];
      let closestIndex = -1;
      let minDistance = Infinity;

      for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
        const distance = Math.abs(indicatorCenter - btnCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== -1 && closestIndex !== lastClosestIndexRef.current) {
        lastClosestIndexRef.current = closestIndex;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasPointerDown = isPointerDownRef.current;
    isPointerDownRef.current = false;

    if (!buttonGroupTabs) return;

    const container = containerRef.current;
    if (!container) return;

    if (!wasPointerDown) return;

    if (isDraggingRef.current) {
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }

      isDraggingRef.current = false;
      setIsDraggingState(false);

      const activeEl = container.querySelector('.unbrn-btn-active') as HTMLElement;
      if (!activeEl) {
        setDragLeft(null);
        return;
      }

      const deltaX = e.clientX - startXRef.current;
      const finalLeft = startLeftRef.current + deltaX;

      const padding = 3;
      const minLeft = padding;
      const maxLeft = container.clientWidth - activeEl.offsetWidth - padding;
      let clampedFinalLeft = finalLeft;
      if (clampedFinalLeft < minLeft) clampedFinalLeft = minLeft;
      if (clampedFinalLeft > maxLeft) clampedFinalLeft = maxLeft;

      const indicatorCenter = clampedFinalLeft + activeEl.offsetWidth / 2;

      const buttons = Array.from(container.querySelectorAll('.unbrn-btn')) as HTMLElement[];
      let closestButton: HTMLElement | null = null;
      let minDistance = Infinity;

      for (const btn of buttons) {
        const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
        const distance = Math.abs(indicatorCenter - btnCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestButton = btn;
        }
      }

      if (closestButton) {
        const targetLeft = closestButton.offsetLeft;
        setDragLeft(targetLeft);

        if (closestButton !== activeEl) {
          (closestButton as HTMLElement).click();
        }

        if (snapTimeoutRef.current !== null) {
          clearTimeout(snapTimeoutRef.current);
        }
        snapTimeoutRef.current = window.setTimeout(() => {
          setDragLeft(null);
          snapTimeoutRef.current = null;
        }, 300);
      } else {
        setDragLeft(null);
      }
    } else {
      // Just a click (or sloppy click below drag threshold)
      isDraggingRef.current = false;
      setIsDraggingState(false);
      setDragLeft(null);

      const targetBtn = (e.target as HTMLElement).closest('.unbrn-btn') as HTMLElement;
      if (targetBtn && container.contains(targetBtn)) {
        targetBtn.click();
        e.preventDefault();
      }
    }
  };

  const currentIndicatorStyle: React.CSSProperties = {
    ...indicatorStyle,
    ...(dragLeft !== null ? { left: `${dragLeft}px` } : {}),
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        buttonGroupSplit ? 'unbrn-btn-group-split' : 'unbrn-btn-group',
        buttonGroupTabs && 'unbrn-btn-group-tabs',
        buttonGroupTabs && `unbrn-btn-group-tabs-${buttonGroupVariant}`,
        isDraggingState && 'unbrn-btn-group-dragging',
        'unbrn-glass',
        buttonGroupClassName
      )}
      style={buttonGroupStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {buttonGroupTabs && (
        <div
          className="unbrn-btn-group-indicator"
          style={currentIndicatorStyle}
        />
      )}
      {buttonGroupChildren}
    </div>
  );
};
