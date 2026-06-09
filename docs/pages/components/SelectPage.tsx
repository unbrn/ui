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

export const SelectPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Select" />

      <Showcase
        title="Preview"
        code={`import { Select } from '@unburn/ui/Select';

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
          codeBlockCode={`import { Select } from '@unburn/ui/Select';

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
          code={`import { Select } from '@unburn/ui/Select';

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
          title="Sizes"
          description="Choose from small, medium, or large sizes."
          code={`import { Select } from '@unburn/ui/Select';

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
          code={`import { Select } from '@unburn/ui/Select';

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
          code={`import { Select } from '@unburn/ui/Select';
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
          { name: 'selectOptions', type: 'SelectOption[]', required: true, description: 'List of options with values, labels, and disabled states.' },
          { name: 'selectValue', type: 'string', description: 'The selected option value.' },
          { name: 'selectDefaultValue', type: 'string', description: 'The default selected option.' },
          { name: 'selectOnChange', type: '(value: string) => void', description: 'Function called when a new option is chosen.' },
          { name: 'selectPlaceholder', type: 'string', defaultValue: "'Select an option'", description: 'Text shown when no option is selected.' },
          { name: 'selectVariant', type: "'filled' | 'outlined' | 'duo'", defaultValue: "'filled'", description: 'The style variant of the dropdown.' },
          { name: 'selectSize', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the select box.' },
          { name: 'selectLabel', type: 'string', description: 'Label text shown above the dropdown.' },
          { name: 'selectDescription', type: 'string', description: 'Helpful detail text shown below the dropdown.' },
          { name: 'selectError', type: 'string', description: 'Error message to show under the dropdown.' },
          { name: 'selectDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable clicks on the dropdown.' },
          { name: 'selectClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'selectStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the dropdown.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
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
          { name: 'selectOptionDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable selecting this option.' },
        ]}
      />
    </>
  );
};
