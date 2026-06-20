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
  return <Checkbox checkboxLabel="Accept terms and conditions" checkboxDefaultChecked />;
}`}
      >
        <Checkbox checkboxLabel="Accept terms and conditions" checkboxDefaultChecked />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return <Checkbox checkboxLabel="Remember me" />;
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
      <Checkbox checkboxVariant="filled" checkboxLabel="Filled (Default)" checkboxDefaultChecked />
      <Checkbox checkboxVariant="outlined" checkboxLabel="Outlined Variant" checkboxDefaultChecked />
      <Checkbox checkboxVariant="duo" checkboxLabel="Duo Variant" checkboxDefaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox checkboxVariant="filled" checkboxLabel="Filled (Default)" checkboxDefaultChecked />
            <Checkbox checkboxVariant="outlined" checkboxLabel="Outlined Variant" checkboxDefaultChecked />
            <Checkbox checkboxVariant="duo" checkboxLabel="Duo Variant" checkboxDefaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from small, medium, or large sizes."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox checkboxSize="sm" checkboxLabel="Small Checkbox" checkboxDefaultChecked />
      <Checkbox checkboxSize="default" checkboxLabel="Default Checkbox" checkboxDefaultChecked />
      <Checkbox checkboxSize="lg" checkboxLabel="Large Checkbox" checkboxDefaultChecked />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox checkboxSize="sm" checkboxLabel="Small Checkbox" checkboxDefaultChecked />
            <Checkbox checkboxSize="default" checkboxLabel="Default Checkbox" checkboxDefaultChecked />
            <Checkbox checkboxSize="lg" checkboxLabel="Large Checkbox" checkboxDefaultChecked />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use disabled states and validation checks."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox checkboxDisabled checkboxLabel="Disabled Checkbox" />
      <Checkbox checkboxDisabled checkboxDefaultChecked checkboxLabel="Disabled Checked" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox checkboxDisabled checkboxLabel="Disabled Checkbox" />
            <Checkbox checkboxDisabled checkboxDefaultChecked checkboxLabel="Disabled Checked" />
          </div>
        </Showcase>

        <Showcase
          title="With Description"
          description="Add descriptive text below the checkbox label."
          code={`import { Checkbox } from '@unbrn/ui/Checkbox';

export default function Example() {
  return (
    <Checkbox
      checkboxLabel="Notifications"
      checkboxDescription="Receive email updates about your account activity and security."
      checkboxDefaultChecked
    />
  );
}`}
        >
          <Checkbox
            checkboxLabel="Notifications"
            checkboxDescription="Receive email updates about your account activity and security."
            checkboxDefaultChecked
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
      checkboxLabel="Privacy Policy"
      checkboxOnChange={(e) => setChecked(e.target.checked)}
      checkboxChecked={checked}
      checkboxError={checked ? undefined : "You must agree to the privacy policy."}
    />
  );
}`}
        >
          <Checkbox
            checkboxLabel="Privacy Policy"
            checkboxOnChange={(e) => setChecked(e.target.checked)}
            checkboxChecked={checked}
            checkboxError={checked ? undefined : "You must agree to the privacy policy."}
          />
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'checkboxLabel', type: 'ReactNode', description: 'Text shown next to the checkbox.' },
          { name: 'checkboxDescription', type: 'ReactNode', description: 'Helpful description text shown below the label.' },
          { name: 'checkboxError', type: 'string', description: 'Error message to show under the checkbox.' },
          { name: 'checkboxVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the checkbox.' },
          { name: 'checkboxSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the checkbox.' },
          { name: 'checkboxAccentColor', type: 'string', description: 'Custom accent color for borders and checked background.' },
          { name: 'checkboxChecked', type: 'boolean', description: 'Set if the checkbox is checked.' },
          { name: 'checkboxDefaultChecked', type: 'boolean', description: 'Set if the checkbox starts as checked.' },
          { name: 'checkboxOnChange', type: '(e: ChangeEvent) => void', description: 'Function called when the checkbox state changes.' },
          { name: 'checkboxDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the checkbox.' },
          { name: 'checkboxId', type: 'string', description: 'Custom ID attribute for the input element.' },
          { name: 'checkboxClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'checkboxStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the checkbox (prefixed with checkbox).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with checkbox).' },
        ]}
        stylingTargets={[
          { name: 'checkboxRoot', description: 'Styles the outer label wrapper container.' },
          { name: 'checkboxContainer', description: 'Styles the wrapper containing the checkbox square.' },
          { name: 'checkboxCheckbox', description: 'Styles the checkbox square itself.' },
          { name: 'checkboxIndicator', description: 'Styles the checkmark SVG indicator inside.' },
          { name: 'checkboxLabel', description: 'Styles the label text element.' },
          { name: 'checkboxDescription', description: 'Styles the subtitle description text.' },
          { name: 'checkboxError', description: 'Styles the error text element.' },
        ]}
        stylingStructure={`checkboxRoot
 ├── checkboxContainer
 │    └── checkboxCheckbox
 │         └── checkboxIndicator
 ├── checkboxLabel
 ├── checkboxDescription
 └── checkboxError`}
      />
    </>
  );
};
