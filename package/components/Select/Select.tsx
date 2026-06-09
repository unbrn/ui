"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Select.css';

export interface SelectOption {
  selectOptionValue: string;
  selectOptionLabel: string;
  selectOptionDisabled?: boolean;
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
  selectVariant?: 'filled' | 'outlined' | 'duo';
  selectSize?: 'sm' | 'default' | 'lg';
  selectClassName?: string;
  selectStyle?: React.CSSProperties;
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
      selectVariant = 'filled',
      selectSize = 'default',
      selectClassName,
      classNames,
      styles,
      selectStyle,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(selectDefaultValue || "");
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = selectOptions.find(opt => opt.selectOptionValue === value);

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
      if (selectDisabled) return;
      setInternalValue(optionValue);
      setIsOpen(false);
      selectOnChange?.(optionValue);
    };

    return (
      <div
        className={cn("unburn-select-root", classNames?.selectRoot)}
        style={{ ...selectStyle, ...styles?.selectRoot }}
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
            onClick={() => !selectDisabled && setIsOpen(!isOpen)}
            className={cn(
              "unburn-select-trigger",
              `unburn-select-trigger-${selectVariant}`,
              `unburn-select-trigger-${selectSize}`,
              (selectVariant === 'outlined' || selectVariant === 'duo') && 'unburn-glass',
              isOpen && "unburn-select-trigger-open",
              selectDisabled && "unburn-select-trigger-disabled",
              selectError && "unburn-select-trigger-error",
              selectClassName,
              classNames?.selectTrigger
            )}
            style={styles?.selectTrigger}
            disabled={selectDisabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={cn("unburn-select-value", !selectedOption && "unburn-select-placeholder")}>
              {selectedOption ? selectedOption.selectOptionLabel : selectPlaceholder}
            </span>
            <ChevronDown
              className={cn("unburn-select-chevron", isOpen && "unburn-select-chevron-open")}
              size={16}
            />
          </button>

          {isOpen && (
            <div
              className={cn("unburn-select-content", classNames?.selectContent)}
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
                    <span className="unburn-select-item-label">{option.selectOptionLabel}</span>
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
