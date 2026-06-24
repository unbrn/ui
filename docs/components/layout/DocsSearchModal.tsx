import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { Input } from '../../../package/components/Input/Input';
import componentsData from '../../data/components.json';
import backgroundsData from '../../data/backgrounds.json';
import './DocsSearchModal.css';

declare global {
  interface Window {
    pagefindInitialized?: boolean;
  }
}

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
  isFallback?: boolean;
}

const SUGGESTED_SEARCHES = ['Button', 'Dock', 'Color Picker', 'Satin Flow', 'Accordion'];

export const DocsSearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagefindError, setPagefindError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSelect = React.useCallback((url: string) => {
    setIsOpen(false);

    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const cleanUrl = url.replace(/\.html$/, '').replace(/\/index$/, '');
      navigate(cleanUrl);
    }
  }, [navigate]);

  // Reset active index when query or results change
  useEffect(() => {
    queueMicrotask(() => {
      setActiveIndex(results.length > 0 ? 0 : -1);
    });
  }, [results, query]);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global Ctrl/Cmd+K to open
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setQuery('');
      setResults([]);
    };

    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setResults([]);
      }
    };

    window.addEventListener('open-docs-search', handleOpen);
    window.addEventListener('keydown', handleGlobalKey);
    return () => {
      window.removeEventListener('open-docs-search', handleOpen);
      window.removeEventListener('keydown', handleGlobalKey);
    };
  }, []);

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleModalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => (prev === results.length - 1 ? 0 : prev + 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => (prev <= 0 ? results.length - 1 : prev - 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < results.length) {
            handleSelect(results[activeIndex].url);
          }
        }
      }
    };

    window.addEventListener('keydown', handleModalKey);
    return () => window.removeEventListener('keydown', handleModalKey);
  }, [isOpen, results, activeIndex, handleSelect]);

  // Auto-scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsContainerRef.current) {
      const container = resultsContainerRef.current;
      const activeEl = container.children[activeIndex + 1] as HTMLElement; // +1 to skip results-header
      if (activeEl) {
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        const elemTop = activeEl.offsetTop;
        const elemBottom = elemTop + activeEl.clientHeight;

        if (elemTop < containerTop) {
          container.scrollTop = elemTop - 10;
        } else if (elemBottom > containerBottom) {
          container.scrollTop = elemBottom - container.clientHeight + 10;
        }
      }
    }
  }, [activeIndex]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }
  }, [isOpen]);

  interface PagefindResultItem {
    data: () => Promise<{
      url: string;
      meta?: { 
        title?: string;
        url?: string;
      };
      excerpt?: string;
    }>;
  }

  // Pagefind search logic
  useEffect(() => {
    let isMounted = true;

    if (!query.trim()) {
      const clearTimer = setTimeout(() => {
        if (isMounted) setResults([]);
      }, 0);
      return () => {
        isMounted = false;
        clearTimeout(clearTimer);
      };
    }

    const loadTimer = setTimeout(() => {
      if (isMounted) setIsLoading(true);
    }, 0);

    const performSearch = async () => {
      try {
        const pagefindModule = await new Function("return import('/pagefind/pagefind.js')")();
        const pagefind = pagefindModule.default || pagefindModule;

        if (!window.pagefindInitialized) {
          await pagefind.init();
          window.pagefindInitialized = true;
        }

        const searchResult = await pagefind.search(query);

        if (!isMounted) return;

        const topResults = searchResult.results.slice(0, 8);
        const detailedResults = await Promise.all(
          topResults.map(async (r: PagefindResultItem) => {
            const data = await r.data();
            return {
              url: data.meta?.url || data.url,
              title: data.meta?.title || 'Documentation',
              excerpt: data.excerpt || '',
            };
          })
        );

        if (isMounted) {
          setResults(detailedResults);
          setIsLoading(false);
          setPagefindError(false);
        }
      } catch {
        if (!isMounted) return;

        const lowercaseQuery = query.toLowerCase();
        const fallbackComponents = componentsData
          .filter(comp =>
            comp.name.toLowerCase().includes(lowercaseQuery) ||
            comp.description.toLowerCase().includes(lowercaseQuery)
          )
          .map(comp => ({
            url: comp.path.startsWith('/components/')
              ? comp.path.replace(/^\/components/, '/docs/components')
              : comp.path,
            title: comp.name,
            excerpt: comp.description,
            isFallback: true
          }));

        const fallbackBackgrounds = backgroundsData
          .filter(bg =>
            bg.name.toLowerCase().includes(lowercaseQuery) ||
            bg.description.toLowerCase().includes(lowercaseQuery)
          )
          .map(bg => ({
            url: bg.path.startsWith('/backgrounds/')
              ? bg.path.replace(/^\/backgrounds/, '/docs/backgrounds')
              : bg.path,
            title: bg.name,
            excerpt: bg.description,
            isFallback: true
          }));

        const fallbackResults = [...fallbackComponents, ...fallbackBackgrounds].slice(0, 8);

        setResults(fallbackResults);
        setIsLoading(false);
        setPagefindError(true);
      }
    };

    const debounceTimer = setTimeout(() => {
      performSearch();
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(loadTimer);
      clearTimeout(debounceTimer);
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-backdrop" onClick={() => setIsOpen(false)}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header" style={{ padding: '1rem 1.25rem' }}>
          <Input
            ref={inputRef}
            inputVariant="duo"
            inputSize="default"
            inputLeftIcon={<Search size={18} />}
            inputKbd="ESC"
            inputPlaceholder="Search documentation..."
            inputValue={query}
            inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            inputFullWidth
            classNames={{
              inputRoot: 'search-modal-input-root',
              inputContainer: 'search-modal-input-container',
              inputElement: 'search-modal-input-field'
            }}
            inputRightIcon={query ? (
              <button
                className="search-clear-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuery('');
                }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, marginRight: 0 }}
              >
                <X size={14} />
              </button>
            ) : undefined}
          />
        </div>

        <div className="search-body">
          {isLoading && (
            <div className="search-loading">
              <div className="search-spinner"></div>
              <span>Searching index...</span>
            </div>
          )}

          {!isLoading && !query && (
            <div className="search-empty-state">
              <h3 className="empty-title">Search Unbrn UI</h3>
              <p className="empty-subtitle">Type keywords to search components, layouts, custom themes, and configurations.</p>
              
              <div className="search-suggestions">
                <span className="suggestion-label font-mono">SUGGESTED</span>
                <div className="suggestion-pills">
                  {SUGGESTED_SEARCHES.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="suggestion-pill"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="search-shortcuts-tips">
                <div className="tip-item">
                  <kbd className="font-mono">⌘K</kbd> <span>to toggle search overlay</span>
                </div>
                <div className="tip-item">
                  <kbd className="font-mono">↑↓</kbd> <span>to navigate results</span>
                </div>
              </div>
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="search-no-results">
              <div className="empty-icon-wrapper danger">
                <X size={24} />
              </div>
              <h3>No results found</h3>
              <p>We couldn't find any documentation matching <strong className="font-mono">"{query}"</strong>.</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="search-results-list" ref={resultsContainerRef}>
              <div className="results-header font-mono">
                <span>{results.length} MATCHING RESULTS {pagefindError && '(DEV MODE FALLBACK)'}</span>
              </div>

              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`search-result-item ${idx === activeIndex ? 'search-result-item-active' : ''}`}
                  onClick={() => handleSelect(result.url)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className="result-icon-area">
                    {result.url.includes('/components/') ? <BookOpen size={16} /> : <FileText size={16} />}
                  </div>
                  <div className="result-info-area">
                    <h4 className="result-title">
                      {result.title}
                      {result.isFallback && <span className="dev-tag">CATALOG</span>}
                    </h4>
                    <p
                      className="result-excerpt"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </div>
                  <ArrowRight size={14} className="result-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
