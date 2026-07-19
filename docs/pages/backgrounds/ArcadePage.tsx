import React, { useState } from 'react';
import { Arcade } from '../../../package/backgrounds/Arcade/Arcade';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { ColorPicker } from '../../../package/components/ColorPicker/ColorPicker';
import { Slider } from '../../../package/components/Slider/Slider';
import { Switch } from '../../../package/components/Switch/Switch';
import { Select } from '../../../package/components/Select/Select';
import { Maximize2 } from 'lucide-react';
import { Button } from '../../../package/components/Button/Button';
import { PlaygroundSidebar } from '../../components/layout/PlaygroundSidebar';

export const ArcadePage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#D81B24');
  const [secondaryColor, setSecondaryColor] = useState('#080001');
  const [accentColor, setAccentColor] = useState('#FF333D');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [speed, setSpeed] = useState(1.0);
  const [intensity, setIntensity] = useState(1.0);
  const [density, setDensity] = useState(2.7);
  const [glow, setGlow] = useState(1.0);
  const [noiseIntensity, setNoiseIntensity] = useState(0.5);
  const [interactive, setInteractive] = useState(true);
  const [mixBlendMode, setMixBlendMode] = useState<React.CSSProperties['mixBlendMode']>('normal');
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaygroundSidebarOpen, setIsPlaygroundSidebarOpen] = useState(true);

  const codeString = `import { Arcade } from '@unbrn/ui/Arcade';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Arcade
        primaryColor="${primaryColor}"
        secondaryColor="${secondaryColor}"
        accentColor="${accentColor}"
        backgroundColor="${backgroundColor}"
        speed={${speed}}
        intensity={${intensity}}
        density={${density}}
        glow={${glow}}
        noiseIntensity={${noiseIntensity}}
        interactive={${interactive}}
        mixBlendMode="${mixBlendMode}"
        quality="${quality}"
      />
      
      {/* Your content goes here */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <h1>My App</h1>
      </main>
    </div>
  );
}`;

  return (
    <>
      <ComponentHeader title="Arcade" />

      <Showcase
        title="Interactive Playground"
        code={codeString}
      >
        <div style={{ width: '100%' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)',
            background: backgroundColor,
          }}>
            <Arcade
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              accentColor={accentColor}
              backgroundColor={backgroundColor}
              speed={speed}
              intensity={intensity}
              density={density}
              glow={glow}
              noiseIntensity={noiseIntensity}
              interactive={interactive}
              mixBlendMode={mixBlendMode}
              quality={quality}
            />

            <Button
              onClick={() => setIsFullscreen(true)}
              variant="filled"
              size={1}
              icon={<Maximize2 size={14} />}
              accentColor='rgba(0, 0, 0, 0.85)'
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10
              }}
            >
              Full Screen
            </Button>
          </div>

          {isFullscreen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              background: backgroundColor,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Arcade
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
                speed={speed}
                intensity={intensity}
                density={density}
                glow={glow}
                noiseIntensity={noiseIntensity}
                interactive={interactive}
                mixBlendMode={mixBlendMode}
                quality={quality}
              />

              {/* Collapsible Left Sidebar */}
              <PlaygroundSidebar
                isOpen={isPlaygroundSidebarOpen}
                onToggle={() => setIsPlaygroundSidebarOpen(!isPlaygroundSidebarOpen)}
                onClose={() => setIsPlaygroundSidebarOpen(false)}
                title="Arcade"
                onExit={() => setIsFullscreen(false)}
              >
                {/* Appearance Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.15rem',
                  padding: '1.15rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Appearance
                  </div>
                  <ColorPicker
                    label="PRIMARY COLOR"
                    value={primaryColor}
                    onChange={setPrimaryColor}
                    variant="duo"
                    showAlpha={false}
                    showEyeDropper={false}
                  />
                  <ColorPicker
                    label="SECONDARY COLOR"
                    value={secondaryColor}
                    onChange={setSecondaryColor}
                    variant="duo"
                    showAlpha={false}
                    showEyeDropper={false}
                  />
                  <ColorPicker
                    label="ACCENT NEON COLOR"
                    value={accentColor}
                    onChange={setAccentColor}
                    variant="duo"
                    showAlpha={false}
                    showEyeDropper={false}
                  />
                  <ColorPicker
                    label="CANVAS BACKGROUND"
                    value={backgroundColor}
                    onChange={setBackgroundColor}
                    variant="duo"
                    showAlpha={true}
                    showEyeDropper={false}
                  />
                  <Select
                    label="MIX BLEND MODE"
                    value={mixBlendMode}
                    onChange={(val) => setMixBlendMode(val as React.CSSProperties['mixBlendMode'])}
                    variant="outlined"
                    options={[
                      { value: 'normal', label: 'Normal' },
                      { value: 'screen', label: 'Screen' },
                      { value: 'multiply', label: 'Multiply' },
                      { value: 'overlay', label: 'Overlay' },
                      { value: 'color-dodge', label: 'Color Dodge' },
                      { value: 'difference', label: 'Difference' },
                      { value: 'exclusion', label: 'Exclusion' },
                      { value: 'lighten', label: 'Lighten' },
                    ]}
                  />
                  <Select
                    label="RENDER QUALITY"
                    value={quality}
                    onChange={(val) => setQuality(val as 'low' | 'medium' | 'high')}
                    variant="outlined"
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                    ]}
                  />
                </div>

                {/* Geometry & Settings Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.15rem',
                  padding: '1.15rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Tuning
                  </div>
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>PANEL DENSITY</span><span>{density.toFixed(1)}</span></div>}
                    min={0.2}
                    max={4.0}
                    step={0.1}
                    value={density}
                    onChange={setDensity}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>LIGHT INTENSITY</span><span>{intensity.toFixed(1)}</span></div>}
                    min={0.0}
                    max={3.0}
                    step={0.1}
                    value={intensity}
                    onChange={setIntensity}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>NEON GLOW</span><span>{glow.toFixed(1)}</span></div>}
                    min={0.0}
                    max={3.0}
                    step={0.1}
                    value={glow}
                    onChange={setGlow}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>DRIFT SPEED</span><span>{speed.toFixed(1)}</span></div>}
                    min={0.0}
                    max={4.0}
                    step={0.1}
                    value={speed}
                    onChange={setSpeed}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>NOISE INTENSITY</span><span>{noiseIntensity.toFixed(1)}</span></div>}
                    min={0.0}
                    max={2.0}
                    step={0.1}
                    value={noiseIntensity}
                    onChange={setNoiseIntensity}
                  />
                  <Switch
                    id="interactive-switch-fs"
                    checked={interactive}
                    onChange={setInteractive}
                    label="MOUSE INTERACTIVE"
                    styles={{
                      label: { color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 },
                      container: { flexDirection: 'column-reverse', alignItems: 'flex-start', gap: '0.35rem' }
                    }}
                  />
                </div>
              </PlaygroundSidebar>
            </div>
          )}

          {/* Normal controls grid on page layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {/* Column 1: Appearance */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
            }}>
              <h4 style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--text-muted, #888)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase'
              }}>
                Appearance
              </h4>

              <ColorPicker
                label="PRIMARY COLOR"
                value={primaryColor}
                onChange={setPrimaryColor}
                variant="duo"
                showAlpha={false}
                showEyeDropper={false}
              />

              <ColorPicker
                label="SECONDARY COLOR"
                value={secondaryColor}
                onChange={setSecondaryColor}
                variant="duo"
                showAlpha={false}
                showEyeDropper={false}
              />

              <ColorPicker
                label="ACCENT NEON COLOR"
                value={accentColor}
                onChange={setAccentColor}
                variant="duo"
                showAlpha={false}
                showEyeDropper={false}
              />

              <ColorPicker
                label="CANVAS BACKGROUND"
                value={backgroundColor}
                onChange={setBackgroundColor}
                variant="duo"
                showAlpha={true}
                showEyeDropper={false}
              />

              <Select
                label="MIX BLEND MODE"
                value={mixBlendMode}
                onChange={(val) => setMixBlendMode(val as React.CSSProperties['mixBlendMode'])}
                variant="outlined"
                options={[
                  { value: 'normal', label: 'Normal' },
                  { value: 'screen', label: 'Screen' },
                  { value: 'multiply', label: 'Multiply' },
                  { value: 'overlay', label: 'Overlay' },
                  { value: 'color-dodge', label: 'Color Dodge' },
                  { value: 'difference', label: 'Difference' },
                  { value: 'exclusion', label: 'Exclusion' },
                  { value: 'lighten', label: 'Lighten' },
                ]}
              />

              <Select
                label="RENDER QUALITY"
                value={quality}
                onChange={(val) => setQuality(val as 'low' | 'medium' | 'high')}
                variant="outlined"
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ]}
              />
            </div>

            {/* Column 2: Tuning */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
            }}>
              <h4 style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--text-muted, #888)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase'
              }}>
                Tuning
              </h4>

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>PANEL DENSITY</span>
                    <span>{density.toFixed(1)}</span>
                  </div>
                }
                min={0.2}
                max={4.0}
                step={0.1}
                value={density}
                onChange={setDensity}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>LIGHT INTENSITY</span>
                    <span>{intensity.toFixed(1)}</span>
                  </div>
                }
                min={0.0}
                max={3.0}
                step={0.1}
                value={intensity}
                onChange={setIntensity}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>NEON GLOW</span>
                    <span>{glow.toFixed(1)}</span>
                  </div>
                }
                min={0.0}
                max={3.0}
                step={0.1}
                value={glow}
                onChange={setGlow}
                showTooltip
              />
            </div>

            {/* Column 3: Motion & Input */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
            }}>
              <h4 style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--text-muted, #888)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase'
              }}>
                Motion & Interactivity
              </h4>

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>DRIFT SPEED</span>
                    <span>{speed.toFixed(1)}</span>
                  </div>
                }
                min={0.0}
                max={4.0}
                step={0.1}
                value={speed}
                onChange={setSpeed}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>NOISE INTENSITY</span>
                    <span>{noiseIntensity.toFixed(1)}</span>
                  </div>
                }
                min={0.0}
                max={2.0}
                step={0.1}
                value={noiseIntensity}
                onChange={setNoiseIntensity}
                showTooltip
              />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto', paddingTop: '0.5rem' }}>
                <Switch
                  id="interactive-switch-page"
                  checked={interactive}
                  onChange={setInteractive}
                  label="MOUSE INTERACTIVE"
                  styles={{
                    label: { color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 },
                    container: { flexDirection: 'column-reverse', alignItems: 'flex-start', gap: '0.35rem' }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Arcade } from '@unbrn/ui/Arcade';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      <Arcade
        primaryColor="#D81B24"
        secondaryColor="#080001"
        accentColor="#FF333D"
        speed={1.0}
        interactive={true}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
        <h2>Welcome to my Arcade Game</h2>
      </div>
    </div>
  );
}`}
        />
      </div>

      <Props
        props={[
          { name: 'primaryColor', type: 'string', defaultValue: "'#D81B24'", description: 'Hex code for the primary column / panel red color.' },
          { name: 'secondaryColor', type: 'string', defaultValue: "'#080001'", description: 'Hex code for the deep dark shadow color.' },
          { name: 'accentColor', type: 'string', defaultValue: "'#FF333D'", description: 'Hex code for the vertical glowing beams.' },
          { name: 'speed', type: 'number', defaultValue: '1.0', description: 'Horizontal panel drift and neon sweep speed multiplier.' },
          { name: 'intensity', type: 'number', defaultValue: '1.0', description: 'Overall brightness and contrast overlay multiplier.' },
          { name: 'density', type: 'number', defaultValue: '2.7', description: 'Warp scaling value determining panel column counts.' },
          { name: 'glow', type: 'number', defaultValue: '1.0', description: 'Individual neon glow / light leak brightness factor.' },
          { name: 'noiseIntensity', type: 'number', defaultValue: '0.5', description: 'Opacity strength of the film grain / static noise overlay.' },
          { name: 'interactive', type: 'boolean', defaultValue: 'true', description: 'Allows mouse X/Y coordinates to guide light spotlight.' },
          { name: 'mixBlendMode', type: 'string', defaultValue: "'normal'", description: 'CSS mix-blend-mode applied directly to the WebGL canvas element.' },
          { name: 'backgroundColor', type: 'string', defaultValue: "'transparent'", description: 'Solid/transparent canvas background color behind the WebGL render.' },
          { name: 'quality', type: "'low' | 'medium' | 'high'", defaultValue: 'auto', description: 'Varying WebGL iterations and scale based on target device hardware.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container element.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline styling for the root container element.' }
        ]}
      />
    </>
  );
};
