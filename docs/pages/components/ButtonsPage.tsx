import React, { useState } from 'react';

import { Button, ButtonGroup } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ArrowLeft, ArrowRight, Mail, ChevronDown } from 'lucide-react';

import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const ButtonsPage: React.FC = () => {
  const [activeGroupTab, setActiveGroupTab] = useState(0);

  return (
    <>
      <ComponentHeader title="Buttons" />

      <Showcase
        title="Preview"
        code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return <Button buttonVariant="filled" buttonChildren="Get Started" />;
}`}
      >
        <Button buttonVariant="filled" buttonChildren="Get Started" />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return <Button buttonChildren="Click me" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button buttonVariant="filled" buttonChildren="Filled" />
      <Button buttonVariant="outlined" buttonChildren="Outlined" />
      <Button buttonVariant="duo" buttonChildren="Duo" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button buttonVariant="filled" buttonChildren="Filled" />
            <Button buttonVariant="outlined" buttonChildren="Outlined" />
            <Button buttonVariant="duo" buttonChildren="Duo" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Available in small, medium, and large sizes."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button buttonSize="sm" buttonChildren="Small" />
      <Button buttonSize="default" buttonChildren="Default" />
      <Button buttonSize="lg" buttonChildren="Large" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button buttonSize="sm" buttonChildren="Small" />
            <Button buttonSize="default" buttonChildren="Default" />
            <Button buttonSize="lg" buttonChildren="Large" />
          </div>
        </Showcase>

        <Showcase
          title="Icons"
          description="Add icons on the left or right to make buttons look better."
          code={`import { Button } from '@unburn/ui/Button';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button buttonIcon={<ArrowLeft size={16} />} buttonChildren="Back" />
      <Button buttonIcon={<ArrowRight size={16} />} buttonIconPosition="right" buttonChildren="Next" />
      <Button buttonIcon={<Mail size={16} />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button buttonIcon={<ArrowLeft size={16} />} buttonChildren="Back" />
            <Button buttonIcon={<ArrowRight size={16} />} buttonIconPosition="right" buttonChildren="Next" />
            <Button buttonIcon={<Mail size={16} />} />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use loading animations and disabled states for button actions."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button buttonLoading buttonChildren="Processing" />
      <Button buttonDisabled buttonChildren="Not Allowed" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button buttonLoading buttonChildren="Processing" />
            <Button buttonDisabled buttonChildren="Not Allowed" />
          </div>
        </Showcase>

        <Showcase
          title="Opacity Levels"
          description="Adjust the background opacity for custom designs."
          code={`import { Button } from '@unburn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button buttonOpacityLevel="25" buttonChildren="Low" />
      <Button buttonOpacityLevel="50" buttonChildren="Medium" />
      <Button buttonOpacityLevel="100" buttonChildren="Full" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button buttonOpacityLevel="25" buttonChildren="Low" />
            <Button buttonOpacityLevel="50" buttonChildren="Medium" />
            <Button buttonOpacityLevel="100" buttonChildren="Full" />
          </div>
        </Showcase>

        <Showcase
          title="Button Group"
          description="Combine multiple buttons into a single cohesive group capsule with dividers."
          code={`import { Button, ButtonGroup } from '@unburn/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Example() {
  return (
    <ButtonGroup
      buttonGroupChildren={
        <>
          <Button buttonIcon={<ArrowLeft size={16} />} />
          <Button buttonIcon={<ArrowRight size={16} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ButtonGroup
              buttonGroupChildren={
                <>
                  <Button buttonIcon={<ArrowLeft size={16} />} />
                  <Button buttonIcon={<ArrowRight size={16} />} />
                </>
              }
            />
          </div>
        </Showcase>

        <Showcase
          title="Button Split"
          description="A button group with a small visual gap between grouped actions."
          code={`import { Button, ButtonGroup } from '@unburn/ui/Button';
import { ChevronDown } from 'lucide-react';

export default function Example() {
  return (
    <ButtonGroup
      buttonGroupSplit
      buttonGroupChildren={
        <>
          <Button buttonVariant="filled" buttonChildren="Create Invoice" />
          <Button buttonVariant="filled" buttonIcon={<ChevronDown size={16} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ButtonGroup
              buttonGroupSplit
              buttonGroupChildren={
                <>
                  <Button buttonVariant="filled" buttonChildren="Create Invoice" />
                  <Button buttonVariant="filled" buttonIcon={<ChevronDown size={16} />} />
                </>
              }
            />
          </div>
        </Showcase>

        <Showcase
          title="Button Tabs"
          description="Transform a button group into a selection tab bar using the tabs, active, and variant props."
          code={`import { useState } from 'react';
import { Button, ButtonGroup } from '@unburn/ui/Button';

export default function Example() {
  const [activeGroupTab, setActiveGroupTab] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <ButtonGroup
        buttonGroupTabs
        buttonGroupVariant="filled"
        buttonGroupChildren={
          <>
            <Button buttonActive={activeGroupTab === 0} buttonOnClick={() => setActiveGroupTab(0)} buttonChildren="First" />
            <Button buttonActive={activeGroupTab === 1} buttonOnClick={() => setActiveGroupTab(1)} buttonChildren="Second" />
          </>
        }
      />
    </div>
  );
}`}
        >

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <ButtonGroup
              buttonGroupTabs
              buttonGroupVariant="filled"
              buttonGroupChildren={
                <>
                  <Button buttonActive={activeGroupTab === 0} buttonOnClick={() => setActiveGroupTab(0)} buttonChildren="First" />
                  <Button buttonActive={activeGroupTab === 1} buttonOnClick={() => setActiveGroupTab(1)} buttonChildren="Second" />
                </>
              }
            />
          </div>
        </Showcase>
      </div>


      <Props
        title="Button Props"
        props={[
          { name: 'buttonVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the button.' },
          { name: 'buttonSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The button size.' },
          { name: 'buttonLoading', type: 'boolean', defaultValue: 'false', description: 'Show a loading spinner and turn off button clicks.' },
          { name: 'buttonFullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the button fill the entire width of its box.' },
          { name: 'buttonIcon', type: 'ReactNode', description: 'An icon shown inside the button.' },
          { name: 'buttonIconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Show the icon on the left or right side.' },
          { name: 'buttonOpacityLevel', type: "'25' | '50' | '75' | '100'", defaultValue: "'100'", description: 'Set the background opacity level.' },
          { name: 'buttonAccentColor', type: 'string', description: 'Custom color theme for the button.' },
          { name: 'buttonClassName', type: 'string', description: 'Custom CSS class for the button.' },
          { name: 'buttonStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the button.' },
          { name: 'buttonDisabled', type: 'boolean', description: 'Disable button interactions.' },
          { name: 'buttonOnClick', type: 'function', description: 'Handler for button click events.' },
          { name: 'buttonType', type: "'button' | 'submit' | 'reset'", defaultValue: "'button'", description: 'HTML type attribute of the button.' },
          { name: 'buttonChildren', type: 'ReactNode', description: 'The text or element contents inside the button.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the button (prefixed with button).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with button).' },
        ]}
        stylingTargets={[
          { name: 'buttonRoot', description: 'Styles the root HTML button element.' },
          { name: 'buttonIcon', description: 'Styles the internal icon wrapper element.' },
          { name: 'buttonLoader', description: 'Styles the loading spinner icon container.' },
        ]}
        stylingStructure={`buttonRoot
 ├── buttonIcon
 └── buttonLoader`}
      />

      <Props
        title="ButtonGroup Props"
        props={[
          { name: 'buttonGroupChildren', type: 'ReactNode', required: true, description: 'The button elements inside the group.' },
          { name: 'buttonGroupVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the button group.' },
          { name: 'buttonGroupSplit', type: 'boolean', defaultValue: 'false', description: 'Enable split view with minor spacing between action slots.' },
          { name: 'buttonGroupTabs', type: 'boolean', defaultValue: 'false', description: 'Transform the button group into selection tabs with a sliding slider highlight.' },
          { name: 'buttonGroupClassName', type: 'string', description: 'Custom CSS class for the button group container.' },
          { name: 'buttonGroupStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the button group container.' },
        ]}
      />
    </>
  );
};
