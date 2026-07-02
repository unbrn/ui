import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Alert.css';

export interface AlertProps {
  accentColor?: string;
  variant?: 'outlined' | 'duo' | 'filled';
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    description?: string;
    actions?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    actions?: React.CSSProperties;
  };
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      accentColor,
      variant = 'filled',
      icon,
      title,
      description,
      actions,
      style,
      classNames,
      styles,
      children
    },
    ref
  ) => {
    const accentStyle = getAccentVariables(accentColor);

    return (
      <div
        ref={ref}
        style={{ ...style, ...accentStyle, ...styles?.root }}
        className={cn(
          'unbrn-alert',
          icon && 'unbrn-alert-has-icon',
          variant !== 'filled' && 'unbrn-glass',
          variant === 'duo' && 'unbrn-alert-duo',
          variant === 'filled' && 'unbrn-alert-filled',
          className,
          classNames?.root
        )}
      >
        <div className="unbrn-alert-content-wrapper">
          {icon && (
            <div
              className={cn("unbrn-alert-icon", classNames?.icon)}
              style={styles?.icon}
            >
              {icon}
            </div>
          )}
          <div className="unbrn-alert-text-wrapper">
            <div
              className={cn("unbrn-alert-title", classNames?.title)}
              style={styles?.title}
            >
              {title}
            </div>
            {description && (
              <div
                className={cn("unbrn-alert-description", classNames?.description)}
                style={styles?.description}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {actions && (
          <div
            className={cn("unbrn-alert-actions", classNames?.actions)}
            style={styles?.actions}
          >
            {actions}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
