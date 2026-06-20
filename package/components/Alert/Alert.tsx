import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Alert.css';

export interface AlertProps {
  alertAccentColor?: string;
  alertVariant?: 'outlined' | 'duo' | 'filled';
  alertIcon?: React.ReactNode;
  alertTitle: string;
  alertDescription?: React.ReactNode;
  alertActions?: React.ReactNode;
  alertClassName?: string;
  alertStyle?: React.CSSProperties;
  alertChildren?: React.ReactNode;
  children?: React.ReactNode;
  classNames?: {
    alertRoot?: string;
    alertIcon?: string;
    alertTitle?: string;
    alertDescription?: string;
    alertActions?: string;
  };
  styles?: {
    alertRoot?: React.CSSProperties;
    alertIcon?: React.CSSProperties;
    alertTitle?: React.CSSProperties;
    alertDescription?: React.CSSProperties;
    alertActions?: React.CSSProperties;
  };
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      alertClassName,
      alertAccentColor,
      alertVariant = 'filled',
      alertIcon,
      alertTitle,
      alertDescription,
      alertActions,
      alertStyle,
      classNames,
      styles,
      alertChildren,
      children
    },
    ref
  ) => {
    const accentStyle = getAccentVariables(alertAccentColor);

    return (
      <div
        ref={ref}
        style={{ ...alertStyle, ...accentStyle, ...styles?.alertRoot }}
        className={cn(
          'unbrn-alert',
          alertIcon && 'unbrn-alert-has-icon',
          alertVariant !== 'filled' && 'unbrn-glass',
          alertVariant === 'duo' && 'unbrn-alert-duo',
          alertVariant === 'filled' && 'unbrn-alert-filled',
          alertClassName,
          classNames?.alertRoot
        )}
      >
        <div className="unbrn-alert-header">
          {alertIcon && (
            <div
              className={cn("unbrn-alert-icon", classNames?.alertIcon)}
              style={styles?.alertIcon}
            >
              {alertIcon}
            </div>
          )}
          <div
            className={cn("unbrn-alert-title", classNames?.alertTitle)}
            style={styles?.alertTitle}
          >
            {alertTitle}
          </div>
        </div>
        {alertDescription && (
          <div
            className={cn("unbrn-alert-description", classNames?.alertDescription)}
            style={styles?.alertDescription}
          >
            {alertDescription}
          </div>
        )}
        {alertActions && (
          <div
            className={cn("unbrn-alert-actions", classNames?.alertActions)}
            style={styles?.alertActions}
          >
            {alertActions}
          </div>
        )}
        {children ?? alertChildren}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
