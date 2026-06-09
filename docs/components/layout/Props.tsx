import React from 'react';
import './Props.css';

interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

interface StylingTarget {
  name: string;
  description: string;
}

interface PropGroup {
  title: string;
  props: PropDefinition[];
}

interface PropsTableProps {
  title?: string;
  props?: PropDefinition[];
  groups?: PropGroup[];
  stylingTargets?: StylingTarget[];
  stylingStructure?: string;
}

const getTypeClass = (typeStr: string): string => {
  const t = typeStr.trim();
  if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) {
    return 'type-literal';
  }
  if (t === 'string') return 'type-string';
  if (t === 'number') return 'type-number';
  if (t === 'boolean') return 'type-boolean';
  if (t.includes('=>') || t.includes('function') || t.includes('Function')) return 'type-function';
  if (t.includes('[]') || t.startsWith('Array<')) return 'type-array';
  if (t.includes('React') || t.includes('Node') || t.includes('CSSProperties')) return 'type-react';
  return 'type-default';
};

const renderType = (typeStr: string) => {
  if (typeStr.includes('|') && !typeStr.includes('(') && !typeStr.includes('<') && !typeStr.includes('=>')) {
    const parts = typeStr.split('|').map(p => p.trim());
    return (
      <span className="prop-type-union">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <code className={`prop-type-pill ${getTypeClass(part)}`}>{part}</code>
            {index < parts.length - 1 && <span className="prop-type-pipe">|</span>}
          </React.Fragment>
        ))}
      </span>
    );
  }
  
  return <code className={`prop-type-pill ${getTypeClass(typeStr)}`}>{typeStr}</code>;
};

const renderStructure = (structure: string, targets: StylingTarget[]) => {
  const targetNames = targets.map(t => t.name);
  if (targetNames.length === 0) return structure;
  
  const sortedNames = [...targetNames].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${sortedNames.join('|')})\\b`, 'g');
  
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(structure)) !== null) {
    const matchIndex = match.index;
    const matchedText = match[0];
    
    if (matchIndex > lastIndex) {
      parts.push(structure.substring(lastIndex, matchIndex));
    }
    
    parts.push(<span key={matchIndex} className="structure-highlight-key">{matchedText}</span>);
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < structure.length) {
    parts.push(structure.substring(lastIndex));
  }
  
  return parts;
};

export const Props: React.FC<PropsTableProps> = ({ title = 'Props', props, groups, stylingTargets, stylingStructure }) => {
  const resolvedGroups: PropGroup[] = [];
  if (groups) {
    resolvedGroups.push(...groups);
  } else if (props) {
    resolvedGroups.push({ title: 'Props', props });
  }

  if (resolvedGroups.length === 0) return null;

  return (
    <div className="props-section">
      <h3 className="props-title">{title}</h3>
      
      <div className="props-table-wrapper">
        <table className="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {resolvedGroups.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {resolvedGroups.length > 1 && (
                  <tr className="prop-group-header-row">
                    <td colSpan={3}>
                      <div className="prop-group-header-title">{group.title}</div>
                    </td>
                  </tr>
                )}
                {group.props.map((prop) => (
                  <tr key={prop.name}>
                    <td>
                      <div className="prop-name">
                        {prop.name}
                        {prop.required && <span className="prop-required">*</span>}
                      </div>
                    </td>
                    <td className="prop-type">{renderType(prop.type)}</td>
                    <td className="prop-description">{prop.description}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="props-mobile-list">
        {resolvedGroups.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {resolvedGroups.length > 1 && (
              <div className="prop-group-mobile-header">
                {group.title}
              </div>
            )}
            {group.props.map((prop) => (
              <div className="prop-card" key={prop.name}>
                <div className="prop-card-header">
                  <span className="prop-name">
                    {prop.name}
                    {prop.required && <span className="prop-required">*</span>}
                  </span>
                </div>
                <div className="prop-card-body">
                  <div className="prop-type-row">
                    <span className="label">Type:</span>
                    {renderType(prop.type)}
                  </div>
                  <p className="prop-description">{prop.description}</p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {stylingTargets && stylingTargets.length > 0 && (
        <div className="styling-targets-section">
          <h4 className="styling-targets-title">Styles & Customization</h4>
          <p className="styling-targets-intro">
            Both the <code>classNames</code> and <code>styles</code> props accept objects mapping to specific inner elements.
          </p>

          {stylingStructure && (
            <div className="styling-structure-wrapper">
              <h5 className="styling-structure-subtitle">Component Hierarchy</h5>
              <pre className="styling-structure-code">
                <code>{renderStructure(stylingStructure, stylingTargets)}</code>
              </pre>
            </div>
          )}

          <p className="styling-targets-table-intro">
            The following customization target keys are supported:
          </p>

          <div className="props-table-wrapper">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Target Key</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {stylingTargets.map((target) => (
                  <tr key={target.name}>
                    <td>
                      <code className="styling-target-key">{target.name}</code>
                    </td>
                    <td className="prop-description">{target.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="props-mobile-list">
            {stylingTargets.map((target) => (
              <div className="prop-card" key={target.name}>
                <div className="prop-card-header">
                  <code className="styling-target-key">{target.name}</code>
                </div>
                <div className="prop-card-body">
                  <p className="prop-description">{target.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


