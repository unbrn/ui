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
      colorPickerValue={color}
      colorPickerOnChange={setColor}
      colorPickerLabel="Brand Color"
    />
  );
}`}
      >
        <ColorPicker
          colorPickerValue={demoColor}
          colorPickerOnChange={setDemoColor}
        />
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return <ColorPicker colorPickerLabel="Brand Color" />;
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
      <ColorPicker colorPickerVariant="filled" />
      <ColorPicker colorPickerVariant="outlined" />
      <ColorPicker colorPickerVariant="duo" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker colorPickerVariant="filled" />
            <ColorPicker colorPickerVariant="outlined" />
            <ColorPicker colorPickerVariant="duo" />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Supports sm, default, and lg sizes."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorPicker colorPickerSize="sm" />
      <ColorPicker colorPickerSize="default" />
      <ColorPicker colorPickerSize="lg" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker colorPickerSize="sm" />
            <ColorPicker colorPickerSize="default" />
            <ColorPicker colorPickerSize="lg" />
          </div>
        </Showcase>
        <Showcase
          title="Visibility Toggles"
          description="Hide the eyedropper button or opacity/alpha slider using showEyeDropper and showAlpha toggles."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <ColorPicker
      colorPickerLabel="Minimal Color Picker"
      colorPickerShowAlpha={false}
      colorPickerShowEyeDropper={false}
    />
  );
}`}
        >
          <ColorPicker
            colorPickerShowAlpha={false}
            colorPickerShowEyeDropper={false}
          />
        </Showcase>

        <Showcase
          title="Alignments"
          description="Position the popover aligned to the left, center, or right relative to the trigger button."
          code={`import { ColorPicker } from '@unbrn/ui/ColorPicker';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorPicker colorPickerAlign="left" colorPickerLabel="Left" />
      <ColorPicker colorPickerAlign="center" colorPickerLabel="Center" />
      <ColorPicker colorPickerAlign="right" colorPickerLabel="Right" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker colorPickerAlign="left" />
            <ColorPicker colorPickerAlign="center" />
            <ColorPicker colorPickerAlign="right" />
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
        colorPickerDisabled
        colorPickerLabel="System Accent"
      />
    </div>
  );
}`}
        >
          <ColorPicker
            colorPickerDisabled
          />
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'colorPickerValue', type: 'string', description: 'The controlled color value (hex string).' },
          { name: 'colorPickerDefaultValue', type: 'string', defaultValue: '"#FFFFFF"', description: 'The default color value.' },
          { name: 'colorPickerOnChange', type: '(color: string) => void', description: 'Callback triggered when the color changes.' },
          { name: 'colorPickerDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable picker popover and inputs.' },
          { name: 'colorPickerLabel', type: 'ReactNode', description: 'Label element shown above the picker.' },
          { name: 'colorPickerVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The visual variant of the button trigger.' },
          { name: 'colorPickerSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the button trigger.' },
          { name: 'colorPickerAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'The horizontal alignment of the popover relative to the trigger button.' },
          { name: 'colorPickerClassName', type: 'string', description: 'Additional CSS class for the button trigger.' },
          { name: 'colorPickerStyle', type: 'CSSProperties', description: 'Additional inline style for the button trigger.' },
          { name: 'colorPickerId', type: 'string', description: 'Optional unique ID for the button element.' },
          { name: 'colorPickerAccentColor', type: 'string', description: 'Optional theme accent color override.' },
          { name: 'colorPickerShowEyeDropper', type: 'boolean', defaultValue: 'true', description: 'Whether to show the screen color eyedropper tool icon (supported in Chromium browsers).' },
          { name: 'colorPickerShowAlpha', type: 'boolean', defaultValue: 'true', description: 'Whether to show the alpha transparency slider.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for individual sub-elements.' },
          { name: 'styles', type: 'object', description: 'Custom inline styles for individual sub-elements.' }
        ]}
        stylingTargets={[
          { name: 'colorPickerRoot', description: 'Styles the wrapper container.' },
          { name: 'colorPickerTrigger', description: 'Styles the button trigger element.' },
          { name: 'colorPickerPopover', description: 'Styles the popup dialog box.' },
          { name: 'colorPickerInputContainer', description: 'Styles the bottom row (format button & input field).' }
        ]}
        stylingStructure={`colorPickerRoot
 ├── colorPickerLabel
 └── colorPickerWrapper
      ├── colorPickerTrigger
      └── colorPickerPopover
           └── colorPickerInputContainer`}
      />
    </>
  );
};
