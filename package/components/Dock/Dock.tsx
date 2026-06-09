"use client";

import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './Dock.css';
import { cn } from '../../lib/utils';
import { Button } from '../Button/Button';

export interface DockProps {
  dockIsMenuOpen: boolean;
  dockOnMenuToggle: () => void;
  dockShowHideToggle?: boolean;
  dockPosition?: 'top' | 'bottom' | 'left' | 'right';
  dockClassName?: string;
  classNames?: {
    dockRoot?: string;
    dockContainer?: string;
    dockTrigger?: string;
    dockActionBtn?: string;
    dockCollapseBtn?: string;
    dockExpandBtn?: string;
  };
  styles?: {
    dockRoot?: React.CSSProperties;
    dockContainer?: React.CSSProperties;
    dockTrigger?: React.CSSProperties;
    dockActionBtn?: React.CSSProperties;
    dockCollapseBtn?: React.CSSProperties;
    dockExpandBtn?: React.CSSProperties;
  };
  dockStyle?: React.CSSProperties;
  dockChildren?: React.ReactNode;
}

export const Dock: React.FC<DockProps> = ({
  dockIsMenuOpen,
  dockOnMenuToggle,
  dockShowHideToggle = true,
  dockPosition = 'bottom',
  dockClassName,
  classNames,
  styles,
  dockStyle,
  dockChildren
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn('unburn-dock-wrapper', `unburn-pos-${dockPosition}`, isCollapsed && 'unburn-collapsed', dockClassName, classNames?.dockRoot)}
      style={{ ...dockStyle, ...styles?.dockRoot }}
    >
      <div
        className={cn("unburn-dock", classNames?.dockContainer)}
        style={styles?.dockContainer}
      >
        <Button
          buttonClassName={cn('unburn-dock-trigger', dockIsMenuOpen && 'unburn-open', classNames?.dockTrigger)}
          buttonStyle={styles?.dockTrigger}
          buttonOnClick={dockOnMenuToggle}
          buttonChildren={
            <div className="unburn-trigger-icon-wrapper">
              {dockIsMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          }
        />

        {dockChildren}

        {dockShowHideToggle && (
          <Button
            buttonClassName={cn(classNames?.dockCollapseBtn)}
            buttonStyle={styles?.dockCollapseBtn}
            buttonOnClick={() => setIsCollapsed(true)}
            buttonChildren={
              <>
                {dockPosition === 'bottom' && <ChevronDown size={20} />}
                {dockPosition === 'top' && <ChevronUp size={20} />}
                {dockPosition === 'left' && <ChevronLeft size={20} />}
                {dockPosition === 'right' && <ChevronRight size={20} />}
              </>
            }
          />
        )}
      </div>

      {dockShowHideToggle && (
        <Button
          buttonClassName={cn("unburn-dock-expand-btn", classNames?.dockExpandBtn)}
          buttonStyle={styles?.dockExpandBtn}
          buttonOnClick={() => setIsCollapsed(false)}
          buttonChildren={
            <>
              {dockPosition === 'bottom' && <ChevronUp size={20} />}
              {dockPosition === 'top' && <ChevronDown size={20} />}
              {dockPosition === 'left' && <ChevronRight size={20} />}
              {dockPosition === 'right' && <ChevronLeft size={20} />}
            </>
          }
        />
      )}
    </div>
  );
};

