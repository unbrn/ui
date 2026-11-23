import React, { useState } from 'react';
import { Modal } from '../../../package/components/Modal/Modal';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { Trash2 } from 'lucide-react';

export const ModalPage: React.FC = () => {
  const [basic, setBasic] = useState(false);
  const [variants, setVariants] = useState<'outlined' | 'duo' | 'filled' | null>(null);
  const [sizes, setSizes] = useState<1 | 2 | 3 | null>(null);
  const [colored, setColored] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <ComponentHeader title="Modal" />

      <Showcase
        title="Preview"
        description="A centered overlay dialog with glassmorphic backdrop blur, smooth enter/exit animations, and keyboard dismissal."
        code={`import { useState } from 'react';
import { Modal } from '@unbrn/ui/Modal';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)} children="Open Modal" />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Welcome"
        description="This is a basic modal dialog."
      >
        <p>Modal body content goes here. You can place any content inside.</p>
      </Modal>
    </>
  );
}`}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
          <Button size={1} variant="filled" onClick={() => setBasic(true)} children="Open Modal" />
          <Modal
            opened={basic}
            onClose={() => setBasic(false)}
            title="Welcome"
            description="This is a basic modal dialog."
          >
            <p>Modal body content goes here. You can place any content inside.</p>
          </Modal>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { useState } from 'react';
import { Modal } from '@unbrn/ui/Modal';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)} children="Open" />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Dialog Title"
        description="Optional description text."
      >
        <p>Your content here.</p>
      </Modal>
    </>
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Variants"
          description="Choose from three styles: outlined (glass), duo, and filled."
          code={`import { Modal } from '@unbrn/ui/Modal';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const [variant, setVariant] = useState(null);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button size={1} variant="outlined" onClick={() => setVariant('outlined')} children="Outlined" />
      <Button size={1} variant="outlined" onClick={() => setVariant('duo')} children="Duo" />
      <Button size={1} variant="outlined" onClick={() => setVariant('filled')} children="Filled" />

      <Modal
        opened={!!variant}
        onClose={() => setVariant(null)}
        variant={variant}
        title={\`\${variant?.charAt(0).toUpperCase()}\${variant?.slice(1)} Variant\`}
        description="Each variant has its own visual style."
      >
        <p>This modal uses the <strong>{variant}</strong> variant.</p>
      </Modal>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', padding: '1rem' }}>
            <Button size={1} variant="outlined" onClick={() => setVariants('outlined')} children="Outlined" />
            <Button size={1} variant="outlined" onClick={() => setVariants('duo')} children="Duo" />
            <Button size={1} variant="outlined" onClick={() => setVariants('filled')} children="Filled" />

            <Modal
              opened={!!variants}
              onClose={() => setVariants(null)}
              variant={variants || 'outlined'}
              title={`${variants?.charAt(0).toUpperCase()}${variants?.slice(1)} Variant`}
              description="Each variant has its own visual style."
            >
              <p>This modal uses the <strong>{variants}</strong> variant.</p>
            </Modal>
          </div>
        </Showcase>

        <Showcase
          title="Sizes"
          description="Three size tiers control the maximum width of the modal panel."
          code={`import { Modal } from '@unbrn/ui/Modal';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const [size, setSize] = useState(null);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button size={1} variant="outlined" onClick={() => setSize(1)} children="Small" />
      <Button size={1} variant="outlined" onClick={() => setSize(2)} children="Default" />
      <Button size={1} variant="outlined" onClick={() => setSize(3)} children="Large" />

      <Modal
        opened={!!size}
        onClose={() => setSize(null)}
        size={size}
        title="Size Demo"
        description={\`This modal is size \${size}.\`}
      >
        <p>The content fills the available space within the modal.</p>
      </Modal>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', padding: '1rem' }}>
            <Button size={1} variant="outlined" onClick={() => setSizes(1)} children="Small" />
            <Button size={1} variant="outlined" onClick={() => setSizes(2)} children="Default" />
            <Button size={1} variant="outlined" onClick={() => setSizes(3)} children="Large" />

            <Modal
              opened={!!sizes}
              onClose={() => setSizes(null)}
              size={sizes || 2}
              title="Size Demo"
              description={`This modal is size ${sizes}.`}
            >
              <p>The content fills the available space within the modal.</p>
            </Modal>
          </div>
        </Showcase>

        <Showcase
          title="With Accent Color"
          description="Apply custom accent colors using the accentColor prop."
          code={`import { Modal } from '@unbrn/ui/Modal';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button size={1} accentColor="blue" onClick={() => setOpened(true)} children="Blue Modal" />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        accentColor="blue"
        variant="duo"
        title="Custom Accent"
        description="This modal uses a blue accent color."
      >
        <p>Accent colors tint the header, borders, and close button.</p>
      </Modal>
    </>
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Button size={1} accentColor="blue" onClick={() => setColored(true)} children="Blue Modal" />
            <Modal
              opened={colored}
              onClose={() => setColored(false)}
              accentColor="blue"
              variant="duo"
              title="Custom Accent"
              description="This modal uses a blue accent color."
            >
              <p>Accent colors tint the header, borders, and close button.</p>
            </Modal>
          </div>
        </Showcase>

        <Showcase
          title="With Footer Actions"
          description="Add confirmation buttons or other actions using the footer prop."
          code={`import { Modal } from '@unbrn/ui/Modal';
import { Button } from '@unbrn/ui/Button';
import { Trash2 } from 'lucide-react';

export default function Example() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button size={1} accentColor="red" icon={<Trash2 size={14} />} onClick={() => setOpened(true)} children="Delete" />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Deletion"
        description="This action cannot be undone."
        size={1}
        footer={
          <>
            <Button variant="outlined" size={1} onClick={() => setOpened(false)} children="Cancel" />
            <Button accentColor="red" size={1} onClick={() => setOpened(false)} children="Delete" />
          </>
        }
      >
        <p>Are you sure you want to delete this item? All associated data will be permanently removed.</p>
      </Modal>
    </>
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Button size={1} accentColor="red" icon={<Trash2 size={14} />} onClick={() => setConfirm(true)} children="Delete" />
            <Modal
              opened={confirm}
              onClose={() => setConfirm(false)}
              title="Confirm Deletion"
              description="This action cannot be undone."
              size={1}
              footer={
                <>
                  <Button variant="outlined" size={1} onClick={() => setConfirm(false)} children="Cancel" />
                  <Button accentColor="red" size={1} onClick={() => setConfirm(false)} children="Delete" />
                </>
              }
            >
              <p>Are you sure you want to delete this item? All associated data will be permanently removed.</p>
            </Modal>
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'opened', type: 'boolean', required: true, description: 'Controls the visibility of the modal.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Callback fired when the modal is dismissed.' },
          { name: 'title', type: 'ReactNode', description: 'Header title text of the modal.' },
          { name: 'description', type: 'ReactNode', description: 'Subtitle text shown below the title.' },
          { name: 'variant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'outlined'", description: 'The style variant of the modal panel.' },
          { name: 'size', type: '1 | 2 | 3', defaultValue: '2', description: 'Controls the maximum width of the modal (400px / 520px / 680px).' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color for theming (hex, rgb, named color).' },
          { name: 'closeOnOverlayClick', type: 'boolean', defaultValue: 'true', description: 'Whether clicking the overlay backdrop closes the modal.' },
          { name: 'closeOnEscape', type: 'boolean', defaultValue: 'true', description: 'Whether pressing Escape closes the modal.' },
          { name: 'showCloseButton', type: 'boolean', defaultValue: 'true', description: 'Whether to show the X close button in the header.' },
          { name: 'overlayBlur', type: "'none' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'lg'", description: 'Backdrop blur intensity for the overlay (none, 8px, 14px, 20px, 32px).' },
          { name: 'portal', type: 'boolean', defaultValue: 'true', description: 'Whether to render the modal directly into document.body using React Portal.' },
          { name: 'footer', type: 'ReactNode', description: 'Content rendered in the footer area (typically action buttons).' },
          { name: 'children', type: 'ReactNode', description: 'Body content rendered inside the modal.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the modal panel.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline styles for the modal panel.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the modal.' },
          { name: 'styles', type: 'object', description: 'Custom inline styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the modal panel container.' },
          { name: 'overlay', description: 'Styles the backdrop overlay.' },
          { name: 'header', description: 'Styles the header section with title and close button.' },
          { name: 'title', description: 'Styles the title text.' },
          { name: 'description', description: 'Styles the description text below the title.' },
          { name: 'body', description: 'Styles the scrollable body content area.' },
          { name: 'footer', description: 'Styles the footer action bar.' },
          { name: 'close', description: 'Styles the close button.' },
        ]}
        stylingStructure={`overlay
 └── root
      ├── header
      │    ├── title
      │    ├── description
      │    └── close
      ├── body
      └── footer`}
      />
    </>
  );
};
