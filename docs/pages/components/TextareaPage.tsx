import React from 'react';
import { Textarea } from '../../../package/components/Textarea/Textarea';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const TextareaPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Textarea" />

      <Showcase
        title="PREVIEW"
        code={`import { Textarea } from '@unburn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Textarea label="Bio" placeholder="Write something about yourself..." showCount />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Textarea label="Bio" placeholder="Write something about yourself..." showCount />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Textarea } from '@unburn/ui/Textarea';

export default function Example() {
  return <Textarea label="Biography" placeholder="Tell your story..." />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Textarea } from '@unburn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
      <Textarea variant="filled" placeholder="Filled (Default)" />
      <Textarea variant="outlined" placeholder="Outlined variant" />
      <Textarea variant="duo" placeholder="Duo variant" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
            <Textarea variant="filled" placeholder="Filled (Default)"/>
            <Textarea variant="outlined" placeholder="Outlined variant" />
            <Textarea variant="duo" placeholder="Duo variant" />
          </div>
        </Showcase>

        <Showcase
          title="CHARACTER COUNT"
          description="Show the number of typed characters."
          code={`import { Textarea } from '@unburn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Textarea 
        label="Post Content" 
        showCount 
        maxLength={280} 
        placeholder="What's on your mind?" 
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Textarea
              label="Post Content"
              showCount
              maxLength={280}
              placeholder="What's on your mind?"
            />
          </div>
        </Showcase>

        <Showcase
          title="STATES"
          description="Use error states and disabled textareas."
          code={`import { Textarea } from '@unburn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
      <Textarea 
        label="Feedback" 
        placeholder="What can we improve?" 
        error="This field is required."
      />
      <Textarea 
        label="Locked" 
        disabled 
        placeholder="You cannot edit this."
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
            <Textarea
              label="Feedback"
              placeholder="What can we improve?"
              error="This field is required."
            />
            <Textarea
              label="Locked"
              disabled
              placeholder="You cannot edit this."
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'label', type: 'ReactNode', description: 'Text label shown above the textarea.' },
          { name: 'description', type: 'ReactNode', description: 'Helpful detail text shown below the textarea.' },
          { name: 'error', type: 'string', description: 'Error message to show under the textarea.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the textarea.' },
          { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the textarea fill the full width of its box.' },
          { name: 'showCount', type: 'boolean', defaultValue: 'false', description: 'Show the character counter below the field.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the textarea.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
