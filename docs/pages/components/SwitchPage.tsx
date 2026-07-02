import React from 'react';
import { Switch } from '../../../package/components/Switch/Switch';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const SwitchPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Switch" />

      <Showcase
        title="Preview"
        description="A beautiful mac-style System Preferences panel demonstrating various premium styles and custom brand colors."
        code={`import { Switch } from '@unbrn/ui/Switch';

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
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>System Settings</h4>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Configure your device preferences.</p>
      </div>
      
      <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Switch 
          label="Airplane Mode" 
          description="Disable all wireless communications." 
        />
        <Switch 
          label="Wi-Fi Network" 
          description="Connect to wireless internet access points." 
          defaultChecked
        />
        <Switch 
          label="Do Not Disturb" 
          description="Silence notifications and calls." 
          defaultChecked
        />
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
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>System Settings</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Configure your device preferences.</p>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', opacity: 0.5 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Switch
              label="Airplane Mode"
              description="Disable all wireless communications."
            />
            <Switch
              label="Wi-Fi Network"
              description="Connect to wireless internet access points."
              defaultChecked
            />
            <Switch
              label="Do Not Disturb"
              description="Silence notifications and calls."
              defaultChecked
            />
          </div>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Switch } from '@unbrn/ui/Switch';

export default function Example() {
  return <Switch label="Toggle me" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Three visual variants optimized for premium backgrounds: filled (solid color with dynamic depth gradient), outlined (frosted glass border), and duo (frosted glass tinted with accent fill)."
          code={`import { Switch } from '@unbrn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch variant="filled" label="Filled (Default)" defaultChecked />
      <Switch variant="outlined" label="Outlined Variant" defaultChecked />
      <Switch variant="duo" label="Duo Variant" defaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch variant="filled" label="Filled Variant" defaultChecked />
            <Switch variant="outlined" label="Outlined Variant" defaultChecked />
            <Switch variant="duo" label="Duo Variant" defaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Highly responsive small, medium, and large sizing structures scaled to perfectly proportional alignment."
          code={`import { Switch } from '@unbrn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch size={1} label="Small Switch" defaultChecked />
      <Switch size={2} label="Default Switch" defaultChecked />
      <Switch size={3} label="Large Switch" defaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Switch size={1} label="Small Switch" defaultChecked />
            <Switch size={2} label="Default Switch" defaultChecked />
            <Switch size={3} label="Large Switch" defaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="With Description"
          description="Include clear details and captions placed side-by-side with perfect structural text scaling."
          code={`import { Switch } from '@unbrn/ui/Switch';

export default function Example() {
  return (
    <Switch
      label="Airplane Mode"
      description="Disable all wireless communications including Wi-Fi and Bluetooth."
    />
  );
}`}
        >
          <Switch
            label="Airplane Mode"
            description="Disable all wireless communications including Wi-Fi and Bluetooth."
          />
        </Showcase>

        <Showcase
          title="States"
          description="Disabled toggle states representing non-interactive states while maintaining glassmorphic transparency."
          code={`import { Switch } from '@unbrn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch disabled label="Disabled Switch" />
      <Switch disabled defaultChecked label="Disabled Active" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch disabled label="Disabled Switch" />
            <Switch disabled defaultChecked label="Disabled Active" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'label', type: 'ReactNode', description: 'Text shown next to the switch.' },
          { name: 'description', type: 'ReactNode', description: 'Helpful description text shown below the label.' },
          { name: 'checked', type: 'boolean', description: 'Set if the switch is turned on.' },
          { name: 'defaultChecked', type: 'boolean', description: 'Set if the switch starts as turned on.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Function called when the switch state changes.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the switch.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'The size of the switch.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the switch.' },
          { name: 'accentColor', type: 'string', description: 'Custom color theme variable overrides (e.g. hex, rgb).' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the track element.' },
          { name: 'id', type: 'string', description: 'Custom ID attribute for the button element.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the switch.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer label wrapper container.' },
          { name: 'container', description: 'Styles the toggle switch outer wrapper.' },
          { name: 'track', description: 'Styles the track background element.' },
          { name: 'thumb', description: 'Styles the sliding circular thumb element.' },
          { name: 'label', description: 'Styles the label text element.' },
          { name: 'description', description: 'Styles the description text below the label.' },
        ]}
        stylingStructure={`root
 ├── container
 │    ├── track
 │    └── thumb
 ├── label
 └── description`}
      />
    </>
  );
};
