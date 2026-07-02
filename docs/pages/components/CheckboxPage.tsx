import React, { useState } from 'react';
import { Checkbox } from '../../../package/components/Checkbox/Checkbox';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';


export const CheckboxPage: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <ComponentHeader title="Checkbox" />

      <Showcase
        title="Preview"
        code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return <Checkbox label="Accept terms and conditions" defaultChecked />;
}`}
      >
        <Checkbox label="Accept terms and conditions" defaultChecked />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return <Checkbox label="Remember me" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox variant="filled" label="Filled (Default)" defaultChecked />
      <Checkbox variant="outlined" label="Outlined Variant" defaultChecked />
      <Checkbox variant="duo" label="Duo Variant" defaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox variant="filled" label="Filled (Default)" defaultChecked />
            <Checkbox variant="outlined" label="Outlined Variant" defaultChecked />
            <Checkbox variant="duo" label="Duo Variant" defaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from small, medium, or large sizes."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size={1} label="Small Checkbox" defaultChecked />
      <Checkbox size={2} label="Default Checkbox" defaultChecked />
      <Checkbox size={3} label="Large Checkbox" defaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox size={1} label="Small Checkbox" defaultChecked />
            <Checkbox size={2} label="Default Checkbox" defaultChecked />
            <Checkbox size={3} label="Large Checkbox" defaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use disabled states and validation checks."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox disabled label="Disabled Checkbox" />
      <Checkbox disabled defaultChecked label="Disabled Checked" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox disabled label="Disabled Checkbox" />
            <Checkbox disabled defaultChecked label="Disabled Checked" />
          </div>
        </Showcase>

        <Showcase
          title="With Description"
          description="Add descriptive text below the checkbox label."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <Checkbox
      label="Notifications"
      description="Receive email updates about your account activity and security."
      defaultChecked
    />
  );
}`}
        >
          <Checkbox
            label="Notifications"
            description="Receive email updates about your account activity and security."
            defaultChecked
          />
        </Showcase>

        <Showcase
          title="Interactive"
          description="Show error messages when unchecked."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';
import { useState } from 'react';

export default function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Privacy Policy"
      onChange={(e) => setChecked(e.target.checked)}
      checked={checked}
      error={checked ? undefined : "You must agree to the privacy policy."}
    />
  );
}`}
        >
          <Checkbox
            label="Privacy Policy"
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked}
            error={checked ? undefined : "You must agree to the privacy policy."}
          />
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'label', type: 'ReactNode', description: 'Text shown next to the checkbox.' },
          { name: 'description', type: 'ReactNode', description: 'Helpful description text shown below the label.' },
          { name: 'error', type: 'string', description: 'Error message to show under the checkbox.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the checkbox.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'The size of the checkbox.' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color for borders and checked background.' },
          { name: 'checked', type: 'boolean', description: 'Set if the checkbox is checked.' },
          { name: 'defaultChecked', type: 'boolean', description: 'Set if the checkbox starts as checked.' },
          { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Function called when the checkbox state changes.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the checkbox.' },
          { name: 'id', type: 'string', description: 'Custom ID attribute for the input element.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the checkbox (prefixed with checkbox).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with checkbox).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer label wrapper container.' },
          { name: 'container', description: 'Styles the wrapper containing the checkbox square.' },
          { name: 'checkbox', description: 'Styles the checkbox square itself.' },
          { name: 'indicator', description: 'Styles the checkmark SVG indicator inside.' },
          { name: 'label', description: 'Styles the label text element.' },
          { name: 'description', description: 'Styles the subtitle description text.' },
          { name: 'error', description: 'Styles the error text element.' },
        ]}
        stylingStructure={`root
 ├── container
 │    └── checkbox
 │         └── indicator
 ├── label
 ├── description
 └── error`}
      />
    </>
  );
};
