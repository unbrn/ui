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
        code={`import { Alert } from '@unburn/ui/Alert';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <Alert
      alertTitle="Update Available"
      alertIcon={<Info size={16} />}
      alertDescription="A new version of the library is now available. Please update to get the latest features."
    />
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Alert
            alertTitle="Update Available"
            alertIcon={<Info size={16} />}
            alertDescription="A new version of the library is now available. Please update to get the latest features."
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Alert } from '@unburn/ui/Alert';
import { CheckCircle2 } from 'lucide-react';

export default function Example() {
  return (
    <Alert 
      alertTitle="Success" 
      alertDescription="Your changes have been saved." 
      alertIcon={<CheckCircle2 size={16} />}
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
          code={`import { Alert } from '@unburn/ui/Alert';
import { CheckCircle2, Info } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
      <Alert alertAccentColor="green" alertIcon={<CheckCircle2 size={16} />} alertTitle="Payment Successful" alertDescription="Your transaction has been processed." />
      <Alert alertAccentColor="blue" alertIcon={<Info size={16} />} alertTitle="System Info" alertDescription="The server is undergoing maintenance." />
      <Alert alertAccentColor="orange" alertIcon={<Info size={16} />} alertTitle="Weak Password" alertDescription="Consider using a stronger password." />
      <Alert alertAccentColor="red" alertIcon={<Info size={16} />} alertTitle="Upload Failed" alertDescription="Could not connect to the server." />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <Alert alertAccentColor="green" alertIcon={<CheckCircle2 size={16} />} alertTitle="Payment Successful" alertDescription="Your transaction has been processed." />
            <Alert alertAccentColor="blue" alertIcon={<Info size={16} />} alertTitle="System Info" alertDescription="The server is undergoing maintenance." />
            <Alert alertAccentColor="orange" alertIcon={<Info size={16} />} alertTitle="Weak Password" alertDescription="Consider using a stronger password." />
            <Alert alertAccentColor="red" alertIcon={<Info size={16} />} alertTitle="Upload Failed" alertDescription="Could not connect to the server." />
          </div>
        </Showcase>

        <Showcase
          title="Variants"
          description="Choose from three styles: outlined, duo, and filled."
          code={`import { Alert } from '@unburn/ui/Alert';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
      <Alert alertVariant="outlined" alertIcon={<Info size={16} />} alertTitle="Outlined Variant" alertDescription="The default clean look." />
      <Alert alertVariant="duo" alertIcon={<Info size={16} />} alertTitle="Duo Variant" alertDescription="A softer, tinted background look." />
      <Alert alertVariant="filled" alertIcon={<Info size={16} />} alertTitle="Filled Variant" alertDescription="A bold, solid background look." />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <Alert alertVariant="outlined" alertIcon={<Info size={16} />} alertTitle="Outlined Variant" alertDescription="The default clean look." />
            <Alert alertVariant="duo" alertIcon={<Info size={16} />} alertTitle="Duo Variant" alertDescription="A softer, tinted background look." />
            <Alert alertVariant="filled" alertIcon={<Info size={16} />} alertTitle="Filled Variant" alertDescription="A bold, solid background look." />
          </div>
        </Showcase>

        <Showcase
          title="With Actions"
          description="Add action buttons directly into your alerts."
          code={`import { Alert } from '@unburn/ui/Alert';
import { Button } from '@unburn/ui/Button';
import { Info } from 'lucide-react';

export default function Example() {
  return (
    <Alert
      alertIcon={<Info size={16} />}
      alertTitle="New feature available"
      alertDescription="We've added dark mode support. Check it out now."
      alertAccentColor="blue"
      alertVariant="duo"
      alertActions={
        <>
          <Button buttonSize="sm" buttonAccentColor="blue" buttonChildren="Check Out" />
          <Button buttonVariant="outlined" buttonAccentColor="red" buttonSize="sm" buttonChildren="Cancel" />
        </>
      }
    />
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Alert
              alertIcon={<Info size={16} />}
              alertTitle="New feature available"
              alertDescription="We've added dark mode support. Check it out now."
              alertAccentColor='blue'
              alertVariant='outlined'
              alertActions={
                <>
                  <Button buttonSize='sm' buttonAccentColor='blue' buttonChildren="Check Out" />
                  <Button buttonVariant="outlined" buttonAccentColor="red" buttonSize='sm' buttonChildren="Cancel" />
                </>
              }
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'alertTitle', type: 'string', required: true, description: 'The header text of the alert.' },
          { name: 'alertAccentColor', type: 'string', description: 'Custom color theme for the banner.' },
          { name: 'alertVariant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'filled'", description: 'The style variant of the alert.' },
          { name: 'alertDescription', type: 'ReactNode', description: 'The message details shown inside the alert.' },
          { name: 'alertIcon', type: 'ReactNode', description: 'An icon shown next to the title.' },
          { name: 'alertActions', type: 'ReactNode', description: 'Buttons or links for user actions.' },
          { name: 'alertClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'alertStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'alertChildren', type: 'ReactNode', description: 'Children elements rendered inside the alert container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the alert.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'alertRoot', description: 'Styles the outer wrapper of the alert container.' },
          { name: 'alertIcon', description: 'Styles the leading icon container.' },
          { name: 'alertTitle', description: 'Styles the main title text.' },
          { name: 'alertDescription', description: 'Styles the body/description text.' },
          { name: 'alertActions', description: 'Styles the action buttons container.' },
        ]}
        stylingStructure={`alertRoot
 ├── alertIcon
 ├── alertTitle
 ├── alertDescription
 └── alertActions`}
      />
    </>
  );
};
