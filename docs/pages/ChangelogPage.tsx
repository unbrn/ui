import React, { useMemo, useState, useEffect } from 'react';
import changelogRaw from '../../CHANGELOG.md?raw';
import './ChangelogPage.css';

interface ChangelogItem {
  text: string;
  subtext?: string;
  subItems?: string[];
}

interface ReleaseCategory {
  title: string;
  items: ChangelogItem[];
}

interface Release {
  version: string;
  isBeta: boolean;
  isLatest: boolean;
  date: string;
  categories: ReleaseCategory[];
}

interface GitHubRelease {
  tag_name: string;
  prerelease: boolean;
  published_at?: string;
  body?: string;
}

const parseChangelog = (markdown: string): Release[] => {
  const releases: Release[] = [];
  const lines = markdown.split('\n');

  let currentRelease: Release | null = null;
  let currentCategory: ReleaseCategory | null = null;
  let currentItem: ChangelogItem | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Match version: ## [1.6.0-beta.0] - 2026-06-10 or ## 1.5.0 - 2026-05-28
    const versionMatch = trimmed.match(/^##\s+\[?([0-9a-zA-Z.-]+)\]?(?:\s+-\s+(.+))?/);
    if (versionMatch) {
      const version = versionMatch[1];
      const dateRaw = versionMatch[2] || '';

      // Format date
      let date = dateRaw;
      if (dateRaw) {
        const d = new Date(dateRaw);
        if (!isNaN(d.getTime())) {
          date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
      }

      currentRelease = {
        version: version.replace(/^v/, ''),
        isBeta: version.toLowerCase().includes('beta') || version.toLowerCase().includes('alpha'),
        isLatest: false,
        date: date ? `Published: ${date}` : '',
        categories: []
      };
      releases.push(currentRelease);
      currentCategory = null;
      currentItem = null;
      continue;
    }

    if (!currentRelease) continue;

    // Match category: ### Category Name
    const categoryMatch = trimmed.match(/^###\s+(.+)/);
    if (categoryMatch) {
      currentCategory = {
        title: categoryMatch[1].trim(),
        items: []
      };
      currentRelease.categories.push(currentCategory);
      currentItem = null;
      continue;
    }

    if (!currentCategory) continue;

    // Match item: - Item description or   - Sub-item description
    const bulletMatch = line.match(/^(\s*)-\s+(.+)/);
    if (bulletMatch) {
      const indent = bulletMatch[1];
      const text = bulletMatch[2].trim();

      if (indent.length >= 2 && currentItem) {
        if (!currentItem.subItems) {
          currentItem.subItems = [];
        }
        currentItem.subItems.push(text);
      } else {
        currentItem = {
          text,
          subItems: []
        };
        currentCategory.items.push(currentItem);
      }
      continue;
    }

    // If it's normal text, treat as subtext under current item
    if (trimmed && currentItem) {
      currentItem.subtext = (currentItem.subtext ? currentItem.subtext + ' ' : '') + trimmed;
    }
  }

  // Mark the first non-beta/non-alpha release as latest stable
  let foundLatest = false;
  for (const rel of releases) {
    if (!rel.isBeta && !foundLatest) {
      rel.isLatest = true;
      foundLatest = true;
    }
  }

  return releases;
};

const parseReleaseBody = (body: string): ReleaseCategory[] => {
  const categories: ReleaseCategory[] = [];
  const lines = body.split('\n');
  let currentCategory: ReleaseCategory | null = null;
  let currentItem: ChangelogItem | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Match category: ### Category Name
    const categoryMatch = trimmed.match(/^###\s+(.+)/);
    if (categoryMatch) {
      currentCategory = {
        title: categoryMatch[1].trim(),
        items: []
      };
      categories.push(currentCategory);
      currentItem = null;
      continue;
    }

    // Match item
    const bulletMatch = line.match(/^(\s*)-\s+(.+)/);
    if (bulletMatch) {
      if (!currentCategory) {
        currentCategory = {
          title: 'Changes',
          items: []
        };
        categories.push(currentCategory);
      }

      const indent = bulletMatch[1];
      const text = bulletMatch[2].trim();

      if (indent.length >= 2 && currentItem) {
        if (!currentItem.subItems) {
          currentItem.subItems = [];
        }
        currentItem.subItems.push(text);
      } else {
        currentItem = {
          text,
          subItems: []
        };
        currentCategory.items.push(currentItem);
      }
      continue;
    }

    if (trimmed && currentItem) {
      currentItem.subtext = (currentItem.subtext ? currentItem.subtext + ' ' : '') + trimmed;
    }
  }

  return categories;
};

const getCategoryClass = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('breaking')) return 'changelog-category-title-breaking';
  if (t.includes('feat')) return 'changelog-category-title-feat';
  if (t.includes('fix') || t.includes('adjust')) return 'changelog-category-title-fix';
  return 'changelog-category-title-chore';
};

const formatItemText = (text: string) => {
  const parts = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchedText = match[0];

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (matchedText.startsWith('`')) {
      parts.push(<code key={matchIndex}>{matchedText.slice(1, -1)}</code>);
    } else {
      parts.push(<strong key={matchIndex}>{matchedText.slice(2, -2)}</strong>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export const ChangelogPage: React.FC = () => {
  const localReleases = useMemo(() => parseChangelog(changelogRaw), []);
  const [releases, setReleases] = useState<Release[]>(localReleases);

  useEffect(() => {
    let active = true;

    fetch('https://api.github.com/repos/unbrn/ui/releases')
      .then(res => {
        if (!res.ok) throw new Error('GitHub API response not OK');
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No releases found on GitHub');
        }

        const parsed = data.map((rel: GitHubRelease) => {
          const version = rel.tag_name.replace(/^v/, '');
          const isBeta = rel.prerelease || version.toLowerCase().includes('beta') || version.toLowerCase().includes('alpha');

          let date = '';
          if (rel.published_at) {
            const d = new Date(rel.published_at);
            if (!isNaN(d.getTime())) {
              date = `Published: ${d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
            }
          }

          return {
            version,
            isBeta,
            isLatest: false,
            date,
            categories: parseReleaseBody(rel.body || '')
          };
        });

        let foundLatest = false;
        for (const rel of parsed) {
          if (!rel.isBeta && !foundLatest) {
            rel.isLatest = true;
            foundLatest = true;
          }
        }

        if (active) {
          setReleases(parsed);
          // Notify TOC component that we have loaded the GitHub releases
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('changelog-loaded'));
          }, 50);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch from GitHub releases, using local CHANGELOG.md:', err);
      });

    return () => {
      active = false;
    };
  }, [localReleases]);

  return (
    <div className="changelog-page">
      <div className="changelog-header">
        <h2 className="changelog-title">Changelog</h2>
        <p className="changelog-description">
          Stay up to date with the latest features, bug fixes, improvements, and breaking changes in @unbrn/ui.
        </p>
      </div>

      <div className="changelog-timeline">
        {releases.map((release) => {
          return (
            <div className="changelog-release" key={release.version}>
              <div className="changelog-release-header">
                <div className="changelog-release-title-row">
                  <div className="changelog-version" id={release.version}>{release.version}</div>
                  {release.isBeta && (
                    <span className="changelog-badge changelog-badge-beta">BETA</span>
                  )}
                  {release.isLatest && (
                    <span className="changelog-badge changelog-badge-latest">LATEST</span>
                  )}
                </div>
                {release.date && (
                  <div className="changelog-date">{release.date}</div>
                )}
              </div>

              <div className="changelog-categories">
                {release.categories.map((category) => (
                  <div className="changelog-category" key={category.title}>
                    <div className={`changelog-category-title ${getCategoryClass(category.title)}`}>
                      {category.title}
                    </div>
                    <ul className="changelog-list">
                      {category.items.map((item, itemIdx) => (
                        <li className="changelog-item" key={itemIdx}>
                          {formatItemText(item.text)}
                          {item.subtext && (
                            <div className="changelog-item-subtext">
                              {formatItemText(item.subtext)}
                            </div>
                          )}
                          {item.subItems && item.subItems.length > 0 && (
                            <ul className="changelog-sublist">
                              {item.subItems.map((subItem, subIdx) => (
                                <li className="changelog-subitem" key={subIdx}>
                                  {formatItemText(subItem)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
