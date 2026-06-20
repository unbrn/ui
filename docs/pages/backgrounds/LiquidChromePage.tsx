import React, { useState } from 'react';
import { LiquidChrome } from '../../../package/backgrounds/LiquidChrome/LiquidChrome';
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

export const LiquidChromePage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState('#0A0A0A');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [speed, setSpeed] = useState(0.5);
  const [amplitude, setAmplitude] = useState(0.3);
  const [frequency, setFrequency] = useState(0.2);
  const [distortion, setDistortion] = useState(1.5);
  const [flatness, setFlatness] = useState(1.0);
  const [chromaticShift, setChromaticShift] = useState(0.25);
  const [noiseIntensity, setNoiseIntensity] = useState(0.12);
  const [interactive, setInteractive] = useState(true);
  const [mixBlendMode, setMixBlendMode] = useState<React.CSSProperties['mixBlendMode']>('normal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaygroundSidebarOpen, setIsPlaygroundSidebarOpen] = useState(true);

  const codeString = `import { LiquidChrome } from '@unbrn/ui/LiquidChrome';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <LiquidChrome
        primaryColor="${primaryColor}"
        secondaryColor="${secondaryColor}"
        backgroundColor="${backgroundColor}"
        speed={${speed}}
        amplitude={${amplitude}}
        frequency={${frequency}}
        distortion={${distortion}}
        flatness={${flatness}}
        chromaticShift={${chromaticShift}}
        noiseIntensity={${noiseIntensity}}
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
      <ComponentHeader title="Liquid Chrome" />

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
            <LiquidChrome
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              backgroundColor={backgroundColor}
              speed={speed}
              amplitude={amplitude}
              frequency={frequency}
              distortion={distortion}
              flatness={flatness}
              chromaticShift={chromaticShift}
              noiseIntensity={noiseIntensity}
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
              <LiquidChrome
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                backgroundColor={backgroundColor}
                speed={speed}
                amplitude={amplitude}
                frequency={frequency}
                distortion={distortion}
                flatness={flatness}
                chromaticShift={chromaticShift}
                noiseIntensity={noiseIntensity}
                interactive={interactive}
                mixBlendMode={mixBlendMode}
              />

              {/* Collapsible Left Sidebar */}
              <PlaygroundSidebar
                isOpen={isPlaygroundSidebarOpen}
                onToggle={() => setIsPlaygroundSidebarOpen(!isPlaygroundSidebarOpen)}
                onClose={() => setIsPlaygroundSidebarOpen(false)}
                title="Liquid Chrome"
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
                    colorPickerLabel="PRIMARY CHROME COLOR"
                    colorPickerValue={primaryColor}
                    colorPickerOnChange={setPrimaryColor}
                    colorPickerVariant="duo"
                    colorPickerShowAlpha={false}
                    colorPickerShowEyeDropper={false}
                  />
                  <ColorPicker
                    colorPickerLabel="SECONDARY CHROME COLOR"
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

                {/* Shading & Surface Section */}
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
                    Shading & Surface
                  </div>
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>CHROMATIC SHIFT</span><span>{chromaticShift.toFixed(2)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={1.0}
                    sliderStep={0.01}
                    sliderValue={chromaticShift}
                    sliderOnChange={setChromaticShift}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>NOISE INTENSITY</span><span>{noiseIntensity.toFixed(2)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={1.0}
                    sliderStep={0.01}
                    sliderValue={noiseIntensity}
                    sliderOnChange={setNoiseIntensity}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>FLATNESS</span><span>{flatness.toFixed(1)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={10.0}
                    sliderStep={0.1}
                    sliderValue={flatness}
                    sliderOnChange={setFlatness}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>DISTORTION</span><span>{distortion.toFixed(2)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={2.0}
                    sliderStep={0.05}
                    sliderValue={distortion}
                    sliderOnChange={setDistortion}
                  />
                </div>

                {/* Waves & Motion Section */}
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
                    Waves & Motion
                  </div>
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>FLOW SPEED</span><span>{speed.toFixed(2)}</span></div>}
                    sliderMin={0.0}
                    sliderMax={2.0}
                    sliderStep={0.05}
                    sliderValue={speed}
                    sliderOnChange={setSpeed}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>WAVE AMPLITUDE</span><span>{amplitude.toFixed(2)}</span></div>}
                    sliderMin={0.05}
                    sliderMax={2.0}
                    sliderStep={0.05}
                    sliderValue={amplitude}
                    sliderOnChange={setAmplitude}
                  />
                  <Slider
                    sliderLabel={<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}><span>WAVE FREQUENCY</span><span>{frequency.toFixed(3)}</span></div>}
                    sliderMin={0.02}
                    sliderMax={1.0}
                    sliderStep={0.01}
                    sliderValue={frequency}
                    sliderOnChange={setFrequency}
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
                colorPickerLabel="PRIMARY CHROME COLOR"
                colorPickerValue={primaryColor}
                colorPickerOnChange={setPrimaryColor}
                colorPickerVariant="duo"
                colorPickerShowAlpha={false}
                colorPickerShowEyeDropper={false}
              />

              <ColorPicker
                colorPickerLabel="SECONDARY CHROME COLOR"
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

            {/* Column 2: Surface & Shading */}
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
                Surface & Shading
              </h4>

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>CHROMATIC SHIFT</span>
                    <span>{chromaticShift.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={1.0}
                sliderStep={0.01}
                sliderValue={chromaticShift}
                sliderOnChange={setChromaticShift}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>NOISE INTENSITY</span>
                    <span>{noiseIntensity.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={1.0}
                sliderStep={0.01}
                sliderValue={noiseIntensity}
                sliderOnChange={setNoiseIntensity}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>FLATNESS</span>
                    <span>{flatness.toFixed(1)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={10.0}
                sliderStep={0.1}
                sliderValue={flatness}
                sliderOnChange={setFlatness}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>DISTORTION</span>
                    <span>{distortion.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={2.0}
                sliderStep={0.05}
                sliderValue={distortion}
                sliderOnChange={setDistortion}
                sliderShowTooltip
              />
            </div>

            {/* Column 3: Waves & Motion */}
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
                Waves & Motion
              </h4>

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>FLOW SPEED</span>
                    <span>{speed.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.0}
                sliderMax={2.0}
                sliderStep={0.05}
                sliderValue={speed}
                sliderOnChange={setSpeed}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>WAVE AMPLITUDE</span>
                    <span>{amplitude.toFixed(2)}</span>
                  </div>
                }
                sliderMin={0.05}
                sliderMax={2.0}
                sliderStep={0.05}
                sliderValue={amplitude}
                sliderOnChange={setAmplitude}
                sliderShowTooltip
              />

              <Slider
                sliderLabel={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <span>WAVE FREQUENCY</span>
                    <span>{frequency.toFixed(3)}</span>
                  </div>
                }
                sliderMin={0.02}
                sliderMax={1.0}
                sliderStep={0.01}
                sliderValue={frequency}
                sliderOnChange={setFrequency}
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
          codeBlockCode={`import { LiquidChrome } from '@unbrn/ui/LiquidChrome';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      <LiquidChrome
        primaryColor="#FFFFFF"
        secondaryColor="#0A0A0A"
        speed={0.5}
        amplitude={0.3}
        frequency={0.2}
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
          { name: 'primaryColor', type: 'string', defaultValue: "'#FFFFFF'", description: 'Hex code for the primary wave color (representing peaks).' },
          { name: 'secondaryColor', type: 'string', defaultValue: "'#0A0A0A'", description: 'Hex code for the secondary background color (representing valleys).' },
          { name: 'backgroundColor', type: 'string', defaultValue: "'transparent'", description: 'Solid/transparent canvas background color behind the WebGL render.' },
          { name: 'speed', type: 'number', defaultValue: '0.5', description: 'Flow and oscillation speed multiplier of the waves.' },
          { name: 'amplitude', type: 'number', defaultValue: '0.3', description: 'Wave depth amplitude scaling factor.' },
          { name: 'frequency', type: 'number', defaultValue: '0.2', description: 'Spatial wave count frequency scaling factor.' },
          { name: 'distortion', type: 'number', defaultValue: '1.5', description: 'Perlin noise coordinate warp distortion scale.' },
          { name: 'flatness', type: 'number', defaultValue: '1.0', description: 'Wave peak/valley flattening profile factor.' },
          { name: 'chromaticShift', type: 'number', defaultValue: '0.25', description: 'Refractive chromatic aberration channel offset strength (red vs blue).' },
          { name: 'noiseIntensity', type: 'number', defaultValue: '0.12', description: 'Visual opacity strength of film grain textured static noise overlay.' },
          { name: 'interactive', type: 'boolean', defaultValue: 'true', description: 'Whether the wave center point distorts in reaction to cursor movement.' },
          { name: 'mixBlendMode', type: 'string', defaultValue: "'normal'", description: 'CSS mix-blend-mode applied directly to the WebGL canvas element.' },
          { name: 'quality', type: "'low' | 'medium' | 'high'", defaultValue: 'auto', description: 'Dynamic quality profile checking hardware capabilities.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container element.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline styling for the root container element.' }
        ]}
      />
    </>
  );
};
