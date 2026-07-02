import React from 'react';
import { cn } from '../../lib/utils';
import './Badge.css';
import { getAccentVariables } from '../../lib/colors';

export interface BadgeProps {
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 1 | 2;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  classNames?: {
    root?: string;
    icon?: string;
    text?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    text?: React.CSSProperties;
  };
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'filled',
  size = 2,
  icon,
  iconPosition = 'left',
  accentColor,
  className,
  classNames,
  styles,
  style
}) => {
  const resolvedSize = size === 1 ? 'sm' : 'md';
  const accentStyle = getAccentVariables(accentColor);
  const displayChildren = children;

  return (
    <div
      className={cn(
        'unbrn-badge',
        `unbrn-badge-${variant}`,
        `unbrn-badge-${resolvedSize}`,
        (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
        className,
        classNames?.root
      )}
      style={{ ...style, ...accentStyle, ...styles?.root }}
    >
      {icon && iconPosition === 'left' && (
        <span
          className={cn('unbrn-badge-icon-left', classNames?.icon)}
          style={styles?.icon}
        >
          {icon}
        </span>
      )}
      <span
        className={cn('unbrn-badge-text', classNames?.text)}
        style={styles?.text}
      >
        {displayChildren}
      </span>
      {icon && iconPosition === 'right' && (
        <span
          className={cn('unbrn-badge-icon-right', classNames?.icon)}
          style={styles?.icon}
        >
          {icon}
        </span>
      )}
    </div>
  );
};
