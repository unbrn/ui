"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './Dock.css';
import { cn } from '../../lib/utils';
import { Button, ButtonContext } from '../Button/Button';
import { getAccentVariables } from '../../lib/colors';

export interface DockProps {
  variant?: 'filled' | 'outlined';
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  showMenuToggle?: boolean;
  showHideToggle?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  buttonSize?: 1 | 2 | 3;
  buttonVariant?: 'filled' | 'outlined' | 'duo' | 'ghost';
  buttonAccentColor?: string;
  accentColor?: string;
  classNames?: {
    root?: string;
    container?: string;
    trigger?: string;
    actionBtn?: string;
    collapseBtn?: string;
    expandBtn?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    container?: React.CSSProperties;
    trigger?: React.CSSProperties;
    actionBtn?: React.CSSProperties;
    collapseBtn?: React.CSSProperties;
    expandBtn?: React.CSSProperties;
  };
  style?: React.CSSProperties;
  
  children?: React.ReactNode;
}

export const Dock: React.FC<DockProps> = ({
  variant = 'outlined',
  isMenuOpen = false,
  onMenuToggle,
  showMenuToggle = true,
  showHideToggle = true,
  position = 'bottom',
  className,
  buttonSize = 3,
  buttonVariant = "duo",
  buttonAccentColor,
  accentColor,
  classNames,
  styles,
  style,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const resolvedVariant = buttonVariant || (variant === 'filled' ? 'filled' : 'outlined');
  const resolvedAccentColor = buttonAccentColor || accentColor;
  const accentStyle = getAccentVariables(accentColor);

  return (
    <div
      className={cn('unbrn-dock-wrapper', `unbrn-pos-${position}`, isCollapsed && 'unbrn-collapsed', className, classNames?.root)}
      style={{ ...style, ...styles?.root, ...accentStyle }}
    >
      <div
        className={cn(
          "unbrn-dock",
          variant === 'filled' ? "unbrn-dock-filled" : "unbrn-dock-outlined unbrn-glass",
          classNames?.container
        )}
        style={styles?.container}
      >
        {showMenuToggle && (
          <Button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={cn('unbrn-dock-trigger', isMenuOpen && 'unbrn-open', classNames?.trigger)}
            style={styles?.trigger}
            onClick={onMenuToggle}
            variant="filled"
            size={buttonSize}
            accentColor={resolvedAccentColor}
            icon={
              <div className="unbrn-trigger-icon-wrapper">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            }
          />
        )}
        <ButtonContext.Provider value={{ size: buttonSize, variant: resolvedVariant, accentColor: resolvedAccentColor }}>
          {children}
        </ButtonContext.Provider>
        {showHideToggle && (
          <Button
            aria-label="Collapse dock"
            className={cn("unbrn-dock-collapse-btn", classNames?.collapseBtn)}
            style={styles?.collapseBtn}
            onClick={() => setIsCollapsed(true)}
            variant={resolvedVariant}
            size={buttonSize}
            accentColor={resolvedAccentColor}
            icon={
              <>
                {(position === 'bottom' || position === 'bottom-left' || position === 'bottom-right') && <ChevronDown size={20} />}
                {(position === 'top' || position === 'top-left' || position === 'top-right') && <ChevronUp size={20} />}
                {position === 'left' && <ChevronLeft size={20} />}
                {position === 'right' && <ChevronRight size={20} />}
              </>
            }
          />
        )}
      </div>
      {showHideToggle && (
        <Button
          aria-label="Expand dock"
          className={cn("unbrn-dock-expand-btn", classNames?.expandBtn)}
          style={styles?.expandBtn}
          onClick={() => setIsCollapsed(false)}
          variant={resolvedVariant}
          size={buttonSize}
          accentColor={resolvedAccentColor}
          icon={
            <>
              {(position === 'bottom' || position === 'bottom-left' || position === 'bottom-right') && <ChevronUp size={20} />}
              {(position === 'top' || position === 'top-left' || position === 'top-right') && <ChevronDown size={20} />}
              {position === 'left' && <ChevronRight size={20} />}
              {position === 'right' && <ChevronLeft size={20} />}
            </>
          }
        />
      )}
    </div>
  );
};

Dock.displayName = 'Dock';