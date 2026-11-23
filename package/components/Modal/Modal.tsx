"use client";

import React, { forwardRef, useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Modal.css';

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'outlined' | 'duo' | 'filled';
  size?: 1 | 2 | 3;
  accentColor?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  portal?: boolean;
  target?: HTMLElement;
  overlayBlur?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    overlay?: string;
    header?: string;
    title?: string;
    description?: string;
    body?: string;
    footer?: string;
    close?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    overlay?: React.CSSProperties;
    header?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
    close?: React.CSSProperties;
  };
}

const sizeMap = (size: 1 | 2 | 3) => {
  switch (size) {
    case 1: return 'unbrn-modal-sm';
    case 3: return 'unbrn-modal-lg';
    default: return 'unbrn-modal-default';
  }
};

const blurClassMap = (blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl') => {
  switch (blur) {
    case 'none': return 'unbrn-modal-blur-none';
    case 'sm': return 'unbrn-modal-blur-sm';
    case 'md': return 'unbrn-modal-blur-md';
    case 'xl': return 'unbrn-modal-blur-xl';
    default: return 'unbrn-modal-blur-lg';
  }
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      opened,
      onClose,
      title,
      description,
      variant = 'outlined',
      size = 2,
      accentColor,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      portal = true,
      target,
      overlayBlur = 'lg',
      footer,
      children,
      className,
      style,
      classNames,
      styles,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const closingRef = useRef(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClose = useCallback(() => {
      if (closingRef.current) return;
      closingRef.current = true;
      setClosing(true);
      setTimeout(() => {
        setVisible(false);
        setClosing(false);
        closingRef.current = false;
        onClose();
      }, 200);
    }, [onClose]);

    useEffect(() => {
      if (opened) {
        setVisible(true);
        setClosing(false);
        closingRef.current = false;
      } else if (visible && !closingRef.current) {
        handleClose();
      }
    }, [opened, visible, handleClose]);

    useEffect(() => {
      if (!visible || !closeOnEscape) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [visible, closeOnEscape, handleClose]);

    useEffect(() => {
      if (visible) {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = original; };
      }
    }, [visible]);

    if (!visible) return null;

    const accentStyle = getAccentVariables(accentColor);
    const hasHeader = !!(title || description || showCloseButton);
    const hasFooter = !!footer;

    const modalContent = (
      <div
        className={cn(
          'unbrn-modal-overlay',
          blurClassMap(overlayBlur),
          closing && 'unbrn-modal-overlay-closing',
          classNames?.overlay
        )}
        style={styles?.overlay}
        onClick={closeOnOverlayClick ? handleClose : undefined}
        role="dialog"
        aria-modal="true"
      >
        <div
          ref={ref}
          className={cn(
            'unbrn-modal',
            sizeMap(size),
            variant === 'outlined' && 'unbrn-modal-outlined',
            variant === 'duo' && 'unbrn-modal-duo',
            variant === 'filled' && 'unbrn-modal-filled',
            !hasHeader && 'unbrn-modal-no-header',
            !hasFooter && 'unbrn-modal-no-footer',
            className,
            classNames?.root
          )}
          style={{ ...style, ...accentStyle, ...styles?.root }}
          onClick={(e) => e.stopPropagation()}
        >
          {hasHeader && (
            <div
              className={cn('unbrn-modal-header', classNames?.header)}
              style={styles?.header}
            >
              <div className="unbrn-modal-header-text">
                {title && (
                  <div
                    className={cn('unbrn-modal-title', classNames?.title)}
                    style={styles?.title}
                  >
                    {title}
                  </div>
                )}
                {description && (
                  <div
                    className={cn('unbrn-modal-description', classNames?.description)}
                    style={styles?.description}
                  >
                    {description}
                  </div>
                )}
              </div>
              {showCloseButton && (
                <button
                  className={cn('unbrn-modal-close', classNames?.close)}
                  style={styles?.close}
                  onClick={handleClose}
                  aria-label="Close modal"
                  type="button"
                >
                  <X />
                </button>
              )}
            </div>
          )}

          {children && (
            <div
              className={cn('unbrn-modal-body', classNames?.body)}
              style={styles?.body}
            >
              {children}
            </div>
          )}

          {hasFooter && (
            <div
              className={cn('unbrn-modal-footer', classNames?.footer)}
              style={styles?.footer}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    );

    if (portal && mounted && typeof document !== 'undefined') {
      return createPortal(modalContent, target || document.body);
    }

    return modalContent;
  }
);

Modal.displayName = 'Modal';
