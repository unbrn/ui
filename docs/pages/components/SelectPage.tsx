import React, { useState } from 'react';
import { Select } from '../../../package/components/Select/Select';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
];

const ControlledSelectExample = () => {
  const [value, setValue] = useState('banana');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Select
        label="Select a fruit"
        options={fruitOptions}
        value={value}
        onChange={setValue}
        description={`Selection: ${value}`}
      />
    </div>
  );
};

export const SelectPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Select" />

      <Showcase
        title="PREVIEW"
        code={`import { Select } from '@unburn/ui/Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
];

export default function Example() {
  return (
    <div style={{ width: '300px' }}>
      <Select
        options={fruitOptions}
        placeholder="Choose a fruit"
        label="Favorite Fruit"
      />
    </div>
  );
}`}
      >
        <div style={{ width: '300px', paddingBottom: '200px' }}>
          <Select
            options={fruitOptions}
            placeholder="Choose a fruit"
            label="Favorite Fruit"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Select } from '@unburn/ui/Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

export default function Example() {
  return <Select options={options} label="Choose an option" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="VARIANTS"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Select } from '@unburn/ui/Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select variant="filled" label="Filled (Default)" options={fruitOptions} defaultValue="apple" />
      <Select variant="outlined" label="Outlined Variant" options={fruitOptions} defaultValue="banana" />
      <Select variant="duo" label="Duo Variant" options={fruitOptions} defaultValue="blueberry" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px', paddingBottom: '200px' }}>
            <Select variant="filled" label="Filled (Default)" options={fruitOptions.slice(0, 3)} defaultValue="apple" />
            <Select variant="outlined" label="Outlined Variant" options={fruitOptions.slice(0, 3)} defaultValue="banana" />
            <Select variant="duo" label="Duo Variant" options={fruitOptions.slice(0, 3)} defaultValue="blueberry" />
          </div>
        </Showcase>

        <Showcase
          title="SIZES"
          description="Choose from small, medium, or large sizes."
          code={`import { Select } from '@unburn/ui/Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select size="sm" placeholder="Small Select" options={fruitOptions} />
      <Select size="default" placeholder="Default Select" options={fruitOptions} />
      <Select size="lg" placeholder="Large Select" options={fruitOptions} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px', paddingBottom: '200px' }}>
            <Select size="sm" placeholder="Small Select" options={fruitOptions} />
            <Select size="default" placeholder="Default Select" options={fruitOptions} />
            <Select size="lg" placeholder="Large Select" options={fruitOptions} />
          </div>
        </Showcase>

        <Showcase
          title="STATES"
          description="Use error states and disabled dropdowns for forms."
          code={`import { Select } from '@unburn/ui/Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
      <Select
        label="Error State"
        error="Please select a valid fruit."
        options={fruitOptions}
        placeholder="Error highlight"
      />
      <Select
        label="Disabled"
        disabled
        options={fruitOptions}
        placeholder="Cannot interact"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px', paddingBottom: '200px' }}>
            <Select
              label="Error State"
              error="Please select a valid fruit."
              options={fruitOptions}
              placeholder="Error highlight"
            />
            <Select
              label="Disabled"
              disabled
              options={fruitOptions}
              placeholder="Cannot interact"
            />
          </div>
        </Showcase>

        <Showcase
          title="CONTROLLED"
          description="Control and track selected options easily."
          code={`import { Select } from '@unburn/ui/Select';
import { useState } from 'react';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];

export default function Example() {
  const [value, setValue] = useState('banana');

  return (
    <div style={{ width: '300px' }}>
      <Select
        label="Select a fruit"
        options={fruitOptions}
        value={value}
        onChange={setValue}
        description={\`Selection: \${value}\`}
      />
    </div>
  );
}`}
        >
          <div style={{ width: '300px', paddingBottom: '200px' }}>
            <ControlledSelectExample />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'options', type: 'SelectOption[]', required: true, description: 'List of options with values, labels, and disabled states.' },
          { name: 'value', type: 'string', description: 'The selected option value.' },
          { name: 'defaultValue', type: 'string', description: 'The default selected option.' },
          { name: 'onChange', type: '(value: string) => void', description: 'Function called when a new option is chosen.' },
          { name: 'placeholder', type: 'string', defaultValue: "'Select an option'", description: 'Text shown when no option is selected.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the dropdown.' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the select box.' },
          { name: 'label', type: 'string', description: 'Label text shown above the dropdown.' },
          { name: 'description', type: 'string', description: 'Helpful detail text shown below the dropdown.' },
          { name: 'error', type: 'string', description: 'Error message to show under the dropdown.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the dropdown.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the dropdown.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />
    </>
  );
};
