import React, { useState } from 'react';
import { Select } from '../../../package/components/Select/Select';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

const fruitOptions = [
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' },
  { selectOptionValue: 'blueberry', selectOptionLabel: 'Blueberry' },
  { selectOptionValue: 'grapes', selectOptionLabel: 'Grapes' },
  { selectOptionValue: 'pineapple', selectOptionLabel: 'Pineapple' },
];

const ControlledSelectExample = () => {
  const [value, setValue] = useState('banana');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Select
        selectLabel="Select a fruit"
        selectOptions={fruitOptions}
        selectValue={value}
        selectOnChange={setValue}
        selectDescription={`Selection: ${value}`}
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
        selectLabel="Loading State"
        selectOptions={fruitOptions}
        selectPlaceholder="Fetching options..."
        selectLoading={loading}
      />
      <button
        onClick={simulate}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.08)',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        {loading ? 'Loading...' : 'Simulate Load'}
      </button>
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
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' },
  { selectOptionValue: 'blueberry', selectOptionLabel: 'Blueberry' },
  { selectOptionValue: 'grapes', selectOptionLabel: 'Grapes' },
  { selectOptionValue: 'pineapple', selectOptionLabel: 'Pineapple' },
];

export default function Example() {
  return (
    <div style={{ width: '300px' }}>
      <Select
        selectOptions={fruitOptions}
        selectPlaceholder="Choose a fruit"
        selectLabel="Favorite Fruit"
      />
    </div>
  );
}`}
      >
        <div style={{ width: '300px', paddingBottom: '200px' }}>
          <Select
            selectOptions={fruitOptions}
            selectPlaceholder="Choose a fruit"
            selectLabel="Favorite Fruit"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Select } from '@unbrn/ui/Select';

const options = [
  { selectOptionValue: '1', selectOptionLabel: 'Option 1' },
  { selectOptionValue: '2', selectOptionLabel: 'Option 2' },
];

export default function Example() {
  return <Select selectOptions={options} selectLabel="Choose an option" />;
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
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' },
  { selectOptionValue: 'blueberry', selectOptionLabel: 'Blueberry' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select selectVariant="filled" selectLabel="Filled (Default)" selectOptions={fruitOptions} selectDefaultValue="apple" />
      <Select selectVariant="outlined" selectLabel="Outlined Variant" selectOptions={fruitOptions} selectDefaultValue="banana" />
      <Select selectVariant="duo" selectLabel="Duo Variant" selectOptions={fruitOptions} selectDefaultValue="blueberry" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px', paddingBottom: '200px' }}>
            <Select selectVariant="filled" selectLabel="Filled (Default)" selectOptions={fruitOptions.slice(0, 3)} selectDefaultValue="apple" />
            <Select selectVariant="outlined" selectLabel="Outlined Variant" selectOptions={fruitOptions.slice(0, 3)} selectDefaultValue="banana" />
            <Select selectVariant="duo" selectLabel="Duo Variant" selectOptions={fruitOptions.slice(0, 3)} selectDefaultValue="blueberry" />
          </div>
        </Showcase>

        <Showcase
          title="Accent Color"
          description="Apply a custom accent color to the border, focus ring, and spinner using selectAccentColor."
          code={`import { Select } from '@unbrn/ui/Select';

const fruitOptions = [
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' },
  { selectOptionValue: 'blueberry', selectOptionLabel: 'Blueberry' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select selectVariant='duo' selectAccentColor="#7c3aed" selectLabel="Purple" selectOptions={fruitOptions} selectDefaultValue="apple" />
      <Select selectVariant='duo' selectAccentColor="#0ea5e9" selectLabel="Sky Blue" selectOptions={fruitOptions} selectDefaultValue="banana" />
      <Select selectVariant='duo' selectAccentColor="#f5a623" selectLabel="Amber" selectOptions={fruitOptions} selectDefaultValue="blueberry" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px', paddingBottom: '200px' }}>
            <Select selectVariant='duo' selectAccentColor="#7c3aed" selectLabel="Purple" selectOptions={fruitOptions.slice(0, 3)} selectDefaultValue="apple" />
            <Select selectVariant='duo' selectAccentColor="#0ea5e9" selectLabel="Sky Blue" selectOptions={fruitOptions.slice(0, 3)} selectDefaultValue="banana" />
            <Select selectVariant='duo' selectAccentColor="#f5a623" selectLabel="Amber" selectOptions={fruitOptions.slice(0, 3)} selectDefaultValue="blueberry" />
          </div>
        </Showcase>

        <Showcase
          title="Loading State"
          description="Show a spinner and block interaction while options are being fetched using selectLoading."
          code={`import { Select } from '@unbrn/ui/Select';
import { useState } from 'react';

const fruitOptions = [
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' },
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
        selectLabel="Loading State"
        selectOptions={fruitOptions}
        selectPlaceholder="Fetching options..."
        selectLoading={loading}
      />
      <button onClick={simulate}>
        {loading ? 'Loading...' : 'Simulate Load'}
      </button>
    </div>
  );
}`}
        >
          <div style={{ paddingBottom: '80px' }}>
            <LoadingToggleExample />
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Choose from small, medium, or large sizes."
          code={`import { Select } from '@unbrn/ui/Select';

const fruitOptions = [
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select selectSize="sm" selectPlaceholder="Small Select" selectOptions={fruitOptions} />
      <Select selectSize="default" selectPlaceholder="Default Select" selectOptions={fruitOptions} />
      <Select selectSize="lg" selectPlaceholder="Large Select" selectOptions={fruitOptions} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px', paddingBottom: '200px' }}>
            <Select selectSize="sm" selectPlaceholder="Small Select" selectOptions={fruitOptions.slice(0, 2)} />
            <Select selectSize="default" selectPlaceholder="Default Select" selectOptions={fruitOptions.slice(0, 2)} />
            <Select selectSize="lg" selectPlaceholder="Large Select" selectOptions={fruitOptions.slice(0, 2)} />
          </div>
        </Showcase>

        <Showcase
          title="States"
          description="Use error states and disabled dropdowns for forms."
          code={`import { Select } from '@unbrn/ui/Select';

const fruitOptions = [
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' }
];

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
      <Select
        selectLabel="Error State"
        selectError="Please select a valid fruit."
        selectOptions={fruitOptions}
        selectPlaceholder="Error highlight"
      />
      <Select
        selectLabel="Disabled"
        selectDisabled
        selectOptions={fruitOptions}
        selectPlaceholder="Cannot interact"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px', paddingBottom: '200px' }}>
            <Select
              selectLabel="Error State"
              selectError="Please select a valid fruit."
              selectOptions={fruitOptions.slice(0, 2)}
              selectPlaceholder="Error highlight"
            />
            <Select
              selectLabel="Disabled"
              selectDisabled
              selectOptions={fruitOptions.slice(0, 2)}
              selectPlaceholder="Cannot interact"
            />
          </div>
        </Showcase>

        <Showcase
          title="Controlled"
          description="Control and track selected options easily."
          code={`import { Select } from '@unbrn/ui/Select';
import { useState } from 'react';

const fruitOptions = [
  { selectOptionValue: 'apple', selectOptionLabel: 'Apple' },
  { selectOptionValue: 'banana', selectOptionLabel: 'Banana' },
  { selectOptionValue: 'blueberry', selectOptionLabel: 'Blueberry' }
];

export default function Example() {
  const [value, setValue] = useState('banana');

  return (
    <div style={{ width: '300px' }}>
      <Select
        selectLabel="Select a fruit"
        selectOptions={fruitOptions}
        selectValue={value}
        selectOnChange={setValue}
        selectDescription={\`Selection: \${value}\`}
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
        title="Select Props"
        props={[
          { name: 'selectOptions', type: 'SelectOption[]', required: true, description: 'List of options with values, labels, icons, and disabled states.' },
          { name: 'selectValue', type: 'string', description: 'The controlled selected option value.' },
          { name: 'selectDefaultValue', type: 'string', description: 'The default selected option (uncontrolled).' },
          { name: 'selectOnChange', type: '(value: string) => void', description: 'Callback fired when a new option is chosen.' },
          { name: 'selectPlaceholder', type: 'string', defaultValue: "'Select an option'", description: 'Text shown when no option is selected.' },
          { name: 'selectVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The visual style variant of the dropdown.' },
          { name: 'selectSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the select trigger.' },
          { name: 'selectAccentColor', type: 'string', description: 'Custom accent color applied to the focus ring, open border, and loading spinner. Accepts any CSS color value.' },
          { name: 'selectLoading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinning indicator and disables interaction. Use when fetching options asynchronously.' },
          { name: 'selectLabel', type: 'string', description: 'Label text displayed above the dropdown.' },
          { name: 'selectDescription', type: 'string', description: 'Helper text shown below the dropdown.' },
          { name: 'selectError', type: 'string', description: 'Error message displayed below the dropdown with error styling.' },
          { name: 'selectDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables all interaction with the dropdown.' },
          { name: 'selectIcon', type: 'React.ReactNode', description: 'Static icon shown inside the trigger when no option is selected.' },
          { name: 'selectClassName', type: 'string', description: 'Additional CSS class for the trigger button.' },
          { name: 'selectStyle', type: 'React.CSSProperties', description: 'Inline styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each internal part.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each internal part.' },
        ]}
        stylingTargets={[
          { name: 'selectRoot', description: 'Styles the outer Select container.' },
          { name: 'selectLabel', description: 'Styles the label text element.' },
          { name: 'selectTrigger', description: 'Styles the toggle/trigger button.' },
          { name: 'selectContent', description: 'Styles the dropdown menu panel containing option items.' },
          { name: 'selectItem', description: 'Styles each option list item.' },
          { name: 'selectDescription', description: 'Styles the description text below the trigger.' },
          { name: 'selectError', description: 'Styles the error message text below the trigger.' },
        ]}
        stylingStructure={`selectRoot
 ├── selectLabel
 ├── selectTrigger
 ├── selectContent
 │    └── selectItem
 ├── selectDescription
 └── selectError`}
      />

      <Props
        title="SelectOption Props"
        props={[
          { name: 'selectOptionValue', type: 'string', required: true, description: 'The value associated with the option.' },
          { name: 'selectOptionLabel', type: 'string', required: true, description: 'The user-facing label text of the option.' },
          { name: 'selectOptionIcon', type: 'React.ReactNode', description: 'Icon rendered to the left of the label, also shown in the trigger when selected.' },
          { name: 'selectOptionDisabled', type: 'boolean', defaultValue: 'false', description: 'Prevents this option from being selected.' },
        ]}
      />
    </>
  );
};
