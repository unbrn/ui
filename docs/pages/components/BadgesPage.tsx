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
        code={`import { Badge } from '@unbrn/ui/Badge';

export default function Example() {
  return <Badge variant="filled" children="NEW" />;
}`}
      >
        <Badge variant="filled" children="NEW" />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Badge } from '@unbrn/ui/Badge';

export default function Example() {
  return <Badge children="Status" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from four styles: filled, outlined, duo."
          code={`import { Badge } from '@unbrn/ui/Badge';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge variant="filled" children="FILLED" />
      <Badge variant="outlined" children="OUTLINED" />
      <Badge variant="duo" children="DUO" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge variant="filled" children="FILLED" />
            <Badge variant="outlined" children="OUTLINED" />
            <Badge variant="duo" children="DUO" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from small or medium sizes."
          code={`import { Badge } from '@unbrn/ui/Badge';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Badge size={1} children="SMALL" />
      <Badge size={2} children="MEDIUM" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexDirection: "column" }}>
            <Badge size={1} children="SMALL" />
            <Badge size={2} children="MEDIUM" />
          </div>
        </Showcase>

        <Showcase
          title="With Icons"
          description="Add small icons next to the text for extra detail."
          code={`import { Badge } from '@unbrn/ui/Badge';
import { Shield, Star, Check } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge icon={<Shield size={12} />} variant="filled" children="VERIFIED" />
      <Badge icon={<Star size={12} />} variant="duo" iconPosition="right" children="PREMIUM" />
      <Badge icon={<Check size={12} />} variant="outlined" children="SUCCESS" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge icon={<Shield size={12} />} variant="filled" children="VERIFIED" />
            <Badge icon={<Star size={12} />} variant="duo" iconPosition="right" children="PREMIUM" />
            <Badge icon={<Check size={12} />} variant="outlined" children="SUCCESS" />
          </div>
        </Showcase>

        <Showcase
          title="Status Colors"
          description="Change the label colors to match its status."
          code={`import { Badge } from '@unbrn/ui/Badge';
import { Zap } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge variant="duo" accentColor="green" icon={<Zap size={12} />} children="ONLINE" />
      <Badge variant="duo" accentColor="red" icon={<Zap size={12} />} children="OFFLINE" />
      <Badge variant="duo" accentColor="orange" icon={<Zap size={12} />} children="URGENT" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge variant="duo" accentColor="green" icon={<Zap size={12} />} children="ONLINE" />
            <Badge variant="duo" accentColor="red" icon={<Zap size={12} />} children="OFFLINE" />
            <Badge variant="duo" accentColor="orange" icon={<Zap size={12} />} children="URGENT" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the badge.' },
          { name: 'size', type: '1 | 2', defaultValue: '2', description: 'The size of the badge.' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color for borders and highlights.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown next to the label text.' },
          { name: 'iconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Show the icon on the left or right side.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: '', type: 'ReactNode', description: 'The text content or elements inside the badge.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the badge (prefixed with badge).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with badge).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer badge pill container.' },
          { name: 'icon', description: 'Styles the icon wrapper.' },
          { name: 'text', description: 'Styles the text element inside the badge.' },
        ]}
        stylingStructure={`root
 ├── icon
 └── text`}
      />
    </>
  );
};
