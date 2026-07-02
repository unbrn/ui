import React, { useState } from 'react';

import { Button, ButtonGroup } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const ButtonsPage: React.FC = () => {
  const [activeGroupTab, setActiveGroupTab] = useState(0);

  return (
    <>
      <ComponentHeader title="Buttons" />

      <Showcase
        title="Preview"
        code={`import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return <Button variant="filled" children="Get Started" />;
}`}
      >
        <Button variant="filled" children="Get Started" />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return <Button children="Click me" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from four styles: filled, outlined, duo, and ghost."
          code={`import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="filled" children="Filled" />
      <Button variant="outlined" children="Outlined" />
      <Button variant="duo" children="Duo" />
      <Button variant="ghost" children="Ghost" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="filled" children="Filled" />
            <Button variant="outlined" children="Outlined" />
            <Button variant="duo" children="Duo" />
            <Button variant="ghost" children="Ghost" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Available in small, medium, and large sizes."
          code={`import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size={1} children="Small" />
      <Button size={2} children="Default" />
      <Button size={3} children="Large" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: "column" }}>
            <Button size={1} children="Small" />
            <Button size={2} children="Default" />
            <Button size={3} children="Large" />
          </div>
        </Showcase>

        <Showcase
          title="Icons"
          description="Add icons on the left or right to make buttons look better."
          code={`import { Button } from '@unbrn/ui/Button';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button icon={<ArrowLeft size={16} />} children="Back" />
      <Button icon={<ArrowRight size={16} />} iconPosition="right" children="Next" />
      <Button icon={<Mail size={16} />} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button icon={<ArrowLeft size={16} />} children="Back" />
            <Button icon={<ArrowRight size={16} />} iconPosition="right" children="Next" />
            <Button icon={<Mail size={16} />} />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use loading animations and disabled states for button actions."
          code={`import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button loading children="Processing" />
      <Button disabled children="Not Allowed" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button loading children="Processing" />
            <Button disabled children="Not Allowed" />
          </div>
        </Showcase>

        <Showcase
          title="Opacity Levels"
          description="Adjust the background opacity for custom designs."
          code={`import { Button } from '@unbrn/ui/Button';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button opacityLevel="25" children="Low" />
      <Button opacityLevel="50" children="Medium" />
      <Button opacityLevel="100" children="Full" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button opacityLevel="25" children="Low" />
            <Button opacityLevel="50" children="Medium" />
            <Button opacityLevel="100" children="Full" />
          </div>
        </Showcase>

        <Showcase
          title="Button Group"
          description="Combine multiple buttons into a single cohesive group capsule with dividers."
          code={`import { Button, ButtonGroup } from '@unbrn/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Example() {
  return (
    <ButtonGroup
      children={
        <>
          <Button icon={<ArrowLeft size={16} />} />
          <Button icon={<ArrowRight size={16} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ButtonGroup
              children={
                <>
                  <Button icon={<ArrowLeft size={16} />} />
                  <Button icon={<ArrowRight size={16} />} />
                </>
              }
            />
          </div>
        </Showcase>



        <Showcase
          title="Button Tabs"
          description="Transform a button group into a selection tab bar using the tabs, active, and variant props."
          code={`import { useState } from 'react';
import { Button, ButtonGroup } from '@unbrn/ui/Button';

export default function Example() {
  const [activeGroupTab, setActiveGroupTab] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <ButtonGroup
        tabs
        variant="filled"
        children={
          <>
            <Button active={activeGroupTab === 0} onClick={() => setActiveGroupTab(0)} children="First" />
            <Button active={activeGroupTab === 1} onClick={() => setActiveGroupTab(1)} children="Second" />
          </>
        }
      />
    </div>
  );
}`}
        >

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <ButtonGroup
              tabs
              variant="filled"
              children={
                <>
                  <Button active={activeGroupTab === 0} onClick={() => setActiveGroupTab(0)} children="First" />
                  <Button active={activeGroupTab === 1} onClick={() => setActiveGroupTab(1)} children="Second" />
                </>
              }
            />
          </div>
        </Showcase>
      </div>


      <Props
        title="Button Props"
        props={[
          { name: 'variant', type: "'filled' | 'outlined' | 'duo' | 'ghost'", defaultValue: "'filled'", description: 'The style variant of the button.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'The button size.' },
          { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Show a loading spinner and turn off button clicks.' },
          { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Make the button fill the entire width of its box.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown inside the button.' },
          { name: 'iconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Show the icon on the left or right side.' },
          { name: 'opacityLevel', type: "'25' | '50' | '75' | '100'", defaultValue: "'100'", description: 'Set the background opacity level.' },
          { name: 'accentColor', type: 'string', description: 'Custom color theme for the button.' },
          { name: 'active', type: 'boolean', defaultValue: 'false', description: 'Applies active styling (useful for tabs in a ButtonGroup).' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the button.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the button.' },
          { name: 'disabled', type: 'boolean', description: 'Disable button interactions.' },
          { name: 'onClick', type: 'function', description: 'Handler for button click events.' },
          { name: 'type', type: "'button' | 'submit' | 'reset'", defaultValue: "'button'", description: 'HTML type attribute of the button.' },
          { name: '', type: 'ReactNode', description: 'The text or element contents inside the button.' },
          { name: 'id', type: 'string', description: 'Optional HTML ID attribute for the button.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the button (prefixed with button).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with button).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the root HTML button element.' },
          { name: 'icon', description: 'Styles the internal icon wrapper element.' },
          { name: 'loader', description: 'Styles the loading spinner icon container.' },
        ]}
        stylingStructure={`root
 ├── icon
 └── loader`}
      />

      <Props
        title="ButtonGroup Props"
        props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The button elements inside the group.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style of the button group.' },
          { name: 'tabs', type: 'boolean', defaultValue: 'false', description: 'Transform the button group into selection tabs with a sliding slider highlight.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the button group container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the button group container.' },
        ]}
      />
    </>
  );
};
