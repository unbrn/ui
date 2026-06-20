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
        title="Preview"
        code={`import { Accordion } from '@unbrn/ui/Accordion';
import { Settings } from 'lucide-react';

const items = [
  {
    accordionItemId: '1',
    accordionItemTitle: 'General Settings',
    accordionItemSubtitle: 'Core application preferences',
    accordionItemContent: 'Configure your themes, notifications, and language settings here.',
    accordionItemIcon: <Settings size={16} />
  }
];

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Accordion accordionItems={items} />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Accordion
            accordionItems={[
              {
                accordionItemId: '1',
                accordionItemTitle: 'General Settings',
                accordionItemSubtitle: 'Core application preferences',
                accordionItemContent: 'Configure your themes, notifications, and language settings here.',
                accordionItemIcon: <Settings size={16} />
              }
            ]}
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Accordion } from '@unbrn/ui/Accordion';

const items = [
  { accordionItemId: '1', accordionItemTitle: 'Section 1', accordionItemContent: 'Content 1' },
];

export default function Example() {
  return <Accordion accordionItems={items} />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from three styles: outlined, duo, and filled."
          code={`import { Accordion } from '@unbrn/ui/Accordion';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
      <Accordion
        accordionVariant="outlined"
        accordionItems={[{ accordionItemId: 'v2', accordionItemTitle: 'Outlined Variant', accordionItemContent: 'Each item has a distinct border and bezel.' }]}
      />
      <Accordion
        accordionVariant="duo"
        accordionItems={[{ accordionItemId: 'v3', accordionItemTitle: 'Duo Variant', accordionItemContent: 'A softer, tinted look using system colors.' }]}
      />
      <Accordion
        accordionVariant="filled"
        accordionItems={[{ accordionItemId: 'v4', accordionItemTitle: 'Filled Variant', accordionItemContent: 'A bold, solid background look with tactile bezel.' }]}
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
            <Accordion
              accordionVariant="outlined"
              accordionItems={[{ accordionItemId: 'v2', accordionItemTitle: 'Outlined Variant', accordionItemContent: 'Each item has a distinct border and bezel.' }]}
            />
            <Accordion
              accordionVariant="duo"
              accordionItems={[{ accordionItemId: 'v3', accordionItemTitle: 'Duo Variant', accordionItemContent: 'A softer, tinted look using system colors.' }]}
            />
            <Accordion
              accordionVariant="filled"
              accordionItems={[{ accordionItemId: 'v4', accordionItemTitle: 'Filled Variant', accordionItemContent: 'A bold, solid background look with tactile bezel.' }]}
            />
          </div>
        </Showcase>

        <Showcase
          title="With Icons & Subtitles"
          description="Add icons and subtitles to give more details to each item."
          code={`import { Accordion } from '@unbrn/ui/Accordion';
import { Shield, Zap } from 'lucide-react';

const items = [
  {
    accordionItemId: 's1',
    accordionItemTitle: 'Security & Privacy',
    accordionItemSubtitle: 'Manage encryption and data sharing',
    accordionItemContent: 'Configure how your data is handled across the platform.',
    accordionItemIcon: <Shield size={16} />
  },
  {
    accordionItemId: 's2',
    accordionItemTitle: 'Messages',
    accordionItemSubtitle: 'Recent conversations',
    accordionItemContent: 'Your inbox is empty.',
    accordionItemIcon: <Zap size={16} />
  }
];

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Accordion accordionItems={items} />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Accordion
              accordionItems={[
                {
                  accordionItemId: 's1',
                  accordionItemTitle: 'Security & Privacy',
                  accordionItemSubtitle: 'Manage encryption and data sharing',
                  accordionItemContent: 'Configure how your data is handled across the platform.',
                  accordionItemIcon: <Shield size={16} />
                },
                {
                  accordionItemId: 's2',
                  accordionItemTitle: 'Messages',
                  accordionItemSubtitle: 'Recent conversations',
                  accordionItemContent: 'Your inbox is empty.',
                  accordionItemIcon: <Zap size={16} />
                }
              ]}
            />
          </div>
        </Showcase>

        <Showcase
          title="Multiple Selection"
          description="Allow users to open more than one item at the same time."
          code={`import { Accordion } from '@unbrn/ui/Accordion';

const items = [
  { accordionItemId: 'm1', accordionItemTitle: 'Independent Item A', accordionItemContent: 'You can open this...' },
  { accordionItemId: 'm2', accordionItemTitle: 'Independent Item B', accordionItemContent: '...and this at the same time.' }
];

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Accordion accordionAllowMultiple accordionItems={items} />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Accordion
              accordionAllowMultiple
              accordionItems={[
                { accordionItemId: 'm1', accordionItemTitle: 'Independent Item A', accordionItemContent: 'You can open this...' },
                { accordionItemId: 'm2', accordionItemTitle: 'Independent Item B', accordionItemContent: '...and this at the same time.' }
              ]}
            />
          </div>
        </Showcase>
      </div>

      <Props
        title="Accordion Props"
        props={[
          { name: 'accordionItems', type: 'AccordionItemProps[]', required: true, description: 'List of accordion items with text, subtitle, and icons.' },
          { name: 'accordionAllowMultiple', type: 'boolean', defaultValue: 'false', description: 'Allow opening more than one item at once.' },
          { name: 'accordionVariant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'outlined'", description: 'The style of the accordion.' },
          { name: 'accordionAccentColor', type: 'string', description: 'Custom color for borders and highlights.' },
          { name: 'accordionClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'accordionStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the accordion (prefixed with accordion).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with accordion).' },
        ]}
        stylingTargets={[
          { name: 'accordionRoot', description: 'Styles the outer wrapper of the entire accordion group.' },
          { name: 'accordionItem', description: 'Styles the container of a single accordion item.' },
          { name: 'accordionHeader', description: 'Styles the header button containing the title, subtitle, and chevron.' },
          { name: 'accordionLeadingIcon', description: 'Styles the optional icon on the left of the title.' },
          { name: 'accordionTitle', description: 'Styles the main title text.' },
          { name: 'accordionSubtitle', description: 'Styles the subtitle text.' },
          { name: 'accordionIcon', description: 'Styles the wrapper containing the expand/collapse chevron.' },
          { name: 'accordionContent', description: 'Styles the expandable content panel.' },
        ]}
        stylingStructure={`accordionRoot
 ├── accordionItem
      ├── accordionHeader
      │    ├── accordionLeadingIcon
      │    ├── accordionTitle
      │    ├── accordionSubtitle
      │    └── accordionIcon
      └── accordionContent`}
      />

      <Props
        title="AccordionItem Props"
        props={[
          { name: 'accordionItemId', type: 'string', required: true, description: 'Unique identifier for the item (used to control state).' },
          { name: 'accordionItemTitle', type: 'string', required: true, description: 'Main text heading of the item.' },
          { name: 'accordionItemSubtitle', type: 'string', description: 'Helper subtitle text shown below title.' },
          { name: 'accordionItemIcon', type: 'ReactNode', description: 'An optional leading icon shown to the left of the title.' },
          { name: 'accordionItemContent', type: 'ReactNode', required: true, description: 'The content rendered inside the expanded panel.' },
        ]}
      />
    </>
  );
};
