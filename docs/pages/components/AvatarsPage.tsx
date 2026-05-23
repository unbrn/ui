import React from 'react';
import { Avatar } from '../../../package/components/Avatar/Avatar';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const AvatarsPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Avatars" />

      <Showcase
        title="PREVIEW"
        code={`import { Avatar } from '@unburn/ui/Avatar';

export default function Example() {
  return (
    <Avatar
      src="https://avatars.githubusercontent.com/u/197804266"
      showStatus
      statusColor="green"
    />
  );
}`}
      >
        <Avatar
          src="https://avatars.githubusercontent.com/u/197804266"
          showStatus
          statusColor="green"
        />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Avatar } from '@unburn/ui/Avatar';

export default function Example() {
  return <Avatar src="/path/to/image.jpg" alt="User" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="STATUS INDICATORS"
          description="Show a small color dot indicating if a user is online or busy."
          code={`import { Avatar } from '@unburn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Avatar showStatus statusColor="green" color='green'/>
      <Avatar showStatus statusColor="orange" color='orange' />
      <Avatar showStatus statusColor="red" color='red'/>
      <Avatar showStatus statusColor="gray" color='gray'/>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Avatar showStatus statusColor="green" color='green' />
            <Avatar showStatus statusColor="orange" color='orange' />
            <Avatar showStatus statusColor="red" color='red' />
            <Avatar showStatus statusColor="gray" color='gray' />
          </div>
        </Showcase>

        <Showcase
          title="SIZES"
          description="Available in five sizes from extra small to extra large."
          code={`import { Avatar } from '@unburn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar size="xs" src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size="sm" src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size="md" src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size="lg" src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size="xl" src="https://avatars.githubusercontent.com/u/197804266" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar size="xs" src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size="sm" src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size="md" src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size="lg" src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size="xl" src="https://avatars.githubusercontent.com/u/197804266" />
          </div>
        </Showcase>

        <Showcase
          title="FALLBACKS & COLORS"
          description="Show initials or custom colors if the image is missing."
          code={`import { Avatar } from '@unburn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Avatar color="blue" fallback="JD" />
      <Avatar color="orange" fallback="AS" />
      <Avatar color="green" fallback="TH" />
      <Avatar color="red" fallback="RR" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Avatar color="blue" fallback="JD" />
            <Avatar color="orange" fallback="AS" />
            <Avatar color="green" fallback="TH" />
            <Avatar color="red" fallback="RR" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'src', type: 'string', description: 'URL link to the profile image.' },
          { name: 'alt', type: 'string', defaultValue: "'Avatar'", description: 'Alternate text description for the image.' },
          { name: 'fallback', type: 'ReactNode', description: 'Initials or icons to show if the image fails to load.' },
          { name: 'showStatus', type: 'boolean', defaultValue: 'false', description: 'Show or hide the online status dot.' },
          { name: 'statusColor', type: 'string', description: 'Color of the online status dot.' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'The size of the profile picture.' },
          { name: 'color', type: 'string', description: 'Custom color theme for fallbacks.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the avatar.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
