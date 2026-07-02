import React from 'react';
import { Dropzone } from '../../../package/components/Dropzone/Dropzone';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Image, FileText, Lock } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export const DropzonePage: React.FC = () => {
  return (
    <>
      <ComponentHeader title="Dropzone" />

      <Showcase
        title="Preview"
        code={`import { Dropzone } from '@unbrn/ui/Dropzone';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        label="Upload Documents"
        description="Drag and drop your files here or click to browse"
        multiple
        accept=".pdf,.docx,.txt"
      />
    </div>
  );
}`}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <DockPagePropsWorkaroundForDropzone />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Dropzone } from '@unbrn/ui/Dropzone';

export default function Example() {
  const handleFiles = (files: File[]) => {
    console.log('Received files:', files);
  };

  return (
    <Dropzone 
      onFilesDrop={handleFiles}
      multiple
      accept=".jpg,.png,.webp"
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Custom Icons"
          description="Show a custom icon matching the files you want."
          code={`import { Dropzone } from '@unbrn/ui/Dropzone';
import { Image } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        icon={<Image size={24} />}
        label="Upload Photos"
        description="Up to 10MB per file"
        accept=".jpg,.png,.webp"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dropzone
              icon={<Image size={24} />}
              label="Upload Photos"
              description="Up to 10MB per file"
              accept=".jpg,.png,.webp"
            />
          </div>
        </Showcase>

        <Showcase
          title="Single File"
          description="Limit the uploader to only accept one file."
          code={`import { Dropzone } from '@unbrn/ui/Dropzone';
import { FileText } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        icon={<FileText size={24} />}
        label="Upload Contract"
        description="Only PDF files are accepted"
        multiple={false}
        accept=".pdf"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dropzone
              icon={<FileText size={24} />}
              label="Upload Contract"
              description="Only PDF files are accepted"
              multiple={false}
              accept=".pdf"
            />
          </div>
        </Showcase>

        <Showcase
          title="Disabled State"
          description="Lock the uploader to prevent file drops."
          code={`import { Dropzone } from '@unbrn/ui/Dropzone';
import { Lock } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        icon={<Lock size={24} />}
        label="Uploader Locked"
        description="You do not have permission to upload files"
        disabled
        accentColor="red"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dropzone
              icon={<Lock size={24} />}
              label="Uploader Locked"
              description="You do not have permission to upload files"
              disabled
              accentColor='red'
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'onFilesDrop', type: '(files: File[]) => void', description: 'Function called when files are dropped or selected.' },
          { name: 'accept', type: 'string', description: 'File formats allowed (e.g. .png, .pdf).' },
          { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Allow selecting more than one file.' },
          { name: 'maxSize', type: 'number', description: 'Maximum allowed file size in bytes.' },
          { name: 'label', type: 'string', defaultValue: '"Drop files here"', description: 'The header text inside the upload box.' },
          { name: 'description', type: 'string', defaultValue: '"Drag and drop or click to upload"', description: 'The detail text below the header.' },
          { name: 'icon', type: 'ReactNode', description: 'An icon shown at the center of the uploader.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable file drops and clicks.' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color for drag overlay and highlights.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the uploader (prefixed with dropzone).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with dropzone).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer dropzone dashed container.' },
          { name: 'content', description: 'Styles the center aligned content wrapper.' },
          { name: 'icon', description: 'Styles the central illustration/icon wrapper.' },
          { name: 'label', description: 'Styles the main label text.' },
          { name: 'description', description: 'Styles the secondary description text.' },
        ]}
        stylingStructure={`root
 └── content
      ├── icon
      ├── label
      └── description`}
      />
    </>
  );
};

// Workaround function to keep lines correct and render the preview
const DockPagePropsWorkaroundForDropzone: React.FC = () => {
  return (
    <Dropzone
      label="Upload Documents"
      description="Drag and drop your files here or click to browse"
      multiple
      accept=".pdf,.docx,.txt"
    />
  );
};
