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
        code={`import { Tooltip } from '@unburn/ui/Tooltip';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <Tooltip
      tooltipContent="Unburn UI system tooltip feed"
      tooltipPosition="top"
      tooltipChildren={<Button buttonVariant="filled" buttonChildren="Hover Trigger" />}
    />
  );
}`}
      >
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip
            tooltipContent="Unburn UI system tooltip feed"
            tooltipPosition="top"
            tooltipChildren={<Button buttonVariant="filled" buttonChildren="Hover Trigger" />}
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Tooltip } from '@unburn/ui/Tooltip';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <Tooltip
      tooltipContent="Frosted information bubble"
      tooltipChildren={<Button buttonChildren="Trigger Area" />}
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
          code={`import { Tooltip } from '@unburn/ui/Tooltip';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      <Tooltip tooltipContent="Positioned Top" tooltipPosition="top" tooltipChildren={<Button buttonChildren="Top" />} />
      <Tooltip tooltipContent="Positioned Bottom" tooltipPosition="bottom" tooltipChildren={<Button buttonChildren="Bottom" />} />
      <Tooltip tooltipContent="Positioned Left" tooltipPosition="left" tooltipChildren={<Button buttonChildren="Left" />} />
      <Tooltip tooltipContent="Positioned Right" tooltipPosition="right" tooltipChildren={<Button buttonChildren="Right" />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
            <Tooltip tooltipContent="Positioned Top" tooltipPosition="top" tooltipChildren={<Button buttonChildren="Top" />} />
            <Tooltip tooltipContent="Positioned Bottom" tooltipPosition="bottom" tooltipChildren={<Button buttonChildren="Bottom" />} />
            <Tooltip tooltipContent="Positioned Left" tooltipPosition="left" tooltipChildren={<Button buttonChildren="Left" />} />
            <Tooltip tooltipContent="Positioned Right" tooltipPosition="right" tooltipChildren={<Button buttonChildren="Right" />} />
          </div>
        </Showcase>

        <Showcase
          title="Variants"
          description="Support for three distinct styling architectures: filled (solid color/high-contrast), outlined (crisp border highlight), and duo (translucent background and border tinter)."
          code={`import { Tooltip } from '@unburn/ui/Tooltip';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      <Tooltip tooltipContent="Filled Variant" tooltipVariant="filled" tooltipPosition="top" tooltipChildren={<Button buttonChildren="Filled" />} />
      <Tooltip tooltipContent="Outlined Variant" tooltipVariant="outlined" tooltipPosition="bottom" tooltipChildren={<Button buttonChildren="Outlined" />} />
      <Tooltip tooltipContent="Duo Variant" tooltipVariant="duo" tooltipPosition="top" tooltipChildren={<Button buttonChildren="Duo" />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
            <Tooltip tooltipContent="Filled Variant" tooltipVariant="filled" tooltipPosition="top" tooltipChildren={<Button buttonChildren="Filled" />} />
            <Tooltip tooltipContent="Outlined Variant" tooltipVariant="outlined" tooltipPosition="bottom" tooltipChildren={<Button buttonChildren="Outlined" />} />
            <Tooltip tooltipContent="Duo Variant" tooltipVariant="duo" tooltipPosition="top" tooltipChildren={<Button buttonChildren="Duo" />} />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Support for disabled states, preventing bubble rendering when disabled is set."
          code={`import { Tooltip } from '@unburn/ui/Tooltip';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <Tooltip tooltipContent="This will not show" tooltipDisabled tooltipPosition="top" tooltipChildren={<Button buttonDisabled buttonChildren="Disabled Trigger" />} />
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Tooltip tooltipContent="This will not show" tooltipDisabled tooltipPosition="top" tooltipChildren={<Button buttonDisabled buttonChildren="Disabled Trigger" />} />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'tooltipContent', type: 'ReactNode', required: true, description: 'Display text or react node shown inside the tooltip bubble.' },
          { name: 'tooltipChildren', type: 'ReactNode', description: 'Trigger component node that displays the tooltip when hovered or focused.' },
          { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: 'Alignment position of the bubble relative to the children trigger.' },
          { name: 'tooltipVisible', type: 'boolean', description: 'Explicitly control visibility of the tooltip (controlled mode).' },
          { name: 'tooltipAccentColor', type: 'string', description: 'Custom primary accent color for active highlight styling overrides (hex, rgb, etc.).' },
          { name: 'tooltipVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'Styling architecture applied to the tooltip container.' },
          { name: 'tooltipDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables interactive tooltip display.' },
          { name: 'tooltipClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'tooltipStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS class name configuration mapping (root, trigger, bubble, arrow).' },
          { name: 'styles', type: 'object', description: 'Inline style configuration mapping.' },
        ]}
        stylingTargets={[
          { name: 'tooltipRoot', description: 'Styles the outer tooltip wrapper container.' },
          { name: 'tooltipTrigger', description: 'Styles the wrapper containing the target hover elements.' },
          { name: 'tooltipBubble', description: 'Styles the absolute positioned tooltip popover bubble itself.' },
          { name: 'tooltipArrow', description: 'Styles the arrow pointer element extending from the bubble.' },
        ]}
        stylingStructure={`tooltipRoot
 ├── tooltipTrigger
 └── tooltipBubble
      └── tooltipArrow`}
      />
    </>
  );
};
