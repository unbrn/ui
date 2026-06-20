import React, { useState } from 'react';
import { SatinFlow } from '../../../package/backgrounds/SatinFlow/SatinFlow';
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

export const SatinFlowPage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState('#0A0A0A');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [speed, setSpeed] = useState(1.0);
  const [scale, setScale] = useState(1.0);
  const [density, setDensity] = useState(1.0);
  const [noiseIntensity, setNoiseIntensity] = useState(1.5);
  const [rotation, setRotation] = useState(0);
  const [twist, setTwist] = useState(0.0);
  const [interactive, setInteractive] = useState(true);
  const [mixBlendMode, setMixBlendMode] = useState<React.CSSProperties['mixBlendMode']>('normal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaygroundSidebarOpen, setIsPlaygroundSidebarOpen] = useState(true);

  const codeString = `import { SatinFlow } from '@unbrn/ui/SatinFlow';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SatinFlow
        primaryColor="${primaryColor}"
        secondaryColor="${secondaryColor}"
        backgroundColor="${backgroundColor}"
        speed={${speed}}
        scale={${scale}}
        density={${density}}
        noiseIntensity={${noiseIntensity}}
        rotation={${rotation}}
        twist={${twist}}
        interactive={${interactive}}
        mixBlendMode="${mixBlendMode}"
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
      <ComponentHeader title="Satin Flow" />

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
            <SatinFlow
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              backgroundColor={backgroundColor}
              speed={speed}
              scale={scale}
              density={density}
              noiseIntensity={noiseIntensity}
              rotation={rotation}
              twist={twist}
              interactive={interactive}
              mixBlendMode={mixBlendMode}
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
              <SatinFlow
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                backgroundColor={backgroundColor}
                speed={speed}
                scale={scale}
                density={density}
                noiseIntensity={noiseIntensity}
                rotation={rotation}
                twist={twist}
                interactive={interactive}
                mixBlendMode={mixBlendMode}
              />

              {/* Collapsible Left Sidebar */}
              <PlaygroundSidebar
                isOpen={isPlaygroundSidebarOpen}
                onToggle={() => setIsPlaygroundSidebarOpen(!isPlaygroundSidebarOpen)}
                onClose={() => setIsPlaygroundSidebarOpen(false)}
                title="Satin Flow"
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
                    colorPickerLabel="PRIMARY COLOR"
                    colorPickerValue={primaryColor}
                    colorPickerOnChange={setPrimaryColor}
                    colorPickerVariant="duo"
                    colorPickerShowAlpha={false}
                    colorPickerShowEyeDropper={false}
                  />
                  <ColorPicker
                    colorPickerLabel="SECONDARY COLOR"
                    colorPickerValue={secondaryColor}
                    colorPickerOnChange={setSecondaryColor}
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
                      { selectOptionValue: 'normal', selectOptionLabel: 'Normal' },
                      { selectOptionValue: 'screen', selectOptionLabel: 'Screen' },
                      { selectOptionValue: 'multiply', selectOptionLabel: 'Multiply' },
                      { selectOptionValue: 'overlay', selectOptionLabel: 'Overlay' },
                      { selectOptionValue: 'color-dodge', selectOptionLabel: 'Color Dodge' },
                      { selectOptionValue: 'difference', selectOptionLabel: 'Difference' },
                      { selectOptionValue: 'exclusion', selectOptionLabel: 'Exclusion' },
                      { selectOptionValue: 'lighten', selectOptionLabel: 'Lighten' },
                    ]}
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
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>ZOOM / SCALE</span><span>{scale.toFixed(1)}</span></div>}
                    sliderMin={0.2}
                    sliderMax={4.0}
                    sliderStep={0.1}
                    sliderValue={scale}
                    sliderOnChange={setScale}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>FOLD DENSITY</span><span>{density.toFixed(1)}</span></div>}
                    sliderMin={0.2}
                    sliderMax={4.0}
                    sliderStep={0.1}
                    sliderValue={density}
                    sliderOnChange={setDensity}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>SWIRL TWIST</span><span>{twist.toFixed(2)}</span></div>}
                    sliderMin={-2.0}
                    sliderMax={2.0}
                    sliderStep={0.05}
                    sliderValue={twist}
                    sliderOnChange={setTwist}
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
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>FLOW SPEED</span><span>{speed.toFixed(1)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={4.0}
                    sliderStep={0.1}
                    sliderValue={speed}
                    sliderOnChange={setSpeed}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>INITIAL ROTATION</span><span>{rotation}°</span></div>}
                    sliderMin={-180}
                    sliderMax={180}
                    sliderStep={1}
                    sliderValue={rotation}
                    sliderOnChange={setRotation}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>NOISE INTENSITY</span><span>{noiseIntensity.toFixed(1)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={3.0}
                    sliderStep={0.1}
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
                colorPickerLabel="PRIMARY SATIN COLOR"
                colorPickerValue={primaryColor}
                colorPickerOnChange={setPrimaryColor}
                colorPickerVariant="duo"
                colorPickerShowAlpha={false}
                colorPickerShowEyeDropper={false}
              />

              <ColorPicker
                colorPickerLabel="SECONDARY SATIN COLOR"
                colorPickerValue={secondaryColor}
                colorPickerOnChange={setSecondaryColor}
                colorPickerVariant="duo"
                colorPickerShowAlpha={false}
                colorPickerShowEyeDropper={false}
              />

              <Select
                selectLabel="MIX BLEND MODE"
                selectValue={mixBlendMode}
                selectOnChange={(val) => setMixBlendMode(val as React.CSSProperties['mixBlendMode'])}
                selectVariant="outlined"
                selectOptions={[
                  { selectOptionValue: 'normal', selectOptionLabel: 'Normal' },
                  { selectOptionValue: 'screen', selectOptionLabel: 'Screen' },
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
            </div>

            {/* Column 2: Geometry */}
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
                Geometry
              </h4>

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>ZOOM / SCALE</span>
                    <span>{scale.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0.2}
                sliderMax={4.0}
                sliderStep={0.1}
                sliderValue={scale}
                sliderOnChange={setScale}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>FOLD DENSITY</span>
                    <span>{density.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0.2}
                sliderMax={4.0}
                sliderStep={0.1}
                sliderValue={density}
                sliderOnChange={setDensity}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>SWIRL TWIST</span>
                    <span>{twist.toFixed(2)}</span>
                  </div>
                }
                sliderMin={-2.0}
                sliderMax={2.0}
                sliderStep={0.05}
                sliderValue={twist}
                sliderOnChange={setTwist}
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
                    <span>FLOW SPEED</span>
                    <span>{speed.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={4.0}
                sliderStep={0.1}
                sliderValue={speed}
                sliderOnChange={setSpeed}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>INITIAL ROTATION</span>
                    <span>{rotation}°</span>
                  </div>
                }
                sliderMin={-180}
                sliderMax={180}
                sliderStep={1}
                sliderValue={rotation}
                sliderOnChange={setRotation}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>NOISE INTENSITY</span>
                    <span>{noiseIntensity.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={3.0}
                sliderStep={0.1}
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
          codeBlockCode={`import { SatinFlow } from '@unbrn/ui/SatinFlow';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      <SatinFlow
        primaryColor="#7B7481"
        secondaryColor="#1E1925"
        speed={1.0}
        scale={1.0}
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
          { name: 'primaryColor', type: 'string', defaultValue: "'#7B7481'", description: 'Hex code for the primary color of the satin gradient.' },
          { name: 'secondaryColor', type: 'string', defaultValue: "'#1E1925'", description: 'Hex code for the secondary color of the satin gradient.' },
          { name: 'speed', type: 'number', defaultValue: '1.0', description: 'Speed multiplier of the fabric ripples and dynamic flow.' },
          { name: 'scale', type: 'number', defaultValue: '1.0', description: 'Zoom factor for the shader texture coordinate scaling.' },
          { name: 'density', type: 'number', defaultValue: '1.0', description: 'Controls the count and frequency density of the satin folds.' },
          { name: 'noiseIntensity', type: 'number', defaultValue: '1.5', description: 'Opacity strength of the film grain / random static overlay.' },
          { name: 'rotation', type: 'number', defaultValue: '0', description: 'Rotational offset of the wave ripples in degrees (-180 to 180).' },
          { name: 'interactive', type: 'boolean', defaultValue: 'true', description: 'Whether the waves are distorted dynamically by mouse coordinates.' },
          { name: 'twist', type: 'number', defaultValue: '0.0', description: 'Swirl twist multiplier around the screen center.' },
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
