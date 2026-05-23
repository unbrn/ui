import React from 'react';
import { cn } from '../../lib/utils';
import './Badge.css';
import { getAccentVariables } from '../../lib/colors';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  color?: string;
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
  size = 'md',
  icon,
  iconPosition = 'left',
  color,
  className,
  classNames,
  styles,
  style,
  ...props
}) => {
  const accentStyle = getAccentVariables(color);

  return (
    <div
      className={cn(
        'unburn-badge',
        `unburn-badge-${variant}`,
        `unburn-badge-${size}`,
        (variant === 'outlined' || variant === 'duo') && 'unburn-glass',
        className,
        classNames?.root
      )}
      style={{ ...style, ...accentStyle, ...styles?.root }}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span
          className={cn('unburn-badge-icon-left', classNames?.icon)}
          style={styles?.icon}
        >
          {icon}
        </span>
      )}
      <span
        className={cn('unburn-badge-text', classNames?.text)}
        style={styles?.text}
      >
        {children}
      </span>
      {icon && iconPosition === 'right' && (
        <span
          className={cn('unburn-badge-icon-right', classNames?.icon)}
          style={styles?.icon}
        >
          {icon}
        </span>
      )}
    </div>
  );
};
