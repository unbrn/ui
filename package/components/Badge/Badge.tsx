import React from 'react';
import { cn } from '../../lib/utils';
import './Badge.css';
import { getAccentVariables } from '../../lib/colors';

export interface BadgeProps {
  badgeVariant?: 'filled' | 'outlined' | 'duo';
  badgeSize?: 'sm' | 'md' | 'lg';
  badgeIcon?: React.ReactNode;
  badgeIconPosition?: 'left' | 'right';
  badgeAccentColor?: string;
  badgeClassName?: string;
  badgeStyle?: React.CSSProperties;
  badgeChildren?: React.ReactNode;
  classNames?: {
    badgeRoot?: string;
    badgeIcon?: string;
    badgeText?: string;
  };
  styles?: {
    badgeRoot?: React.CSSProperties;
    badgeIcon?: React.CSSProperties;
    badgeText?: React.CSSProperties;
  };
}

export const Badge: React.FC<BadgeProps> = ({
  badgeChildren,
  badgeVariant = 'filled',
  badgeSize = 'md',
  badgeIcon,
  badgeIconPosition = 'left',
  badgeAccentColor,
  badgeClassName,
  classNames,
  styles,
  badgeStyle
}) => {
  const accentStyle = getAccentVariables(badgeAccentColor);

  return (
    <div
      className={cn(
        'unburn-badge',
        `unburn-badge-${badgeVariant}`,
        `unburn-badge-${badgeSize}`,
        (badgeVariant === 'outlined' || badgeVariant === 'duo') && 'unburn-glass',
        badgeClassName,
        classNames?.badgeRoot
      )}
      style={{ ...badgeStyle, ...accentStyle, ...styles?.badgeRoot }}
    >
      {badgeIcon && badgeIconPosition === 'left' && (
        <span
          className={cn('unburn-badge-icon-left', classNames?.badgeIcon)}
          style={styles?.badgeIcon}
        >
          {badgeIcon}
        </span>
      )}
      <span
        className={cn('unburn-badge-text', classNames?.badgeText)}
        style={styles?.badgeText}
      >
        {badgeChildren}
      </span>
      {badgeIcon && badgeIconPosition === 'right' && (
        <span
          className={cn('unburn-badge-icon-right', classNames?.badgeIcon)}
          style={styles?.badgeIcon}
        >
          {badgeIcon}
        </span>
      )}
    </div>
  );
};
