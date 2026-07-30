import React from 'react';
import { Clock } from 'lucide-react';
import { formatDeadlineRemaining } from '../lib/utils';

export default function TaskDeadlineBadge({ deadline, className = '' }) {
  const text = formatDeadlineRemaining(deadline);
  
  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  if (text === 'Expired') {
    colorClasses = 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800';
  } else if (text.includes('m remaining')) {
    colorClasses = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800 animate-pulse';
  } else if (text.includes('h remaining')) {
    colorClasses = 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}>
      <Clock className="w-3.5 h-3.5" />
      <span>{text}</span>
    </span>
  );
}
