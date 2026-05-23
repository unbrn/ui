import React from 'react';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const ButtonsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Buttons" />

      <Showcase
        title="PREVIEW"
        code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return <Button variant="filled">Get Started</Button>;
}`}
      >
        <Button variant="filled">Get Started</Button>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return <Button>Click me</Button>;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="duo">Duo</Button>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="filled">Filled</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="duo">Duo</Button>
          </div>
        </Showcase>

        <Showcase
          title="SIZES"
          description="Available in small, medium, and large sizes."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </Showcase>

        <Showcase
          title="ICONS"
          description="Add icons on the left or right to make buttons look better."
          code={`import { Button } from '@unburn/ui/Button';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button icon={<ArrowLeft size={16} />}>Back</Button>
      <Button icon={<ArrowRight size={16} />} iconPosition="right">Next</Button>
      <Button icon={<Mail size={16} />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button icon={<ArrowLeft size={16} />}>Back</Button>
            <Button icon={<ArrowRight size={16} />} iconPosition="right">Next</Button>
            <Button icon={<Mail size={16} />} />
          </div>
        </Showcase>

        <Showcase
          title="STATES"
          description="Use loading animations and disabled states for button actions."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button loading>Processing</Button>
      <Button disabled>Not Allowed</Button>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button loading>Processing</Button>
            <Button disabled>Not Allowed</Button>
          </div>
        </Showcase>

        <Showcase
          title="OPACITY LEVELS"
          description="Adjust the background opacity for custom designs."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button opacityLevel="25">Low</Button>
      <Button opacityLevel="50">Medium</Button>
      <Button opacityLevel="100">Full</Button>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button opacityLevel="25">Low</Button>
            <Button opacityLevel="50">Medium</Button>
            <Button opacityLevel="100">Full</Button>
          </div>
        </Showcase>
      </div>


      <Props
        props={[
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the button.' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The button size.' },
          { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Show a loading spinner and turn off button clicks.' },
          { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the button fill the entire width of its box.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown inside the button.' },
          { name: 'iconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Show the icon on the left or right side.' },
          { name: 'opacityLevel', type: "'25' | '50' | '75' | '100'", defaultValue: "'100'", description: 'Set the background opacity level.' },
          { name: 'color', type: 'string', description: 'Custom color theme for the button.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the button.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
