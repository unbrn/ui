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
        title="PREVIEW"
        code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return <Badge variant="filled">NEW</Badge>;
}`}
      >
        <Badge variant="filled">NEW</Badge>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return <Badge>Status</Badge>;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Choose from four styles: filled, outlined, duo."
          code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge variant="filled">FILLED</Badge>
      <Badge variant="outlined">OUTLINED</Badge>
      <Badge variant="duo">DUO</Badge>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge variant="filled">FILLED</Badge>
            <Badge variant="outlined">OUTLINED</Badge>
            <Badge variant="duo">DUO</Badge>
          </div>
        </Showcase>

        <Showcase
          title="SIZES"
          description="Choose from small, medium, or large sizes."
          code={`import { Badge } from '@unburn/ui/Badge';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Badge size="sm">SMALL</Badge>
      <Badge size="md">MEDIUM</Badge>
      <Badge size="lg">LARGE</Badge>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Badge size="sm">SMALL</Badge>
            <Badge size="md">MEDIUM</Badge>
            <Badge size="lg">LARGE</Badge>
          </div>
        </Showcase>

        <Showcase
          title="WITH ICONS"
          description="Add small icons next to the text for extra detail."
          code={`import { Badge } from '@unburn/ui/Badge';
import { Shield, Star, Check } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge icon={<Shield size={12} />} variant="filled">VERIFIED</Badge>
      <Badge icon={<Star size={12} />} variant="duo" iconPosition="right">PREMIUM</Badge>
      <Badge icon={<Check size={12} />} variant="outlined">SUCCESS</Badge>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge icon={<Shield size={12} />} variant="filled">VERIFIED</Badge>
            <Badge icon={<Star size={12} />} variant="duo" iconPosition="right">PREMIUM</Badge>
            <Badge icon={<Check size={12} />} variant="outlined">SUCCESS</Badge>
          </div>
        </Showcase>

        <Showcase
          title="STATUS COLORS"
          description="Change the label colors to match its status."
          code={`import { Badge } from '@unburn/ui/Badge';
import { Zap } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Badge variant="duo" color="green" icon={<Zap size={12} />}>ONLINE</Badge>
      <Badge variant="duo" color="red" icon={<Zap size={12} />}>OFFLINE</Badge>
      <Badge variant="duo" color="orange" icon={<Zap size={12} />}>URGENT</Badge>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge variant="duo" color="green" icon={<Zap size={12} />}>ONLINE</Badge>
            <Badge variant="duo" color="red" icon={<Zap size={12} />}>OFFLINE</Badge>
            <Badge variant="duo" color="orange" icon={<Zap size={12} />}>URGENT</Badge>
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the badge.' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the badge label.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown next to the label text.' },
          { name: 'iconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Show the icon on the left or right side.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the badge.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
