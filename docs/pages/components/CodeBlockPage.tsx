import React from 'react';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const CodeBlockPage: React.FC = () => {
  const code = `import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, Unbrn UI!</h1>;
};

export default HelloWorld;`;

  return (
    <>
      <ComponentHeader title="Code Block" />

      <Showcase
        title="Preview"
        code={`import { CodeBlock } from '@unbrn/ui/CodeBlock';

const code = \`import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, Unbrn UI!</h1>;
};

export default HelloWorld;\`;

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        code={code}
        language="tsx"
        title="App.tsx"
      />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <CodeBlock
            code={code}
            language="tsx"
            title="App.tsx"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { CodeBlock } from '@unbrn/ui/CodeBlock';

export default function Example() {
  return (
    <CodeBlock 
      code="const x = 10;" 
      language="javascript" 
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
          code={`import { CodeBlock } from '@unbrn/ui/CodeBlock';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        code="npm install @unbrn/ui"
        language="bash"
        variant="filled"
        title="Filled (Default)"
      />
      <CodeBlock
        code="npm install @unbrn/ui"
        language="bash"
        variant="outlined"
        title="Outlined Variant"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '600px' }}>
            <CodeBlock
              code="npm install @unbrn/ui"
              language="bash"
              variant="filled"
              title="Filled (Default)"
            />
            <CodeBlock
              code="npm install @unbrn/ui"
              language="bash"
              variant="outlined"
              title="Outlined Variant"
            />
          </div>
        </Showcase>

        <Showcase
          title="Tabs (Package Managers)"
          description="Display multiple snippets under tabs for easy switching."
          code={`import { CodeBlock } from '@unbrn/ui/CodeBlock';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        tabs={{
          npm: 'npm install @unbrn/ui',
          pnpm: 'pnpm add @unbrn/ui',
          yarn: 'yarn add @unbrn/ui',
          bun: 'bun add @unbrn/ui'
        }}
        defaultTab="pnpm"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <CodeBlock
              tabs={{
                npm: 'npm install @unbrn/ui',
                pnpm: 'pnpm add @unbrn/ui',
                yarn: 'yarn add @unbrn/ui',
                bun: 'bun add @unbrn/ui'
              }}
              defaultTab="pnpm"
            />
          </div>
        </Showcase>

        <Showcase
          title="Title & No Line Numbers"
          description="Show a file title header and hide line numbers if needed."
          code={`import { CodeBlock } from '@unbrn/ui/CodeBlock';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <CodeBlock
        code={\`export const add = (a: number, b: number) => a + b;\`}
        title="utils.ts"
        showLineNumbers={false}
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <CodeBlock
              code={`export const add = (a: number, b: number) => a + b;`}
              title="utils.ts"
              showLineNumbers={false}
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'code', type: 'string', description: 'The code text to display in the block.' },
          { name: 'tabs', type: 'Record<string, string>', description: 'A list of tabs with their respective code snippets.' },
          { name: 'defaultTab', type: 'string', description: 'The tab that starts active.' },
          { name: 'language', type: 'string', defaultValue: "'tsx'", description: 'The code language (e.g., tsx, javascript, css).' },
          { name: 'title', type: 'string', description: 'A file name or label to show in the code block header.' },
          { name: 'variant', type: "'filled' | 'outlined'", defaultValue: "'filled'", description: 'The style of the code block.' },
          { name: 'showLineNumbers', type: 'boolean', defaultValue: 'true', description: 'Show or hide line numbers.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the block (prefixed with codeBlock).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with codeBlock).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer code block wrapper container.' },
          { name: 'header', description: 'Styles the top header bar.' },
          { name: 'content', description: 'Styles the pre/code container area.' },
          { name: 'copyButton', description: 'Styles the action copy button in the header.' },
          { name: 'title', description: 'Styles the title text in the header.' },
          { name: 'lang', description: 'Styles the language indicator tag in the header.' },
          { name: 'tabs', description: 'Styles the tab bar wrapper (tab variant).' },
          { name: 'tab', description: 'Styles individual tab buttons.' },
        ]}
        stylingStructure={`root
 ├── header
 │    ├── title
 │    ├── tabs
 │    │    └── tab
 │    ├── lang
 │    └── copyButton
 └── content`}
      />
    </>
  );
};
