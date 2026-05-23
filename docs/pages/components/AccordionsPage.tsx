import React from 'react';
import { Accordion } from '../../../package/components/Accordion/Accordion';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Zap, Shield, Settings } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const AccordionsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Accordions" />

      <Showcase
        title="PREVIEW"
        code={`import { Accordion } from '@unburn/ui/Accordion';
import { Settings } from 'lucide-react';

const items = [
  {
    id: '1',
    title: 'General Settings',
    subtitle: 'Core application preferences',
    content: 'Configure your themes, notifications, and language settings here.',
    icon: <Settings size={16} />
  }
];

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Accordion items={items} />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Accordion
            items={[
              {
                id: '1',
                title: 'General Settings',
                subtitle: 'Core application preferences',
                content: 'Configure your themes, notifications, and language settings here.',
                icon: <Settings size={16} />
              }
            ]}
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Accordion } from '@unburn/ui/Accordion';

const items = [
  { id: '1', title: 'Section 1', content: 'Content 1' },
];

export default function Example() {
  return <Accordion items={items} />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Choose from three styles: outlined, duo, and filled."
          code={`import { Accordion } from '@unburn/ui/Accordion';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
      <Accordion
        variant="outlined"
        items={[{ id: 'v2', title: 'Outlined Variant', content: 'Each item has a distinct border and bezel.' }]}
      />
      <Accordion
        variant="duo"
        items={[{ id: 'v3', title: 'Duo Variant', content: 'A softer, tinted look using system colors.' }]}
      />
      <Accordion
        variant="filled"
        items={[{ id: 'v4', title: 'Filled Variant', content: 'A bold, solid background look with tactile bezel.' }]}
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
            <Accordion
              variant="outlined"
              items={[{ id: 'v2', title: 'Outlined Variant', content: 'Each item has a distinct border and bezel.' }]}
            />
            <Accordion
              variant="duo"
              items={[{ id: 'v3', title: 'Duo Variant', content: 'A softer, tinted look using system colors.' }]}
            />
            <Accordion
              variant="filled"
              items={[{ id: 'v4', title: 'Filled Variant', content: 'A bold, solid background look with tactile bezel.' }]}
            />
          </div>
        </Showcase>

        <Showcase
          title="WITH ICONS & SUBTITLES"
          description="Add icons and subtitles to give more details to each item."
          code={`import { Accordion } from '@unburn/ui/Accordion';
import { Shield, Zap } from 'lucide-react';

const items = [
  {
    id: 's1',
    title: 'Security & Privacy',
    subtitle: 'Manage encryption and data sharing',
    content: 'Configure how your data is handled across the platform.',
    icon: <Shield size={16} />
  },
  {
    id: 's2',
    title: 'Messages',
    subtitle: 'Recent conversations',
    content: 'Your inbox is empty.',
    icon: <Zap size={16} />
  }
];

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Accordion items={items} />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Accordion
              items={[
                {
                  id: 's1',
                  title: 'Security & Privacy',
                  subtitle: 'Manage encryption and data sharing',
                  content: 'Configure how your data is handled across the platform.',
                  icon: <Shield size={16} />
                },
                {
                  id: 's2',
                  title: 'Messages',
                  subtitle: 'Recent conversations',
                  content: 'Your inbox is empty.',
                  icon: <Zap size={16} />
                }
              ]}
            />
          </div>
        </Showcase>

        <Showcase
          title="MULTIPLE SELECTION"
          description="Allow users to open more than one item at the same time."
          code={`import { Accordion } from '@unburn/ui/Accordion';

const items = [
  { id: 'm1', title: 'Independent Item A', content: 'You can open this...' },
  { id: 'm2', title: 'Independent Item B', content: '...and this at the same time.' }
];

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Accordion allowMultiple items={items} />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Accordion
              allowMultiple
              items={[
                { id: 'm1', title: 'Independent Item A', content: 'You can open this...' },
                { id: 'm2', title: 'Independent Item B', content: '...and this at the same time.' }
              ]}
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'items', type: 'AccordionItem[]', required: true, description: 'List of accordion items with text, subtitle, and icons.' },
          { name: 'allowMultiple', type: 'boolean', defaultValue: 'false', description: 'Allow opening more than one item at once.' },
          { name: 'variant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'outlined'", description: 'The style of the accordion.' },
          { name: 'color', type: 'string', description: 'Custom color for borders and highlights.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the accordion.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
