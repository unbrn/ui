import React from 'react';
import { Alert } from '../../../package/components/Alert/Alert';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { CheckCircle2, Info } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const AlertsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Alerts" />

      <Showcase
        title="PREVIEW"
        code={`import { Alert } from '@unburn/ui/Alert';
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
          code={`import { Alert } from '@unburn/ui/Alert';
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
          title="COLORS"
          description="Change the look of alerts with colors like green, blue, orange, or red."
          code={`import { Alert } from '@unburn/ui/Alert';
import { CheckCircle2, Info } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
      <Alert color="green" icon={<CheckCircle2 size={16} />} title="Payment Successful" description="Your transaction has been processed." />
      <Alert color="blue" icon={<Info size={16} />} title="System Info" description="The server is undergoing maintenance." />
      <Alert color="orange" icon={<Info size={16} />} title="Weak Password" description="Consider using a stronger password." />
      <Alert color="red" icon={<Info size={16} />} title="Upload Failed" description="Could not connect to the server." />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <Alert color="green" icon={<CheckCircle2 size={16} />} title="Payment Successful" description="Your transaction has been processed." />
            <Alert color="blue" icon={<Info size={16} />} title="System Info" description="The server is undergoing maintenance." />
            <Alert color="orange" icon={<Info size={16} />} title="Weak Password" description="Consider using a stronger password." />
            <Alert color="red" icon={<Info size={16} />} title="Upload Failed" description="Could not connect to the server." />
          </div>
        </Showcase>

        <Showcase
          title="VARIANTS"
          description="Choose from three styles: outlined, duo, and filled."
          code={`import { Alert } from '@unburn/ui/Alert';
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
          title="WITH ACTIONS"
          description="Add action buttons directly into your alerts."
          code={`import { Alert } from '@unburn/ui/Alert';
import { Button } from '@unburn/ui/Button';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <Alert
      icon={<Info size={16} />}
      title="New feature available"
      description="We've added dark mode support. Check it out now."
      color="blue"
      variant="duo"
      actions={
        <>
          <Button size="sm" color="blue">Check Out</Button>
          <Button variant="outlined" color="red" size="sm">Cancel</Button>
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
              color='blue'
              variant='duo'
              actions={
                <>
                  <Button size='sm' color='blue'>Check Out</Button>
                  <Button variant="outlined" color="red" size='sm'>Cancel</Button>
                </>
              }
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'title', type: 'string', required: true, description: 'The header text of the alert.' },
          { name: 'color', type: 'string', description: 'Custom color theme for the banner.' },
          { name: 'variant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'outlined'", description: 'The style variant of the alert.' },
          { name: 'description', type: 'ReactNode', description: 'The message details shown inside the alert.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown next to the title.' },
          { name: 'actions', type: 'ReactNode', description: 'Buttons or links for user actions.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the alert.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
