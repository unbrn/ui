import React, { useState, useEffect } from 'react';
import { ColorPicker } from '../../../package/components/ColorPicker/ColorPicker';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const ColorPickerPage: React.FC = () => {
  const [demoColor, setDemoColor] = useState('#FFFFFF');

  useEffect(() => {
    const updateDemoColor = () => {
      const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
      setDemoColor(isLightTheme ? '#000000' : '#FFFFFF');
    };

    updateDemoColor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateDemoColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ComponentHeader title="Color Picker" />

      <Showcase
        title="Preview"
        description="A premium color picker with hex/rgb/hsl manual text entry and custom interactive sliders."
        code={`import { useState } from 'react';
import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  const [color, setColor] = useState('#FFFFFF');

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Brand Color"
    />
  );
}`}
      >
        <ColorPicker
          value={demoColor}
          onChange={setDemoColor}
        />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return <ColorPicker label="Brand Color" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Three premium visual styles: filled, outlined (glass border), and duo (split look trigger)."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorPicker variant="filled" />
      <ColorPicker variant="outlined" />
      <ColorPicker variant="duo" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker variant="filled" />
            <ColorPicker variant="outlined" />
            <ColorPicker variant="duo" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Supports sm, default, and lg sizes."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorPicker size={1} />
      <ColorPicker size={2} />
      <ColorPicker size={3} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker size={1} />
            <ColorPicker size={2} />
            <ColorPicker size={3} />
          </div>
        </Showcase>
        <Showcase
          title="Visibility Toggles"
          description="Hide the eyedropper button or opacity/alpha slider using showEyeDropper and showAlpha toggles."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <ColorPicker
      label="Minimal Color Picker"
      showAlpha={false}
      showEyeDropper={false}
    />
  );
}`}
        >
          <ColorPicker
            showAlpha={false}
            showEyeDropper={false}
          />
        </Showcase>

        <Showcase
          title="Alignments"
          description="Position the popover aligned to the left, center, or right relative to the trigger button."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorPicker align="left" label="Left" />
      <ColorPicker align="center" label="Center" />
      <ColorPicker align="right" label="Right" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker align="left" />
            <ColorPicker align="center" />
            <ColorPicker align="right" />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Disabled state blocks clicks and user input while rendering correctly."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorPicker
        disabled
        label="System Accent"
      />
    </div>
  );
}`}
        >
          <ColorPicker
            disabled
          />
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'value', type: 'string', description: 'The controlled color value (hex string).' },
          { name: 'defaultValue', type: 'string', defaultValue: '"#FFFFFF"', description: 'The default color value.' },
          { name: 'onChange', type: '(color: string) => void', description: 'Callback triggered when the color changes.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable picker popover and inputs.' },
          { name: 'label', type: 'ReactNode', description: 'Label element shown above the picker.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The visual variant of the button trigger.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'The size of the button trigger.' },
          { name: 'align', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'The horizontal alignment of the popover relative to the trigger button.' },
          { name: 'className', type: 'string', description: 'Additional CSS class for the button trigger.' },
          { name: 'style', type: 'CSSProperties', description: 'Additional inline style for the button trigger.' },
          { name: 'id', type: 'string', description: 'Optional unique ID for the button element.' },
          { name: 'accentColor', type: 'string', description: 'Optional theme accent color override.' },
          { name: 'showEyeDropper', type: 'boolean', defaultValue: 'true', description: 'Whether to show the screen color eyedropper tool icon (supported in Chromium browsers).' },
          { name: 'showAlpha', type: 'boolean', defaultValue: 'true', description: 'Whether to show the alpha transparency slider.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for individual sub-elements.' },
          { name: 'styles', type: 'object', description: 'Custom inline styles for individual sub-elements.' }
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the wrapper container.' },
          { name: 'trigger', description: 'Styles the button trigger element.' },
          { name: 'popover', description: 'Styles the popup dialog box.' },
          { name: 'container', description: 'Styles the bottom row (format button & input field).' }
        ]}
        stylingStructure={`root
 ├── label
 └── colorPickerWrapper
      ├── trigger
      └── popover
           └── container`}
      />
    </>
  );
};
