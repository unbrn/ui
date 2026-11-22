import React from 'react';
import { ToastProvider, useToast } from '../../../package/components/Toast/Toast';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';


const BasicDemo: React.FC = () => {
  const { toast } = useToast();
  return (
    <Button
      size={1}
      variant="filled"
      onClick={() => toast({ title: 'Saved successfully', message: 'Your changes have been saved.' })}
      children="Show Toast"
    />
  );
};

const ColorsDemo: React.FC = () => {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button
        size={1}
        accentColor="green"
        onClick={() => toast({ title: 'Success', message: 'Operation completed.', icon: <CheckCircle2 size={16} />, accentColor: 'green' })}
        children="Success"
      />
      <Button
        size={1}
        accentColor="blue"
        onClick={() => toast({ title: 'Information', message: 'Here is some useful info.', icon: <Info size={16} />, accentColor: 'blue' })}
        children="Info"
      />
      <Button
        size={1}
        accentColor="orange"
        onClick={() => toast({ title: 'Warning', message: 'Please check your input.', icon: <AlertTriangle size={16} />, accentColor: 'orange' })}
        children="Warning"
      />
      <Button
        size={1}
        accentColor="red"
        onClick={() => toast({ title: 'Error', message: 'Something went wrong.', icon: <X size={16} />, accentColor: 'red' })}
        children="Error"
      />
    </div>
  );
};

const VariantsDemo: React.FC = () => {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button
        size={1}
        variant="outlined"
        onClick={() => toast({ title: 'Outlined Toast', message: 'The default glass style.', variant: 'outlined', icon: <Info size={16} /> })}
        children="Outlined"
      />
      <Button
        size={1}
        variant="outlined"
        onClick={() => toast({ title: 'Duo Toast', message: 'A softer tinted style.', variant: 'duo', accentColor: 'blue', icon: <Info size={16} /> })}
        children="Duo"
      />
      <Button
        size={1}
        variant="outlined"
        onClick={() => toast({ title: 'Filled Toast', message: 'A bold, solid style.', variant: 'filled', icon: <Info size={16} /> })}
        children="Filled"
      />
    </div>
  );
};

const ActionsDemo: React.FC = () => {
  const { toast, dismiss } = useToast();
  return (
    <Button
      size={1}
      accentColor="blue"
      onClick={() => {
        const id = toast({
          title: 'New update available',
          message: 'Version 3.0 is ready to install.',
          icon: <Info size={16} />,
          accentColor: 'blue',
          variant: 'duo',
          duration: 8000,
          actions: (
            <>
              <Button size={1} accentColor="blue" onClick={() => dismiss(id)} children="Update Now" />
              <Button size={1} variant="ghost" onClick={() => dismiss(id)} children="Later" />
            </>
          ),
        });
      }}
      children="Toast with Actions"
    />
  );
};

const PersistentDemo: React.FC = () => {
  const { toast } = useToast();
  return (
    <Button
      size={1}
      variant="outlined"
      onClick={() => toast({ title: 'Persistent Toast', message: 'This toast stays until manually dismissed.', duration: 0, icon: <Info size={16} /> })}
      children="Persistent Toast"
    />
  );
};

const DemoProvider: React.FC<{ children: React.ReactNode; position?: any }> = ({ children, position }) => (
  <ToastProvider position={position || 'bottom-right'}>
    {children}
  </ToastProvider>
);

export const ToastPage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Toast" />

      <Showcase
        title="Preview"
        description="An imperative toast notification system with auto-dismiss progress bar, position-aware slide animations, and variant styling."
        code={`import { ToastProvider, useToast } from '@unbrn/ui/Toast';
import { Button } from '@unbrn/ui/Button';

function MyApp() {
  return (
    <ToastProvider position="bottom-right">
      <Example />
    </ToastProvider>
  );
}

function Example() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => toast({
        title: 'Saved successfully',
        message: 'Your changes have been saved.',
      })}
      children="Show Toast"
    />
  );
}`}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
          <DemoProvider>
            <BasicDemo />
          </DemoProvider>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { ToastProvider, useToast } from '@unbrn/ui/Toast';
import { Button } from '@unbrn/ui/Button';

function App() {
  return (
    <ToastProvider position="bottom-right">
      <YourApp />
    </ToastProvider>
  );
}

function YourApp() {
  const { toast, dismiss, dismissAll } = useToast();

  const handleClick = () => {
    toast({
      title: 'Hello!',
      message: 'This is a toast notification.',
      duration: 4000,
    });
  };

  return <Button onClick={handleClick} children="Notify" />;
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Colors"
          description="Use accentColor with icons to create semantic toast types."
          code={`import { useToast } from '@unbrn/ui/Toast';
import { Button } from '@unbrn/ui/Button';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

function Example() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button accentColor="green" onClick={() => toast({ title: 'Success', message: 'Operation completed.', icon: <CheckCircle2 size={16} />, accentColor: 'green' })} children="Success" />
      <Button accentColor="blue" onClick={() => toast({ title: 'Information', message: 'Here is some useful info.', icon: <Info size={16} />, accentColor: 'blue' })} children="Info" />
      <Button accentColor="orange" onClick={() => toast({ title: 'Warning', message: 'Please check your input.', icon: <AlertTriangle size={16} />, accentColor: 'orange' })} children="Warning" />
      <Button accentColor="red" onClick={() => toast({ title: 'Error', message: 'Something went wrong.', icon: <X size={16} />, accentColor: 'red' })} children="Error" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', padding: '1rem' }}>
            <DemoProvider>
              <ColorsDemo />
            </DemoProvider>
          </div>
        </Showcase>

        <Showcase
          title="Variants"
          description="Choose from three styles: outlined (glass), duo, and filled."
          code={`import { useToast } from '@unbrn/ui/Toast';
import { Button } from '@unbrn/ui/Button';
import { Info } from 'lucide-react';

function Example() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button onClick={() => toast({ title: 'Outlined Toast', variant: 'outlined', icon: <Info size={16} /> })} children="Outlined" />
      <Button onClick={() => toast({ title: 'Duo Toast', variant: 'duo', accentColor: 'blue', icon: <Info size={16} /> })} children="Duo" />
      <Button onClick={() => toast({ title: 'Filled Toast', variant: 'filled', icon: <Info size={16} /> })} children="Filled" />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', padding: '1rem' }}>
            <DemoProvider>
              <VariantsDemo />
            </DemoProvider>
          </div>
        </Showcase>

        <Showcase
          title="With Actions"
          description="Add interactive buttons to toasts for inline user actions."
          code={`import { useToast } from '@unbrn/ui/Toast';
import { Button } from '@unbrn/ui/Button';
import { Info } from 'lucide-react';

function Example() {
  const { toast, dismiss } = useToast();

  return (
    <Button
      accentColor="blue"
      onClick={() => {
        const id = toast({
          title: 'New update available',
          message: 'Version 3.0 is ready to install.',
          icon: <Info size={16} />,
          accentColor: 'blue',
          variant: 'duo',
          duration: 8000,
          actions: (
            <>
              <Button size={1} accentColor="blue" onClick={() => dismiss(id)} children="Update Now" />
              <Button size={1} variant="ghost" onClick={() => dismiss(id)} children="Later" />
            </>
          ),
        });
      }}
      children="Toast with Actions"
    />
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <DemoProvider>
              <ActionsDemo />
            </DemoProvider>
          </div>
        </Showcase>

        <Showcase
          title="Persistent Toast"
          description="Set duration to 0 for toasts that stay until manually dismissed."
          code={`import { useToast } from '@unbrn/ui/Toast';
import { Button } from '@unbrn/ui/Button';
import { Info } from 'lucide-react';

function Example() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => toast({
        title: 'Persistent Toast',
        message: 'This toast stays until manually dismissed.',
        duration: 0,
        icon: <Info size={16} />,
      })}
      children="Persistent Toast"
    />
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <DemoProvider>
              <PersistentDemo />
            </DemoProvider>
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'position', type: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'", defaultValue: "'bottom-right'", description: 'Position of the toast container on screen. (ToastProvider prop)' },
          { name: 'limit', type: 'number', defaultValue: '5', description: 'Maximum number of visible toasts at once. (ToastProvider prop)' },
          { name: 'title', type: 'string', required: true, description: 'The heading text of the toast notification.' },
          { name: 'message', type: 'ReactNode', description: 'Description text shown below the title.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown to the left of the content.' },
          { name: 'variant', type: "'outlined' | 'duo' | 'filled'", defaultValue: "'outlined'", description: 'The style variant of the toast.' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color for theming (hex, rgb, named color).' },
          { name: 'duration', type: 'number', defaultValue: '4000', description: 'Auto-dismiss duration in milliseconds. Set to 0 for persistent toasts.' },
          { name: 'closable', type: 'boolean', defaultValue: 'true', description: 'Whether to show the close button.' },
          { name: 'actions', type: 'ReactNode', description: 'Action buttons rendered below the message.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the toast item.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline styles for the toast item.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the toast.' },
          { name: 'styles', type: 'object', description: 'Custom inline styles for each part.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the toast item container.' },
          { name: 'icon', description: 'Styles the leading icon.' },
          { name: 'title', description: 'Styles the title text.' },
          { name: 'message', description: 'Styles the message/description text.' },
          { name: 'close', description: 'Styles the close dismiss button.' },
          { name: 'progress', description: 'Styles the auto-dismiss progress bar.' },
        ]}
        stylingStructure={`ToastProvider (container)
 └── toast (item)
      ├── icon
      ├── content
      │    ├── title
      │    ├── message
      │    └── actions
      ├── close
      └── progress`}
      />
    </>
  );
};
