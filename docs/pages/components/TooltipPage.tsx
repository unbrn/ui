import React from 'react';
import { Tooltip } from '../../../package/components/Tooltip/Tooltip';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const TooltipPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Tooltip" />

      <Showcase
        title="Preview"
        description="A premium glassmorphic hover information bubble showing interactive trigger components."
        code={`import { Tooltip } from '@unbrn/ui/Tooltip';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <Tooltip
      content="Unbrn UI system tooltip feed"
      position="top"
      children={<Button variant="filled" children="Hover" />}
    />
  );
}`}
      >
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip
            content="Give a Star"
            position="top"
            children={<Button size={1} variant="filled" children="Hover" />}
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Tooltip } from '@unbrn/ui/Tooltip';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <Tooltip
      content="Frosted information bubble"
      children={<Button children="Trigger Area" />}
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Positions"
          description="Support for four-directional alignments: top, bottom, left, and right."
          code={`import { Tooltip } from '@unbrn/ui/Tooltip';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      <Tooltip content="Positioned Left" position="left" children={<Button size={1} children="Left" />} />
      <Tooltip content="Positioned Top" position="top" children={<Button size={1} children="Top" />} />
      <Tooltip content="Positioned Bottom" position="bottom" children={<Button size={1} children="Bottom" />} />
      <Tooltip content="Positioned Right" position="right" children={<Button size={1} children="Right" />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
            <Tooltip content="Positioned Left" position="left" children={<Button size={1} children="Left" />} />
            <Tooltip content="Positioned Top" position="top" children={<Button size={1} children="Top" />} />
            <Tooltip content="Positioned Bottom" position="bottom" children={<Button size={1} children="Bottom" />} />
            <Tooltip content="Positioned Right" position="right" children={<Button size={1} children="Right" />} />
          </div>
        </Showcase>

        <Showcase
          title="Variants"
          description="Support for three distinct styling architectures: filled (solid color/high-contrast), outlined (crisp border highlight), and duo (translucent background and border tinter)."
          code={`import { Tooltip } from '@unbrn/ui/Tooltip';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      <Tooltip content="Filled Variant" variant="filled" position="top" children={<Button size={1} children="Filled" />} />
      <Tooltip content="Outlined Variant" variant="outlined" position="bottom" children={<Button size={1} children="Outlined" />} />
      <Tooltip content="Duo Variant" variant="duo" position="top" children={<Button size={1} children="Duo" />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
            <Tooltip content="Filled Variant" variant="filled" position="top" children={<Button size={1} children="Filled" />} />
            <Tooltip content="Outlined Variant" variant="outlined" position="bottom" children={<Button size={1} children="Outlined" />} />
            <Tooltip content="Duo Variant" variant="duo" position="top" children={<Button size={1} children="Duo" />} />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Support for disabled states, preventing bubble rendering when disabled is set."
          code={`import { Tooltip } from '@unbrn/ui/Tooltip';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <Tooltip content="This will not show" disabled position="top" children={<Button disabled children="Disabled Trigger" />} />
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Tooltip content="This will not show" disabled position="top" children={<Button size={1} disabled children="Disabled Trigger" />} />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'content', type: 'ReactNode', required: true, description: 'Display text or react node shown inside the tooltip bubble.' },
          { name: '', type: 'ReactNode', description: 'Trigger component node that displays the tooltip when hovered or focused.' },
          { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: 'Alignment position of the bubble relative to the children trigger.' },
          { name: 'visible', type: 'boolean', description: 'Explicitly control visibility of the tooltip (controlled mode).' },
          { name: 'accentColor', type: 'string', description: 'Custom primary accent color for active highlight styling overrides (hex, rgb, etc.).' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'Styling architecture applied to the tooltip container.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interactive tooltip display.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS class name configuration mapping (root, trigger, bubble, arrow).' },
          { name: 'styles', type: 'object', description: 'Inline style configuration mapping.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer tooltip wrapper container.' },
          { name: 'trigger', description: 'Styles the wrapper containing the target hover elements.' },
          { name: 'bubble', description: 'Styles the absolute positioned tooltip popover bubble itself.' },
          { name: 'arrow', description: 'Styles the arrow pointer element extending from the bubble.' },
        ]}
        stylingStructure={`root
 ├── trigger
 └── bubble
      └── arrow`}
      />
    </>
  );
};
