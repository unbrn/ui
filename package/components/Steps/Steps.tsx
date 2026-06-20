"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import './Steps.css';

export interface StepItem {
  stepTitle: string;
  stepDescription?: string;
  stepChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export interface StepsProps {
  stepsItems?: StepItem[];
  stepsChildren?: React.ReactNode;
  children?: React.ReactNode;
  stepsClassName?: string;
  stepsStyle?: React.CSSProperties;
  classNames?: {
    stepsRoot?: string;
    stepsStep?: string;
    stepsMarker?: string;
    stepsConnector?: string;
    stepsTitle?: string;
    stepsDescription?: string;
  };
  styles?: {
    stepsRoot?: React.CSSProperties;
    stepsStep?: React.CSSProperties;
    stepsMarker?: React.CSSProperties;
    stepsConnector?: React.CSSProperties;
    stepsTitle?: React.CSSProperties;
    stepsDescription?: React.CSSProperties;
  };
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      stepsItems,
      stepsChildren,
      children,
      stepsClassName,
      stepsStyle,
      classNames,
      styles,
    },
    ref
  ) => {
    const childArray = stepsItems
      ? stepsItems.map((item, i) => {
        const displayStepChildren = item.children ?? item.stepChildren;
        return (
          <div
            key={i}
            className={cn('unbrn-step', classNames?.stepsStep)}
            style={styles?.stepsStep}
          >
            <div className="unbrn-step-left">
              <div
                className={cn('unbrn-step-marker', classNames?.stepsMarker)}
                style={styles?.stepsMarker}
              >
                {i + 1}
              </div>
              {i < stepsItems.length - 1 && (
                <div
                  className={cn('unbrn-step-connector', classNames?.stepsConnector)}
                  style={styles?.stepsConnector}
                />
              )}
            </div>
            <div className="unbrn-step-content">
              <div
                className={cn('unbrn-step-title', classNames?.stepsTitle)}
                style={styles?.stepsTitle}
              >
                {item.stepTitle}
              </div>
              {item.stepDescription && (
                <div
                  className={cn('unbrn-step-description', classNames?.stepsDescription)}
                  style={styles?.stepsDescription}
                >
                  {item.stepDescription}
                </div>
              )}
              {displayStepChildren && (
                <div className="unbrn-step-body">{displayStepChildren}</div>
              )}
            </div>
          </div>
        );
      })
      : (children ?? stepsChildren);

    return (
      <div
        ref={ref}
        style={{ ...stepsStyle, ...styles?.stepsRoot }}
        className={cn('unbrn-steps', stepsClassName, classNames?.stepsRoot)}
      >
        {childArray}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
