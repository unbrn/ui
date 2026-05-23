import React from 'react';
import { VideoEmbed } from '../../../package/components/VideoEmbed/VideoEmbed';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const VideoEmbedPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Video Embed" />

      <Showcase
        title="PREVIEW"
        description="A beautiful, high-performance direct video player using glassmorphic overlays and custom seeking controls."
        code={`import { VideoEmbed } from '@unburn/ui/VideoEmbed';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '640px' }}>
      <VideoEmbed
        src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
      />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <VideoEmbed
            src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { VideoEmbed } from '@unburn/ui/VideoEmbed';

export default function Example() {
  return (
    <VideoEmbed 
      src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="ASPECT RATIOS"
          description="Support for 16:9, 4:3, 1:1, or custom ratio scaling configurations."
          code={`import { VideoEmbed } from '@unburn/ui/VideoEmbed';

export default function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span>16:9 Aspect Ratio (Default)</span>
        <VideoEmbed
          src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span>1:1 Aspect Ratio</span>
        <VideoEmbed
          src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
          ratio="1:1"
        />
      </div>
    </div>
  );
}`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>16:9 Aspect Ratio (Default)</span>
              <VideoEmbed
                src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>1:1 Aspect Ratio</span>
              <VideoEmbed
                src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
                ratio="1:1"
              />
            </div>
          </div>
        </Showcase>

        <Showcase
          title="CUSTOM ACCENTS"
          description="Paint custom glowing accent controls to match your brand style."
          code={`import { VideoEmbed } from '@unburn/ui/VideoEmbed';

export default function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
      <VideoEmbed
        src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
        color="#a855f7" // Purple theme
      />
      <VideoEmbed
        src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
        color="#ec4899" // Pink theme
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
            <VideoEmbed
              src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
              color="#a855f7"
            />
            <VideoEmbed
              src="https://getsamplefiles.com/download/mp4/sample-2.mp4"
              color="#ec4899"
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'src', type: 'string', required: true, description: 'Direct source URL of the video (supports .mp4, .webm, .ogg streams).' },
          { name: 'poster', type: 'string', description: 'URL of the placeholder/cover image shown before the video starts playing.' },
          { name: 'autoplay', type: 'boolean', defaultValue: 'false', description: 'Begin video playback automatically on load.' },
          { name: 'loop', type: 'boolean', defaultValue: 'false', description: 'Restart the video playback automatically when it ends.' },
          { name: 'muted', type: 'boolean', defaultValue: 'false', description: 'Silence the audio stream of the video player.' },
          { name: 'controls', type: 'boolean', defaultValue: 'true', description: 'Render custom glassmorphic player controls.' },
          { name: 'ratio', type: "'16:9' | '4:3' | '1:1' | 'custom'", defaultValue: "'16:9'", description: 'Forces the video frame aspect ratio.' },
          { name: 'color', type: 'string', description: 'Custom accent color to paint glowing controls' },
          { name: 'playIcon', type: 'ReactNode', description: 'Custom icon element to substitute inside the play button.' },
        ]}
      />
    </>
  );
};
