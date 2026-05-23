import React, { useState } from 'react';
import { Input } from '../../../package/components/Input/Input';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Mail, Lock, User } from 'lucide-react';
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
        label="Interactive Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        progressLevel={getProgress(password)}
        placeholder="Type to see progress..."
      />
    </div>
  );
};

export const InputsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Inputs" />

      <Showcase
        title="PREVIEW"
        code={`import { Input } from '@unburn/ui/Input';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input label="Email" placeholder="you@example.com" />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Input label="Email" placeholder="you@example.com" />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@unburn/ui/Input';

export default function Example() {
  return <Input label="Username" placeholder="Enter your name" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Input } from '@unburn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <Input variant="filled" placeholder="Filled (Default)" />
      <Input variant="outlined" placeholder="Outlined variant" />
      <Input variant="duo" placeholder="Duo variant" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <Input variant="filled" placeholder="Filled (Default)" />
            <Input variant="outlined" placeholder="Outlined variant" />
            <Input variant="duo" placeholder="Duo variant" />
          </div>
        </Showcase>

        <Showcase
          title="SIZES"
          description="Choose from small, medium, or large sizes."
          code={`import { Input } from '@unburn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="default" placeholder="Default input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
            <Input size="sm" placeholder="Small input" />
            <Input size="default" placeholder="Default input" />
            <Input size="lg" placeholder="Large input" />
          </div>
        </Showcase>

        <Showcase
          title="ICONS"
          description="Add icons on the left or right side of the input field."
          code={`import { Input } from '@unburn/ui/Input';
import { User, Mail, Lock } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
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
          title="PROGRESSIVE INPUT"
          description="Show a password strength bar under the field."
          code={`import { Input } from '@unburn/ui/Input';
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
        label="Interactive Password" 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        progressLevel={getProgress(password)}
        placeholder="Type to see progress..."
      />
    </div>
  );
}`}
        >
          <InteractiveProgressiveInput />
        </Showcase>

        <Showcase
          title="STATES"
          description="Use error messages and disabled inputs for forms."
          code={`import { Input } from '@unburn/ui/Input';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
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
      </div>

      <Props
        props={[
          { name: 'label', type: 'ReactNode', description: 'Text label shown above the input box.' },
          { name: 'description', type: 'ReactNode', description: 'Helpful detail text shown below the input.' },
          { name: 'error', type: 'string', description: 'Error message to show under the input field.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the input.' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the input field.' },
          { name: 'leftIcon', type: 'ReactNode', description: 'An icon shown on the left side.' },
          { name: 'rightIcon', type: 'ReactNode', description: 'An icon shown on the right side.' },
          { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the input fill the full width of its box.' },
          { name: 'progressLevel', type: '0 | 1 | 2 | 3', description: 'Strength bar level (from 0 to 3).' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the input.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
