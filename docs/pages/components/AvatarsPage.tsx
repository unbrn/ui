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
        title="Preview"
        code={`import { Avatar } from '@unbrn/ui/Avatar';

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
          code={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return <Avatar src="/path/to/image.jpg" alt="User" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Status Indicators"
          description="Show a small color dot indicating if a user is online or busy."
          code={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Avatar showStatus statusColor="green" accentColor='green'/>
      <Avatar showStatus statusColor="orange" accentColor='orange' />
      <Avatar showStatus statusColor="red" accentColor='red'/>
      <Avatar showStatus statusColor="gray" accentColor='gray'/>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Avatar showStatus statusColor="green" accentColor='green' />
            <Avatar showStatus statusColor="orange" accentColor='orange' />
            <Avatar showStatus statusColor="red" accentColor='red' />
            <Avatar showStatus statusColor="gray" accentColor='gray' />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Available in five sizes from extra small to extra large."
          code={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar size={1} src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size={2} src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size={3} src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size={4} src="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar size={5} src="https://avatars.githubusercontent.com/u/197804266" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar size={1} src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size={2} src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size={3} src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size={4} src="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar size={5} src="https://avatars.githubusercontent.com/u/197804266" />
          </div>
        </Showcase>

        <Showcase
          title="Fallbacks & Colors"
          description="Show initials or custom colors if the image is missing."
          code={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Avatar accentColor="blue" fallback="JD" />
      <Avatar accentColor="orange" fallback="AS" />
      <Avatar accentColor="green" fallback="TH" />
      <Avatar accentColor="red" fallback="RR" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Avatar accentColor="blue" fallback="JD" />
            <Avatar accentColor="orange" fallback="AS" />
            <Avatar accentColor="green" fallback="TH" />
            <Avatar accentColor="red" fallback="RR" />
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
          { name: 'size', type: '1 | 2 | 3 | 4 | 5', defaultValue: '3', description: 'The size of the profile picture.' },
          { name: 'accentColor', type: 'string', description: 'Custom color theme for fallbacks.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the avatar (prefixed with avatar).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with avatar).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer circle container.' },
          { name: 'image', description: 'Styles the internal image element.' },
          { name: 'status', description: 'Styles the absolute positioned status badge/dot.' },
          { name: 'fallback', description: 'Styles the fallback container (initials or icon).' },
        ]}
        stylingStructure={`root
 ├── image
 ├── fallback
 └── status`}
      />
    </>
  );
};
