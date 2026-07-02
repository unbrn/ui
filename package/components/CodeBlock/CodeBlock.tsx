"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import './CodeBlock.css';

const unbrnTheme: { [key: string]: React.CSSProperties } = {
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
  code?: string;
  tabs?: Record<string, string>;
  defaultTab?: string;
  language?: string;
  classNames?: {
    root?: string;
    header?: string;
    content?: string;
    copyButton?: string;
    title?: string;
    lang?: string;
    tabs?: string;
    tab?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    header?: React.CSSProperties;
    content?: React.CSSProperties;
    copyButton?: React.CSSProperties;
    title?: React.CSSProperties;
    lang?: React.CSSProperties;
    tabs?: React.CSSProperties;
    tab?: React.CSSProperties;
  };
  showLineNumbers?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'filled' | 'outlined';
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  tabs,
  defaultTab,
  language = 'tsx',
  showLineNumbers = true,
  className,
  style,
  classNames,
  styles,
  variant = 'filled',
  title
}) => {
  const [mounted, setMounted] = useState(false);
  const [Highlighter, setHighlighter] = useState<React.ElementType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(
    defaultTab && tabs?.[defaultTab]
      ? defaultTab
      : (tabs ? Object.keys(tabs)[0] : null)
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

  const displayCode = (tabs && activeTab ? tabs[activeTab] : (code || ''))
    .replace(/\\n/g, '\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguage = () => {
    if (!tabs || !activeTab) return language;
    const tabLower = activeTab.toLowerCase();
    if (tabLower.includes('typescript') || tabLower === 'ts') return 'tsx';
    if (tabLower.includes('javascript') || tabLower === 'js') return 'javascript';
    if (tabLower === 'bash' || tabLower === 'sh' || ['pnpm', 'npm', 'yarn', 'bun'].includes(tabLower)) return 'bash';
    return language;
  };

  return (
    <div
      className={cn(
        "unbrn-code-block",
        `unbrn-code-block-${variant}`,
        variant === 'outlined' && 'unbrn-glass',
        tabs && "has-tabs",
        className,
        classNames?.root
      )}
      style={{ ...style, ...styles?.root }}
    >
      <div
        className={cn("unbrn-code-header", classNames?.header)}
        style={styles?.header}
      >
        <div className="unbrn-code-info">
          {tabs ? (
            <div className="unbrn-code-tabs-container">
              <div className={cn("unbrn-code-tabs", classNames?.tabs)} style={styles?.tabs}>
                {Object.keys(tabs).map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      "unbrn-code-tab",
                      activeTab === tab && "active",
                      classNames?.tab
                    )}
                    onClick={() => setActiveTab(tab)}
                    style={styles?.tab}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {title && (
                <span
                  className={cn("unbrn-code-title", classNames?.title)}
                  style={styles?.title}
                >
                  {title}
                </span>
              )}
              <span
                className={cn("unbrn-code-lang", classNames?.lang)}
                style={styles?.lang}
              >
                {language}
              </span>
            </>
          )}
        </div>
        <button
          className={cn("unbrn-code-copy-btn", classNames?.copyButton)}
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy Code"}
          style={styles?.copyButton}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div
        className={cn("unbrn-code-content", classNames?.content)}
        style={styles?.content}
      >
        {!mounted || !Highlighter ? (
          <pre className="unbrn-code-ssr-fallback">
            <code>{displayCode}</code>
          </pre>
        ) : (
          <Highlighter
            language={getLanguage()}
            style={unbrnTheme}
            showLineNumbers={!tabs && showLineNumbers}
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
              padding: tabs
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
