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
        title="Preview"
        code={`import { Textarea } from '@unbrn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Textarea textareaLabel="Bio" textareaPlaceholder="Write something about yourself..." textareaShowCount />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Textarea textareaLabel="Bio" textareaPlaceholder="Write something about yourself..." textareaShowCount />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Textarea } from '@unbrn/ui/Textarea';

export default function Example() {
  return <Textarea textareaLabel="Biography" textareaPlaceholder="Tell your story..." />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Textarea } from '@unbrn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
      <Textarea textareaVariant="filled" textareaPlaceholder="Filled (Default)" />
      <Textarea textareaVariant="outlined" textareaPlaceholder="Outlined variant" />
      <Textarea textareaVariant="duo" textareaPlaceholder="Duo variant" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
            <Textarea textareaVariant="filled" textareaPlaceholder="Filled (Default)" />
            <Textarea textareaVariant="outlined" textareaPlaceholder="Outlined variant" />
            <Textarea textareaVariant="duo" textareaPlaceholder="Duo variant" />
          </div>
        </Showcase>

        <Showcase
          title="Character Count"
          description="Show the number of typed characters."
          code={`import { Textarea } from '@unbrn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Textarea 
        textareaLabel="Post Content" 
        textareaShowCount 
        textareaMaxLength={280} 
        textareaPlaceholder="What's on your mind?" 
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Textarea
              textareaLabel="Post Content"
              textareaShowCount
              textareaMaxLength={280}
              textareaPlaceholder="What's on your mind?"
            />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use error states and disabled textareas."
          code={`import { Textarea } from '@unbrn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
      <Textarea 
        textareaLabel="Feedback" 
        textareaPlaceholder="What can we improve?" 
        textareaError="This field is required."
      />
      <Textarea 
        textareaLabel="Locked" 
        textareaDisabled 
        textareaPlaceholder="You cannot edit this."
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
            <Textarea
              textareaLabel="Feedback"
              textareaPlaceholder="What can we improve?"
              textareaError="This field is required."
            />
            <Textarea
              textareaLabel="Locked"
              textareaDisabled
              textareaPlaceholder="You cannot edit this."
            />
          </div>
        </Showcase>

        <Showcase
          title="Accent Color"
          description="Apply a custom accent color to the border, focus ring, drag indicator, and character count using textareaAccentColor."
          code={`import { Textarea } from '@unbrn/ui/Textarea';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
      <Textarea textareaVariant="duo" textareaAccentColor="#10b981" textareaPlaceholder="Purple duo textarea..." textareaShowCount />
      <Textarea textareaVariant="outlined" textareaAccentColor="#10b981" textareaPlaceholder="Sky Blue outlined textarea..." textareaShowCount />
      <Textarea textareaVariant="filled" textareaAccentColor="#10b981" textareaPlaceholder="Emerald filled textarea..." textareaShowCount />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
            <Textarea textareaVariant="duo" textareaAccentColor="#10b981" textareaPlaceholder="Purple duo textarea..." textareaShowCount />
            <Textarea textareaVariant="outlined" textareaAccentColor="#10b981" textareaPlaceholder="Sky Blue outlined textarea..." textareaShowCount />
            <Textarea textareaVariant="filled" textareaAccentColor="#10b981" textareaPlaceholder="Emerald filled textarea..." textareaShowCount />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'textareaLabel', type: 'ReactNode', description: 'Text label shown above the textarea.' },
          { name: 'textareaDescription', type: 'ReactNode', description: 'Helpful detail text shown below the textarea.' },
          { name: 'textareaError', type: 'string', description: 'Error message to show under the textarea.' },
          { name: 'textareaVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the textarea.' },
          { name: 'textareaFullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the textarea fill the full width of its box.' },
          { name: 'textareaShowCount', type: 'boolean', defaultValue: 'false', description: 'Show the character counter below the field.' },
          { name: 'textareaDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks and inputs.' },
          { name: 'textareaId', type: 'string', description: 'Custom id attribute.' },
          { name: 'textareaMaxLength', type: 'number', description: 'Maximum character length limit.' },
          { name: 'textareaValue', type: 'string', description: 'Controlled value.' },
          { name: 'textareaDefaultValue', type: 'string', description: 'Uncontrolled default value.' },
          { name: 'textareaOnChange', type: 'function', description: 'Change event handler.' },
          { name: 'textareaPlaceholder', type: 'string', description: 'Placeholder text.' },
          { name: 'textareaClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'textareaStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'textareaAccentColor', type: 'string', description: 'Custom primary accent color for active highlight styling overrides (hex, rgb, etc.).' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the textarea.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'textareaRoot', description: 'Styles the outer textarea wrapper container.' },
          { name: 'textareaContainer', description: 'Styles the input field container box.' },
          { name: 'textareaElement', description: 'Styles the actual HTML textarea element.' },
          { name: 'textareaLabel', description: 'Styles the label text element.' },
          { name: 'textareaDescription', description: 'Styles the description helper text element.' },
          { name: 'textareaError', description: 'Styles the error message text element.' },
          { name: 'textareaFooter', description: 'Styles the footer layout container (below input).' },
          { name: 'textareaCount', description: 'Styles the character counter indicator.' },
          { name: 'textareaDragIndicator', description: 'Styles the resize drag handler indicator.' },
        ]}
        stylingStructure={`textareaRoot
 ├── textareaLabel
 ├── textareaContainer
 │    ├── textareaElement
 │    └── textareaDragIndicator
 ├── textareaFooter
 │    ├── textareaDescription
 │    ├── textareaError
 │    └── textareaCount`}
      />
    </>
  );
};
