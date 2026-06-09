"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import './Steps.css';

export interface StepItem {
  stepTitle: string;
  stepDescription?: string;
  stepChildren?: React.ReactNode;
}

export interface StepsProps {
  stepsItems?: StepItem[];
  stepsChildren?: React.ReactNode;
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
      stepsClassName,
      stepsStyle,
      classNames,
      styles,
    },
    ref
  ) => {
    const childArray = stepsItems
      ? stepsItems.map((item, i) => (
        <div
          key={i}
          className={cn('unburn-step', classNames?.stepsStep)}
          style={styles?.stepsStep}
        >
          <div className="unburn-step-left">
            <div
              className={cn('unburn-step-marker', classNames?.stepsMarker)}
              style={styles?.stepsMarker}
            >
              {i + 1}
            </div>
            {i < stepsItems.length - 1 && (
              <div
                className={cn('unburn-step-connector', classNames?.stepsConnector)}
                style={styles?.stepsConnector}
              />
            )}
          </div>
          <div className="unburn-step-content">
            <div
              className={cn('unburn-step-title', classNames?.stepsTitle)}
              style={styles?.stepsTitle}
            >
              {item.stepTitle}
            </div>
            {item.stepDescription && (
              <div
                className={cn('unburn-step-description', classNames?.stepsDescription)}
                style={styles?.stepsDescription}
              >
                {item.stepDescription}
              </div>
            )}
            {item.stepChildren && (
              <div className="unburn-step-body">{item.stepChildren}</div>
            )}
          </div>
        </div>
      ))
      : stepsChildren;

    return (
      <div
        ref={ref}
        style={{ ...stepsStyle, ...styles?.stepsRoot }}
        className={cn('unburn-steps', stepsClassName, classNames?.stepsRoot)}
      >
        {childArray}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
