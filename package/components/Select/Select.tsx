"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAccentVariables } from '../../lib/colors';
import './Select.css';

export interface SelectOption {
  selectOptionValue: string;
  selectOptionLabel: string;
  selectOptionDisabled?: boolean;
  selectOptionIcon?: React.ReactNode;
}

export interface SelectProps {
  selectOptions: SelectOption[];
  selectValue?: string;
  selectDefaultValue?: string;
  selectOnChange?: (value: string) => void;
  selectPlaceholder?: string;
  selectLabel?: string;
  selectDescription?: string;
  selectError?: string;
  selectDisabled?: boolean;
  selectLoading?: boolean;
  selectVariant?: 'filled' | 'outlined' | 'duo';
  selectSize?: 'sm' | 'default' | 'lg';
  selectClassName?: string;
  selectStyle?: React.CSSProperties;
  selectIcon?: React.ReactNode;
  selectAccentColor?: string;
  classNames?: {
    selectRoot?: string;
    selectLabel?: string;
    selectTrigger?: string;
    selectContent?: string;
    selectItem?: string;
    selectDescription?: string;
    selectError?: string;
  };
  styles?: {
    selectRoot?: React.CSSProperties;
    selectLabel?: React.CSSProperties;
    selectTrigger?: React.CSSProperties;
    selectContent?: React.CSSProperties;
    selectItem?: React.CSSProperties;
    selectDescription?: React.CSSProperties;
    selectError?: React.CSSProperties;
  };
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      selectOptions,
      selectValue: controlledValue,
      selectDefaultValue,
      selectOnChange,
      selectPlaceholder = "Select an option",
      selectLabel,
      selectDescription,
      selectError,
      selectDisabled,
      selectLoading,
      selectVariant = 'filled',
      selectSize = 'default',
      selectClassName,
      classNames,
      styles,
      selectStyle,
      selectIcon,
      selectAccentColor,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(selectDefaultValue || "");
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const isEffectivelyDisabled = selectDisabled || selectLoading;
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = selectOptions.find(opt => opt.selectOptionValue === value);
    const accentStyle = getAccentVariables(selectAccentColor);

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
      selectOnChange?.(optionValue);
    };

    return (
      <div
        className={cn("unburn-select-root", classNames?.selectRoot)}
        style={{ ...selectStyle, ...styles?.selectRoot, ...accentStyle }}
        ref={containerRef}
      >
        {selectLabel && (
          <label className={cn("unburn-select-label", classNames?.selectLabel)} style={styles?.selectLabel}>
            {selectLabel}
          </label>
        )}
        <div className="unburn-select-container">
          <button
            type="button"
            onClick={() => !isEffectivelyDisabled && setIsOpen(!isOpen)}
            className={cn(
              "unburn-select-trigger",
              `unburn-select-trigger-${selectVariant}`,
              `unburn-select-trigger-${selectSize}`,
              (selectVariant === 'outlined' || selectVariant === 'duo') && 'unburn-glass',
              isOpen && "unburn-select-trigger-open",
              isEffectivelyDisabled && "unburn-select-trigger-disabled",
              selectLoading && "unburn-select-trigger-loading",
              selectError && "unburn-select-trigger-error",
              selectClassName,
              classNames?.selectTrigger
            )}
            style={styles?.selectTrigger}
            disabled={isEffectivelyDisabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-busy={selectLoading}
          >
            <span className="unburn-select-trigger-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, textAlign: 'left', minWidth: 0 }}>
              {selectedOption?.selectOptionIcon ? (
                <span className="unburn-select-trigger-icon">{selectedOption.selectOptionIcon}</span>
              ) : selectIcon ? (
                <span className="unburn-select-trigger-icon">{selectIcon}</span>
              ) : null}
              <span className={cn("unburn-select-value", !selectedOption && "unburn-select-placeholder")}>
                {selectedOption ? selectedOption.selectOptionLabel : selectPlaceholder}
              </span>
            </span>
            {selectLoading ? (
              <span className="unburn-select-spinner" aria-hidden="true" />
            ) : (
              <ChevronDown
                className={cn("unburn-select-chevron", isOpen && "unburn-select-chevron-open")}
                size={16}
              />
            )}
          </button>

          {isOpen && (
            <div
              className={cn(
                "unburn-select-content",
                `unburn-select-content-${dropdownPosition}`,
                "unburn-glass",
                classNames?.selectContent
              )}
              style={styles?.selectContent}
              role="listbox"
            >
              <div className="unburn-select-viewport">
                {selectOptions.map((option) => (
                  <div
                    key={option.selectOptionValue}
                    role="option"
                    aria-selected={option.selectOptionValue === value}
                    onClick={() => !option.selectOptionDisabled && handleSelect(option.selectOptionValue)}
                    className={cn(
                      "unburn-select-item",
                      option.selectOptionValue === value && "unburn-select-item-selected",
                      option.selectOptionDisabled && "unburn-select-item-disabled",
                      classNames?.selectItem
                    )}
                    style={styles?.selectItem}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, minWidth: 0 }}>
                      {option.selectOptionIcon && (
                        <span className="unburn-select-item-icon">{option.selectOptionIcon}</span>
                      )}
                      <span className="unburn-select-item-label">{option.selectOptionLabel}</span>
                    </div>
                    {option.selectOptionValue === value && (
                      <Check size={14} className="unburn-select-item-check" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {(selectDescription || selectError) && (
          <div className="unburn-select-footer">
            {selectError ? (
              <span className={cn("unburn-select-error", classNames?.selectError)} style={styles?.selectError}>
                {selectError}
              </span>
            ) : (
              selectDescription && (
                <p className={cn("unburn-select-description", classNames?.selectDescription)} style={styles?.selectDescription}>
                  {selectDescription}
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
