"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './LiquidChrome.css';
import { cn } from '../../lib/utils';

export interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  distortion?: number;
  chromaticShift?: number;
  noiseIntensity?: number;
  flatness?: number;
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  className?: string;
  style?: React.CSSProperties;
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

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  primaryColor = '#FFFFFF',
  secondaryColor = '#0A0A0A',
  backgroundColor = 'transparent',
  speed = 0.5,
  amplitude = 0.3,
  frequency = 0.2,
  distortion = 1.5,
  chromaticShift = 0.25,
  noiseIntensity = 0.12,
  flatness = 1.0,
  interactive = true,
  quality: qualityProp,
  mixBlendMode = 'normal',
  className,
  style,
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
    if (isMobile || isLowEndDevice) return 'medium';
    return 'high';
  }, [qualityProp]);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'unbrn-liquid-chrome-canvas';
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      setTimeout(() => setWebGLSupported(false), 0);
      container.removeChild(canvas);
      canvasRef.current = null;
      return;
    }

    const qualitySettings = {
      low: { pixelRatio: 0.5, precision: 'mediump' },
      medium: { pixelRatio: 0.75, precision: 'mediump' },
      high: {
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        precision: 'highp'
      }
    };
    const settings = qualitySettings[quality];

    const fsSource = `
      precision ${settings.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uSpeed;
      uniform float uAmplitude;
      uniform float uFrequency;
      uniform float uDistortion;
      uniform float uChromaticShift;
      uniform float uNoiseIntensity;
      uniform float uFlatness;
      uniform bool uInteractive;
      varying vec2 vUv;

      // GLSL Classic Perlin Noise Implementation (Ashima Arts)
      vec4 permute(vec4 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }

      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      vec3 fade(vec3 t) {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
      }

      float cnoise(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
        vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
        vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
        vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
        vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
        vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
        vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
        vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }

      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 center = vec2(0.5);
        if (uInteractive) {
          center = uMouse;
        }

        float timeScale = 0.1;
        float timeDelay = uChromaticShift * 0.08;
        float baseTime = uTime * timeScale;

        float bSquared = uFlatness * uFlatness;
        float num = 1.0 + bSquared;

        vec3 intensity;

        // Iterate 3 times for Red, Green, and Blue channels (producing the chromatic shift offset)
        for (int i = 0; i < 3; i++) {
          float tOffset = float(i) * timeDelay;

          vec2 distortedUV = vUv;
          float dx = cnoise(vec3(1.8 * vUv, baseTime + tOffset)) * uDistortion;
          distortedUV.x += dx * 0.8;

          vec2 distortedDelta = distortedUV - center;
          float distortedDist = length(distortedDelta);
          float normalizedDist = 1.0 - distortedDist / 0.70710678;

          float x = uFrequency * 100.0 * normalizedDist * uAmplitude;
          float cosX = cos(x);
          float den = 1.0 + bSquared * cosX * cosX;
          float waveValue = sqrt(num / den) * cosX * 0.5 + 0.5;

          // Grainy film/noise overlay
          if (uNoiseIntensity > 0.01) {
            float noise = rand(distortedUV * 1000.0);
            waveValue = waveValue * (1.0 - uNoiseIntensity) + noise * uNoiseIntensity;
          }

          intensity[i] = waveValue;
        }

        vec3 finalColor = mix(uColor2, uColor1, intensity);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

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

    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uColor1Loc = gl.getUniformLocation(program, 'uColor1');
    const uColor2Loc = gl.getUniformLocation(program, 'uColor2');
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uAmplitudeLoc = gl.getUniformLocation(program, 'uAmplitude');
    const uFrequencyLoc = gl.getUniformLocation(program, 'uFrequency');
    const uDistortionLoc = gl.getUniformLocation(program, 'uDistortion');
    const uChromaticShiftLoc = gl.getUniformLocation(program, 'uChromaticShift');
    const uNoiseIntensityLoc = gl.getUniformLocation(program, 'uNoiseIntensity');
    const uFlatnessLoc = gl.getUniformLocation(program, 'uFlatness');
    const uInteractiveLoc = gl.getUniformLocation(program, 'uInteractive');

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x: Math.max(0.0, Math.min(1.0, x)), y: Math.max(0.0, Math.min(1.0, y)) };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      timeRef.current += delta * speed;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, timeRef.current);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform3fv(uColor1Loc, parseColorToGL(primaryColor));
      gl.uniform3fv(uColor2Loc, parseColorToGL(secondaryColor));
      gl.uniform1f(uSpeedLoc, speed);
      gl.uniform1f(uAmplitudeLoc, amplitude);
      gl.uniform1f(uFrequencyLoc, frequency);
      gl.uniform1f(uDistortionLoc, distortion);
      gl.uniform1f(uChromaticShiftLoc, chromaticShift);
      gl.uniform1f(uNoiseIntensityLoc, noiseIntensity);
      gl.uniform1f(uFlatnessLoc, flatness);
      gl.uniform1i(uInteractiveLoc, interactive ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

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

      const loseExt = gl.getExtension('WEBGL_lose_context');
      if (loseExt) {
        loseExt.loseContext();
      }

      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      canvasRef.current = null;
    };
  }, [
    primaryColor,
    secondaryColor,
    speed,
    amplitude,
    frequency,
    distortion,
    chromaticShift,
    noiseIntensity,
    flatness,
    interactive,
    quality
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.mixBlendMode = mixBlendMode || 'normal';
    }
  }, [mixBlendMode]);

  return (
    <div
      ref={containerRef}
      className={cn('unbrn-liquid-chrome', className)}
      style={{ backgroundColor, ...style }}
      {...props}
    >
      {!webGLSupported && (
        <div
          className="unbrn-liquid-chrome-fallback"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            backgroundColor,
          }}
        />
      )}
    </div>
  );
};
