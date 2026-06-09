import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export const OnThisPage: React.FC = () => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const updateHeadings = () => {
      if (observer) {
        observer.disconnect();
      }

      const elements = document.querySelectorAll(
        '.showcase-title, .section-subtitle, .props-title, .install-step-title, .examples-page header h1, .changelog-version'
      );

      const items: HeadingItem[] = [];
      elements.forEach((el, index) => {
        let text = el.textContent?.trim() || '';
        if (!text) return;

        if (!el.classList.contains('changelog-version')) {
          text = text.replace(/^\d+\.\s*/, '');
        }

        let id = el.id;
        if (!id) {
          id = `toc-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;
          el.id = id;
        }

        let level = 0;
        if (el.classList.contains('showcase-title') && el.closest('.section-examples')) {
          level = 1;
        }

        items.push({ id, text, level });
      });

      setHeadings(items);

      const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      }, observerOptions);

      elements.forEach((el) => {
        if (el.id && observer) observer.observe(el);
      });
    };

    const timer = setTimeout(updateHeadings, 150);
    window.addEventListener('changelog-loaded', updateHeadings);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('changelog-loaded', updateHeadings);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);



  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <aside className="on-this-page">
      <div className="on-this-page-inner">
        <p className="on-this-page-title">On this page</p>
        <nav className="on-this-page-nav">
          {headings.length > 0 ? (
            headings.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`on-this-page-link ${activeId === item.id ? 'active' : ''} ${
                  item.level === 1 ? 'sub-level' : ''
                }`}
                onClick={(e) => handleLinkClick(item.id, e)}
              >
                <div className="active-bullet" />
                <span>{item.text}</span>
              </a>
            ))
          ) : (
            <a
              href="#toc-overview"
              className="on-this-page-link active"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveId('toc-overview');
              }}
            >
              <div className="active-bullet" />
              <span>Overview</span>
            </a>
          )}
        </nav>
      </div>
    </aside>
  );
};
