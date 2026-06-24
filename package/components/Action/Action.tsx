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
  actionTrigger: React.ReactNode;
  actionItems?: ActionItem[];
  actionChildren?: React.ReactNode;
  children?: React.ReactNode;
  actionHeader?: React.ReactNode;
  actionFooter?: React.ReactNode;
  actionPosition?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  actionAlign?: 'start' | 'center' | 'end';
  actionVisible?: boolean;
  actionOnVisibleChange?: (visible: boolean) => void;
  actionDisabled?: boolean;
  actionAccentColor?: string;
  actionCloseOnSelect?: boolean;
  actionSize?: 'sm' | 'default' | 'lg';
  actionClassName?: string;
  actionStyle?: React.CSSProperties;
  classNames?: {
    actionRoot?: string;
    actionTrigger?: string;
    actionDropdown?: string;
    actionItem?: string;
  };
  styles?: {
    actionRoot?: React.CSSProperties;
    actionTrigger?: React.CSSProperties;
    actionDropdown?: React.CSSProperties;
    actionItem?: React.CSSProperties;
  };
}

export const Action = forwardRef<HTMLDivElement, ActionProps>(
  (
    {
      actionTrigger,
      actionItems,
      actionChildren,
      children,
      actionHeader,
      actionFooter,
      actionPosition = 'auto',
      actionAlign = 'center',
      actionVisible,
      actionOnVisibleChange,
      actionDisabled = false,
      actionAccentColor,
      actionCloseOnSelect = true,
      actionSize,
      actionClassName,
      actionStyle,
      classNames,
      styles,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [calculatedPosition, setCalculatedPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const visible = actionVisible !== undefined ? actionVisible : isOpen;
    const finalPosition = actionPosition === 'auto' ? calculatedPosition : actionPosition;
    const accentStyle = getAccentVariables(actionAccentColor);

    useEffect(() => {
      if (actionPosition !== 'auto' || !visible) return;

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
    }, [visible, actionPosition]);

    useEffect(() => {
      if (!visible) return;

      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          if (actionVisible === undefined) {
            setIsOpen(false);
          }
          actionOnVisibleChange?.(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }, [visible, actionVisible, actionOnVisibleChange]);

    const handleToggle = () => {
      if (actionDisabled) return;

      const nextVisible = !visible;
      if (actionVisible === undefined) {
        setIsOpen(nextVisible);
      }
      actionOnVisibleChange?.(nextVisible);
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

      if (actionCloseOnSelect) {
        if (actionVisible === undefined) {
          setIsOpen(false);
        }
        actionOnVisibleChange?.(false);
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn('unbrn-action-root', actionClassName, classNames?.actionRoot)}
        style={{ ...actionStyle, ...styles?.actionRoot, ...accentStyle }}
      >
        <ButtonContext.Provider value={actionSize ? { buttonSize: actionSize } : {}}>
          <div
            onClick={handleToggle}
            className={cn('unbrn-action-trigger', classNames?.actionTrigger)}
            style={styles?.actionTrigger}
          >
            {actionTrigger}
          </div>
        </ButtonContext.Provider>

        {visible && (
          <div
            className={cn(
              'unbrn-action-dropdown',
              `unbrn-action-dropdown-${finalPosition}-${actionAlign}`,
              classNames?.actionDropdown
            )}
            style={styles?.actionDropdown}
          >
            {actionHeader && (
              <div className="unbrn-action-header">
                {actionHeader}
              </div>
            )}

            {(actionChildren || children) ? (
              <div className="unbrn-action-custom-content">
                {actionChildren || children}
              </div>
            ) : (
              <div className="unbrn-action-items-list">
                {actionItems?.map((item, index) => {
                  const resolvedItemSize = actionSize || 'sm';
                  const itemClassName = cn(
                    'unbrn-action-item',
                    `unbrn-action-item-size-${resolvedItemSize}`,
                    `unbrn-action-item-${item.variant || 'default'}`,
                    item.disabled && 'unbrn-action-item-disabled',
                    classNames?.actionItem,
                    item.className
                  );

                  const itemStyle = { ...styles?.actionItem, ...item.style };

                  const buttonElement = (
                    <Button
                      buttonVariant="ghost"
                      buttonSize={resolvedItemSize}
                      buttonDisabled={item.disabled}
                      buttonOnClick={(e) => handleItemClick(e, item)}
                      buttonClassName={itemClassName}
                      buttonStyle={itemStyle}
                      buttonIcon={item.icon}
                      buttonChildren={item.label}
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

            {actionFooter && (
              <div className="unbrn-action-footer">
                {actionFooter}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Action.displayName = 'Action';
