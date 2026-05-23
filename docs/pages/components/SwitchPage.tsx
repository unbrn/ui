import React, { useState } from 'react';
import { Switch } from '../../../package/components/Switch/Switch';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

const ControlledSwitchExample = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div 
      className="unburn-glass" 
      style={{ 
        padding: '1.25rem', 
        borderRadius: 'calc(var(--radius) - 6px)', 
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '400px',
        transition: 'all 0.4s ease'
      }}
    >
      <Switch
        label={enabled ? "Power Grid Online" : "Power Grid Offline"}
        checked={enabled}
        onChange={(val) => setEnabled(val)}
        description="Toggle core reactor cells"
        variant="filled"
        color={enabled ? "#10b981" : "#ef4444"}
      />
      <div 
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: enabled ? '#10b981' : '#ef4444',
          boxShadow: enabled 
            ? '0 0 12px color-mix(in srgb, #10b981 70%, transparent)' 
            : '0 0 12px color-mix(in srgb, #ef4444 70%, transparent)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          flexShrink: 0
        }} 
      />
    </div>
  );
};

export const SwitchPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Switch" />

      <Showcase
        title="PREVIEW"
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
          label="Airplane Mode" 
          description="Disable all wireless communications." 
          variant="duo"
          color="#ec4899"
        />
        <Switch 
          label="Wi-Fi Network" 
          description="Connect to wireless internet access points." 
          defaultChecked
          variant="filled"
          color="#3b82f6"
        />
        <Switch 
          label="Do Not Disturb" 
          description="Silence notifications and calls." 
          defaultChecked
          variant="outlined"
          color="#a855f7"
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
              label="Airplane Mode" 
              description="Disable all wireless communications." 
              variant="duo"
              color="#ec4899"
            />
            <Switch 
              label="Wi-Fi Network" 
              description="Connect to wireless internet access points." 
              defaultChecked
              variant="filled"
              color="#3b82f6"
            />
            <Switch 
              label="Do Not Disturb" 
              description="Silence notifications and calls." 
              defaultChecked
              variant="outlined"
              color="#a855f7"
            />
          </div>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return <Switch label="Toggle me" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Three visual variants optimized for premium backgrounds: filled (solid color with dynamic depth gradient), outlined (frosted glass border), and duo (frosted glass tinted with accent fill)."
          code={`import { Switch } from '@unburn/ui/Switch';

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
          title="SIZES"
          description="Highly responsive small, medium, and large sizing structures scaled to perfectly proportional alignment."
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch size="sm" label="Small Switch" defaultChecked />
      <Switch size="default" label="Default Switch" defaultChecked />
      <Switch size="lg" label="Large Switch" defaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Switch size="sm" label="Small Switch" defaultChecked />
            <Switch size="default" label="Default Switch" defaultChecked />
            <Switch size="lg" label="Large Switch" defaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="VIBRANT ACCENTS"
          description="Support for custom CSS accent variables directly from inline color properties. Neon highlights automatically harmonize with light and dark canvas settings."
          code={`import { Switch } from '@unburn/ui/Switch';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      <Switch variant="filled" color="#ec4899" label="Neon Pink" defaultChecked />
      <Switch variant="outlined" color="#06b6d4" label="Electric Cyan" defaultChecked />
      <Switch variant="duo" color="#10b981" label="Emerald Green" defaultChecked />
      <Switch variant="filled" color="#8b5cf6" label="Royal Purple" defaultChecked />
      <Switch variant="duo" color="#f59e0b" label="Amber Gold" defaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <Switch variant="filled" color="#ec4899" label="Neon Pink" defaultChecked />
            <Switch variant="outlined" color="#06b6d4" label="Electric Cyan" defaultChecked />
            <Switch variant="duo" color="#10b981" label="Emerald Green" defaultChecked />
            <Switch variant="filled" color="#8b5cf6" label="Royal Purple" defaultChecked />
            <Switch variant="duo" color="#f59e0b" label="Amber Gold" defaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="WITH DESCRIPTION"
          description="Include clear details and captions placed side-by-side with perfect structural text scaling."
          code={`import { Switch } from '@unburn/ui/Switch';

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
          title="STATES"
          description="Disabled toggle states representing non-interactive states while maintaining glassmorphic transparency."
          code={`import { Switch } from '@unburn/ui/Switch';

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

        <Showcase
          title="CONTROLLED REACTOR DEMO"
          description="Create stateful workflows and custom callback triggers, showcasing premium reactive feedback indicators."
          code={`import { Switch } from '@unburn/ui/Switch';
import { useState } from 'react';

export default function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="unburn-glass" style={{ 
      padding: '1.25rem', 
      borderRadius: 'calc(var(--radius) - 6px)', 
      border: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Switch
        label={enabled ? "Power Grid Online" : "Power Grid Offline"}
        checked={enabled}
        onChange={(val) => setEnabled(val)}
        description="Toggle core reactor cells"
        variant="filled"
        color={enabled ? "#10b981" : "#ef4444"}
      />
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: enabled ? '#10b981' : '#ef4444'
      }} />
    </div>
  );
}`}
        >
          <ControlledSwitchExample />
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
          { name: 'size', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the switch.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the switch.' },
          { name: 'color', type: 'string', description: 'Custom color theme variable overrides (e.g. hex, rgb).' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the switch.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
