import React, { useState } from 'react';
import { Input } from '../../../package/components/Input/Input';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Mail, Lock, User, Search } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

const InteractiveProgressiveInput = () => {
  const [password, setPassword] = useState('');

  const getProgress = (val: string): 0 | 1 | 2 | 3 => {
    if (!val) return 0;
    if (val.length < 5) return 1;
    if (val.length < 8) return 2;
    return 3;
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        inputLabel="Interactive Password"
        inputType="password"
        inputValue={password}
        inputOnChange={(e) => setPassword(e.target.value)}
        inputProgressLevel={getProgress(password)}
        inputPlaceholder="Type to see progress..."
      />
    </div>
  );
};

export const InputsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Inputs" />

      <Showcase
        title="Preview"
        code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input inputLabel="Email" inputPlaceholder="you@example.com" />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Input inputLabel="Email" inputPlaceholder="you@example.com" />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return <Input inputLabel="Username" inputPlaceholder="Enter your name" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <Input inputVariant="filled" inputPlaceholder="Filled (Default)" />
      <Input inputVariant="outlined" inputPlaceholder="Outlined variant" />
      <Input inputVariant="duo" inputPlaceholder="Duo variant" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <Input inputVariant="filled" inputPlaceholder="Filled (Default)" />
            <Input inputVariant="outlined" inputPlaceholder="Outlined variant" />
            <Input inputVariant="duo" inputPlaceholder="Duo variant" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from small, medium, or large sizes."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
      <Input inputSize="sm" inputPlaceholder="Small input" />
      <Input inputSize="default" inputPlaceholder="Default input" />
      <Input inputSize="lg" inputPlaceholder="Large input" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
            <Input inputSize="sm" inputPlaceholder="Small input" />
            <Input inputSize="default" inputPlaceholder="Default input" />
            <Input inputSize="lg" inputPlaceholder="Large input" />
          </div>
        </Showcase>

        <Showcase
          title="Icons"
          description="Add icons on the left or right side of the input field."
          code={`import { Input } from '@unbrn/ui/Input';
import { User, Mail, Lock } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <Input
        inputLeftIcon={<User size={16} />}
        inputPlaceholder="Username"
      />
      <Input
        inputLeftIcon={<Mail size={16} />}
        inputRightIcon={<Lock size={16} />}
        inputPlaceholder="Email with dual icons"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <Input
              inputLeftIcon={<User size={16} />}
              inputPlaceholder="Username"
            />
            <Input
              inputLeftIcon={<Mail size={16} />}
              inputRightIcon={<Lock size={16} />}
              inputPlaceholder="Email with dual icons"
            />
          </div>
        </Showcase>

        <Showcase
          title="Keyboard Shortcut"
          description="Display a keyboard shortcut helper (KBD) inside the input field."
          code={`import { Input } from '@unbrn/ui/Input';
import { Search } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <Input
        inputLeftIcon={<Search size={16} />}
        inputKbd="⌘K"
        inputPlaceholder="Search documentation..."
      />
      <Input
        inputKbd="Ctrl+/"
        inputPlaceholder="Open command menu"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <Input
              inputLeftIcon={<Search size={16} />}
              inputKbd="⌘K"
              inputPlaceholder="Search documentation..."
            />
            <Input
              inputKbd="Ctrl+/"
              inputPlaceholder="Open command menu"
            />
          </div>
        </Showcase>

        <Showcase
          title="Progressive Input"
          description="Show a password strength bar under the field."
          code={`import { Input } from '@unbrn/ui/Input';
import { useState } from 'react';

export default function Example() {
  const [password, setPassword] = useState('');
  
  const getProgress = (val: string) => {
    if (!val) return 0;
    if (val.length < 5) return 1;
    if (val.length < 8) return 2;
    return 3;
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input 
        inputLabel="Interactive Password" 
        inputType="password" 
        inputValue={password}
        inputOnChange={(e) => setPassword(e.target.value)}
        inputProgressLevel={getProgress(password)}
        inputPlaceholder="Type to see progress..."
      />
    </div>
  );
}`}
        >
          <InteractiveProgressiveInput />
        </Showcase>

        <Showcase
          title="States"
          description="Use error messages and disabled inputs for forms."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <Input
        inputLabel="Error State"
        inputError="Password must be at least 8 characters."
        inputPlaceholder="Enter your password"
        inputType="password"
      />
      <Input
        inputLabel="Disabled"
        inputDisabled
        inputPlaceholder="Disabled input"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <Input
              inputLabel="Error State"
              inputError="Password must be at least 8 characters."
              inputPlaceholder="Enter your password"
              inputType="password"
            />
            <Input
              inputLabel="Disabled"
              inputDisabled
              inputPlaceholder="Disabled input"
            />
          </div>
        </Showcase>

        <Showcase
          title="Accent Color"
          description="Apply a custom accent color to the border, focus ring, icons, and keyboard shortcuts using inputAccentColor."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <Input inputVariant="duo" inputAccentColor="#10b981" inputPlaceholder="Purple duo input" />
      <Input inputVariant="outlined" inputAccentColor="#10b981" inputPlaceholder="Sky Blue outlined input" />
      <Input inputVariant="filled" inputAccentColor="#10b981" inputPlaceholder="Emerald filled input" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <Input inputVariant="duo" inputAccentColor="#10b981" inputPlaceholder="Purple duo input" />
            <Input inputVariant="outlined" inputAccentColor="#10b981" inputPlaceholder="Sky Blue outlined input" />
            <Input inputVariant="filled" inputAccentColor="#10b981" inputPlaceholder="Emerald filled input" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'inputLabel', type: 'ReactNode', description: 'Text label shown above the input box.' },
          { name: 'inputDescription', type: 'ReactNode', description: 'Helpful detail text shown below the input.' },
          { name: 'inputError', type: 'string', description: 'Error message to show under the input field.' },
          { name: 'inputVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the input.' },
          { name: 'inputSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the input field.' },
          { name: 'inputLeftIcon', type: 'ReactNode', description: 'An icon shown on the left side.' },
          { name: 'inputRightIcon', type: 'ReactNode', description: 'An icon shown on the right side.' },
          { name: 'inputKbd', type: 'string', description: 'Keyboard shortcut indicator shown inside the right edge of the input.' },
          { name: 'inputFullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the input fill the full width of its box.' },
          { name: 'inputProgressLevel', type: '0 | 1 | 2 | 3', description: 'Strength bar level (from 0 to 3).' },
          { name: 'inputClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'inputStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'inputDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks and inputs.' },
          { name: 'inputId', type: 'string', description: 'Custom id attribute.' },
          { name: 'inputValue', type: 'string', description: 'Controlled value.' },
          { name: 'inputDefaultValue', type: 'string', description: 'Uncontrolled default value.' },
          { name: 'inputOnChange', type: 'function', description: 'Change event handler.' },
          { name: 'inputPlaceholder', type: 'string', description: 'Placeholder text.' },
          { name: 'inputType', type: 'string', defaultValue: "'text'", description: 'HTML input type attribute.' },
          { name: 'inputReadOnly', type: 'boolean', defaultValue: 'false', description: 'Prevent changing the value of the input.' },
          { name: 'inputAccentColor', type: 'string', description: 'Custom primary accent color for active highlight styling overrides (hex, rgb, etc.).' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the input (prefixed with input).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with input).' },
        ]}
        stylingTargets={[
          { name: 'inputRoot', description: 'Styles the outer input wrapper container.' },
          { name: 'inputContainer', description: 'Styles the input field outer container box.' },
          { name: 'inputElement', description: 'Styles the actual HTML input element.' },
          { name: 'inputLabel', description: 'Styles the label text element.' },
          { name: 'inputDescription', description: 'Styles the description text element.' },
          { name: 'inputError', description: 'Styles the error message text element.' },
          { name: 'inputIcon', description: 'Styles the icon wrapper elements (left or right).' },
          { name: 'inputProgressContainer', description: 'Styles the password strength bar container.' },
          { name: 'inputProgressBar', description: 'Styles the password strength indicator line.' },
        ]}
        stylingStructure={`inputRoot
 ├── inputLabel
 ├── inputContainer
 │    ├── inputIcon
 │    └── inputElement
 ├── inputProgressContainer
 │    └── inputProgressBar
 ├── inputDescription
 └── inputError`}
      />
    </>
  );
};

