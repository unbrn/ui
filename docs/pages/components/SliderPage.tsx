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
              accentColor="#ec4899"
              value={musicVol}
              onChange={setMusicVol}
              size={1}
              showTooltip
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Wind size={18} style={{ color: '#06b6d4', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Slider
              accentColor="#06b6d4"
              value={ambientVol}
              onChange={setAmbientVol}
              size={1}
              showTooltip
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mic size={18} style={{ color: '#a855f7', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Slider
              accentColor="#a855f7"
              value={voiceVol}
              onChange={setVoiceVol}
              size={1}
              showTooltip
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
          <Slider defaultValue={75} showTooltip />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={16} /> Screen Brightness
            </span>
          </div>
          <Slider defaultValue={45} showTooltip accentColor="#facc15" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Keyboard size={16} /> Keyboard Backlight
            </span>
          </div>
          <Slider defaultValue={30} showTooltip accentColor="#a855f7" />
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
              <Slider defaultValue={75} showTooltip />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sun size={16} /> Screen Brightness
                </span>
              </div>
              <Slider defaultValue={45} showTooltip accentColor="#facc15" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Keyboard size={16} /> Keyboard Backlight
                </span>
              </div>
              <Slider defaultValue={30} showTooltip accentColor="#a855f7" />
            </div>
          </div>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Slider } from '@unbrn/ui/Slider';

export default function Example() {
  return <Slider label="Volume Level" defaultValue={50} showTooltip />;
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
      <Slider size={1} label="Small Size" defaultValue={25} />
      <Slider size={2} label="Default Size" defaultValue={50} />
      <Slider size={3} label="Large Size" defaultValue={75} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '400px' }}>
            <Slider size={1} label="Small Size" defaultValue={25} />
            <Slider size={2} label="Default Size" defaultValue={50} />
            <Slider size={3} label="Large Size" defaultValue={75} />
          </div>
        </Showcase>

        <Showcase
          title="With Description"
          description="Contextual helper captions aligned dynamically below labels."
          code={`import { Slider } from '@unbrn/ui/Slider';

export default function Example() {
  return (
    <Slider
      label="Frame Rate Limiter"
      description="Lock background render updates to save system thermal capacity."
      defaultValue={60}
      min={30}
      max={120}
      step={5}
      showTooltip
    />
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Slider
              label="Frame Rate Limiter"
              description="Lock background render updates to save system thermal capacity."
              defaultValue={60}
              min={30}
              max={120}
              step={5}
              showTooltip
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
      <Slider disabled label="Disabled Range" defaultValue={20} />
      <Slider disabled label="Disabled Large" size={3} defaultValue={70} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '400px' }}>
            <Slider disabled label="Disabled Range" defaultValue={20} />
            <Slider disabled label="Disabled Large" size={3} defaultValue={70} />
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
          <Slider accentColor="#ec4899" value={musicVol} onChange={setMusicVol} size={1} showTooltip />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Wind size={18} style={{ color: '#06b6d4' }} />
          <Slider accentColor="#06b6d4" value={ambientVol} onChange={setAmbientVol} size={1} showTooltip />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mic size={18} style={{ color: '#a855f7' }} />
          <Slider accentColor="#a855f7" value={voiceVol} onChange={setVoiceVol} size={1} showTooltip />
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
          { name: 'label', type: 'ReactNode', description: 'Text label shown above the slider.' },
          { name: 'description', type: 'ReactNode', description: 'Helper text shown below the label.' },
          { name: 'value', type: 'number', description: 'Controlled value of the slider.' },
          { name: 'defaultValue', type: 'number', description: 'Default value for uncontrolled usage.' },
          { name: 'min', type: 'number', defaultValue: '0', description: 'The minimum selectable value.' },
          { name: 'max', type: 'number', defaultValue: '100', description: 'The maximum selectable value.' },
          { name: 'step', type: 'number', defaultValue: '1', description: 'The granularity of slider increments.' },
          { name: 'onChange', type: '(value: number) => void', description: 'Callback function triggered as value changes.' },
          { name: 'onChangeEnd', type: '(value: number) => void', description: 'Callback function triggered upon drag release.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'Sizing scale adjusting track heights and thumbs.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables slider interaction.' },
          { name: 'accentColor', type: 'string', description: 'Custom primary accent override color (hex, rgb, etc.).' },
          { name: 'showTooltip', type: 'boolean', defaultValue: 'false', description: 'Enables floating value bubble indicator.' },
          { name: 'id', type: 'string', description: 'Custom ID attribute for the input element.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes targeting key elements.' },
          { name: 'styles', type: 'object', description: 'Inline style configuration mapping.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer slider wrapper container.' },
          { name: 'header', description: 'Styles the wrapper containing the label and current value.' },
          { name: 'label', description: 'Styles the label text element.' },
          { name: 'description', description: 'Styles the description text below the label.' },
          { name: 'container', description: 'Styles the track and range wrapper container.' },
          { name: 'track', description: 'Styles the base track background line.' },
          { name: 'thumb', description: 'Styles the draggable slider thumb element.' },
          { name: 'tooltip', description: 'Styles the floating tooltip box.' },
        ]}
        stylingStructure={`root
 ├── header
 │    ├── label
 │    └── tooltip
 ├── container
 │    ├── track
 │    └── thumb
 └── description`}
      />
    </>
  );
};
