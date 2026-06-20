import React, { useState } from 'react';
import { Slider } from '../../../package/components/Slider/Slider';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { Volume2, Sun, Keyboard, Music, Wind, Mic } from 'lucide-react';

const AudioMixerExample = () => {
  const [musicVol, setMusicVol] = useState(65);
  const [ambientVol, setAmbientVol] = useState(40);
  const [voiceVol, setVoiceVol] = useState(85);

  const averageLevel = Math.round((musicVol + ambientVol + voiceVol) / 3);

  return (
    <div
      className="unbrn-glass"
      style={{
        padding: '1.5rem',
        borderRadius: 'calc(var(--radius) - 6px)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '440px',
        transition: 'all 0.4s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Audio Deck</h4>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mix active sound channels.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>Level:</span>
          <div
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: 'color-mix(in srgb, var(--accent-color) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent-color) 25%, transparent)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-color)',
              minWidth: '32px',
              textAlign: 'center'
            }}
          >
            {averageLevel}%
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Music size={18} style={{ color: '#ec4899', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Slider
              sliderAccentColor="#ec4899"
              sliderValue={musicVol}
              sliderOnChange={setMusicVol}
              sliderSize="sm"
              sliderShowTooltip
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Wind size={18} style={{ color: '#06b6d4', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Slider
              sliderAccentColor="#06b6d4"
              sliderValue={ambientVol}
              sliderOnChange={setAmbientVol}
              sliderSize="sm"
              sliderShowTooltip
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mic size={18} style={{ color: '#a855f7', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Slider
              sliderAccentColor="#a855f7"
              sliderValue={voiceVol}
              sliderOnChange={setVoiceVol}
              sliderSize="sm"
              sliderShowTooltip
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SliderPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Slider" />

      <Showcase
        title="Preview"
        description="A beautiful hardware device control center showing dynamic displays, volumes, and peripheral backlights."
        code={`import { Slider } from '@unbrn/ui/Slider';
import { Volume2, Sun, Keyboard } from 'lucide-react';

export default function Example() {
  return (
    <div className="unbrn-glass" style={{
      padding: '1.5rem',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      width: '100%',
      maxWidth: '440px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Device Mixer</h4>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Control visual and sound peripherals.</p>
      </div>
      
      <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={16} /> Speaker Volume
            </span>
          </div>
          <Slider sliderDefaultValue={75} sliderShowTooltip />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={16} /> Screen Brightness
            </span>
          </div>
          <Slider sliderDefaultValue={45} sliderShowTooltip sliderAccentColor="#facc15" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Keyboard size={16} /> Keyboard Backlight
            </span>
          </div>
          <Slider sliderDefaultValue={30} sliderShowTooltip sliderAccentColor="#a855f7" />
        </div>
      </div>
    </div>
  );
}`}
      >
        <div
          className="unbrn-glass"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Device Mixer</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Control visual and sound peripherals.</p>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', opacity: 0.5 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={16} /> Speaker Volume
                </span>
              </div>
              <Slider sliderDefaultValue={75} sliderShowTooltip />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sun size={16} /> Screen Brightness
                </span>
              </div>
              <Slider sliderDefaultValue={45} sliderShowTooltip sliderAccentColor="#facc15" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Keyboard size={16} /> Keyboard Backlight
                </span>
              </div>
              <Slider sliderDefaultValue={30} sliderShowTooltip sliderAccentColor="#a855f7" />
            </div>
          </div>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Slider } from '@unbrn/ui/Slider';

export default function Example() {
  return <Slider sliderLabel="Volume Level" sliderDefaultValue={50} sliderShowTooltip />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Sizes"
          description="Sizing structures representing proportional alignments across sm, default, and lg scaling systems."
          code={`import { Slider } from '@unbrn/ui/Slider';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '400px' }}>
      <Slider sliderSize="sm" sliderLabel="Small Size" sliderDefaultValue={25} />
      <Slider sliderSize="default" sliderLabel="Default Size" sliderDefaultValue={50} />
      <Slider sliderSize="lg" sliderLabel="Large Size" sliderDefaultValue={75} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '400px' }}>
            <Slider sliderSize="sm" sliderLabel="Small Size" sliderDefaultValue={25} />
            <Slider sliderSize="default" sliderLabel="Default Size" sliderDefaultValue={50} />
            <Slider sliderSize="lg" sliderLabel="Large Size" sliderDefaultValue={75} />
          </div>
        </Showcase>

        <Showcase
          title="With Description"
          description="Contextual helper captions aligned dynamically below labels."
          code={`import { Slider } from '@unbrn/ui/Slider';

export default function Example() {
  return (
    <Slider
      sliderLabel="Frame Rate Limiter"
      sliderDescription="Lock background render updates to save system thermal capacity."
      sliderDefaultValue={60}
      sliderMin={30}
      sliderMax={120}
      sliderStep={5}
      sliderShowTooltip
    />
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Slider
              sliderLabel="Frame Rate Limiter"
              sliderDescription="Lock background render updates to save system thermal capacity."
              sliderDefaultValue={60}
              sliderMin={30}
              sliderMax={120}
              sliderStep={5}
              sliderShowTooltip
            />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Support for interactive disabled configurations, muting slider interactions while maintaining glassmorphic balance."
          code={`import { Slider } from '@unbrn/ui/Slider';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '400px' }}>
      <Slider sliderDisabled sliderLabel="Disabled Range" sliderDefaultValue={20} />
      <Slider sliderDisabled sliderLabel="Disabled Large" sliderSize="lg" sliderDefaultValue={70} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '400px' }}>
            <Slider sliderDisabled sliderLabel="Disabled Range" sliderDefaultValue={20} />
            <Slider sliderDisabled sliderLabel="Disabled Large" sliderSize="lg" sliderDefaultValue={70} />
          </div>
        </Showcase>

        <Showcase
          title="Controlled Mixer Deck"
          description="An interactive multi-channel deck connecting states, showing dynamic updates mapped to custom color-coded progress feeds."
          code={`import { Slider } from '@unbrn/ui/Slider';
import { useState } from 'react';
import { Music, Wind, Mic } from 'lucide-react';

export default function Example() {
  const [musicVol, setMusicVol] = useState(65);
  const [ambientVol, setAmbientVol] = useState(40);
  const [voiceVol, setVoiceVol] = useState(85);

  const averageLevel = Math.round((musicVol + ambientVol + voiceVol) / 3);

  return (
    <div className="unbrn-glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '440px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Audio Deck</h4>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mix active sound channels.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>Level:</span>
          <div style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'color-mix(in srgb, var(--accent-color) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-color) 25%, transparent)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-color)' }}>
            {averageLevel}%
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Music size={18} style={{ color: '#ec4899' }} />
          <Slider sliderAccentColor="#ec4899" sliderValue={musicVol} sliderOnChange={setMusicVol} sliderSize="sm" sliderShowTooltip />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Wind size={18} style={{ color: '#06b6d4' }} />
          <Slider sliderAccentColor="#06b6d4" sliderValue={ambientVol} sliderOnChange={setAmbientVol} sliderSize="sm" sliderShowTooltip />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mic size={18} style={{ color: '#a855f7' }} />
          <Slider sliderAccentColor="#a855f7" sliderValue={voiceVol} sliderOnChange={setVoiceVol} sliderSize="sm" sliderShowTooltip />
        </div>
      </div>
    </div>
  );
}`}
        >
          <AudioMixerExample />
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'sliderLabel', type: 'ReactNode', description: 'Text label shown above the slider.' },
          { name: 'sliderDescription', type: 'ReactNode', description: 'Helper text shown below the label.' },
          { name: 'sliderValue', type: 'number', description: 'Controlled value of the slider.' },
          { name: 'sliderDefaultValue', type: 'number', description: 'Default value for uncontrolled usage.' },
          { name: 'sliderMin', type: 'number', defaultValue: '0', description: 'The minimum selectable value.' },
          { name: 'sliderMax', type: 'number', defaultValue: '100', description: 'The maximum selectable value.' },
          { name: 'sliderStep', type: 'number', defaultValue: '1', description: 'The granularity of slider increments.' },
          { name: 'sliderOnChange', type: '(value: number) => void', description: 'Callback function triggered as value changes.' },
          { name: 'sliderOnChangeEnd', type: '(value: number) => void', description: 'Callback function triggered upon drag release.' },
          { name: 'sliderSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'Sizing scale adjusting track heights and thumbs.' },
          { name: 'sliderDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables slider interaction.' },
          { name: 'sliderAccentColor', type: 'string', description: 'Custom primary accent override color (hex, rgb, etc.).' },
          { name: 'sliderShowTooltip', type: 'boolean', defaultValue: 'false', description: 'Enables floating value bubble indicator.' },
          { name: 'sliderId', type: 'string', description: 'Custom ID attribute for the input element.' },
          { name: 'sliderClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'sliderStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes targeting key elements.' },
          { name: 'styles', type: 'object', description: 'Inline style configuration mapping.' },
        ]}
        stylingTargets={[
          { name: 'sliderRoot', description: 'Styles the outer slider wrapper container.' },
          { name: 'sliderHeader', description: 'Styles the wrapper containing the label and current value.' },
          { name: 'sliderLabel', description: 'Styles the label text element.' },
          { name: 'sliderDescription', description: 'Styles the description text below the label.' },
          { name: 'sliderContainer', description: 'Styles the track and range wrapper container.' },
          { name: 'sliderTrack', description: 'Styles the base track background line.' },
          { name: 'sliderThumb', description: 'Styles the draggable slider thumb element.' },
          { name: 'sliderTooltip', description: 'Styles the floating tooltip box.' },
        ]}
        stylingStructure={`sliderRoot
 ├── sliderHeader
 │    ├── sliderLabel
 │    └── sliderTooltip
 ├── sliderContainer
 │    ├── sliderTrack
 │    └── sliderThumb
 └── sliderDescription`}
      />
    </>
  );
};
