import React from 'react';
import { Bookmark } from 'lucide-react';
import { isTaskBookmarked } from '../lib/bookmarkHelpers';

export default function TaskBookmarkToggle({ taskId, bookmarks = [], onToggle, className = '' }) {
  const active = isTaskBookmarked(bookmarks, taskId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onToggle) onToggle(taskId);
      }}
      className={`p-1.5 rounded-full transition-colors ${
        active
          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300'
      } ${className}`}
      title={active ? 'Remove bookmark' : 'Bookmark task'}
    >
      <Bookmark className={`w-4 h-4 ${active ? 'fill-amber-500' : ''}`} />
    </button>
  );
}
