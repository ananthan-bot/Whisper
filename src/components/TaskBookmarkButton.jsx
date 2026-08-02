import React from 'react';

/**
 * TaskBookmarkButton component for toggling bookmark/favorite status on tasks.
 */
export default function TaskBookmarkButton({ isBookmarked = false, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onToggle) onToggle();
      }}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark task'}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark task'}
      className={`inline-flex items-center justify-center p-1.5 rounded-full transition-colors ${
        isBookmarked
          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50'
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${className}`}
    >
      <svg
        className="w-5 h-5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={
            isBookmarked
              ? 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
              : 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
          }
        />
      </svg>
    </button>
  );
}
