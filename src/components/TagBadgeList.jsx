import React from 'react';
import { extractTags, getTagColorClass } from '../lib/tagHelpers';

/**
 * TagBadgeList component renders color-coded tag pills for tasks.
 */
export default function TagBadgeList({ tags = [], onTagClick, className = '' }) {
  const parsedTags = extractTags(tags);

  if (!parsedTags || parsedTags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 items-center ${className}`}>
      {parsedTags.map(tag => {
        const colorClass = getTagColorClass(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onTagClick) onTagClick(tag);
            }}
            disabled={!onTagClick}
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${colorClass} ${
              onTagClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'cursor-default'
            }`}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
