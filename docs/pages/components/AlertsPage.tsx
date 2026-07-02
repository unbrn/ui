import React from 'react';
import { Alert } from '../../../package/components/Alert/Alert';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { CheckCircle2, Info } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Alerts" />

      <Showcase
        title="Preview"
        code={`import { Alert } from '@unbrn/ui/Alert';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <Alert
      title="Update Available"
      icon={<Info size={16} />}
      description="A new version of the library is now available. Please update to get the latest features."
    />
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Alert
            title="Update Available"
            icon={<Info size={16} />}
            description="A new version of the library is now available. Please update to get the latest features."
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Alert } from '@unbrn/ui/Alert';
import { CheckCircle2 } from 'lucide-react';

export default function Example() {
  return (
    <Alert 
      title="Success" 
      description="Your changes have been saved." 
      icon={<CheckCircle2 size={16} />}
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Colors"
          description="Change the look of alerts with colors like green, blue, orange, or red."
          code={`import { Alert } from '@unbrn/ui/Alert';
import { CheckCircle2, Info } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
      <Alert accentColor="green" icon={<CheckCircle2 size={16} />} title="Payment Successful" description="Your transaction has been processed." />
      <Alert accentColor="blue" icon={<Info size={16} />} title="System Info" description="The server is undergoing maintenance." />
      <Alert accentColor="orange" icon={<Info size={16} />} title="Weak Password" description="Consider using a stronger password." />
      <Alert accentColor="red" icon={<Info size={16} />} title="Upload Failed" description="Could not connect to the server." />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <Alert accentColor="green" icon={<CheckCircle2 size={16} />} title="Payment Successful" description="Your transaction has been processed." />
            <Alert accentColor="blue" icon={<Info size={16} />} title="System Info" description="The server is undergoing maintenance." />
            <Alert accentColor="orange" icon={<Info size={16} />} title="Weak Password" description="Consider using a stronger password." />
            <Alert accentColor="red" icon={<Info size={16} />} title="Upload Failed" description="Could not connect to the server." />
          </div>
        </Showcase>

        <Showcase
          title="Variants"
          description="Choose from three styles: outlined, duo, and filled."
          code={`import { Alert } from '@unbrn/ui/Alert';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
      <Alert variant="outlined" icon={<Info size={16} />} title="Outlined Variant" description="The default clean look." />
      <Alert variant="duo" icon={<Info size={16} />} title="Duo Variant" description="A softer, tinted background look." />
      <Alert variant="filled" icon={<Info size={16} />} title="Filled Variant" description="A bold, solid background look." />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <Alert variant="outlined" icon={<Info size={16} />} title="Outlined Variant" description="The default clean look." />
            <Alert variant="duo" icon={<Info size={16} />} title="Duo Variant" description="A softer, tinted background look." />
            <Alert variant="filled" icon={<Info size={16} />} title="Filled Variant" description="A bold, solid background look." />
          </div>
        </Showcase>

        <Showcase
          title="With Actions"
          description="Add action buttons directly into your alerts."
          code={`import { Alert } from '@unbrn/ui/Alert';
import { Button } from '@unbrn/ui/Button';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <Alert
      icon={<Info size={16} />}
      title="New feature available"
      description="We've added dark mode support. Check it out now."
      accentColor="blue"
      variant="duo"
      actions={
        <>
          <Button size={1} accentColor="blue" children="Check Out" />
          <Button variant="outlined" accentColor="red" size={1} children="Cancel" />
        </>
      }
    />
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Alert
              icon={<Info size={16} />}
              title="New feature available"
              description="We've added dark mode support. Check it out now."
              accentColor='blue'
              variant='outlined'
              actions={
                <>
                  <Button size={1} accentColor='blue' children="Check Out" />
                  <Button variant="outlined" accentColor="red" size={1} children="Cancel" />
                </>
              }
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'title', type: 'string', required: true, description: 'The header text of the alert.' },
          { name: 'accentColor', type: 'string', description: 'Custom color theme for the banner.' },
          { name: 'variant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'filled'", description: 'The style variant of the alert.' },
          { name: 'description', type: 'ReactNode', description: 'The message details shown inside the alert.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown next to the title.' },
          { name: 'actions', type: 'ReactNode', description: 'Buttons or links for user actions.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: '', type: 'ReactNode', description: 'Children elements rendered inside the alert container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the alert.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer wrapper of the alert container.' },
          { name: 'icon', description: 'Styles the leading icon container.' },
          { name: 'title', description: 'Styles the main title text.' },
          { name: 'description', description: 'Styles the body/description text.' },
          { name: 'actions', description: 'Styles the action buttons container.' },
        ]}
        stylingStructure={`root
 ├── icon
 ├── title
 ├── description
 └── actions`}
      />
    </>
  );
};
