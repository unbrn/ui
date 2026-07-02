import React, { useState } from 'react';
import { Select } from '../../../package/components/Select/Select';
import { Button } from '../../../package/components/Button/Button';
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

const LoadingToggleExample = () => {
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Select
        label="Loading State"
        options={fruitOptions}
        placeholder="Fetching options..."
        loading={loading}
      />
      <Button
        onClick={simulate}
        variant='outlined'
        size={2}
        disabled={loading}
      >
        Simulate Load
      </Button>
    </div>
  );
};

export const SelectPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Select" />

      <Showcase
        title="Preview"
        code={`import { Select } from '@unbrn/ui/Select';

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
        <div style={{ width: '300px' }}>
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
          code={`import { Select } from '@unbrn/ui/Select';

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
          title="Variants"
          description="Choose from three styles: filled, outlined, and duo."
          code={`import { Select } from '@unbrn/ui/Select';

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
            <Select variant="filled" label="Filled (Default)" options={fruitOptions.slice(0, 3)} defaultValue="apple" />
            <Select variant="outlined" label="Outlined Variant" options={fruitOptions.slice(0, 3)} defaultValue="banana" />
            <Select variant="duo" label="Duo Variant" options={fruitOptions.slice(0, 3)} defaultValue="blueberry" />
          </div>
        </Showcase>

        <Showcase
          title="Accent Color"
          description="Apply a custom accent color to the border, focus ring, and spinner using accentColor."
          code={`import { Select } from '@unbrn/ui/Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select variant='duo' accentColor="#10b981" label="Purple" options={fruitOptions} defaultValue="apple" />
      <Select variant='duo' accentColor="#10b981" label="Sky Blue" options={fruitOptions} defaultValue="banana" />
      <Select variant='duo' accentColor="#10b981" label="Amber" options={fruitOptions} defaultValue="blueberry" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
            <Select variant='duo' accentColor="#10b981" options={fruitOptions.slice(0, 3)} defaultValue="apple" />
            <Select variant='outlined' accentColor="#10b981" options={fruitOptions.slice(0, 3)} defaultValue="banana" />
            <Select variant='filled' accentColor="#10b981" options={fruitOptions.slice(0, 3)} defaultValue="blueberry" />
          </div>
        </Showcase>

        <Showcase
          title="Loading State"
          description="Show a spinner and block interaction while options are being fetched using loading."
          code={`import { Select } from '@unbrn/ui/Select';
import { useState } from 'react';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

export default function Example() {
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Select
        label="Loading State"
        options={fruitOptions}
        placeholder="Fetching options..."
        loading={loading}
      />
      <button onClick={simulate}>
        {loading ? 'Loading...' : 'Simulate Load'}
      </button>
    </div>
  );
}`}
        >
          <div>
            <LoadingToggleExample />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from default or large sizes."
          code={`import { Select } from '@unbrn/ui/Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select size={2} placeholder="Default Select" options={fruitOptions} />
      <Select size={3} placeholder="Large Select" options={fruitOptions} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
            <Select size={2} placeholder="Default Select" options={fruitOptions.slice(0, 2)} />
            <Select size={3} placeholder="Large Select" options={fruitOptions.slice(0, 2)} />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use error states and disabled dropdowns for forms."
          code={`import { Select } from '@unbrn/ui/Select';

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
            <Select
              label="Error State"
              error="Please select a valid fruit."
              options={fruitOptions.slice(0, 2)}
              placeholder="Error highlight"
            />
            <Select
              label="Disabled"
              disabled
              options={fruitOptions.slice(0, 2)}
              placeholder="Cannot interact"
            />
          </div>
        </Showcase>

        <Showcase
          title="Controlled"
          description="Control and track selected options easily."
          code={`import { Select } from '@unbrn/ui/Select';
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
          <div style={{ width: '300px' }}>
            <ControlledSelectExample />
          </div>
        </Showcase>

        <Showcase
          title="Searchable / Autocomplete"
          description="Type in the select trigger to search and filter options instantly."
          code={`import { Select } from '@unbrn/ui/Select';

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
        label="Searchable Select"
        options={fruitOptions}
        placeholder="Type to filter..."
        searchable
      />
    </div>
  );
}`}
        >
          <div style={{ width: '300px' }}>
            <Select
              label="Searchable Select"
              options={fruitOptions}
              placeholder="Type to filter..."
              searchable
            />
          </div>
        </Showcase>
      </div>

      <Props
        title="Select Props"
        props={[
          { name: 'options', type: 'SelectOption[]', required: true, description: 'List of options with values, labels, icons, and disabled states.' },
          { name: 'value', type: 'string', description: 'The controlled selected option value.' },
          { name: 'defaultValue', type: 'string', description: 'The default selected option (uncontrolled).' },
          { name: 'onChange', type: '(value: string) => void', description: 'Callback fired when a new option is chosen.' },
          { name: 'placeholder', type: 'string', defaultValue: "'Select an option'", description: 'Text shown when no option is selected.' },
          { name: 'variant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The visual style variant of the dropdown.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'The size of the select trigger and dropdown items.' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color applied to the focus ring, open border, and loading spinner. Accepts any CSS color value.' },
          { name: 'searchable', type: 'boolean', defaultValue: 'false', description: 'Turns the trigger into a text input allowing users to search and filter dropdown options in real-time.' },
          { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinning indicator and disables interaction. Use when fetching options asynchronously.' },
          { name: 'label', type: 'string', description: 'Label text displayed above the dropdown.' },
          { name: 'description', type: 'string', description: 'Helper text shown below the dropdown.' },
          { name: 'error', type: 'string', description: 'Error message displayed below the dropdown with error styling.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables all interaction with the dropdown.' },
          { name: 'icon', type: 'React.ReactNode', description: 'Static icon shown inside the trigger when no option is selected.' },
          { name: 'className', type: 'string', description: 'Additional CSS class for the trigger button.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each internal part.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each internal part.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer Select container.' },
          { name: 'label', description: 'Styles the label text element.' },
          { name: 'trigger', description: 'Styles the toggle/trigger button.' },
          { name: 'content', description: 'Styles the dropdown menu panel containing option items.' },
          { name: 'item', description: 'Styles each option list item.' },
          { name: 'description', description: 'Styles the description text below the trigger.' },
          { name: 'error', description: 'Styles the error message text below the trigger.' },
        ]}
        stylingStructure={`root
 ├── label
 ├── trigger
 ├── content
 │    └── item
 ├── description
 └── error`}
      />

      <Props
        title="SelectOption Props"
        props={[
          { name: 'value', type: 'string', required: true, description: 'The value associated with the option.' },
          { name: 'label', type: 'string', required: true, description: 'The user-facing label text of the option.' },
          { name: 'icon', type: 'React.ReactNode', description: 'Icon rendered to the left of the label, also shown in the trigger when selected.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Prevents this option from being selected.' },
        ]}
      />
    </>
  );
};
