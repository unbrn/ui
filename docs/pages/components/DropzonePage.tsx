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
        code={`import { Dropzone } from '@unburn/ui/Dropzone';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        dropzoneLabel="Upload Documents"
        dropzoneDescription="Drag and drop your files here or click to browse"
        dropzoneMultiple
        dropzoneAccept=".pdf,.docx,.txt"
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
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Dropzone } from '@unburn/ui/Dropzone';

export default function Example() {
  const handleFiles = (files: File[]) => {
    console.log('Received files:', files);
  };

  return (
    <Dropzone 
      dropzoneOnFilesDrop={handleFiles}
      dropzoneMultiple
      dropzoneAccept=".jpg,.png,.webp"
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
          code={`import { Dropzone } from '@unburn/ui/Dropzone';
import { Image } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        dropzoneIcon={<Image size={24} />}
        dropzoneLabel="Upload Photos"
        dropzoneDescription="Up to 10MB per file"
        dropzoneAccept=".jpg,.png,.webp"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dropzone
              dropzoneIcon={<Image size={24} />}
              dropzoneLabel="Upload Photos"
              dropzoneDescription="Up to 10MB per file"
              dropzoneAccept=".jpg,.png,.webp"
            />
          </div>
        </Showcase>

        <Showcase
          title="Single File"
          description="Limit the uploader to only accept one file."
          code={`import { Dropzone } from '@unburn/ui/Dropzone';
import { FileText } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        dropzoneIcon={<FileText size={24} />}
        dropzoneLabel="Upload Contract"
        dropzoneDescription="Only PDF files are accepted"
        dropzoneMultiple={false}
        dropzoneAccept=".pdf"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dropzone
              dropzoneIcon={<FileText size={24} />}
              dropzoneLabel="Upload Contract"
              dropzoneDescription="Only PDF files are accepted"
              dropzoneMultiple={false}
              dropzoneAccept=".pdf"
            />
          </div>
        </Showcase>

        <Showcase
          title="Disabled State"
          description="Lock the uploader to prevent file drops."
          code={`import { Dropzone } from '@unburn/ui/Dropzone';
import { Lock } from 'lucide-react';

export default function Example() {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Dropzone
        dropzoneIcon={<Lock size={24} />}
        dropzoneLabel="Uploader Locked"
        dropzoneDescription="You do not have permission to upload files"
        dropzoneDisabled
        dropzoneAccentColor="red"
      />
    </div>
  );
}`}
        >
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dropzone
              dropzoneIcon={<Lock size={24} />}
              dropzoneLabel="Uploader Locked"
              dropzoneDescription="You do not have permission to upload files"
              dropzoneDisabled
              dropzoneAccentColor='red'
            />
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'dropzoneOnFilesDrop', type: '(files: File[]) => void', description: 'Function called when files are dropped or selected.' },
          { name: 'dropzoneAccept', type: 'string', description: 'File formats allowed (e.g. .png, .pdf).' },
          { name: 'dropzoneMultiple', type: 'boolean', defaultValue: 'false', description: 'Allow selecting more than one file.' },
          { name: 'dropzoneMaxSize', type: 'number', description: 'Maximum allowed file size in bytes.' },
          { name: 'dropzoneLabel', type: 'string', defaultValue: '"Drop files here"', description: 'The header text inside the upload box.' },
          { name: 'dropzoneDescription', type: 'string', defaultValue: '"Drag and drop or click to upload"', description: 'The detail text below the header.' },
          { name: 'dropzoneIcon', type: 'ReactNode', description: 'An icon shown at the center of the uploader.' },
          { name: 'dropzoneDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable file drops and clicks.' },
          { name: 'dropzoneAccentColor', type: 'string', description: 'Custom accent color for drag overlay and highlights.' },
          { name: 'dropzoneClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'dropzoneStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the uploader (prefixed with dropzone).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with dropzone).' },
        ]}
        stylingTargets={[
          { name: 'dropzoneRoot', description: 'Styles the outer dropzone dashed container.' },
          { name: 'dropzoneContent', description: 'Styles the center aligned content wrapper.' },
          { name: 'dropzoneIcon', description: 'Styles the central illustration/icon wrapper.' },
          { name: 'dropzoneLabel', description: 'Styles the main label text.' },
          { name: 'dropzoneDescription', description: 'Styles the secondary description text.' },
        ]}
        stylingStructure={`dropzoneRoot
 └── dropzoneContent
      ├── dropzoneIcon
      ├── dropzoneLabel
      └── dropzoneDescription`}
      />
    </>
  );
};

// Workaround function to keep lines correct and render the preview
const DockPagePropsWorkaroundForDropzone: React.FC = () => {
  return (
    <Dropzone
      dropzoneLabel="Upload Documents"
      dropzoneDescription="Drag and drop your files here or click to browse"
      dropzoneMultiple
      dropzoneAccept=".pdf,.docx,.txt"
    />
  );
};
