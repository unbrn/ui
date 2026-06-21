"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './LumenBeam.css';
import { cn } from '../../lib/utils';

export interface LumenBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  glowAmount?: number;
  beamWidth?: number;
  beamHeight?: number;
  noiseIntensity?: number;
  beamRotation?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  quality?: 'low' | 'medium' | 'high';
  twist?: number;
  pulseSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
}

const parseColorToGL = (hex: string): [number, number, number] => {
  let cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  const num = parseInt(cleanHex, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  return [
    isNaN(r) ? 1.0 : r,
    isNaN(g) ? 1.0 : g,
    isNaN(b) ? 1.0 : b
  ];
};

const vsSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const LumenBeam: React.FC<LumenBeamProps> = ({
  topColor = '#FFFFFF',
  bottomColor = '#0A0A0A',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  glowAmount = 0.005,
  beamWidth = 3.0,
  beamHeight = 0.25,
  noiseIntensity = 0.5,
  beamRotation = 245,
  mixBlendMode = 'normal',
  quality: qualityProp,
  twist = 0.2,
  pulseSpeed = 0.4,
  className,
  style,
  backgroundColor = 'transparent',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const quality = useMemo<'low' | 'medium' | 'high'>(() => {
    if (qualityProp) return qualityProp;
    if (typeof window === 'undefined') return 'high';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (isMobile) return 'high';
    if (isLowEndDevice) return 'medium';
    return 'high';
  }, [qualityProp]);

  const mouseRef = useRef({ x: 0.0, y: 0.0 });
  const timeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create canvas dynamically
    const canvas = document.createElement('canvas');
    canvas.className = 'unbrn-lumen-beam-canvas';
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      setTimeout(() => setWebGLSupported(false), 0);
      container.removeChild(canvas);
      canvasRef.current = null;
      return;
    }

    // Determine quality parameters
    const qualitySettings = {
      low: { iterations: 24, waveIterations: 1, pixelRatio: 0.5, precision: 'mediump', stepMultiplier: 1.5 },
      medium: { iterations: 40, waveIterations: 2, pixelRatio: 0.75, precision: 'mediump', stepMultiplier: 1.2 },
      high: {
        iterations: 80,
        waveIterations: 4,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        precision: 'highp',
        stepMultiplier: 1.0
      }
    };
    const settings = qualitySettings[quality];

    const fsSource = `
      precision ${settings.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uBeamWidth;
      uniform float uBeamHeight;
      uniform float uNoiseIntensity;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uBeamRotCos;
      uniform float uBeamRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      uniform float uTwist;
      uniform float uPulseSpeed;
      varying vec2 vUv;

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv = vec2(uBeamRotCos * uv.x - uBeamRotSin * uv.y, uBeamRotSin * uv.x + uBeamRotCos * uv.y);

        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        float rotC = uRotCos;
        float rotS = uRotSin;
        if (uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
          float a = uMouse.x * 6.2831853;
          rotC = cos(a);
          rotS = sin(a);
        }

        vec3 col = vec3(0.0);
        float t = 0.1;
        
        for (int i = 0; i < ${settings.iterations}; i++) {
          vec3 p = ro + rd * t;
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          // Swirl twist deformation along Y axis
          float twistAngle = p.y * uTwist;
          float cosT = cos(twistAngle);
          float sinT = sin(twistAngle);
          p.xz = vec2(cosT * p.x - sinT * p.z, sinT * p.x + cosT * p.z);

          vec3 q = p;
          q.y = p.y * uBeamHeight + uTime;
          
          float freq = 1.0;
          float amp = 1.0;
          for (int j = 0; j < ${settings.waveIterations}; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }
          
          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uBeamWidth;
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * ${settings.stepMultiplier.toFixed(1)};
          if (t > 50.0) break;
        }

        float widthNorm = uBeamWidth / 3.0;
        vec3 glowVal = col * uGlowAmount / widthNorm;
        vec3 expVal = exp(-2.0 * abs(glowVal));
        col = sign(glowVal) * (1.0 - expVal) / (1.0 + expVal);
        
        // Film grain noise
        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;

        // Breathe pulsation animation
        float pulse = 1.0;
        if (uPulseSpeed > 0.0) {
          pulse = 1.0 + 0.12 * sin(uTime * uPulseSpeed);
        }
        
        vec3 finalCol = col * uIntensity * pulse;
        float alpha = clamp(max(max(finalCol.r, finalCol.g), finalCol.b), 0.0, 1.0);
        gl_FragColor = vec4(finalCol, alpha);
      }
    `;

    // Helper functions to compile/link shaders
    const createShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('WebGL Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) {
      setTimeout(() => setWebGLSupported(false), 0);
      container.removeChild(canvas);
      canvasRef.current = null;
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('WebGL Program linking failed:', gl.getProgramInfoLog(program));
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      setTimeout(() => setWebGLSupported(false), 0);
      container.removeChild(canvas);
      canvasRef.current = null;
      return;
    }

    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // Setup full-screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      -1.0, 1.0,
      1.0, -1.0,
      1.0, 1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uTopColorLoc = gl.getUniformLocation(program, 'uTopColor');
    const uBottomColorLoc = gl.getUniformLocation(program, 'uBottomColor');
    const uIntensityLoc = gl.getUniformLocation(program, 'uIntensity');
    const uInteractiveLoc = gl.getUniformLocation(program, 'uInteractive');
    const uGlowAmountLoc = gl.getUniformLocation(program, 'uGlowAmount');
    const uBeamWidthLoc = gl.getUniformLocation(program, 'uBeamWidth');
    const uBeamHeightLoc = gl.getUniformLocation(program, 'uBeamHeight');
    const uNoiseIntensityLoc = gl.getUniformLocation(program, 'uNoiseIntensity');
    const uRotCosLoc = gl.getUniformLocation(program, 'uRotCos');
    const uRotSinLoc = gl.getUniformLocation(program, 'uRotSin');
    const uBeamRotCosLoc = gl.getUniformLocation(program, 'uBeamRotCos');
    const uBeamRotSinLoc = gl.getUniformLocation(program, 'uBeamRotSin');
    const uWaveSinLoc = gl.getUniformLocation(program, 'uWaveSin');
    const uWaveCosLoc = gl.getUniformLocation(program, 'uWaveCos');
    const uTwistLoc = gl.getUniformLocation(program, 'uTwist');
    const uPulseSpeedLoc = gl.getUniformLocation(program, 'uPulseSpeed');

    // Resize handling
    const resizeCanvas = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * settings.pixelRatio;
      canvas.height = height * settings.pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse interactivity handling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL uses bottom-left origin
      mouseRef.current = { x: Math.max(0.0, Math.min(1.0, x)), y: Math.max(0.0, Math.min(1.0, y)) };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Static wave parameters
    const waveRotationRad = 0.4;
    const waveSin = Math.sin(waveRotationRad);
    const waveCos = Math.cos(waveRotationRad);

    let lastTime = performance.now();

    // Animation Loop
    const render = (now: number) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      timeRef.current += delta * rotationSpeed;

      gl.clear(gl.COLOR_BUFFER_BIT);

      // Uniforms updates
      gl.uniform1f(uTimeLoc, timeRef.current);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform3fv(uTopColorLoc, parseColorToGL(topColor));
      gl.uniform3fv(uBottomColorLoc, parseColorToGL(bottomColor));
      gl.uniform1f(uIntensityLoc, intensity);
      gl.uniform1i(uInteractiveLoc, interactive ? 1 : 0);
      gl.uniform1f(uGlowAmountLoc, glowAmount);
      gl.uniform1f(uBeamWidthLoc, beamWidth);
      gl.uniform1f(uBeamHeightLoc, beamHeight);
      gl.uniform1f(uNoiseIntensityLoc, noiseIntensity);

      // Rotation uniforms
      gl.uniform1f(uRotCosLoc, Math.cos(timeRef.current));
      gl.uniform1f(uRotSinLoc, Math.sin(timeRef.current));

      const beamRotRad = (beamRotation * Math.PI) / 180;
      gl.uniform1f(uBeamRotCosLoc, Math.cos(beamRotRad));
      gl.uniform1f(uBeamRotSinLoc, Math.sin(beamRotRad));

      gl.uniform1f(uWaveSinLoc, waveSin);
      gl.uniform1f(uWaveCosLoc, waveCos);
      gl.uniform1f(uTwistLoc, twist);
      gl.uniform1f(uPulseSpeedLoc, pulseSpeed);

      // Draw full screen quad
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // Cleanup resources
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);

      // Lose WebGL context explicitly to free up GPU memory immediately
      const loseContextExt = gl.getExtension('WEBGL_lose_context');
      if (loseContextExt) {
        loseContextExt.loseContext();
      }

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      canvasRef.current = null;
    };
  }, [
    quality,
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    interactive,
    glowAmount,
    beamWidth,
    beamHeight,
    noiseIntensity,
    beamRotation,
    twist,
    pulseSpeed
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.mixBlendMode = mixBlendMode || 'normal';
    }
  }, [mixBlendMode]);

  if (!webGLSupported) {
    return (
      <div
        className={cn('unbrn-lumen-beam-fallback', className)}
        style={{
          background: `linear-gradient(180deg, ${topColor}, ${bottomColor})`,
          opacity: intensity * 0.5,
          mixBlendMode,
          backgroundColor,
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('unbrn-lumen-beam', className)}
      style={{ backgroundColor, ...style }}
      {...props}
    />
  );
};
