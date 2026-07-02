import React from 'react';
import { Input } from '../../../package/components/Input/Input';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Mail, Lock, User, Search } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

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
      <Input label="Email" placeholder="you@example.com" />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <Input label="Email" placeholder="you@example.com" />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return <Input label="Username" placeholder="Enter your name" />;
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Input variant="filled" placeholder="Filled (Default)" />
      <Input variant="outlined" placeholder="Outlined variant" />
      <Input variant="duo" placeholder="Duo variant" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '300px' }}>
            <Input variant="filled" placeholder="Filled (Default)" />
            <Input variant="outlined" placeholder="Outlined variant" />
            <Input variant="duo" placeholder="Duo variant" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from default or large sizes."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <Input size={2} placeholder="Default input" />
      <Input size={3} placeholder="Large input" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
            <Input size={2} placeholder="Default input" />
            <Input size={3} placeholder="Large input" />
          </div>
        </Showcase>

        <Showcase
          title="Icons"
          description="Add icons on the left or right side of the input field."
          code={`import { Input } from '@unbrn/ui/Input';
import { User, Mail, Lock } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Input
        leftIcon={<User size={16} />}
        placeholder="Username"
      />
      <Input
        leftIcon={<Mail size={16} />}
        rightIcon={<Lock size={16} />}
        placeholder="Email with dual icons"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '300px' }}>
            <Input
              leftIcon={<User size={16} />}
              placeholder="Username"
            />
            <Input
              leftIcon={<Mail size={16} />}
              rightIcon={<Lock size={16} />}
              placeholder="Email with dual icons"
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Input
        leftIcon={<Search size={16} />}
        kbd="✱ K"
        placeholder="Search documentation..."
      />
      <Input
        kbd="Ctrl+/"
        placeholder="Open command menu"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '300px' }}>
            <Input
              leftIcon={<Search size={16} />}
              kbd="✱ K"
              placeholder="Search documentation..."
            />
            <Input
              kbd="Ctrl+/"
              placeholder="Open command menu"
            />
          </div>
        </Showcase>


        <Showcase
          title="States"
          description="Use error messages and disabled inputs for forms."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Input
        label="Error State"
        error="Password must be at least 8 characters."
        placeholder="Enter your password"
        type="password"
      />
      <Input
        label="Disabled"
        disabled
        placeholder="Disabled input"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '300px' }}>
            <Input
              label="Error State"
              error="Password must be at least 8 characters."
              placeholder="Enter your password"
              type="password"
            />
            <Input
              label="Disabled"
              disabled
              placeholder="Disabled input"
            />
          </div>
        </Showcase>

        <Showcase
          title="Accent Color"
          description="Apply a custom accent color to the border, focus ring, icons, and keyboard shortcuts using accentColor."
          code={`import { Input } from '@unbrn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Input variant="duo" accentColor="#10b981" placeholder="Purple duo input" />
      <Input variant="outlined" accentColor="#10b981" placeholder="Sky Blue outlined input" />
      <Input variant="filled" accentColor="#10b981" placeholder="Emerald filled input" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '300px' }}>
            <Input variant="duo" accentColor="#10b981" placeholder="Purple duo input" />
            <Input variant="outlined" accentColor="#10b981" placeholder="Sky Blue outlined input" />
            <Input variant="filled" accentColor="#10b981" placeholder="Emerald filled input" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'label', type: 'ReactNode', description: 'Text label shown above the input box.' },
          { name: 'description', type: 'ReactNode', description: 'Helpful detail text shown below the input.' },
          { name: 'error', type: 'string', description: 'Error message to show under the input field.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the input.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'The size of the input field.' },
          { name: 'leftIcon', type: 'ReactNode', description: 'An icon shown on the left side.' },
          { name: 'rightIcon', type: 'ReactNode', description: 'An icon shown on the right side.' },
          { name: 'kbd', type: 'string', description: 'Keyboard shortcut indicator shown inside the right edge of the input.' },
          { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the input fill the full width of its box.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks and inputs.' },
          { name: 'id', type: 'string', description: 'Custom id attribute.' },
          { name: 'value', type: 'string', description: 'Controlled value.' },
          { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value.' },
          { name: 'onChange', type: 'function', description: 'Change event handler.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
          { name: 'type', type: 'string', defaultValue: "'text'", description: 'HTML input type attribute.' },
          { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: 'Prevent changing the value of the input.' },
          { name: 'accentColor', type: 'string', description: 'Custom primary accent color for active highlight styling overrides (hex, rgb, etc.).' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the input (prefixed with input).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with input).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer input wrapper container.' },
          { name: 'container', description: 'Styles the input field outer container box.' },
          { name: 'element', description: 'Styles the actual HTML input element.' },
          { name: 'label', description: 'Styles the label text element.' },
          { name: 'description', description: 'Styles the description text element.' },
          { name: 'error', description: 'Styles the error message text element.' },
          { name: 'icon', description: 'Styles the icon wrapper elements (left or right).' },
        ]}
        stylingStructure={`root
 ├── label
 ├── container
 │    ├── icon
 │    └── element
 ├── description
 └── error`}
      />
    </>
  );
};

