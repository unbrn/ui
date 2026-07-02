"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import { Button, ButtonContext } from '../Button/Button';
import './Action.css';

export interface ActionItem {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'primary';
  className?: string;
  style?: React.CSSProperties;
}

export interface ActionProps {
  trigger: React.ReactNode;
  items?: ActionItem[];
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  align?: 'start' | 'center' | 'end';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  disabled?: boolean;
  accentColor?: string;
  closeOnSelect?: boolean;
  size?: 1 | 2;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    trigger?: string;
    dropdown?: string;
    item?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    trigger?: React.CSSProperties;
    dropdown?: React.CSSProperties;
    item?: React.CSSProperties;
  };
}

export const Action = forwardRef<HTMLDivElement, ActionProps>(
  (
    {
      trigger,
      items,
      children,
      header,
      footer,
      position = 'auto',
      align = 'center',
      visible: controlledVisible,
      onVisibleChange,
      disabled = false,
      accentColor,
      closeOnSelect = true,
      size,
      className,
      style,
      classNames,
      styles,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [calculatedPosition, setCalculatedPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const isOpenVisible = controlledVisible !== undefined ? controlledVisible : isOpen;
    const finalPosition = position === 'auto' ? calculatedPosition : position;
    const accentStyle = getAccentVariables(accentColor);

    useEffect(() => {
      if (position !== 'auto' || !isOpenVisible) return;

      const trigger = containerRef.current?.querySelector('.unbrn-action-trigger') as HTMLElement;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const spaceBottom = viewportHeight - rect.bottom;
      const spaceTop = rect.top;
      const spaceRight = viewportWidth - rect.right;
      const spaceLeft = rect.left;

      const dropdownHeight = 220;

      let bestPosition: 'top' | 'bottom' | 'left' | 'right';

      if (spaceBottom >= dropdownHeight) {
        bestPosition = 'bottom';
      } else if (spaceTop >= dropdownHeight) {
        bestPosition = 'top';
      } else if (spaceRight > spaceLeft) {
        bestPosition = 'right';
      } else {
        bestPosition = 'left';
      }

      setCalculatedPosition(bestPosition);
    }, [isOpenVisible, position]);

    useEffect(() => {
      if (!isOpenVisible) return;

      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          if (controlledVisible === undefined) {
            setIsOpen(false);
          }
          onVisibleChange?.(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }, [isOpenVisible, controlledVisible, onVisibleChange]);

    const handleToggle = () => {
      if (disabled) return;

      const nextVisible = !isOpenVisible;
      if (controlledVisible === undefined) {
        setIsOpen(nextVisible);
      }
      onVisibleChange?.(nextVisible);
    };

    const handleItemClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
      item: ActionItem
    ) => {
      if (item.disabled) {
        e.preventDefault();
        return;
      }

      item.onClick?.(e);

      if (closeOnSelect) {
        if (controlledVisible === undefined) {
          setIsOpen(false);
        }
        onVisibleChange?.(false);
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn('unbrn-action-root', className, classNames?.root)}
        style={{ ...style, ...styles?.root, ...accentStyle }}
      >
        <ButtonContext.Provider value={size ? { size: size } : {}}>
          <div
            onClick={handleToggle}
            className={cn('unbrn-action-trigger', classNames?.trigger)}
            style={styles?.trigger}
          >
            {trigger}
          </div>
        </ButtonContext.Provider>

        {isOpenVisible && (
          <div
            className={cn(
              'unbrn-action-dropdown',
              `unbrn-action-dropdown-${finalPosition}-${align}`,
              classNames?.dropdown
            )}
            style={styles?.dropdown}
          >
            {header && (
              <div className="unbrn-action-header">
                {header}
              </div>
            )}

            {(children) ? (
              <div className="unbrn-action-custom-content">
                {children}
              </div>
            ) : (
              <div className="unbrn-action-items-list">
                {items?.map((item, index) => {
                  const resolvedItemSize = size === 1 ? 'sm' : 'default';
                  const itemClassName = cn(
                    'unbrn-action-item',
                    `unbrn-action-item-size-${resolvedItemSize}`,
                    `unbrn-action-item-${item.variant || 'default'}`,
                    item.disabled && 'unbrn-action-item-disabled',
                    classNames?.item,
                    item.className
                  );

                  const itemStyle = { ...styles?.item, ...item.style };

                  const buttonElement = (
                    <Button
                      variant="ghost"
                      size={size ?? 2}
                      disabled={item.disabled}
                      onClick={(e) => handleItemClick(e, item)}
                      className={itemClassName}
                      style={itemStyle}
                      icon={item.icon}
                      children={item.label}
                    />
                  );

                  if (item.href && !item.disabled) {
                    return (
                      <a
                        key={item.id || index}
                        href={item.href}
                        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                      >
                        {buttonElement}
                      </a>
                    );
                  }

                  return (
                    <React.Fragment key={item.id || index}>
                      {buttonElement}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {footer && (
              <div className="unbrn-action-footer">
                {footer}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Action.displayName = 'Action';
