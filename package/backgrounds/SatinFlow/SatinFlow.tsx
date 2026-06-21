"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './SatinFlow.css';
import { cn } from '../../lib/utils';

export interface SatinFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
  scale?: number;
  density?: number;
  noiseIntensity?: number;
  rotation?: number;
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
  twist?: number;
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
    isNaN(r) ? 0.5 : r,
    isNaN(g) ? 0.5 : g,
    isNaN(b) ? 0.5 : b
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

export const SatinFlow: React.FC<SatinFlowProps> = ({
  primaryColor = '#FFFFFF',
  secondaryColor = '#0A0A0A',
  speed = 1.0,
  scale = 1.0,
  density = 1.0,
  noiseIntensity = 1.5,
  rotation = 0,
  interactive = true,
  quality: qualityProp,
  twist = 0.0,
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
    if (isMobile) return 'high';
    if (isLowEndDevice) return 'medium';
    return 'high';
  }, [qualityProp]);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'unbrn-satin-flow-canvas';
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
      uniform float uScale;
      uniform float uDensity;
      uniform float uNoiseIntensity;
      uniform float uRotation;
      uniform float uTwist;
      uniform bool uInteractive;
      varying vec2 vUv;

      const float e = 2.71828182845904523536;

      float noise(vec2 texCoord) {
        float G = e;
        vec2 r = (G * sin(G * texCoord));
        return fract(r.x * r.y * (1.0 + texCoord.x));
      }

      vec2 rotateUvs(vec2 uv, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        mat2 rot = mat2(c, -s, s, c);
        return rot * uv;
      }

      void main() {
        float rnd = noise(gl_FragCoord.xy);
        
        // Swirl twist deformation from center
        vec2 centeredUv = vUv - vec2(0.5);
        float distToCenter = length(centeredUv);
        float swirl = distToCenter * uTwist;
        vec2 uv = rotateUvs(centeredUv, uRotation + swirl) + vec2(0.5);

        // Breathing scale oscillation
        float breathingScale = uScale * (1.0 + 0.04 * sin(uTime * 0.4));
        vec2 tex = rotateUvs(uv * breathingScale, 0.05 * sin(uTime * 0.25)) * uDensity;
        
        // Mouse warp force field
        if (uInteractive) {
          vec2 mouseDist = vUv - uMouse;
          float mDist = length(mouseDist);
          float force = 1.0 / (1.0 + mDist * 6.5);
          tex += mouseDist * force * 0.18;
        }

        float tOffset = uSpeed * uTime * 0.45;
        tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

        float pattern = 0.6 + 0.4 * sin(5.0 * (tex.x + tex.y +
                                             cos(3.0 * tex.x + 5.0 * tex.y) +
                                             0.02 * tOffset) +
                                     sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

        // Dual-color satin wave blend
        vec3 baseColor = mix(uColor2, uColor1, sin((tex.x + tex.y) * 0.7) * 0.5 + 0.5);
        
        // Add fold highlight shadowing
        vec3 col = baseColor * vec3(pattern) - rnd / 15.0 * uNoiseIntensity;
        
        vec3 finalCol = col;
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
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uScaleLoc = gl.getUniformLocation(program, 'uScale');
    const uDensityLoc = gl.getUniformLocation(program, 'uDensity');
    const uNoiseIntensityLoc = gl.getUniformLocation(program, 'uNoiseIntensity');
    const uRotationLoc = gl.getUniformLocation(program, 'uRotation');
    const uTwistLoc = gl.getUniformLocation(program, 'uTwist');
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

      // Accumulate time based on speed setting
      timeRef.current += delta * speed;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, timeRef.current);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform3fv(uColor1Loc, parseColorToGL(primaryColor));
      gl.uniform3fv(uColor2Loc, parseColorToGL(secondaryColor));
      gl.uniform1f(uSpeedLoc, speed);
      gl.uniform1f(uScaleLoc, scale);
      gl.uniform1f(uDensityLoc, density);
      gl.uniform1f(uNoiseIntensityLoc, noiseIntensity);
      gl.uniform1f(uRotationLoc, (rotation * Math.PI) / 180.0);
      gl.uniform1f(uTwistLoc, twist);
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
  }, [primaryColor, secondaryColor, speed, scale, density, noiseIntensity, rotation, interactive, twist, quality]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.mixBlendMode = mixBlendMode || 'normal';
    }
  }, [mixBlendMode]);

  return (
    <div
      ref={containerRef}
      className={cn('unbrn-satin-flow', className)}
      style={{ backgroundColor, ...style }}
      {...props}
    >
      {!webGLSupported && (
        <div
          className="unbrn-satin-flow-fallback"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            backgroundColor,
          }}
        />
      )}
    </div>
  );
};
