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

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  size?: 1 | 2 | 3 | 4 | 5;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max,
      className,
      style,
      size = 3
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
    const totalCount = childrenArray.length;
    const limit = max !== undefined ? max : totalCount;
    const displayedChildren = childrenArray.slice(0, limit);
    const remainingCount = totalCount - limit;

    return (
      <div
        ref={ref}
        style={style}
        className={cn('unbrn-avatar-group', className)}
      >
        <div className="unbrn-avatar-group-list" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {displayedChildren.reverse().map((child, index) => {
            const element = child as React.ReactElement<any>;
            return React.cloneElement(element, {
              key: index,
              size,
              className: cn(
                element.props.className,
                'unbrn-avatar-group-item'
              )
            });
          })}
        </div>
        {remainingCount > 0 && (
          <span className="unbrn-avatar-group-remaining" style={{
            fontSize: size === 1 ? '0.65rem' : size === 2 ? '0.75rem' : size === 4 ? '0.95rem' : size === 5 ? '1.15rem' : '0.85rem',
            color: 'var(--text-muted, rgba(255, 255, 255, 0.45))',
            marginLeft: '12px',
            fontWeight: 500
          }}>
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

