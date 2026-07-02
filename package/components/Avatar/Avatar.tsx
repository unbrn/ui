import React, { forwardRef } from 'react';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAccentVariables, resolveColor } from '../../lib/colors';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  showStatus?: boolean;
  statusColor?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    image?: string;
    status?: string;
    fallback?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    image?: React.CSSProperties;
    status?: React.CSSProperties;
    fallback?: React.CSSProperties;
  };
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      showStatus = false,
      statusColor,
      size = 3,
      accentColor,
      style,
      classNames,
      styles
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false);

    const resolvedSize = size === 1 ? 'xs' : size === 2 ? 'sm' : size === 4 ? 'lg' : size === 5 ? 'xl' : 'md';
    const accentStyle = getAccentVariables(accentColor);
    const statusVars = statusColor ? {
      '--status-color': resolveColor(statusColor)
    } as React.CSSProperties : {};

    return (
      <div
        ref={ref}
        style={{ ...style, ...accentStyle, ...styles?.root }}
        className={cn(
          'unbrn-avatar',
          `size-${resolvedSize}`,
          className,
          classNames?.root
        )}
      >
        <div className="unbrn-avatar-inner">
          {src && !hasError ? (
            <img
              src={src}
              alt={alt || 'Avatar'}
              loading="lazy"
              className={cn("unbrn-avatar-img", classNames?.image)}
              style={styles?.image}
              onError={() => setHasError(true)}
            />
          ) : (
            <div
              className={cn("unbrn-avatar-fallback", classNames?.fallback)}
              style={styles?.fallback}
            >
              {fallback || <User size={20} />}
            </div>
          )}
        </div>
        {showStatus && (
          <span
            className={cn('unbrn-avatar-status', classNames?.status)}
            style={{ ...statusVars, ...styles?.status }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
