"use client";

import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Toast.css';


export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastData {
  id: string;
  title: string;
  message?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'outlined' | 'duo' | 'filled';
  accentColor?: string;
  duration?: number;
  closable?: boolean;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    message?: string;
    close?: string;
    progress?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
    message?: React.CSSProperties;
    close?: React.CSSProperties;
    progress?: React.CSSProperties;
  };
}

export interface ToastContainerProps {
  position?: ToastPosition;
  limit?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}


interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
};


interface ToastItemProps {
  data: ToastData;
  onDismiss: (id: string) => void;
  position: ToastPosition;
}

const ToastItem: React.FC<ToastItemProps> = ({ data, onDismiss, position }) => {
  const {
    id,
    title,
    message,
    icon,
    variant = 'outlined',
    accentColor,
    duration = 4000,
    closable = true,
    actions,
    className,
    style,
    classNames,
    styles,
  } = data;

  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  const fromDirection = position.startsWith('top') ? 'unbrn-toast-from-top' : 'unbrn-toast-from-bottom';

  const dismiss = useCallback(() => {
    setExiting(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTimeout(() => onDismiss(id), 250);
  }, [id, onDismiss]);

  useEffect(() => {
    if (duration <= 0) return;

    startRef.current = Date.now();
    timerRef.current = setTimeout(dismiss, duration);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, dismiss]);

  const accentStyle = getAccentVariables(accentColor);

  return (
    <div
      className={cn(
        'unbrn-toast',
        fromDirection,
        exiting && 'unbrn-toast-exiting',
        variant === 'outlined' && 'unbrn-glass',
        variant === 'duo' && 'unbrn-glass unbrn-toast-duo',
        variant === 'filled' && 'unbrn-toast-filled',
        className,
        classNames?.root
      )}
      style={{ ...style, ...accentStyle, ...styles?.root }}
      role="alert"
    >
      {icon && (
        <div
          className={cn('unbrn-toast-icon', classNames?.icon)}
          style={styles?.icon}
        >
          {icon}
        </div>
      )}

      <div className="unbrn-toast-content">
        <div
          className={cn('unbrn-toast-title', classNames?.title)}
          style={styles?.title}
        >
          {title}
        </div>
        {message && (
          <div
            className={cn('unbrn-toast-message', classNames?.message)}
            style={styles?.message}
          >
            {message}
          </div>
        )}
        {actions && (
          <div className="unbrn-toast-actions">{actions}</div>
        )}
      </div>

      {closable && (
        <button
          className={cn('unbrn-toast-close', classNames?.close)}
          style={styles?.close}
          onClick={dismiss}
          aria-label="Dismiss toast"
          type="button"
        >
          <X />
        </button>
      )}

      {duration > 0 && (
        <div
          className={cn('unbrn-toast-progress', classNames?.progress)}
          style={{ width: `${progress}%`, ...styles?.progress }}
        />
      )}
    </div>
  );
};


export const ToastProvider = forwardRef<HTMLDivElement, ToastContainerProps>(
  (
    {
      position = 'bottom-right',
      limit = 5,
      children,
      className,
      style,
    },
    ref
  ) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const toast = useCallback(
      (data: Omit<ToastData, 'id'>): string => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setToasts((prev) => {
          const next = [...prev, { ...data, id }];
          return next.slice(-limit);
        });
        return id;
      },
      [limit]
    );

    const dismiss = useCallback((id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const dismissAll = useCallback(() => {
      setToasts([]);
    }, []);

    return (
      <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
        {children}
        {toasts.length > 0 && (
          <div
            ref={ref}
            className={cn(
              'unbrn-toast-container',
              `unbrn-toast-container-${position}`,
              className
            )}
            style={style}
          >
            {toasts.map((t) => (
              <ToastItem
                key={t.id}
                data={t}
                onDismiss={dismiss}
                position={position}
              />
            ))}
          </div>
        )}
      </ToastContext.Provider>
    );
  }
);

ToastProvider.displayName = 'ToastProvider';
