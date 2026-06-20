import React from 'react';
import { Steps } from '../../../package/components/Steps/Steps';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const StepsPage: React.FC = () => {
  const basicItems = [
    { stepTitle: 'Initialize Workspace' },
    { stepTitle: 'Install Dependencies' },
    { stepTitle: 'Start Dev Server' }
  ];

  const descriptiveItems = [
    {
      stepTitle: 'Initialize Workspace',
      stepDescription: 'Run `npm init` or setup using a starter kit to get core layout folders ready.'
    },
    {
      stepTitle: 'Install Dependencies',
      stepDescription: 'Run `npm i @unbrn/ui lucide-react` to get packages.'
    },
    {
      stepTitle: 'Start Dev Server',
      stepDescription: 'Launch environment with `npm run dev` to start hot-module reloading and previews.'
    }
  ];

  const customItems = [
    {
      stepTitle: 'Choose Auth Strategy',
      stepDescription: 'Select authentication method that fits your app security model.',
      stepChildren: (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <Button buttonSize="sm" buttonVariant="filled" buttonChildren="OAuth2 Login" />
          <Button buttonSize="sm" buttonVariant="outlined" buttonChildren="Passwordless Magic Link" />
        </div>
      )
    },
    {
      stepTitle: 'Setup Database Hooks',
      stepDescription: 'Configure relational schema and triggers to store credentials.',
      stepChildren: (
        <div style={{ marginTop: '0.5rem', width: '100%', maxWidth: '500px' }}>
          <CodeBlock
            codeBlockLanguage="sql"
            codeBlockCode={`CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL
);`}
          />
        </div>
      )
    }
  ];

  return (
    <>
      <ComponentHeader title="Steps" />

      <Showcase
        title="Preview"
        code={`import { Steps } from '@unbrn/ui/Steps';

export default function Example() {
  const steps = [
    { stepTitle: 'Initialize Workspace' },
    { stepTitle: 'Install Dependencies' },
    { stepTitle: 'Start Dev Server' }
  ];

  return <Steps stepsItems={steps} />;
}`}
      >
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Steps stepsItems={basicItems} />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Steps } from '@unbrn/ui/Steps';

export default function Example() {
  return (
    <Steps
      stepsItems={[
        { stepTitle: 'Step One', stepDescription: 'Begin instructions here.' },
        { stepTitle: 'Step Two', stepDescription: 'Follow up details.' }
      ]}
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="With Descriptions"
          description="Include secondary sub-labels to guide users through each step detail."
          code={`import { Steps } from '@unbrn/ui/Steps';

export default function Example() {
  const steps = [
    { 
      stepTitle: 'Initialize Workspace', 
      stepDescription: 'Run \`npm init\` or setup using a starter kit to get core layout folders ready.' 
    },
    { 
      stepTitle: 'Install Dependencies', 
      stepDescription: 'Run \`npm i @unbrn/ui lucide-react\` to get packages.' 
    },
    { 
      stepTitle: 'Start Dev Server', 
      stepDescription: 'Launch environment with \`npm run dev\` to start hot-module reloading and previews.' 
    }
  ];

  return <Steps stepsItems={steps} />;
}`}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Steps stepsItems={descriptiveItems} />
          </div>
        </Showcase>

        <Showcase
          title="With Custom Children"
          description="You can inject interactive react child nodes such as buttons or custom components inside a step."
          code={`import { Steps } from '@unbrn/ui/Steps';
import { Button } from '@unbrn/ui/Button';
import { CodeBlock } from '@unbrn/ui/CodeBlock';

export default function Example() {
  const steps = [
    {
      stepTitle: 'Choose Auth Strategy',
      stepDescription: 'Select authentication method that fits your app security model.',
      stepChildren: (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <Button buttonSize="sm" buttonVariant="filled" buttonChildren="OAuth2 Login" />
          <Button buttonSize="sm" buttonVariant="outlined" buttonChildren="Passwordless Magic Link" />
        </div>
      )
    },
    {
      stepTitle: 'Setup Database Hooks',
      stepDescription: 'Configure relational schema and triggers to store credentials.',
      stepChildren: (
        <div style={{ marginTop: '0.5rem', width: '100%', maxWidth: '500px' }}>
          <CodeBlock 
            codeBlockLanguage="sql" 
            codeBlockCode={\`CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL
);\`} 
          />
        </div>
      )
    }
  ];

  return <Steps stepsItems={steps} />;
}`}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Steps stepsItems={customItems} />
          </div>
        </Showcase>
      </div>

      <Props
        title="Steps Props"
        props={[
          { name: 'stepsItems', type: 'StepItem[]', description: 'Array of step descriptor objects representing steps to render.' },
          { name: 'stepsChildren', type: 'ReactNode', description: 'Custom children elements to render directly if stepsItems is not provided.' },
          { name: 'stepsClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'stepsStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for individual sub-nodes (stepsRoot, stepsStep, stepsMarker, stepsConnector, stepsTitle, stepsDescription).' },
          { name: 'styles', type: 'object', description: 'Custom inline styling properties for sub-nodes (stepsRoot, stepsStep, stepsMarker, stepsConnector, stepsTitle, stepsDescription).' },
        ]}
        stylingTargets={[
          { name: 'stepsRoot', description: 'Styles the outer container of the steps stepper list.' },
          { name: 'stepsStep', description: 'Styles each step item row container.' },
          { name: 'stepsMarker', description: 'Styles the circular step indicator bubble/number.' },
          { name: 'stepsConnector', description: 'Styles the vertical connector lines linking steps.' },
          { name: 'stepsTitle', description: 'Styles the step title text.' },
          { name: 'stepsDescription', description: 'Styles the step description text.' },
        ]}
        stylingStructure={`stepsRoot
 └── stepsStep
      ├── stepsMarker
      ├── stepsConnector
      ├── stepsTitle
      └── stepsDescription`}
      />

      <Props
        title="StepItem Props"
        props={[
          { name: 'stepTitle', type: 'string', required: true, description: 'Main text heading of the step.' },
          { name: 'stepDescription', type: 'string', description: 'Helper descriptor label shown below heading.' },
          { name: 'stepChildren', type: 'ReactNode', description: 'Custom interactive React elements injected below description.' },
        ]}
      />
    </>
  );
};
