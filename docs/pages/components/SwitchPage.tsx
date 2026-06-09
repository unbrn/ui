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
        code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <div className="unburn-glass" style={{
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
          switchLabel="Airplane Mode" 
          switchDescription="Disable all wireless communications." 
        />
        <Switch 
          switchLabel="Wi-Fi Network" 
          switchDescription="Connect to wireless internet access points." 
          switchDefaultChecked
        />
        <Switch 
          switchLabel="Do Not Disturb" 
          switchDescription="Silence notifications and calls." 
          switchDefaultChecked
        />
      </div>
    </div>
  );
}`}
      >
        <div
          className="unburn-glass"
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
              switchLabel="Airplane Mode"
              switchDescription="Disable all wireless communications."
            />
            <Switch
              switchLabel="Wi-Fi Network"
              switchDescription="Connect to wireless internet access points."
              switchDefaultChecked
            />
            <Switch
              switchLabel="Do Not Disturb"
              switchDescription="Silence notifications and calls."
              switchDefaultChecked
            />
          </div>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return <Switch switchLabel="Toggle me" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Three visual variants optimized for premium backgrounds: filled (solid color with dynamic depth gradient), outlined (frosted glass border), and duo (frosted glass tinted with accent fill)."
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch switchVariant="filled" switchLabel="Filled (Default)" switchDefaultChecked />
      <Switch switchVariant="outlined" switchLabel="Outlined Variant" switchDefaultChecked />
      <Switch switchVariant="duo" switchLabel="Duo Variant" switchDefaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch switchVariant="filled" switchLabel="Filled Variant" switchDefaultChecked />
            <Switch switchVariant="outlined" switchLabel="Outlined Variant" switchDefaultChecked />
            <Switch switchVariant="duo" switchLabel="Duo Variant" switchDefaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Highly responsive small, medium, and large sizing structures scaled to perfectly proportional alignment."
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch switchSize="sm" switchLabel="Small Switch" switchDefaultChecked />
      <Switch switchSize="default" switchLabel="Default Switch" switchDefaultChecked />
      <Switch switchSize="lg" switchLabel="Large Switch" switchDefaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Switch switchSize="sm" switchLabel="Small Switch" switchDefaultChecked />
            <Switch switchSize="default" switchLabel="Default Switch" switchDefaultChecked />
            <Switch switchSize="lg" switchLabel="Large Switch" switchDefaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="With Description"
          description="Include clear details and captions placed side-by-side with perfect structural text scaling."
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <Switch
      switchLabel="Airplane Mode"
      switchDescription="Disable all wireless communications including Wi-Fi and Bluetooth."
    />
  );
}`}
        >
          <Switch
            switchLabel="Airplane Mode"
            switchDescription="Disable all wireless communications including Wi-Fi and Bluetooth."
          />
        </Showcase>

        <Showcase
          title="States"
          description="Disabled toggle states representing non-interactive states while maintaining glassmorphic transparency."
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch switchDisabled switchLabel="Disabled Switch" />
      <Switch switchDisabled switchDefaultChecked switchLabel="Disabled Active" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch switchDisabled switchLabel="Disabled Switch" />
            <Switch switchDisabled switchDefaultChecked switchLabel="Disabled Active" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'switchLabel', type: 'ReactNode', description: 'Text shown next to the switch.' },
          { name: 'switchDescription', type: 'ReactNode', description: 'Helpful description text shown below the label.' },
          { name: 'switchChecked', type: 'boolean', description: 'Set if the switch is turned on.' },
          { name: 'switchDefaultChecked', type: 'boolean', description: 'Set if the switch starts as turned on.' },
          { name: 'switchOnChange', type: '(checked: boolean) => void', description: 'Function called when the switch state changes.' },
          { name: 'switchVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the switch.' },
          { name: 'switchSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the switch.' },
          { name: 'switchDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the switch.' },
          { name: 'switchAccentColor', type: 'string', description: 'Custom color theme variable overrides (e.g. hex, rgb).' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the switch.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'switchRoot', description: 'Styles the outer label wrapper container.' },
          { name: 'switchContainer', description: 'Styles the toggle switch outer wrapper.' },
          { name: 'switchTrack', description: 'Styles the track background element.' },
          { name: 'switchThumb', description: 'Styles the sliding circular thumb element.' },
          { name: 'switchLabel', description: 'Styles the label text element.' },
          { name: 'switchDescription', description: 'Styles the description text below the label.' },
        ]}
        stylingStructure={`switchRoot
 ├── switchContainer
 │    ├── switchTrack
 │    └── switchThumb
 ├── switchLabel
 └── switchDescription`}
      />
    </>
  );
};
