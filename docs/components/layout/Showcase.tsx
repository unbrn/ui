import React, { useState, useRef } from 'react';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';

interface ShowcaseProps {
  title: string;
  description?: string;
  code?: string;
  children: React.ReactNode;
}

export const Showcase: React.FC<ShowcaseProps> = ({ title, description, code, children }) => {
  const [showCode, setShowCode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="showcase-block">
      <div className="showcase-header">
        <div className="showcase-title-row">
          <span className="showcase-title">{title}</span>
          <div className="showcase-line"></div>
        </div>
        {description && <p className="showcase-description">{description}</p>}
      </div>
      <div className="showcase-preview">
        <div className="showcase-content" ref={contentRef}>
          {children}
        </div>

        {code && (
          <div className={`showcase-code-wrapper ${showCode ? 'open' : ''}`}>
            <CodeBlock
              codeBlockCode={code}
              codeBlockLanguage="tsx"
              codeBlockVariant="outlined"
              codeBlockClassName="showcase-code-inner"
              codeBlockStyle={{
                borderRadius: 0,
                border: "0px"
              }}
            />
          </div>
        )}

        {code && (
          <div className="showcase-code-footer" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              className={`view-code-btn ${showCode ? 'active' : ''}`}
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'HIDE CODE' : 'VIEW CODE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
