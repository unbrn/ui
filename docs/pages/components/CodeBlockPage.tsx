import React from 'react';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const CodeBlockPage: React.FC = () => {
  const code = `import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, Unburn UI!</h1>;
};

export default HelloWorld;`;

  return (
    <>
      <ComponentHeader title="Code Block" />

      <Showcase
        title="Preview"
        code={`import { CodeBlock } from '@unburn/ui/CodeBlock';

const code = \`import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, Unburn UI!</h1>;
};

export default HelloWorld;\`;

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        codeBlockCode={code}
        codeBlockLanguage="tsx"
        codeBlockTitle="App.tsx"
      />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <CodeBlock
            codeBlockCode={code}
            codeBlockLanguage="tsx"
            codeBlockTitle="App.tsx"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { CodeBlock } from '@unburn/ui/CodeBlock';

export default function Example() {
  return (
    <CodeBlock 
      codeBlockCode="const x = 10;" 
      codeBlockLanguage="javascript" 
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose between two styles: filled and outlined."
          code={`import { CodeBlock } from '@unburn/ui/CodeBlock';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        codeBlockCode="npm install @unburn/ui"
        codeBlockLanguage="bash"
        codeBlockVariant="filled"
        codeBlockTitle="Filled (Default)"
      />
      <CodeBlock
        codeBlockCode="npm install @unburn/ui"
        codeBlockLanguage="bash"
        codeBlockVariant="outlined"
        codeBlockTitle="Outlined Variant"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '600px' }}>
            <CodeBlock
              codeBlockCode="npm install @unburn/ui"
              codeBlockLanguage="bash"
              codeBlockVariant="filled"
              codeBlockTitle="Filled (Default)"
            />
            <CodeBlock
              codeBlockCode="npm install @unburn/ui"
              codeBlockLanguage="bash"
              codeBlockVariant="outlined"
              codeBlockTitle="Outlined Variant"
            />
          </div>
        </Showcase>

        <Showcase
          title="Tabs (Package Managers)"
          description="Display multiple snippets under tabs for easy switching."
          code={`import { CodeBlock } from '@unburn/ui/CodeBlock';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        codeBlockTabs={{
          npm: 'npm install @unburn/ui',
          pnpm: 'pnpm add @unburn/ui',
          yarn: 'yarn add @unburn/ui',
          bun: 'bun add @unburn/ui'
        }}
        codeBlockDefaultTab="pnpm"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <CodeBlock
              codeBlockTabs={{
                npm: 'npm install @unburn/ui',
                pnpm: 'pnpm add @unburn/ui',
                yarn: 'yarn add @unburn/ui',
                bun: 'bun add @unburn/ui'
              }}
              codeBlockDefaultTab="pnpm"
            />
          </div>
        </Showcase>

        <Showcase
          title="Title & No Line Numbers"
          description="Show a file title header and hide line numbers if needed."
          code={`import { CodeBlock } from '@unburn/ui/CodeBlock';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        codeBlockCode={\`export const add = (a: number, b: number) => a + b;\`}
        codeBlockTitle="utils.ts"
        codeBlockShowLineNumbers={false}
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <CodeBlock
              codeBlockCode={`export const add = (a: number, b: number) => a + b;`}
              codeBlockTitle="utils.ts"
              codeBlockShowLineNumbers={false}
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'codeBlockCode', type: 'string', description: 'The code text to display in the block.' },
          { name: 'codeBlockTabs', type: 'Record<string, string>', description: 'A list of tabs with their respective code snippets.' },
          { name: 'codeBlockDefaultTab', type: 'string', description: 'The tab that starts active.' },
          { name: 'codeBlockLanguage', type: 'string', defaultValue: "'tsx'", description: 'The code language (e.g., tsx, javascript, css).' },
          { name: 'codeBlockTitle', type: 'string', description: 'A file name or label to show in the code block header.' },
          { name: 'codeBlockVariant', type: "'filled' | 'outlined'", defaultValue: "'filled'", description: 'The style of the code block.' },
          { name: 'codeBlockShowLineNumbers', type: 'boolean', defaultValue: 'true', description: 'Show or hide line numbers.' },
          { name: 'codeBlockClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'codeBlockStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the block (prefixed with codeBlock).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with codeBlock).' },
        ]}
        stylingTargets={[
          { name: 'codeBlockRoot', description: 'Styles the outer code block wrapper container.' },
          { name: 'codeBlockHeader', description: 'Styles the top header bar.' },
          { name: 'codeBlockContent', description: 'Styles the pre/code container area.' },
          { name: 'codeBlockCopyButton', description: 'Styles the action copy button in the header.' },
          { name: 'codeBlockTitle', description: 'Styles the title text in the header.' },
          { name: 'codeBlockLang', description: 'Styles the language indicator tag in the header.' },
          { name: 'codeBlockTabs', description: 'Styles the tab bar wrapper (tab variant).' },
          { name: 'codeBlockTab', description: 'Styles individual tab buttons.' },
        ]}
        stylingStructure={`codeBlockRoot
 ├── codeBlockHeader
 │    ├── codeBlockTitle
 │    ├── codeBlockTabs
 │    │    └── codeBlockTab
 │    ├── codeBlockLang
 │    └── codeBlockCopyButton
 └── codeBlockContent`}
      />
    </>
  );
};
