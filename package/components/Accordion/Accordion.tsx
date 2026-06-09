"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Accordion.css';
import { getAccentVariables } from '../../lib/colors';

export interface AccordionItemProps {
  accordionItemId: string;
  accordionItemTitle: string;
  accordionItemSubtitle?: string;
  accordionItemIcon?: React.ReactNode;
  accordionItemContent: React.ReactNode;
}

export interface AccordionProps {
  accordionItems: AccordionItemProps[];
  accordionAllowMultiple?: boolean;
  accordionClassName?: string;
  accordionVariant?: 'outlined' | 'duo' | 'filled';
  accordionAccentColor?: string;
  classNames?: {
    accordionRoot?: string;
    accordionItem?: string;
    accordionHeader?: string;
    accordionLeadingIcon?: string;
    accordionContent?: string;
    accordionIcon?: string;
    accordionTitle?: string;
    accordionSubtitle?: string;
  };
  styles?: {
    accordionRoot?: React.CSSProperties;
    accordionItem?: React.CSSProperties;
    accordionHeader?: React.CSSProperties;
    accordionLeadingIcon?: React.CSSProperties;
    accordionContent?: React.CSSProperties;
    accordionIcon?: React.CSSProperties;
    accordionTitle?: React.CSSProperties;
    accordionSubtitle?: React.CSSProperties;
  };
  accordionStyle?: React.CSSProperties;
}

export const Accordion: React.FC<AccordionProps> = ({
  accordionItems,
  accordionAllowMultiple = false,
  accordionClassName,
  accordionVariant = 'outlined',
  accordionAccentColor,
  classNames,
  styles,
  accordionStyle
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (accordionAllowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const accentStyle = getAccentVariables(accordionAccentColor);

  return (
    <div
      className={cn(
        'unburn-accordion',
        accordionVariant === 'outlined' && 'unburn-accordion-outlined',
        accordionVariant === 'duo' && 'unburn-accordion-duo',
        accordionVariant === 'filled' && 'unburn-accordion-filled',
        accordionClassName,
        classNames?.accordionRoot
      )}
      style={{ ...accordionStyle, ...accentStyle, ...styles?.accordionRoot }}
    >
      {accordionItems.map((item) => {
        const isOpen = openItems.includes(item.accordionItemId);
        return (
          <div
            key={item.accordionItemId}
            className={cn(
              "unburn-accordion-item",
              item.accordionItemIcon && "unburn-accordion-item-has-icon",
              (accordionVariant === 'outlined' || accordionVariant === 'duo') && 'unburn-glass',
              classNames?.accordionItem
            )}
            style={styles?.accordionItem}
            data-state={isOpen ? 'open' : 'closed'}
          >
            {item.accordionItemIcon && (
              <span
                className={cn("unburn-accordion-leading-icon", classNames?.accordionLeadingIcon)}
                style={styles?.accordionLeadingIcon}
              >
                {item.accordionItemIcon}
              </span>
            )}
            <button
              className={cn("unburn-accordion-header", classNames?.accordionHeader)}
              style={styles?.accordionHeader}
              onClick={() => toggleItem(item.accordionItemId)}
              aria-expanded={isOpen}
            >
              <div className="unburn-accordion-header-content">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span className={cn(classNames?.accordionTitle)} style={styles?.accordionTitle}>
                    {item.accordionItemTitle}
                  </span>
                  {item.accordionItemSubtitle && (
                    <span
                      className={cn("unburn-accordion-subtitle", classNames?.accordionSubtitle)}
                      style={styles?.accordionSubtitle}
                    >
                      {item.accordionItemSubtitle}
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown
                className={cn("unburn-accordion-icon", classNames?.accordionIcon)}
                size={16}
                style={styles?.accordionIcon}
              />
            </button>
            <div
              className={cn("unburn-accordion-content-wrapper", classNames?.accordionContent)}
              style={styles?.accordionContent}
            >
              <div
                className="unburn-accordion-content"
              >
                <div className="unburn-accordion-content-inner">
                  {item.accordionItemContent}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
