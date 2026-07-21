import React, { useState } from 'react';
import { LumenBeam } from '../../../package/backgrounds/LumenBeam/LumenBeam';
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

export const LumenBeamPage: React.FC = () => {
  const [topColor, setTopColor] = useState('#FFFFFF');
  const [bottomColor, setBottomColor] = useState('#0A0A0A');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [intensity, setIntensity] = useState(1.5);
  const [rotationSpeed, setRotationSpeed] = useState(0.3);
  const [interactive, setInteractive] = useState(false);
  const [glowAmount, setGlowAmount] = useState(0.002);
  const [beamWidth, setBeamWidth] = useState(5.0);
  const [beamHeight, setBeamHeight] = useState(0.10);
  const [noiseIntensity, setNoiseIntensity] = useState(0.5);
  const [beamRotation, setBeamRotation] = useState(245);
  const [mixBlendMode, setMixBlendMode] = useState<React.CSSProperties['mixBlendMode']>('normal');
  const [twist, setTwist] = useState(0.2);
  const [pulseSpeed, setPulseSpeed] = useState(0.4);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaygroundSidebarOpen, setIsPlaygroundSidebarOpen] = useState(true);

  const codeString = `import { LumenBeam } from '@unbrn/ui/LumenBeam';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <LumenBeam
        topColor="${topColor}"
        bottomColor="${bottomColor}"
        backgroundColor="${backgroundColor}"
        intensity={${intensity}}
        rotationSpeed={${rotationSpeed}}
        interactive={${interactive}}
        glowAmount={${glowAmount}}
        beamWidth={${beamWidth}}
        beamHeight={${beamHeight}}
        noiseIntensity={${noiseIntensity}}
        beamRotation={${beamRotation}}
        mixBlendMode="${mixBlendMode}"
        twist={${twist}}
        pulseSpeed={${pulseSpeed}}
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
      <ComponentHeader title="Lumen Beam" />

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
            <LumenBeam
              topColor={topColor}
              bottomColor={bottomColor}
              backgroundColor={backgroundColor}
              intensity={intensity}
              rotationSpeed={rotationSpeed}
              interactive={interactive}
              glowAmount={glowAmount}
              beamWidth={beamWidth}
              beamHeight={beamHeight}
              noiseIntensity={noiseIntensity}
              beamRotation={beamRotation}
              mixBlendMode={mixBlendMode}
              twist={twist}
              pulseSpeed={pulseSpeed}
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
              <LumenBeam
                topColor={topColor}
                bottomColor={bottomColor}
                backgroundColor={backgroundColor}
                intensity={intensity}
                rotationSpeed={rotationSpeed}
                interactive={interactive}
                glowAmount={glowAmount}
                beamWidth={beamWidth}
                beamHeight={beamHeight}
                noiseIntensity={noiseIntensity}
                beamRotation={beamRotation}
                mixBlendMode={mixBlendMode}
                twist={twist}
                pulseSpeed={pulseSpeed}
                quality={quality}
              />

              {/* Collapsible Left Sidebar */}
              <PlaygroundSidebar
                isOpen={isPlaygroundSidebarOpen}
                onToggle={() => setIsPlaygroundSidebarOpen(!isPlaygroundSidebarOpen)}
                onClose={() => setIsPlaygroundSidebarOpen(false)}
                title="Lumen Beam"
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
                    label="TOP COLOR"
                    value={topColor}
                    onChange={setTopColor}
                    variant="duo"
                    showAlpha={false}
                    showEyeDropper={false}
                  />
                  <ColorPicker
                    label="BOTTOM COLOR"
                    value={bottomColor}
                    onChange={setBottomColor}
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
                      { value: 'screen', label: 'Screen' },
                      { value: 'normal', label: 'Normal' },
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
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>GLOW AMOUNT</span><span>{glowAmount.toFixed(3)}</span></div>}
                    min={0.001}
                    max={0.05}
                    step={0.001}
                    value={glowAmount}
                    onChange={setGlowAmount}
                  />
                </div>

                {/* Geometry Section */}
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
                    Geometry
                  </div>
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>BEAM WIDTH</span><span>{beamWidth.toFixed(1)}</span></div>}
                    min={0.5}
                    max={8.0}
                    step={0.1}
                    value={beamWidth}
                    onChange={setBeamWidth}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>BEAM HEIGHT</span><span>{beamHeight.toFixed(2)}</span></div>}
                    min={0.1}
                    max={2.0}
                    step={0.05}
                    value={beamHeight}
                    onChange={setBeamHeight}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>INITIAL ROTATION</span><span>{beamRotation}°</span></div>}
                    min={0}
                    max={360}
                    step={1}
                    value={beamRotation}
                    onChange={setBeamRotation}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>INTENSITY</span><span>{intensity.toFixed(1)}</span></div>}
                    min={0}
                    max={2}
                    step={0.1}
                    value={intensity}
                    onChange={setIntensity}
                  />
                </div>

                {/* Dynamics & Motion Section */}
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
                    Dynamics & Motion
                  </div>
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>ROTATION SPEED</span><span>{rotationSpeed.toFixed(2)}</span></div>}
                    min={0}
                    max={1.5}
                    step={0.05}
                    value={rotationSpeed}
                    onChange={setRotationSpeed}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>SPIRAL TWIST</span><span>{twist.toFixed(2)}</span></div>}
                    min={-1.0}
                    max={1.0}
                    step={0.05}
                    value={twist}
                    onChange={setTwist}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>BEAM PULSATION</span><span>{pulseSpeed.toFixed(2)}</span></div>}
                    min={0.0}
                    max={2.0}
                    step={0.1}
                    value={pulseSpeed}
                    onChange={setPulseSpeed}
                  />
                  <Slider
                    label={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>FILM NOISE</span><span>{noiseIntensity.toFixed(2)}</span></div>}
                    min={0}
                    max={1.0}
                    step={0.05}
                    value={noiseIntensity}
                    onChange={setNoiseIntensity}
                  />
                  <Switch
                    id="fullscreen-interactive-checkbox"
                    checked={interactive}
                    onChange={setInteractive}
                    label="MOUSE INTERACTIVE"
                    styles={{
                      label: { color: 'var(--text-muted)', fontSize: '0.7rem' },
                      container: { flexDirection: 'column-reverse', alignItems: 'flex-start', gap: '0.35rem' }
                    }}
                  />
                </div>
              </PlaygroundSidebar>
            </div>
          )}

          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            width: '100%'
          }}>
            {/* Column 1: Appearance & Blending */}
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
                Appearance & Blending
              </h4>

              <ColorPicker
                label="TOP GRADIENT COLOR"
                value={topColor}
                onChange={setTopColor}
                variant="duo"
                showEyeDropper={false}
                showAlpha={false}
              />

              <ColorPicker
                label="BOTTOM GRADIENT COLOR"
                value={bottomColor}
                onChange={setBottomColor}
                variant="duo"
                showEyeDropper={false}
                showAlpha={false}
              />

              <Select
                label="MIX BLEND MODE"
                value={mixBlendMode}
                onChange={(val) => setMixBlendMode(val as React.CSSProperties['mixBlendMode'])}
                variant="outlined"
                options={[
                  { value: 'screen', label: 'Screen' },
                  { value: 'normal', label: 'Normal' },
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

              <ColorPicker
                label="CANVAS BACKGROUND"
                value={backgroundColor}
                onChange={setBackgroundColor}
                variant="duo"
                showAlpha={true}
                showEyeDropper={false}
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>GLOW AMOUNT</span>
                    <span>{glowAmount.toFixed(3)}</span>
                  </div>
                }
                min={0.001}
                max={0.05}
                step={0.001}
                value={glowAmount}
                onChange={setGlowAmount}
                showTooltip
              />
            </div>

            {/* Column 2: Beam Geometry */}
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
                Beam Geometry
              </h4>

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>BEAM WIDTH</span>
                    <span>{beamWidth.toFixed(1)}</span>
                  </div>
                }
                min={0.5}
                max={8.0}
                step={0.1}
                value={beamWidth}
                onChange={setBeamWidth}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>BEAM HEIGHT</span>
                    <span>{beamHeight.toFixed(2)}</span>
                  </div>
                }
                min={0.1}
                max={2.0}
                step={0.05}
                value={beamHeight}
                onChange={setBeamHeight}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>INITIAL ROTATION</span>
                    <span>{beamRotation}°</span>
                  </div>
                }
                min={0}
                max={360}
                step={1}
                value={beamRotation}
                onChange={setBeamRotation}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>INTENSITY</span>
                    <span>{intensity.toFixed(1)}</span>
                  </div>
                }
                min={0}
                max={2}
                step={0.1}
                value={intensity}
                onChange={setIntensity}
                showTooltip
              />
            </div>

            {/* Column 3: Dynamics & Motion */}
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
                Dynamics & Motion
              </h4>

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>ROTATION SPEED</span>
                    <span>{rotationSpeed.toFixed(2)}</span>
                  </div>
                }
                min={0}
                max={1.5}
                step={0.05}
                value={rotationSpeed}
                onChange={setRotationSpeed}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>SPIRAL TWIST</span>
                    <span>{twist.toFixed(2)}</span>
                  </div>
                }
                min={-1.0}
                max={1.0}
                step={0.05}
                value={twist}
                onChange={setTwist}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>BEAM PULSATION</span>
                    <span>{pulseSpeed.toFixed(2)}</span>
                  </div>
                }
                min={0.0}
                max={2.0}
                step={0.1}
                value={pulseSpeed}
                onChange={setPulseSpeed}
                showTooltip
              />

              <Slider
                label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>FILM NOISE</span>
                    <span>{noiseIntensity.toFixed(2)}</span>
                  </div>
                }
                min={0}
                max={1.0}
                step={0.05}
                value={noiseIntensity}
                onChange={setNoiseIntensity}
                showTooltip
              />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto', paddingTop: '0.5rem' }}>
                <Switch
                  id="interactive-checkbox"
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
          code={`import { LumenBeam } from '@unbrn/ui/LumenBeam';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      <LumenBeam
        topColor="#FFFFFF"
        bottomColor="#0A0A0A"
        intensity={1.0}
        rotationSpeed={0.3}
        interactive={true}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
        <h2>Welcome to my Page</h2>
      </div>
    </div>
  );
}`}
        />
      </div>

      <Props
        props={[
          { name: 'topColor', type: 'string', defaultValue: "'#FFFFFF'", description: 'Hex code for the top color of the beam gradient.' },
          { name: 'bottomColor', type: 'string', defaultValue: "'#0A0A0A'", description: 'Hex code for the bottom color of the beam gradient.' },
          { name: 'intensity', type: 'number', defaultValue: '1.5', description: 'Overall brightness and scale multiplier of the rendering.' },
          { name: 'rotationSpeed', type: 'number', defaultValue: '0.3', description: 'Speed multiplier for the volumetric raymarching animation.' },
          { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Whether the beam rotation follows the mouse pointer.' },
          { name: 'glowAmount', type: 'number', defaultValue: '0.005', description: 'Controls the glow strength and radial spread of the columns.' },
          { name: 'beamWidth', type: 'number', defaultValue: '5.0', description: 'Width/radius scaling factor for the volumetric light rays.' },
          { name: 'beamHeight', type: 'number', defaultValue: '0.10', description: 'Scale offset height of the noise wave columns.' },
          { name: 'noiseIntensity', type: 'number', defaultValue: '0.5', description: 'Intensity of the film grain post-processing effect overlay.' },
          { name: 'beamRotation', type: 'number', defaultValue: '245', description: 'Initial angle offset of the beams (in degrees, 0 to 360).' },
          { name: 'mixBlendMode', type: 'string', defaultValue: "'screen'", description: 'CSS mix-blend-mode applied directly to the WebGL canvas element.' },
          { name: 'backgroundColor', type: 'string', defaultValue: "'transparent'", description: 'Solid/transparent canvas background color behind the WebGL render.' },
          { name: 'quality', type: "'low' | 'medium' | 'high'", defaultValue: "'high'", description: 'Quality preset. Automatically fallback on slower or mobile screens.' },
          { name: 'twist', type: 'number', defaultValue: '0.2', description: 'Volumetric swirl factor along the vertical Y axis.' },
          { name: 'pulseSpeed', type: 'number', defaultValue: '0.4', description: 'Breathing / pulsation frequency of the glowing beams.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container element.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline styling for the root container element.' }
        ]}
      />
    </>
  );
};
