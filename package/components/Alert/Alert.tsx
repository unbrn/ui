import React, { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Alert.css';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  variant?: 'outlined' | 'duo' | 'filled';
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
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
      color,
      variant = 'filled',
      icon,
      title,
      description,
      actions,
      style,
      classNames,
      styles,
      ...props
    },
    ref
  ) => {
    const accentStyle = getAccentVariables(color);

    return (
      <div
        ref={ref}
        style={{ ...style, ...accentStyle, ...styles?.root }}
        className={cn(
          'unburn-alert',
          variant !== 'filled' && 'unburn-glass',
          variant === 'duo' && 'unburn-alert-duo',
          variant === 'filled' && 'unburn-alert-filled',
          className,
          classNames?.root
        )}
        {...props}
      >
        <div className="unburn-alert-content">
          {icon && (
            <div
              className={cn("unburn-alert-icon", classNames?.icon)}
              style={styles?.icon}
            >
              {icon}
            </div>
          )}
          <div className="unburn-alert-text">
            <div
              className={cn("unburn-alert-title", classNames?.title)}
              style={styles?.title}
            >
              {title}
            </div>
            {description && (
              <div
                className={cn("unburn-alert-description", classNames?.description)}
                style={styles?.description}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {actions && (
          <div
            className={cn("unburn-alert-actions", classNames?.actions)}
            style={styles?.actions}
          >
            {actions}
          </div>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
