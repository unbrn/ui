"use client";

import React, { useEffect, useRef } from 'react';
import { Mic, MicOff, X, MoreHorizontal } from 'lucide-react';
import './VoiceAgent.css';
import { cn } from '../../lib/utils';
import { Button, ButtonGroup } from '../Button/Button';
import { parseColor } from '../../lib/colors';

export interface VoiceAgentProps {
  voiceAgentStatus?: 'idle' | 'connecting' | 'listening' | 'speaking' | 'paused';
  voiceAgentVariant?: 'grid';
  voiceAgentAccentColor?: string;
  voiceAgentGridSize?: { rows: number; cols: number };
  voiceAgentPattern?: 'wave' | 'blob' | 'ripple';
  voiceAgentIsMuted?: boolean;
  voiceAgentOnMuteToggle?: () => void;
  voiceAgentOnDisconnect?: () => void;
  voiceAgentOnOptionClick?: () => void;
  voiceAgentShowControls?: boolean;
  voiceAgentAudioAnalyser?: AnalyserNode;
  voiceAgentDotSize?: number;
  voiceAgentGridGap?: number;
  voiceAgentClassName?: string;
  voiceAgentStyle?: React.CSSProperties;
}

export const VoiceAgent: React.FC<VoiceAgentProps> = ({
  voiceAgentStatus = 'idle',
  voiceAgentVariant = 'grid',
  voiceAgentAccentColor,
  voiceAgentGridSize = { rows: 9, cols: 9 },
  voiceAgentPattern,
  voiceAgentIsMuted = false,
  voiceAgentOnMuteToggle,
  voiceAgentOnDisconnect,
  voiceAgentOnOptionClick,
  voiceAgentShowControls = true,
  voiceAgentAudioAnalyser,
  voiceAgentDotSize = 8,
  voiceAgentGridGap = 6,
  voiceAgentClassName,
  voiceAgentStyle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dotStatesRef = useRef<Float32Array | null>(null);
  const colorsRef = useRef({
    active: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.3)',
    inactive: 'rgba(255, 255, 255, 0.08)'
  });

  const speakPattern = voiceAgentPattern || 'blob';
  const iconSize = 14;
  const resolvedColor = voiceAgentAccentColor;
  const { rows, cols } = voiceAgentGridSize;
  const totalDots = rows * cols;

  // Function to update colors from DOM computed styles
  const updateColors = () => {
    const container = containerRef.current;
    if (!container) return;
    const computedStyle = window.getComputedStyle(container);
    
    const activeColor = computedStyle.getPropertyValue('--voice-accent').trim() || (voiceAgentStatus === 'speaking' ? '#ffffff' : '#34d399');
    const glowColor = computedStyle.getPropertyValue('--voice-accent-glow').trim() || 'rgba(255, 255, 255, 0.3)';
    const inactiveColor = computedStyle.getPropertyValue('--voice-dot-inactive').trim() || 'rgba(255, 255, 255, 0.08)';

    colorsRef.current = {
      active: activeColor,
      glow: glowColor,
      inactive: inactiveColor
    };
  };

  // Setup observer to detect theme changes and update colors accordingly
  useEffect(() => {
    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-accent']
    });

    return () => observer.disconnect();
  }, [voiceAgentAccentColor, voiceAgentStatus]);

  // Main canvas animation and layout effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = cols * voiceAgentDotSize + (cols - 1) * voiceAgentGridGap;
    const height = rows * voiceAgentDotSize + (rows - 1) * voiceAgentGridGap;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Initialize or resize states array
    if (!dotStatesRef.current || dotStatesRef.current.length !== totalDots) {
      dotStatesRef.current = new Float32Array(totalDots);
    }

    const interpolateColor = (colorA: string, colorB: string, factor: number): string => {
      const parsedA = parseColor(colorA) || { r: 255, g: 255, b: 255, a: 0.08 };
      const parsedB = parseColor(colorB) || { r: 255, g: 255, b: 255, a: 1 };
      
      const r = Math.round(parsedA.r + (parsedB.r - parsedA.r) * factor);
      const g = Math.round(parsedA.g + (parsedB.g - parsedA.g) * factor);
      const b = Math.round(parsedA.b + (parsedB.b - parsedA.b) * factor);
      const a = parsedA.a + (parsedB.a - parsedA.a) * factor;
      
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const animate = (time: number) => {
      let analyserData: Uint8Array | null = null;
      let averageVolume = 0;

      if (voiceAgentAudioAnalyser && voiceAgentStatus !== 'idle' && voiceAgentStatus !== 'paused') {
        analyserData = new Uint8Array(voiceAgentAudioAnalyser.frequencyBinCount);
        voiceAgentAudioAnalyser.getByteFrequencyData(analyserData as any);
        
        let sum = 0;
        const range = Math.min(analyserData.length, 128);
        for (let i = 0; i < range; i++) {
          sum += analyserData[i];
        }
        averageVolume = sum / (range || 1) / 255;
      }

      ctx.clearRect(0, 0, width, height);

      const states = dotStatesRef.current;
      if (!states) return;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const isCorner =
            (r === 0 && c === 0) ||
            (r === 0 && c === cols - 1) ||
            (r === rows - 1 && c === 0) ||
            (r === rows - 1 && c === cols - 1);

          if (isCorner) continue;

          let active: boolean;

          const ny = (r - (rows - 1) / 2) / ((rows - 1) / 2 || 1);
          const nx = (c - (cols - 1) / 2) / ((cols - 1) / 2 || 1);
          const dist = Math.sqrt(nx * nx + ny * ny);

          switch (voiceAgentStatus) {
            case 'connecting': {
              const angle = Math.atan2(ny, nx) + Math.PI; // [0, 2*PI]
              const sweep = (time * 0.003) % (2 * Math.PI);
              const diff = (angle - sweep + 4 * Math.PI) % (2 * Math.PI);

              active = diff < 0.4 || (dist < 0.25 && Math.sin(time * 0.008) > 0);
              break;
            }
            case 'listening': {
              if (analyserData) {
                const boostedVolume = Math.min(1, averageVolume * 2.8);
                const pulse = 0.2 + 0.75 * boostedVolume;
                active = Math.abs(dist - pulse) < 0.2 || dist < (0.12 + 0.15 * boostedVolume);
              } else {
                const pulse = Math.sin(time * 0.005) * 0.22 + 0.45;
                active = Math.abs(dist - pulse) < 0.18 || dist < 0.15;
              }
              break;
            }
            case 'speaking': {
              if (speakPattern === 'blob') {
                const angle = Math.atan2(ny, nx);
                const noise = Math.sin(angle * 5 + time * 0.006) * 0.12 +
                  Math.cos(angle * 3 - time * 0.004) * 0.08;
                
                const activity = analyserData
                  ? 0.25 + 0.6 * averageVolume
                  : 0.45 + 0.35 * Math.sin(time * 0.007) * Math.cos(time * 0.003);

                active = dist <= (activity + noise);
              } else if (speakPattern === 'ripple') {
                const speechActivity = analyserData
                  ? averageVolume
                  : 0.3 + 0.7 * Math.sin(time * 0.007) * Math.cos(time * 0.003);
                const frequency = 12.0;
                const speed = 0.012;
                const wave = Math.sin(dist * frequency - time * speed);
                
                const maxRadius = 0.2 + 0.8 * speechActivity;
                
                const threshold = 0.2 + (dist / maxRadius) * 0.6;
                active = dist <= maxRadius && wave > threshold;
              } else {
                const envelope = Math.sin((nx + 1) * Math.PI / 2);
                let waveHeight: number;

                if (analyserData) {
                  const freqBins = Math.min(analyserData.length, 64);
                  const binIndex = Math.floor(((nx + 1) / 2) * (freqBins - 1));
                  const freqValue = analyserData[binIndex] / 255;
                  waveHeight = envelope * freqValue * 0.95;
                } else {
                  const speechActivity = 0.5 + 0.5 * Math.sin(time * 0.009) * Math.cos(time * 0.004);
                  waveHeight = envelope * speechActivity * 0.7 * (1 + 0.3 * Math.sin(nx * 5 + time * 0.015));
                }

                active = Math.abs(ny) <= waveHeight;
              }
              break;
            }
            case 'paused': {
              active = Math.abs(ny) < 0.1 && Math.abs(nx) < 0.3;
              break;
            }
            case 'idle':
            default: {
              const breathing = Math.sin(time * 0.002) * 0.15 + 0.1;
              active = Math.abs(ny) < 0.09 && Math.abs(nx) < breathing;
              break;
            }
          }

          // Snappy animation factor transition (easing)
          const target = active ? 1.0 : 0.0;
          states[index] += (target - states[index]) * 0.18;
          const f = states[index];

          // Draw the dot
          const cx = c * (voiceAgentDotSize + voiceAgentGridGap) + voiceAgentDotSize / 2;
          const cy = r * (voiceAgentDotSize + voiceAgentGridGap) + voiceAgentDotSize / 2;
          const radius = (voiceAgentDotSize / 2) * (1.0 + 0.15 * f);
          const dotColor = interpolateColor(colorsRef.current.inactive, colorsRef.current.active, f);

          ctx.save();
          if (f > 0.05) {
            ctx.shadowBlur = 10 * f;
            ctx.shadowColor = colorsRef.current.glow;
          }
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [voiceAgentStatus, rows, cols, totalDots, speakPattern, voiceAgentAudioAnalyser, voiceAgentDotSize, voiceAgentGridGap]);

  return (
    <div
      className={cn(
        'unburn-voice-agent',
        `unburn-variant-${voiceAgentVariant}`,
        `unburn-status-${voiceAgentStatus}`,
        voiceAgentIsMuted && 'unburn-muted',
        voiceAgentClassName
      )}
      style={{
        ...voiceAgentStyle,
        ...(resolvedColor ? { '--voice-accent': resolvedColor } : {}),
        '--voice-dot-size': `${voiceAgentDotSize}px`,
        '--voice-grid-gap': `${voiceAgentGridGap}px`
      } as React.CSSProperties}
    >
      <div className="unburn-voice-grid-container unburn-glass" ref={containerRef}>
        <canvas ref={canvasRef} className="unburn-voice-canvas" />
      </div>

      {voiceAgentShowControls && (
        <div className="unburn-voice-controls">
          <ButtonGroup
            buttonGroupChildren={
              <>
                <Button
                  buttonVariant="duo"
                  buttonAccentColor={voiceAgentIsMuted ? 'red' : resolvedColor}
                  buttonOnClick={voiceAgentOnMuteToggle}
                  buttonIcon={voiceAgentIsMuted ? <MicOff size={iconSize} /> : <Mic size={iconSize} />}
                />
                <Button
                  buttonVariant="duo"
                  buttonAccentColor={resolvedColor}
                  buttonOnClick={voiceAgentOnOptionClick}
                  buttonIcon={<MoreHorizontal size={iconSize} />}
                />
              </>
            }
          />

          <Button
            buttonVariant="duo"
            buttonAccentColor="red"
            buttonOnClick={voiceAgentOnDisconnect}
            buttonIcon={<X size={iconSize} />}
          />
        </div>
      )}
    </div>
  );
};
