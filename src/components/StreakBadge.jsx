import React from 'react';
import { formatStreakLabel } from '../lib/streakHelpers';

/**
 * StreakBadge component displays the user's current daily activity streak count.
 */
export default function StreakBadge({ streakCount = 0, className = '' }) {
  const label = formatStreakLabel(streakCount);
  const isActive = streakCount > 0;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-xs border transition-all ${
        isActive
          ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 shadow-amber-500/5'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
      } ${className}`}
      title={label}
    >
      <span className="mr-1.5 text-sm">{isActive ? '🔥' : '❄️'}</span>
      <span>{streakCount} {streakCount === 1 ? 'day streak' : 'days streak'}</span>
    </div>
  );
}
