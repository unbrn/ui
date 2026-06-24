"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './Dock.css';
import { cn } from '../../lib/utils';
import { Button, ButtonContext } from '../Button/Button';
import { getAccentVariables } from '../../lib/colors';

export interface DockProps {
  dockVariant?: 'filled' | 'outlined';
  dockIsMenuOpen?: boolean;
  dockOnMenuToggle?: () => void;
  dockShowMenuToggle?: boolean;
  dockShowHideToggle?: boolean;
  dockPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  dockClassName?: string;
  dockButtonSize?: 'sm' | 'default' | 'lg';
  dockButtonVariant?: 'filled' | 'outlined' | 'duo' | 'ghost';
  dockButtonAccentColor?: string;
  dockAccentColor?: string;
  classNames?: {
    dockRoot?: string;
    dockContainer?: string;
    dockTrigger?: string;
    dockActionBtn?: string;
    dockCollapseBtn?: string;
    dockExpandBtn?: string;
  };
  styles?: {
    dockRoot?: React.CSSProperties;
    dockContainer?: React.CSSProperties;
    dockTrigger?: React.CSSProperties;
    dockActionBtn?: React.CSSProperties;
    dockCollapseBtn?: React.CSSProperties;
    dockExpandBtn?: React.CSSProperties;
  };
  dockStyle?: React.CSSProperties;
  dockChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export const Dock: React.FC<DockProps> = ({
  dockVariant = 'outlined',
  dockIsMenuOpen = false,
  dockOnMenuToggle,
  dockShowMenuToggle = true,
  dockShowHideToggle = true,
  dockPosition = 'bottom',
  dockClassName,
  dockButtonSize = "lg",
  dockButtonVariant = "duo",
  dockButtonAccentColor,
  dockAccentColor,
  classNames,
  styles,
  dockStyle,
  dockChildren,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const resolvedVariant = dockButtonVariant;
  const accentStyle = getAccentVariables(dockAccentColor);
  return (
    <div
      className={cn('unbrn-dock-wrapper', `unbrn-pos-${dockPosition}`, isCollapsed && 'unbrn-collapsed', dockClassName, classNames?.dockRoot)}
      style={{ ...dockStyle, ...styles?.dockRoot, ...accentStyle }}
    >
      <div
        className={cn(
          "unbrn-dock",
          dockVariant === 'filled' ? "unbrn-dock-filled" : "unbrn-dock-outlined unbrn-glass",
          classNames?.dockContainer
        )}
        style={styles?.dockContainer}
      >
        {dockShowMenuToggle && (
          <Button
            aria-label={dockIsMenuOpen ? "Close menu" : "Open menu"}
            buttonClassName={cn('unbrn-dock-trigger', dockIsMenuOpen && 'unbrn-open', classNames?.dockTrigger)}
            buttonStyle={styles?.dockTrigger}
            buttonOnClick={dockOnMenuToggle}
            buttonVariant="filled"
            buttonSize={dockButtonSize}
            buttonAccentColor={dockButtonAccentColor}
            buttonIcon={
              <div className="unbrn-trigger-icon-wrapper">
                {dockIsMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            }
          />
        )}
        <ButtonContext.Provider value={{ buttonSize: dockButtonSize, buttonVariant: resolvedVariant, buttonAccentColor: dockButtonAccentColor }}>
          {children ?? dockChildren}
        </ButtonContext.Provider>
        {dockShowHideToggle && (
          <Button
            aria-label="Collapse dock"
            buttonClassName={cn("unbrn-dock-collapse-btn", classNames?.dockCollapseBtn)}
            buttonStyle={styles?.dockCollapseBtn}
            buttonOnClick={() => setIsCollapsed(true)}
            buttonVariant={resolvedVariant}
            buttonSize={dockButtonSize}
            buttonAccentColor={dockButtonAccentColor}
            buttonIcon={
              <>
                {(dockPosition === 'bottom' || dockPosition === 'bottom-left' || dockPosition === 'bottom-right') && <ChevronDown size={20} />}
                {(dockPosition === 'top' || dockPosition === 'top-left' || dockPosition === 'top-right') && <ChevronUp size={20} />}
                {dockPosition === 'left' && <ChevronLeft size={20} />}
                {dockPosition === 'right' && <ChevronRight size={20} />}
              </>
            }
          />
        )}
      </div>
      {dockShowHideToggle && (
        <Button
          aria-label="Expand dock"
          buttonClassName={cn("unbrn-dock-expand-btn", classNames?.dockExpandBtn)}
          buttonStyle={styles?.dockExpandBtn}
          buttonOnClick={() => setIsCollapsed(false)}
          buttonVariant={resolvedVariant}
          buttonSize={dockButtonSize}
          buttonAccentColor={dockButtonAccentColor}
          buttonIcon={
            <>
              {(dockPosition === 'bottom' || dockPosition === 'bottom-left' || dockPosition === 'bottom-right') && <ChevronUp size={20} />}
              {(dockPosition === 'top' || dockPosition === 'top-left' || dockPosition === 'top-right') && <ChevronDown size={20} />}
              {dockPosition === 'left' && <ChevronRight size={20} />}
              {dockPosition === 'right' && <ChevronLeft size={20} />}
            </>
          }
        />
      )}
    </div>
  );
};