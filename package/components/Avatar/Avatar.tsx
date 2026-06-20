import React, { forwardRef } from 'react';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAccentVariables, resolveColor } from '../../lib/colors';
import './Avatar.css';

export interface AvatarProps {
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: React.ReactNode;
  avatarShowStatus?: boolean;
  avatarStatusColor?: string;
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  avatarAccentColor?: string;
  avatarClassName?: string;
  avatarStyle?: React.CSSProperties;
  classNames?: {
    avatarRoot?: string;
    avatarImage?: string;
    avatarStatus?: string;
    avatarFallback?: string;
  };
  styles?: {
    avatarRoot?: React.CSSProperties;
    avatarImage?: React.CSSProperties;
    avatarStatus?: React.CSSProperties;
    avatarFallback?: React.CSSProperties;
  };
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      avatarClassName,
      avatarSrc,
      avatarAlt,
      avatarFallback,
      avatarShowStatus = false,
      avatarStatusColor,
      avatarSize = 'md',
      avatarAccentColor,
      avatarStyle,
      classNames,
      styles
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false);

    const accentStyle = getAccentVariables(avatarAccentColor);
    const statusVars = avatarStatusColor ? {
      '--status-color': resolveColor(avatarStatusColor)
    } as React.CSSProperties : {};

    return (
      <div
        ref={ref}
        style={{ ...avatarStyle, ...accentStyle, ...styles?.avatarRoot }}
        className={cn(
          'unbrn-avatar',
          `size-${avatarSize}`,
          avatarClassName,
          classNames?.avatarRoot
        )}
      >
        <div className="unbrn-avatar-inner">
          {avatarSrc && !hasError ? (
            <img
              src={avatarSrc}
              alt={avatarAlt || 'Avatar'}
              className={cn("unbrn-avatar-img", classNames?.avatarImage)}
              style={styles?.avatarImage}
              onError={() => setHasError(true)}
            />
          ) : (
            <div
              className={cn("unbrn-avatar-fallback", classNames?.avatarFallback)}
              style={styles?.avatarFallback}
            >
              {avatarFallback || <User size={20} />}
            </div>
          )}
        </div>
        {avatarShowStatus && (
          <span
            className={cn('unbrn-avatar-status', classNames?.avatarStatus)}
            style={{ ...statusVars, ...styles?.avatarStatus }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
