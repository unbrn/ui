"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import './Steps.css';

export interface StepItem {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export interface StepsProps {
  items?: StepItem[];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    step?: string;
    marker?: string;
    connector?: string;
    title?: string;
    description?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    step?: React.CSSProperties;
    marker?: React.CSSProperties;
    connector?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
  };
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items,
      children,
      className,
      style,
      classNames,
      styles,
    },
    ref
  ) => {
    const childArray = items
      ? items.map((item, i) => {
        const displayStepChildren = item.children;
        return (
          <div
            key={i}
            className={cn('unbrn-step', classNames?.step)}
            style={styles?.step}
          >
            <div className="unbrn-step-left">
              <div
                className={cn('unbrn-step-marker', classNames?.marker)}
                style={styles?.marker}
              >
                {i + 1}
              </div>
              {i < items.length - 1 && (
                <div
                  className={cn('unbrn-step-connector', classNames?.connector)}
                  style={styles?.connector}
                />
              )}
            </div>
            <div className="unbrn-step-content">
              <div
                className={cn('unbrn-step-title', classNames?.title)}
                style={styles?.title}
              >
                {item.title}
              </div>
              {item.description && (
                <div
                  className={cn('unbrn-step-description', classNames?.description)}
                  style={styles?.description}
                >
                  {item.description}
                </div>
              )}
              {displayStepChildren && (
                <div className="unbrn-step-body">{displayStepChildren}</div>
              )}
            </div>
          </div>
        );
      })
      : (children);

    return (
      <div
        ref={ref}
        style={{ ...style, ...styles?.root }}
        className={cn('unbrn-steps', className, classNames?.root)}
      >
        {childArray}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
