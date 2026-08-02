import React from 'react';

/**
 * RecentSearchesDropdown component renders list of recent search queries.
 */
export default function RecentSearchesDropdown({
  searches = [],
  onSelectSearch,
  onRemoveSearch,
  onClearAll,
  className = ''
}) {
  if (!searches || searches.length === 0) return null;

  return (
    <div
      className={`absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-30 py-2 text-sm ${className}`}
    >
      <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        <span>Recent Searches</span>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="hover:text-rose-500 transition-colors normal-case font-normal cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-1">
        {searches.map(term => (
          <div
            key={term}
            className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group"
            onClick={() => onSelectSearch && onSelectSearch(term)}
          >
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{term}</span>
            </div>
            {onRemoveSearch && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveSearch(term);
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 rounded-sm transition-opacity"
                title="Remove item"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
