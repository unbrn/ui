"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Accordion.css';
import { getAccentVariables } from '../../lib/colors';

export interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'variant'> {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  variant?: 'outlined' | 'duo' | 'filled';
  accentColor?: string;
  classNames?: {
    root?: string;
    item?: string;
    header?: string;
    leadingIcon?: string;
    content?: string;
    icon?: string;
    title?: string;
    subtitle?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    item?: React.CSSProperties;
    header?: React.CSSProperties;
    leadingIcon?: React.CSSProperties;
    content?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
    subtitle?: React.CSSProperties;
  };
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'outlined',
  accentColor,
  classNames,
  styles,
  className,
  style,
  ...rest
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const accentStyle = getAccentVariables(accentColor);

  return (
    <div
      className={cn(
        'unbrn-accordion',
        variant === 'outlined' && 'unbrn-accordion-outlined',
        variant === 'duo' && 'unbrn-accordion-duo',
        variant === 'filled' && 'unbrn-accordion-filled',
        className,
        classNames?.root
      )}
      style={{ ...style, ...accentStyle, ...styles?.root }}
      {...rest}
    >
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "unbrn-accordion-item",
              item.icon && "unbrn-accordion-item-has-icon",
              (variant === 'outlined' || variant === 'duo') && 'unbrn-glass',
              classNames?.item
            )}
            style={styles?.item}
            data-state={isOpen ? 'open' : 'closed'}
          >
            <button
              className={cn("unbrn-accordion-header", classNames?.header)}
              style={styles?.header}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <div className="unbrn-accordion-header-content">
                {item.icon && (
                  <span
                    className={cn("unbrn-accordion-leading-icon", classNames?.leadingIcon)}
                    style={styles?.leadingIcon}
                  >
                    {item.icon}
                  </span>
                )}
                <div className="unbrn-accordion-header-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span className={cn("unbrn-accordion-title", classNames?.title)} style={styles?.title}>
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span
                      className={cn("unbrn-accordion-subtitle", classNames?.subtitle)}
                      style={styles?.subtitle}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <span className="unbrn-accordion-icon-container">
                <ChevronDown
                  className={cn("unbrn-accordion-icon", classNames?.icon)}
                  size={16}
                  style={styles?.icon}
                />
              </span>
            </button>
            <div
              className={cn("unbrn-accordion-content-wrapper", classNames?.content)}
              style={styles?.content}
            >
              <div
                className="unbrn-accordion-content"
              >
                <div className="unbrn-accordion-content-inner">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
