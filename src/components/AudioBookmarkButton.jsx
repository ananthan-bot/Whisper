import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { formatAudioTime } from '../lib/audioPlayerHelpers';

export default function AudioBookmarkButton({ currentTime = 0, onBookmarkSave, className = '' }) {
  const [saved, setSaved] = useState(false);

  const handleBookmark = () => {
    setSaved(true);
    if (onBookmarkSave) {
      onBookmarkSave({
        time: currentTime,
        formattedTime: formatAudioTime(currentTime),
        timestamp: new Date().toISOString(),
      });
    }
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleBookmark}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
        saved
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      } ${className}`}
      title={`Bookmark audio timestamp at ${formatAudioTime(currentTime)}`}
    >
      {saved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
      <span>{saved ? 'Saved!' : `Bookmark @ ${formatAudioTime(currentTime)}`}</span>
    </button>
  );
}
