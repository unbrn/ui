"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import './CodeBlock.css';

const unburnTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': { color: 'var(--text-main)', background: 'none', fontFamily: 'var(--font-mono)' },
  'pre[class*="language-"]': { color: 'var(--text-main)', background: 'none', fontFamily: 'var(--font-mono)' },
  'comment': { color: 'var(--text-muted)', fontStyle: 'italic' },
  'prolog': { color: 'var(--text-muted)' },
  'doctype': { color: 'var(--text-muted)' },
  'cdata': { color: 'var(--text-muted)' },
  'punctuation': { color: 'var(--text-main)', opacity: 0.6 },
  'namespace': { opacity: 0.7 },
  'property': { color: '#61afef' },
  'tag': { color: '#e06c75' },
  'boolean': { color: '#d19a66' },
  'number': { color: '#d19a66' },
  'constant': { color: '#d19a66' },
  'symbol': { color: '#d19a66' },
  'deleted': { color: '#e06c75' },
  'selector': { color: '#98c379' },
  'attr-name': { color: '#d19a66' },
  'string': { color: '#98c379' },
  'char': { color: '#98c379' },
  'builtin': { color: '#e5c07b' },
  'inserted': { color: '#98c379' },
  'operator': { color: '#56b6c2' },
  'entity': { color: 'var(--text-main)', cursor: 'help' },
  'url': { color: '#61afef' },
  'variable': { color: '#e06c75' },
  'atrule': { color: '#c678dd' },
  'attr-value': { color: '#98c379' },
  'function': { color: '#61afef' },
  'keyword': { color: '#c678dd' },
  'regex': { color: '#98c379' },
  'important': { fontWeight: 'bold' },
  'bold': { fontWeight: 'bold' },
  'italic': { fontStyle: 'italic' },
};

export interface CodeBlockProps {
  codeBlockCode?: string;
  codeBlockTabs?: Record<string, string>;
  codeBlockDefaultTab?: string;
  codeBlockLanguage?: string;
  classNames?: {
    codeBlockRoot?: string;
    codeBlockHeader?: string;
    codeBlockContent?: string;
    codeBlockCopyButton?: string;
    codeBlockTitle?: string;
    codeBlockLang?: string;
    codeBlockTabs?: string;
    codeBlockTab?: string;
  };
  styles?: {
    codeBlockRoot?: React.CSSProperties;
    codeBlockHeader?: React.CSSProperties;
    codeBlockContent?: React.CSSProperties;
    codeBlockCopyButton?: React.CSSProperties;
    codeBlockTitle?: React.CSSProperties;
    codeBlockLang?: React.CSSProperties;
    codeBlockTabs?: React.CSSProperties;
    codeBlockTab?: React.CSSProperties;
  };
  codeBlockShowLineNumbers?: boolean;
  codeBlockClassName?: string;
  codeBlockStyle?: React.CSSProperties;
  codeBlockVariant?: 'filled' | 'outlined';
  codeBlockTitle?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  codeBlockCode,
  codeBlockTabs,
  codeBlockDefaultTab,
  codeBlockLanguage = 'tsx',
  codeBlockShowLineNumbers = true,
  codeBlockClassName,
  codeBlockStyle,
  classNames,
  styles,
  codeBlockVariant = 'filled',
  codeBlockTitle
}) => {
  const [mounted, setMounted] = useState(false);
  const [Highlighter, setHighlighter] = useState<React.ElementType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(
    codeBlockDefaultTab && codeBlockTabs?.[codeBlockDefaultTab]
      ? codeBlockDefaultTab
      : (codeBlockTabs ? Object.keys(codeBlockTabs)[0] : null)
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    import('react-syntax-highlighter').then((mod) => {
      setHighlighter(() => mod.Prism);
      setMounted(true);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const displayCode = (codeBlockTabs && activeTab ? codeBlockTabs[activeTab] : (codeBlockCode || ''))
    .replace(/\\n/g, '\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguage = () => {
    if (!codeBlockTabs || !activeTab) return codeBlockLanguage;
    const tabLower = activeTab.toLowerCase();
    if (tabLower.includes('typescript') || tabLower === 'ts') return 'tsx';
    if (tabLower.includes('javascript') || tabLower === 'js') return 'javascript';
    if (tabLower === 'bash' || tabLower === 'sh' || ['pnpm', 'npm', 'yarn', 'bun'].includes(tabLower)) return 'bash';
    return codeBlockLanguage;
  };

  return (
    <div
      className={cn(
        "unburn-code-block",
        `unburn-code-block-${codeBlockVariant}`,
        codeBlockVariant === 'outlined' && 'unburn-glass',
        codeBlockTabs && "has-tabs",
        codeBlockClassName,
        classNames?.codeBlockRoot
      )}
      style={{ ...codeBlockStyle, ...styles?.codeBlockRoot }}
    >
      <div
        className={cn("unburn-code-header", classNames?.codeBlockHeader)}
        style={styles?.codeBlockHeader}
      >
        <div className="unburn-code-info">
          {codeBlockTabs ? (
            <div className="unburn-code-tabs-container">
              <div className={cn("unburn-code-tabs", classNames?.codeBlockTabs)} style={styles?.codeBlockTabs}>
                {Object.keys(codeBlockTabs).map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      "unburn-code-tab",
                      activeTab === tab && "active",
                      classNames?.codeBlockTab
                    )}
                    onClick={() => setActiveTab(tab)}
                    style={styles?.codeBlockTab}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {codeBlockTitle && (
                <span
                  className={cn("unburn-code-title", classNames?.codeBlockTitle)}
                  style={styles?.codeBlockTitle}
                >
                  {codeBlockTitle}
                </span>
              )}
              <span
                className={cn("unburn-code-lang", classNames?.codeBlockLang)}
                style={styles?.codeBlockLang}
              >
                {codeBlockLanguage}
              </span>
            </>
          )}
        </div>
        <button
          className={cn("unburn-code-copy-btn", classNames?.codeBlockCopyButton)}
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy Code"}
          style={styles?.codeBlockCopyButton}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div
        className={cn("unburn-code-content", classNames?.codeBlockContent)}
        style={styles?.codeBlockContent}
      >
        {!mounted || !Highlighter ? (
          <pre className="unburn-code-ssr-fallback">
            <code>{displayCode}</code>
          </pre>
        ) : (
          <Highlighter
            language={getLanguage()}
            style={unburnTheme}
            showLineNumbers={!codeBlockTabs && codeBlockShowLineNumbers}
            lineNumberStyle={{
              minWidth: isMobile ? '1.5rem' : '2.5rem',
              paddingRight: isMobile ? '0.5rem' : '1rem',
              color: 'var(--text-muted)',
              textAlign: 'right',
              opacity: 0.5,
              borderRight: '1px solid var(--border-color)',
              marginRight: isMobile ? '0.5rem' : '1rem',
              userSelect: 'none'
            }}
            codeTagProps={{
              style: {
                display: 'inline-block',
                minWidth: '100%',
                paddingRight: isMobile ? '1rem' : '1.5rem'
              }
            }}
            customStyle={{
              margin: 0,
              padding: codeBlockTabs
                ? (isMobile ? '1.25rem 1rem' : '1.5rem 1.25rem')
                : (isMobile ? '1rem' : '1.25rem'),
              backgroundColor: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              border: 'none',
              borderRadius: 0
            }}
          >
            {displayCode}
          </Highlighter>
        )}
      </div>
    </div>
  );
};
