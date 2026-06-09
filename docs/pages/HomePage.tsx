import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '../../package/components/Button/Button';
import { parseColor } from '../../package/lib/colors';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [version, setVersion] = useState('v1.4.0');
  const [gridSize, setGridSize] = useState(() => {
    if (typeof window === 'undefined') return { cols: 20, rows: 15 };
    const cols = Math.ceil(window.innerWidth / 60);
    const rows = Math.ceil(window.innerHeight / 60);
    return { cols, rows };
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSizeRef = useRef(gridSize);

  useEffect(() => {
    gridSizeRef.current = gridSize;
  }, [gridSize]);

  useEffect(() => {
    fetch('https://registry.npmjs.org/@unburn/ui/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.version) {
          setVersion(`v${data.version}`);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch package version:', err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const cols = Math.ceil(window.innerWidth / 60);
      const rows = Math.ceil(window.innerHeight / 60);
      setGridSize({ cols, rows });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);

    const styles = getComputedStyle(document.documentElement);
    const borderColorStr = styles.getPropertyValue('--border-color').trim() || 'rgba(0,0,0,0.1)';
    const theme = document.documentElement.getAttribute('data-theme') || 'light';

    const isDark = theme === 'dark';
    const cellOpacity = isDark ? 0.28 : 0.35;

    const parsedBorder = parseColor(borderColorStr);
    const borderStrokeStyle = parsedBorder 
      ? `rgba(${parsedBorder.r}, ${parsedBorder.g}, ${parsedBorder.b}, ${cellOpacity})`
      : borderColorStr;

    const currentGridSize = gridSizeRef.current;
    const cellWidth = width / currentGridSize.cols;
    const cellHeight = 60;

    // Draw grid lines
    ctx.strokeStyle = borderStrokeStyle;
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let c = 1; c <= currentGridSize.cols; c++) {
      const x = Math.round(c * cellWidth);
      ctx.beginPath();
      ctx.moveTo(x - 0.5, 0);
      ctx.lineTo(x - 0.5, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let r = 1; r <= currentGridSize.rows; r++) {
      const y = Math.round(r * cellHeight);
      ctx.beginPath();
      ctx.moveTo(0, y - 0.5);
      ctx.lineTo(width, y - 0.5);
      ctx.stroke();
    }
  };

  // Resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }

    draw();
  }, [gridSize]);

  // Theme observer
  useEffect(() => {
    const observer = new MutationObserver(() => {
      draw();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-accent']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <div className="home-grid-background">
        <canvas
          ref={canvasRef}
          className="home-grid-canvas"
        />
      </div>
      
      <section className="hero-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 auto', maxWidth: '800px' }}>
        <div className="hero-badge" style={{ margin: '0 auto 2rem auto' }}>
          <span>{version} Release</span>
        </div>

        <h1 className="hero-title" style={{ fontSize: 'clamp(1.95rem, 7.5vw, 4rem)', lineHeight: '1.2', margin: '0 auto 1.5rem auto' }}>
          Minimalist UI<br className="hero-br" /><span className="hero-accent">Crafted with Precision.</span>
        </h1>

        <p className="hero-subtitle" style={{ margin: '0 auto 2.5rem auto', maxWidth: '540px' }}>
          A clean, modern React component library built with vanilla CSS. Get beautiful, highly-customizable components that look great out of the box.
        </p>

        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Button
            buttonVariant="filled"
            buttonSize="lg"
            buttonIcon={<ArrowRight size={16} />}
            buttonIconPosition="right"
            buttonOnClick={() => navigate('/docs/components')}
            buttonChildren="Explore Components"
          />
          <Button
            buttonVariant="duo"
            buttonSize="lg"
            buttonIcon={<GitBranch size={16} />}
            buttonIconPosition="left"
            buttonOnClick={() => window.open('https://github.com/unburn/ui', '_blank', 'noopener,noreferrer')}
            buttonChildren="GitHub"
          />
        </div>
      </section>

    </div>
  );
};
