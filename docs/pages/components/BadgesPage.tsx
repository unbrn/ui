import React from 'react';
import { Badge } from '../../../package/components/Badge/Badge';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Shield, Zap, Star, Check } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const BadgesPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Badges" />

      <Showcase
        title="Preview"
        code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return <Badge badgeVariant="filled" badgeChildren="NEW" />;
}`}
      >
        <Badge badgeVariant="filled" badgeChildren="NEW" />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return <Badge badgeChildren="Status" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from four styles: filled, outlined, duo."
          code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge badgeVariant="filled" badgeChildren="FILLED" />
      <Badge badgeVariant="outlined" badgeChildren="OUTLINED" />
      <Badge badgeVariant="duo" badgeChildren="DUO" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge badgeVariant="filled" badgeChildren="FILLED" />
            <Badge badgeVariant="outlined" badgeChildren="OUTLINED" />
            <Badge badgeVariant="duo" badgeChildren="DUO" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from small, medium, or large sizes."
          code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Badge badgeSize="sm" badgeChildren="SMALL" />
      <Badge badgeSize="md" badgeChildren="MEDIUM" />
      <Badge badgeSize="lg" badgeChildren="LARGE" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Badge badgeSize="sm" badgeChildren="SMALL" />
            <Badge badgeSize="md" badgeChildren="MEDIUM" />
            <Badge badgeSize="lg" badgeChildren="LARGE" />
          </div>
        </Showcase>

        <Showcase
          title="With Icons"
          description="Add small icons next to the text for extra detail."
          code={`import { Badge } from '@unburn/ui/Badge';
import { Shield, Star, Check } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge badgeIcon={<Shield size={12} />} badgeVariant="filled" badgeChildren="VERIFIED" />
      <Badge badgeIcon={<Star size={12} />} badgeVariant="duo" badgeIconPosition="right" badgeChildren="PREMIUM" />
      <Badge badgeIcon={<Check size={12} />} badgeVariant="outlined" badgeChildren="SUCCESS" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge badgeIcon={<Shield size={12} />} badgeVariant="filled" badgeChildren="VERIFIED" />
            <Badge badgeIcon={<Star size={12} />} badgeVariant="duo" badgeIconPosition="right" badgeChildren="PREMIUM" />
            <Badge badgeIcon={<Check size={12} />} badgeVariant="outlined" badgeChildren="SUCCESS" />
          </div>
        </Showcase>

        <Showcase
          title="Status Colors"
          description="Change the label colors to match its status."
          code={`import { Badge } from '@unburn/ui/Badge';
import { Zap } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge badgeVariant="duo" badgeAccentColor="green" badgeIcon={<Zap size={12} />} badgeChildren="ONLINE" />
      <Badge badgeVariant="duo" badgeAccentColor="red" badgeIcon={<Zap size={12} />} badgeChildren="OFFLINE" />
      <Badge badgeVariant="duo" badgeAccentColor="orange" badgeIcon={<Zap size={12} />} badgeChildren="URGENT" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge badgeVariant="duo" badgeAccentColor="green" badgeIcon={<Zap size={12} />} badgeChildren="ONLINE" />
            <Badge badgeVariant="duo" badgeAccentColor="red" badgeIcon={<Zap size={12} />} badgeChildren="OFFLINE" />
            <Badge badgeVariant="duo" badgeAccentColor="orange" badgeIcon={<Zap size={12} />} badgeChildren="URGENT" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'badgeVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the badge.' },
          { name: 'badgeSize', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'The size of the badge.' },
          { name: 'badgeAccentColor', type: 'string', description: 'Custom accent color for borders and highlights.' },
          { name: 'badgeIcon', type: 'ReactNode', description: 'An icon shown next to the label text.' },
          { name: 'badgeIconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Show the icon on the left or right side.' },
          { name: 'badgeClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'badgeStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'badgeChildren', type: 'ReactNode', description: 'The text content or elements inside the badge.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the badge (prefixed with badge).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with badge).' },
        ]}
        stylingTargets={[
          { name: 'badgeRoot', description: 'Styles the outer badge pill container.' },
          { name: 'badgeIcon', description: 'Styles the icon wrapper.' },
          { name: 'badgeText', description: 'Styles the text element inside the badge.' },
        ]}
        stylingStructure={`badgeRoot
 ├── badgeIcon
 └── badgeText`}
      />
    </>
  );
};
