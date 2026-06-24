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
  selectOptionClassName?: string;
  selectOptionStyle?: React.CSSProperties;
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
  selectSearchable?: boolean;
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
      selectSearchable = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(selectDefaultValue || "");
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const isEffectivelyDisabled = selectDisabled || selectLoading;
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = selectOptions.find(opt => opt.selectOptionValue === value);
    const accentStyle = getAccentVariables(selectAccentColor);

    const filteredOptions = selectSearchable
      ? selectOptions.filter(opt => opt.selectOptionLabel.toLowerCase().includes(searchQuery.toLowerCase()))
      : selectOptions;

    const displayValue = isFocused || isOpen
      ? searchQuery
      : (selectedOption ? selectedOption.selectOptionLabel : "");

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
      selectOnChange?.(optionValue);
    };

    return (
      <div
        className={cn("unbrn-select-root", classNames?.selectRoot)}
        style={{ ...selectStyle, ...styles?.selectRoot, ...accentStyle }}
        ref={containerRef}
      >
        {selectLabel && (
          <label className={cn("unbrn-select-label", classNames?.selectLabel)} style={styles?.selectLabel}>
            {selectLabel}
          </label>
        )}
        <div className="unbrn-select-container">
          {selectSearchable ? (
            <div
              className={cn(
                "unbrn-select-trigger",
                "unbrn-select-trigger-searchable",
                `unbrn-select-trigger-${selectVariant}`,
                `unbrn-select-trigger-${selectSize}`,
                (selectVariant === 'outlined' || selectVariant === 'duo') && 'unbrn-glass',
                isOpen && "unbrn-select-trigger-open",
                isEffectivelyDisabled && "unbrn-select-trigger-disabled",
                selectLoading && "unbrn-select-trigger-loading",
                selectError && "unbrn-select-trigger-error",
                selectClassName,
                classNames?.selectTrigger
              )}
              style={styles?.selectTrigger}
            >
              <span className="unbrn-select-trigger-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, textAlign: 'left', minWidth: 0, height: '100%' }}>
                {selectedOption?.selectOptionIcon ? (
                  <span className="unbrn-select-trigger-icon">{selectedOption.selectOptionIcon}</span>
                ) : selectIcon ? (
                  <span className="unbrn-select-trigger-icon">{selectIcon}</span>
                ) : null}
                <input
                  type="text"
                  disabled={isEffectivelyDisabled}
                  value={displayValue}
                  placeholder={selectPlaceholder}
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
              {selectLoading ? (
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
                `unbrn-select-trigger-${selectVariant}`,
                `unbrn-select-trigger-${selectSize}`,
                (selectVariant === 'outlined' || selectVariant === 'duo') && 'unbrn-glass',
                isOpen && "unbrn-select-trigger-open",
                isEffectivelyDisabled && "unbrn-select-trigger-disabled",
                selectLoading && "unbrn-select-trigger-loading",
                selectError && "unbrn-select-trigger-error",
                selectClassName,
                classNames?.selectTrigger
              )}
              style={styles?.selectTrigger}
              disabled={isEffectivelyDisabled}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-busy={selectLoading}
            >
              <span className="unbrn-select-trigger-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, textAlign: 'left', minWidth: 0 }}>
                {selectedOption?.selectOptionIcon ? (
                  <span className="unbrn-select-trigger-icon">{selectedOption.selectOptionIcon}</span>
                ) : selectIcon ? (
                  <span className="unbrn-select-trigger-icon">{selectIcon}</span>
                ) : null}
                <span className={cn("unbrn-select-value", !selectedOption && "unbrn-select-placeholder")}>
                  {selectedOption ? selectedOption.selectOptionLabel : selectPlaceholder}
                </span>
              </span>
              {selectLoading ? (
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
                classNames?.selectContent
              )}
              style={styles?.selectContent}
              role="listbox"
            >
              <div className="unbrn-select-viewport">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.selectOptionValue}
                      role="option"
                      aria-selected={option.selectOptionValue === value}
                      onClick={() => !option.selectOptionDisabled && handleSelect(option.selectOptionValue)}
                      className={cn(
                        "unbrn-select-item",
                        `unbrn-select-item-size-${selectSize}`,
                        option.selectOptionValue === value && "unbrn-select-item-selected",
                        option.selectOptionDisabled && "unbrn-select-item-disabled",
                        classNames?.selectItem,
                        option.selectOptionClassName
                      )}
                      style={{ ...styles?.selectItem, ...option.selectOptionStyle }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, minWidth: 0 }}>
                        {option.selectOptionIcon && (
                          <span className="unbrn-select-item-icon">{option.selectOptionIcon}</span>
                        )}
                        <span className="unbrn-select-item-label">{option.selectOptionLabel}</span>
                      </div>
                      {option.selectOptionValue === value && (
                        <Check 
                          size={selectSize === 'sm' ? 12 : selectSize === 'lg' ? 16 : 14} 
                          className="unbrn-select-item-check" 
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className={cn("unbrn-select-item-empty", `unbrn-select-item-size-${selectSize}`)}>
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {(selectDescription || selectError) && (
          <div className="unbrn-select-footer">
            {selectError ? (
              <span className={cn("unbrn-select-error", classNames?.selectError)} style={styles?.selectError}>
                {selectError}
              </span>
            ) : (
              selectDescription && (
                <p className={cn("unbrn-select-description", classNames?.selectDescription)} style={styles?.selectDescription}>
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
