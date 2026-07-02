"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'duo';
  size?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  accentColor?: string;
  searchable?: boolean;
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
      loading,
      variant = 'filled',
      size = 2,
      className,
      classNames,
      styles,
      style,
      icon,
      accentColor,
      searchable = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const isEffectivelyDisabled = disabled || loading;
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = options.find(opt => opt.value === value);
    const resolvedSize = size === 1 ? 'sm' : size === 3 ? 'lg' : 'default';
    const accentStyle = getAccentVariables(accentColor);

    const filteredOptions = searchable
      ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

    const displayValue = isFocused || isOpen
      ? searchQuery
      : (selectedOption ? selectedOption.label : "");

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 300;

        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      if (isEffectivelyDisabled) return;
      setInternalValue(optionValue);
      setIsOpen(false);
      setSearchQuery("");
      setIsFocused(false);
      onChange?.(optionValue);
    };

    return (
      <div
        className={cn("unbrn-select-root", classNames?.root)}
        style={{ ...style, ...styles?.root, ...accentStyle }}
        ref={containerRef}
      >
        {label && (
          <label className={cn("unbrn-select-label", classNames?.label)} style={styles?.label}>
            {label}
          </label>
        )}
        <div className="unbrn-select-container">
          {searchable ? (
            <div
              className={cn(
                "unbrn-select-trigger",
                "unbrn-select-trigger-searchable",
                `unbrn-select-trigger-${variant}`,
                `unbrn-select-trigger-${resolvedSize}`,
                (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
                isOpen && "unbrn-select-trigger-open",
                isEffectivelyDisabled && "unbrn-select-trigger-disabled",
                loading && "unbrn-select-trigger-loading",
                error && "unbrn-select-trigger-error",
                className,
                classNames?.trigger
              )}
              style={styles?.trigger}
            >
              <span className="unbrn-select-trigger-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, textAlign: 'left', minWidth: 0, height: '100%' }}>
                {selectedOption?.icon ? (
                  <span className="unbrn-select-trigger-icon">{selectedOption.icon}</span>
                ) : icon ? (
                  <span className="unbrn-select-trigger-icon">{icon}</span>
                ) : null}
                <input
                  type="text"
                  disabled={isEffectivelyDisabled}
                  value={displayValue}
                  placeholder={placeholder}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!isOpen) setIsOpen(true);
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                    setIsOpen(true);
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    // Close if focus moves outside the container entirely (e.g. Tab)
                    setTimeout(() => {
                      if (!containerRef.current?.contains(document.activeElement)) {
                        setIsOpen(false);
                      }
                      setSearchQuery("");
                    }, 200);
                  }}
                  className="unbrn-select-trigger-input"
                />
              </span>
              {loading ? (
                <span className="unbrn-select-spinner" aria-hidden="true" />
              ) : (
                <ChevronDown
                  className={cn("unbrn-select-chevron", isOpen && "unbrn-select-chevron-open")}
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isEffectivelyDisabled) setIsOpen(!isOpen);
                  }}
                />
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => !isEffectivelyDisabled && setIsOpen(!isOpen)}
              className={cn(
                "unbrn-select-trigger",
                `unbrn-select-trigger-${variant}`,
                `unbrn-select-trigger-${resolvedSize}`,
                (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
                isOpen && "unbrn-select-trigger-open",
                isEffectivelyDisabled && "unbrn-select-trigger-disabled",
                loading && "unbrn-select-trigger-loading",
                error && "unbrn-select-trigger-error",
                className,
                classNames?.trigger
              )}
              style={styles?.trigger}
              disabled={isEffectivelyDisabled}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-busy={loading}
            >
              <span className="unbrn-select-trigger-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, textAlign: 'left', minWidth: 0 }}>
                {selectedOption?.icon ? (
                  <span className="unbrn-select-trigger-icon">{selectedOption.icon}</span>
                ) : icon ? (
                  <span className="unbrn-select-trigger-icon">{icon}</span>
                ) : null}
                <span className={cn("unbrn-select-value", !selectedOption && "unbrn-select-placeholder")}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              </span>
              {loading ? (
                <span className="unbrn-select-spinner" aria-hidden="true" />
              ) : (
                <ChevronDown
                  className={cn("unbrn-select-chevron", isOpen && "unbrn-select-chevron-open")}
                  size={16}
                />
              )}
            </button>
          )}

          {isOpen && (
            <div
              className={cn(
                "unbrn-select-content",
                `unbrn-select-content-${dropdownPosition}`,
                "unbrn-glass",
                classNames?.content
              )}
              style={styles?.content}
              role="listbox"
            >
              <div className="unbrn-select-viewport">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={option.value === value}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      className={cn(
                        "unbrn-select-item",
                        `unbrn-select-item-size-${resolvedSize}`,
                        option.value === value && "unbrn-select-item-selected",
                        option.disabled && "unbrn-select-item-disabled",
                        classNames?.item,
                        option.className
                      )}
                      style={{ ...styles?.item, ...option.style }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, minWidth: 0 }}>
                        {option.icon && (
                          <span className="unbrn-select-item-icon">{option.icon}</span>
                        )}
                        <span className="unbrn-select-item-label">{option.label}</span>
                      </div>
                      {option.value === value && (
                        <Check 
                          size={size === 3 ? 16 : 14} 
                          className="unbrn-select-item-check" 
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className={cn("unbrn-select-item-empty", `unbrn-select-item-size-${resolvedSize}`)}>
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {(description || error) && (
          <div className="unbrn-select-footer">
            {error ? (
              <span className={cn("unbrn-select-error", classNames?.error)} style={styles?.error}>
                {error}
              </span>
            ) : (
              description && (
                <p className={cn("unbrn-select-description", classNames?.description)} style={styles?.description}>
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
