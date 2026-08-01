import React from 'react';
import { Clock } from 'lucide-react';
import { formatRelativeTime } from '../lib/utils';

export default function RelativeTimeBadge({ timestamp, className = '' }) {
  if (!timestamp) return null;

  const timeString = formatRelativeTime(timestamp);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/50 ${className}`}
      title={new Date(timestamp).toLocaleString()}
    >
      <Clock className="w-3 h-3 text-slate-400" />
      <span>{timeString}</span>
    </span>
  );
}
