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
  const [intensity, setIntensity] = useState(1.0);
  const [rotationSpeed, setRotationSpeed] = useState(0.3);
  const [interactive, setInteractive] = useState(false);
  const [glowAmount, setGlowAmount] = useState(0.002);
  const [beamWidth, setBeamWidth] = useState(3.0);
  const [beamHeight, setBeamHeight] = useState(0.25);
  const [noiseIntensity, setNoiseIntensity] = useState(0.5);
  const [beamRotation, setBeamRotation] = useState(245);
  const [mixBlendMode, setMixBlendMode] = useState<React.CSSProperties['mixBlendMode']>('normal');
  const [twist, setTwist] = useState(0.2);
  const [pulseSpeed, setPulseSpeed] = useState(0.4);
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
            />

            <Button
              buttonOnClick={() => setIsFullscreen(true)}
              buttonVariant="filled"
              buttonSize="sm"
              buttonIcon={<Maximize2 size={14} />}
              buttonAccentColor='rgba(0, 0, 0, 0.85)'
              buttonStyle={{
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
                    colorPickerLabel="TOP COLOR"
                    colorPickerValue={topColor}
                    colorPickerOnChange={setTopColor}
                    colorPickerVariant="duo"
                    colorPickerShowAlpha={false}
                    colorPickerShowEyeDropper={false}
                  />
                  <ColorPicker
                    colorPickerLabel="BOTTOM COLOR"
                    colorPickerValue={bottomColor}
                    colorPickerOnChange={setBottomColor}
                    colorPickerVariant="duo"
                    colorPickerShowAlpha={false}
                    colorPickerShowEyeDropper={false}
                  />
                  <ColorPicker
                    colorPickerLabel="CANVAS BACKGROUND"
                    colorPickerValue={backgroundColor}
                    colorPickerOnChange={setBackgroundColor}
                    colorPickerVariant="duo"
                    colorPickerShowAlpha={true}
                    colorPickerShowEyeDropper={false}
                  />
                  <Select
                    selectLabel="MIX BLEND MODE"
                    selectValue={mixBlendMode}
                    selectOnChange={(val) => setMixBlendMode(val as React.CSSProperties['mixBlendMode'])}
                    selectVariant="outlined"
                    selectOptions={[
                      { selectOptionValue: 'screen', selectOptionLabel: 'Screen' },
                      { selectOptionValue: 'normal', selectOptionLabel: 'Normal' },
                      { selectOptionValue: 'multiply', selectOptionLabel: 'Multiply' },
                      { selectOptionValue: 'overlay', selectOptionLabel: 'Overlay' },
                      { selectOptionValue: 'color-dodge', selectOptionLabel: 'Color Dodge' },
                      { selectOptionValue: 'difference', selectOptionLabel: 'Difference' },
                      { selectOptionValue: 'exclusion', selectOptionLabel: 'Exclusion' },
                      { selectOptionValue: 'lighten', selectOptionLabel: 'Lighten' },
                    ]}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>GLOW AMOUNT</span><span>{glowAmount.toFixed(3)}</span></div>}
                    sliderMin={0.001}
                    sliderMax={0.05}
                    sliderStep={0.001}
                    sliderValue={glowAmount}
                    sliderOnChange={setGlowAmount}
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
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>BEAM WIDTH</span><span>{beamWidth.toFixed(1)}</span></div>}
                    sliderMin={0.5}
                    sliderMax={8.0}
                    sliderStep={0.1}
                    sliderValue={beamWidth}
                    sliderOnChange={setBeamWidth}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>BEAM HEIGHT</span><span>{beamHeight.toFixed(2)}</span></div>}
                    sliderMin={0.1}
                    sliderMax={2.0}
                    sliderStep={0.05}
                    sliderValue={beamHeight}
                    sliderOnChange={setBeamHeight}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>INITIAL ROTATION</span><span>{beamRotation}°</span></div>}
                    sliderMin={0}
                    sliderMax={360}
                    sliderStep={1}
                    sliderValue={beamRotation}
                    sliderOnChange={setBeamRotation}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>INTENSITY</span><span>{intensity.toFixed(1)}</span></div>}
                    sliderMin={0}
                    sliderMax={2}
                    sliderStep={0.1}
                    sliderValue={intensity}
                    sliderOnChange={setIntensity}
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
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>ROTATION SPEED</span><span>{rotationSpeed.toFixed(2)}</span></div>}
                    sliderMin={0}
                    sliderMax={1.5}
                    sliderStep={0.05}
                    sliderValue={rotationSpeed}
                    sliderOnChange={setRotationSpeed}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>SPIRAL TWIST</span><span>{twist.toFixed(2)}</span></div>}
                    sliderMin={-1.0}
                    sliderMax={1.0}
                    sliderStep={0.05}
                    sliderValue={twist}
                    sliderOnChange={setTwist}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>BEAM PULSATION</span><span>{pulseSpeed.toFixed(2)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={2.0}
                    sliderStep={0.1}
                    sliderValue={pulseSpeed}
                    sliderOnChange={setPulseSpeed}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>FILM NOISE</span><span>{noiseIntensity.toFixed(2)}</span></div>}
                    sliderMin={0}
                    sliderMax={1.0}
                    sliderStep={0.05}
                    sliderValue={noiseIntensity}
                    sliderOnChange={setNoiseIntensity}
                  />
                  <Switch
                    switchId="fullscreen-interactive-checkbox"
                    switchChecked={interactive}
                    switchOnChange={setInteractive}
                    switchLabel="MOUSE INTERACTIVE"
                    styles={{
                      switchLabel: { color: 'var(--text-muted)', fontSize: '0.7rem' },
                      switchContainer: { flexDirection: 'column-reverse', alignItems: 'flex-start', gap: '0.35rem' }
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
                colorPickerLabel="TOP GRADIENT COLOR"
                colorPickerValue={topColor}
                colorPickerOnChange={setTopColor}
                colorPickerVariant="duo"
                colorPickerShowEyeDropper={false}
                colorPickerShowAlpha={false}
              />

              <ColorPicker
                colorPickerLabel="BOTTOM GRADIENT COLOR"
                colorPickerValue={bottomColor}
                colorPickerOnChange={setBottomColor}
                colorPickerVariant="duo"
                colorPickerShowEyeDropper={false}
                colorPickerShowAlpha={false}
              />

              <Select
                selectLabel="MIX BLEND MODE"
                selectValue={mixBlendMode}
                selectOnChange={(val) => setMixBlendMode(val as React.CSSProperties['mixBlendMode'])}
                selectVariant="outlined"
                selectOptions={[
                  { selectOptionValue: 'screen', selectOptionLabel: 'Screen' },
                  { selectOptionValue: 'normal', selectOptionLabel: 'Normal' },
                  { selectOptionValue: 'multiply', selectOptionLabel: 'Multiply' },
                  { selectOptionValue: 'overlay', selectOptionLabel: 'Overlay' },
                  { selectOptionValue: 'color-dodge', selectOptionLabel: 'Color Dodge' },
                  { selectOptionValue: 'difference', selectOptionLabel: 'Difference' },
                  { selectOptionValue: 'exclusion', selectOptionLabel: 'Exclusion' },
                  { selectOptionValue: 'lighten', selectOptionLabel: 'Lighten' },
                ]}
              />

              <ColorPicker
                colorPickerLabel="CANVAS BACKGROUND"
                colorPickerValue={backgroundColor}
                colorPickerOnChange={setBackgroundColor}
                colorPickerVariant="duo"
                colorPickerShowAlpha={true}
                colorPickerShowEyeDropper={false}
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>GLOW AMOUNT</span>
                    <span>{glowAmount.toFixed(3)}</span>
                  </div>
                }
                sliderMin={0.001}
                sliderMax={0.05}
                sliderStep={0.001}
                sliderValue={glowAmount}
                sliderOnChange={setGlowAmount}
                sliderShowTooltip
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
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>BEAM WIDTH</span>
                    <span>{beamWidth.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0.5}
                sliderMax={8.0}
                sliderStep={0.1}
                sliderValue={beamWidth}
                sliderOnChange={setBeamWidth}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>BEAM HEIGHT</span>
                    <span>{beamHeight.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.1}
                sliderMax={2.0}
                sliderStep={0.05}
                sliderValue={beamHeight}
                sliderOnChange={setBeamHeight}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>INITIAL ROTATION</span>
                    <span>{beamRotation}°</span>
                  </div>
                }
                sliderMin={0}
                sliderMax={360}
                sliderStep={1}
                sliderValue={beamRotation}
                sliderOnChange={setBeamRotation}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>INTENSITY</span>
                    <span>{intensity.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0}
                sliderMax={2}
                sliderStep={0.1}
                sliderValue={intensity}
                sliderOnChange={setIntensity}
                sliderShowTooltip
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
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>ROTATION SPEED</span>
                    <span>{rotationSpeed.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0}
                sliderMax={1.5}
                sliderStep={0.05}
                sliderValue={rotationSpeed}
                sliderOnChange={setRotationSpeed}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>SPIRAL TWIST</span>
                    <span>{twist.toFixed(2)}</span>
                  </div>
                }
                sliderMin={-1.0}
                sliderMax={1.0}
                sliderStep={0.05}
                sliderValue={twist}
                sliderOnChange={setTwist}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>BEAM PULSATION</span>
                    <span>{pulseSpeed.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={2.0}
                sliderStep={0.1}
                sliderValue={pulseSpeed}
                sliderOnChange={setPulseSpeed}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>FILM NOISE</span>
                    <span>{noiseIntensity.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0}
                sliderMax={1.0}
                sliderStep={0.05}
                sliderValue={noiseIntensity}
                sliderOnChange={setNoiseIntensity}
                sliderShowTooltip
              />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto', paddingTop: '0.5rem' }}>
                <Switch
                  switchId="interactive-checkbox"
                  switchChecked={interactive}
                  switchOnChange={setInteractive}
                  switchLabel="MOUSE INTERACTIVE"
                  styles={{
                    switchLabel: { color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 },
                    switchContainer: { flexDirection: 'column-reverse', alignItems: 'flex-start', gap: '0.35rem' }
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
          codeBlockLanguage="tsx"
          codeBlockCode={`import { LumenBeam } from '@unbrn/ui/LumenBeam';

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
          { name: 'intensity', type: 'number', defaultValue: '1.0', description: 'Overall brightness and scale multiplier of the rendering.' },
          { name: 'rotationSpeed', type: 'number', defaultValue: '0.3', description: 'Speed multiplier for the volumetric raymarching animation.' },
          { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Whether the beam rotation follows the mouse pointer.' },
          { name: 'glowAmount', type: 'number', defaultValue: '0.005', description: 'Controls the glow strength and radial spread of the columns.' },
          { name: 'beamWidth', type: 'number', defaultValue: '3.0', description: 'Width/radius scaling factor for the volumetric light rays.' },
          { name: 'beamHeight', type: 'number', defaultValue: '0.25', description: 'Scale offset height of the noise wave columns.' },
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
