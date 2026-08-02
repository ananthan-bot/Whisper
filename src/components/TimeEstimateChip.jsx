import React from 'react';
import { calculateEstimatedDurationMinutes, formatDurationHuman, isLongTask } from '../lib/taskTimeEstimateHelpers';

/**
 * TimeEstimateChip component displays human readable estimated task duration badge.
 */
export default function TimeEstimateChip({ task, minutes, className = '' }) {
  const estimatedMins = typeof minutes === 'number' 
    ? minutes 
    : calculateEstimatedDurationMinutes(task);

  const formatted = formatDurationHuman(estimatedMins);
  const isLong = isLongTask(estimatedMins);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${
        isLong
          ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800'
          : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
      } ${className}`}
      title={`Est. Duration: ${formatted}`}
    >
      <svg className="w-3 h-3 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formatted}</span>
    </span>
  );
}
