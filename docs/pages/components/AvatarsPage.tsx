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
      avatarSrc="https://avatars.githubusercontent.com/u/197804266"
      avatarShowStatus
      avatarStatusColor="green"
    />
  );
}`}
      >
        <Avatar
          avatarSrc="https://avatars.githubusercontent.com/u/197804266"
          avatarShowStatus
          avatarStatusColor="green"
        />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return <Avatar avatarSrc="/path/to/image.jpg" avatarAlt="User" />;
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
      <Avatar avatarShowStatus avatarStatusColor="green" avatarAccentColor='green'/>
      <Avatar avatarShowStatus avatarStatusColor="orange" avatarAccentColor='orange' />
      <Avatar avatarShowStatus avatarStatusColor="red" avatarAccentColor='red'/>
      <Avatar avatarShowStatus avatarStatusColor="gray" avatarAccentColor='gray'/>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Avatar avatarShowStatus avatarStatusColor="green" avatarAccentColor='green' />
            <Avatar avatarShowStatus avatarStatusColor="orange" avatarAccentColor='orange' />
            <Avatar avatarShowStatus avatarStatusColor="red" avatarAccentColor='red' />
            <Avatar avatarShowStatus avatarStatusColor="gray" avatarAccentColor='gray' />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Available in five sizes from extra small to extra large."
          code={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar avatarSize="xs" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar avatarSize="sm" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar avatarSize="md" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar avatarSize="lg" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
      <Avatar avatarSize="xl" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar avatarSize="xs" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar avatarSize="sm" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar avatarSize="md" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar avatarSize="lg" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
            <Avatar avatarSize="xl" avatarSrc="https://avatars.githubusercontent.com/u/197804266" />
          </div>
        </Showcase>

        <Showcase
          title="Fallbacks & Colors"
          description="Show initials or custom colors if the image is missing."
          code={`import { Avatar } from '@unbrn/ui/Avatar';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Avatar avatarAccentColor="blue" avatarFallback="JD" />
      <Avatar avatarAccentColor="orange" avatarFallback="AS" />
      <Avatar avatarAccentColor="green" avatarFallback="TH" />
      <Avatar avatarAccentColor="red" avatarFallback="RR" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Avatar avatarAccentColor="blue" avatarFallback="JD" />
            <Avatar avatarAccentColor="orange" avatarFallback="AS" />
            <Avatar avatarAccentColor="green" avatarFallback="TH" />
            <Avatar avatarAccentColor="red" avatarFallback="RR" />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'avatarSrc', type: 'string', description: 'URL link to the profile image.' },
          { name: 'avatarAlt', type: 'string', defaultValue: "'Avatar'", description: 'Alternate text description for the image.' },
          { name: 'avatarFallback', type: 'ReactNode', description: 'Initials or icons to show if the image fails to load.' },
          { name: 'avatarShowStatus', type: 'boolean', defaultValue: 'false', description: 'Show or hide the online status dot.' },
          { name: 'avatarStatusColor', type: 'string', description: 'Color of the online status dot.' },
          { name: 'avatarSize', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'The size of the profile picture.' },
          { name: 'avatarAccentColor', type: 'string', description: 'Custom color theme for fallbacks.' },
          { name: 'avatarClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'avatarStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the avatar (prefixed with avatar).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with avatar).' },
        ]}
        stylingTargets={[
          { name: 'avatarRoot', description: 'Styles the outer circle container.' },
          { name: 'avatarImage', description: 'Styles the internal image element.' },
          { name: 'avatarStatus', description: 'Styles the absolute positioned status badge/dot.' },
          { name: 'avatarFallback', description: 'Styles the fallback container (initials or icon).' },
        ]}
        stylingStructure={`avatarRoot
 ├── avatarImage
 ├── avatarFallback
 └── avatarStatus`}
      />
    </>
  );
};
