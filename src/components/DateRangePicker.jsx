/** @component DateRangePicker - Component to select date range filtering for task lists */
import { Calendar } from 'lucide-react';
import { cn } from '../lib/cn';

const RANGES = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: '7days', label: 'Past 7 Days' },
  { id: '30days', label: 'Past 30 Days' },
];

export default function DateRangePicker({ selectedRange = 'all', onChange, className = '' }) {
  return (
    <div className={cn('inline-flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60', className)}>
      <Calendar className="w-4 h-4 text-slate-400 ml-2 mr-1" />
      {RANGES.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onChange && onChange(r.id)}
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer',
            selectedRange === r.id
              ? 'bg-white text-primary-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
