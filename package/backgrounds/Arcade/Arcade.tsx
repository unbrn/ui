"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './Arcade.css';
import { cn } from '../../lib/utils';

export interface ArcadeProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  speed?: number;
  intensity?: number;
  density?: number;
  glow?: number;
  noiseIntensity?: number;
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
  className?: string;
  style?: React.CSSProperties;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
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
    isNaN(r) ? 0.85 : r,
    isNaN(g) ? 0.1 : g,
    isNaN(b) ? 0.15 : b
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

export const Arcade: React.FC<ArcadeProps> = ({
  primaryColor = '#D81B24',
  secondaryColor = '#080001',
  accentColor = '#FF333D',
  speed = 1.0,
  intensity = 1.0,
  density = 2.7,
  glow = 1.0,
  noiseIntensity = 0.5,
  interactive = true,
  quality: qualityProp,
  mixBlendMode = 'normal',
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
    if (isMobile || isLowEndDevice) return 'medium';
    return 'high';
  }, [qualityProp]);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);
  const densityRef = useRef(density);
  const glowRef = useRef(glow);
  const noiseIntensityRef = useRef(noiseIntensity);

  useEffect(() => {
    speedRef.current = speed;
    intensityRef.current = intensity;
    densityRef.current = density;
    glowRef.current = glow;
    noiseIntensityRef.current = noiseIntensity;
  }, [speed, intensity, density, glow, noiseIntensity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'unbrn-arcade-canvas';
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
      uniform vec3 uAccentColor;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uDensity;
      uniform float uGlow;
      uniform float uNoiseIntensity;
      uniform bool uInteractive;
      varying vec2 vUv;

      float noise(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        // Continuous panel coordinate mapping with slow horizontal drift
        float coord = vUv.x * uDensity * 9.0 + uTime * uSpeed * 0.035;
        
        // Add smooth multi-frequency waves for uneven column widths
        coord += sin(vUv.x * 2.0) * 1.2 + cos(vUv.x * 4.5) * 0.6;
        
        // Compute anti-aliased surface normal on 1D height map
        float slope = cos(coord) * 2.4;
        vec3 normal = normalize(vec3(slope, 0.0, 1.0));
        
        // 3D diffuse lighting logic (light sources sweep horizontally above canvas)
        float lightX1 = 0.5 + 0.45 * sin(uTime * uSpeed * 0.12);
        vec3 lightPos1 = vec3(lightX1, 1.3, 0.18);
        vec3 toLight1 = normalize(lightPos1 - vec3(vUv.x, vUv.y, 0.0));
        float diff1 = max(0.0, dot(normal, toLight1));
        float dist1 = length(lightPos1 - vec3(vUv.x, vUv.y, 0.0));
        float falloff1 = 1.0 / (1.0 + dist1 * dist1 * 8.0);
        float intensity1 = diff1 * falloff1 * 2.0;

        float lightX2 = 0.5 + 0.5 * cos(uTime * uSpeed * 0.22 + 1.5);
        vec3 lightPos2 = vec3(lightX2, 0.9, 0.12);
        vec3 toLight2 = normalize(lightPos2 - vec3(vUv.x, vUv.y, 0.0));
        float diff2 = max(0.0, dot(normal, toLight2));
        float dist2 = length(lightPos2 - vec3(vUv.x, vUv.y, 0.0));
        float falloff2 = 1.0 / (1.0 + dist2 * dist2 * 12.0);
        float intensity2 = diff2 * falloff2 * 1.5;

        // Mouse lighting interaction
        float mouseIntensity = 0.0;
        float specMouse = 0.0;
        vec3 toMouse = vec3(0.0);
        float mouseFalloff = 0.0;
        
        if (uInteractive) {
          vec3 mousePos = vec3(uMouse.x, uMouse.y, 0.1);
          toMouse = normalize(mousePos - vec3(vUv.x, vUv.y, 0.0));
          float mouseDiff = max(0.0, dot(normal, toMouse));
          float mouseDist = length(mousePos - vec3(vUv.x, vUv.y, 0.0));
          mouseFalloff = 1.0 / (1.0 + mouseDist * mouseDist * 25.0);
          mouseIntensity = mouseDiff * mouseFalloff * 2.2 * uGlow;
        }

        // Blend base colors (vertical gradient: bright top, dark bottom)
        vec3 baseColor = mix(uColor2, uColor1, pow(vUv.y, 0.85));
        
        float totalLight = intensity1 + intensity2 + 0.45 + mouseIntensity;
        float verticalFade = pow(vUv.y, 1.15);
        
        vec3 col = baseColor * (0.12 + totalLight * uIntensity * verticalFade);

        // Specular reflections for premium metallic/satin gloss
        float spec1 = pow(max(0.0, dot(reflect(-toLight1, normal), vec3(0.0, 0.0, 1.0))), 28.0) * falloff1 * 0.85;
        float spec2 = pow(max(0.0, dot(reflect(-toLight2, normal), vec3(0.0, 0.0, 1.0))), 36.0) * falloff2 * 0.95;
        
        if (uInteractive) {
          specMouse = pow(max(0.0, dot(reflect(-toMouse, normal), vec3(0.0, 0.0, 1.0))), 24.0) * mouseFalloff * 1.1 * uGlow;
        }
        
        vec3 specColor = uAccentColor * (spec1 + spec2 + specMouse) * uIntensity * verticalFade;
        col += specColor;

        // Subtly project panel separator lines (valleys)
        float edgeDamp = smoothstep(0.0, 0.25, abs(slope));
        col *= (0.75 + 0.25 * edgeDamp);

        // Film grain noise overlay
        float grain = noise(gl_FragCoord.xy + uTime * 0.02);
        col -= (grain - 0.5) * 0.035 * uNoiseIntensity;

        vec3 finalCol = clamp(col, 0.0, 1.0);
        float alpha = clamp(max(max(finalCol.r, finalCol.g), finalCol.b), 0.0, 1.0);
        
        gl_FragColor = vec4(finalCol, alpha);
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
    const uAccentColorLoc = gl.getUniformLocation(program, 'uAccentColor');
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uIntensityLoc = gl.getUniformLocation(program, 'uIntensity');
    const uDensityLoc = gl.getUniformLocation(program, 'uDensity');
    const uGlowLoc = gl.getUniformLocation(program, 'uGlow');
    const uNoiseIntensityLoc = gl.getUniformLocation(program, 'uNoiseIntensity');
    const uInteractiveLoc = gl.getUniformLocation(program, 'uInteractive');

    const glColor1 = parseColorToGL(primaryColor);
    const glColor2 = parseColorToGL(secondaryColor);
    const glAccent = parseColorToGL(accentColor);

    gl.uniform3f(uColor1Loc, glColor1[0], glColor1[1], glColor1[2]);
    gl.uniform3f(uColor2Loc, glColor2[0], glColor2[1], glColor2[2]);
    gl.uniform3f(uAccentColorLoc, glAccent[0], glAccent[1], glAccent[2]);

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
      mouseRef.current = { x, y };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      timeRef.current += delta;

      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, timeRef.current);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uSpeedLoc, speedRef.current);
      gl.uniform1f(uIntensityLoc, intensityRef.current);
      gl.uniform1f(uDensityLoc, densityRef.current);
      gl.uniform1f(uGlowLoc, glowRef.current);
      gl.uniform1f(uNoiseIntensityLoc, noiseIntensityRef.current);
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
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      canvasRef.current = null;
    };
  }, [primaryColor, secondaryColor, accentColor, interactive, quality]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.mixBlendMode = mixBlendMode || 'normal';
    }
  }, [mixBlendMode]);

  return (
    <div
      ref={containerRef}
      className={cn('unbrn-arcade', className)}
      style={{ backgroundColor, ...style }}
      {...props}
    >
      {!webGLSupported && (
        <div
          className="unbrn-arcade-fallback"
          style={{
            background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`,
            backgroundColor,
          }}
        />
      )}
    </div>
  );
};
