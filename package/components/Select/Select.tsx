"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  classNames?: {
    root?: string;
    label?: string;
    trigger?: string;
    content?: string;
    item?: string;
    description?: string;
    error?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    label?: React.CSSProperties;
    trigger?: React.CSSProperties;
    content?: React.CSSProperties;
    item?: React.CSSProperties;
    description?: React.CSSProperties;
    error?: React.CSSProperties;
  };
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select an option",
      label,
      description,
      error,
      disabled,
      variant = 'filled',
      size = 'default',
      className,
      classNames,
      styles,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      if (disabled) return;
      setInternalValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    };

    return (
      <div
        className={cn("unburn-select-root", classNames?.root)}
        style={styles?.root}
        ref={containerRef}
      >
        {label && (
          <label className={cn("unburn-select-label", classNames?.label)} style={styles?.label}>
            {label}
          </label>
        )}
        <div className="unburn-select-container">
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={cn(
              "unburn-select-trigger",
              `unburn-select-trigger-${variant}`,
              `unburn-select-trigger-${size}`,
              (variant === 'outlined' || variant === 'duo') && 'unburn-glass',
              isOpen && "unburn-select-trigger-open",
              disabled && "unburn-select-trigger-disabled",
              error && "unburn-select-trigger-error",
              className,
              classNames?.trigger
            )}
            style={styles?.trigger}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={cn("unburn-select-value", !selectedOption && "unburn-select-placeholder")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={cn("unburn-select-chevron", isOpen && "unburn-select-chevron-open")}
              size={16}
            />
          </button>

          {isOpen && (
            <div
              className={cn("unburn-select-content", classNames?.content)}
              style={styles?.content}
              role="listbox"
            >
              <div className="unburn-select-viewport">
                {options.map((option) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className={cn(
                      "unburn-select-item",
                      option.value === value && "unburn-select-item-selected",
                      option.disabled && "unburn-select-item-disabled",
                      classNames?.item
                    )}
                    style={styles?.item}
                  >
                    <span className="unburn-select-item-label">{option.label}</span>
                    {option.value === value && (
                      <Check size={14} className="unburn-select-item-check" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {(description || error) && (
          <div className="unburn-select-footer">
            {error ? (
              <span className={cn("unburn-select-error", classNames?.error)} style={styles?.error}>
                {error}
              </span>
            ) : (
              description && (
                <p className={cn("unburn-select-description", classNames?.description)} style={styles?.description}>
                  {description}
                </p>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
