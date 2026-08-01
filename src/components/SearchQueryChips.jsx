import React from 'react';
import { Tag, AlertCircle, X } from 'lucide-react';
import { parseSearchQuery } from '../lib/searchQueryHelpers';

export default function SearchQueryChips({ query, onRemoveTag }) {
  if (!query) return null;

  const { keywords, hashtags, isUrgentOnly } = parseSearchQuery(query);

  if (keywords.length === 0 && hashtags.length === 0 && !isUrgentOnly) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 my-2">
      {isUrgentOnly && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          <AlertCircle className="w-3 h-3" />
          Urgent Only
        </span>
      )}
      {hashtags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
        >
          <Tag className="w-3 h-3" />
          #{tag}
        </span>
      ))}
      {keywords.map((kw) => (
        <span
          key={kw}
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
        >
          {kw}
        </span>
      ))}
    </div>
  );
}
