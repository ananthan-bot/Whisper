/** @component CategoryStatsCard - Displays category activity breakdown */
import { calculateCategoryStats } from '../lib/categoryStatsHelpers';
import { categories } from '../lib/categories';
import { Layers } from 'lucide-react';
import { cn } from '../lib/cn';

export default function CategoryStatsCard({ tasks, className = '' }) {
  const stats = calculateCategoryStats(tasks);

  return (
    <div className={cn('bg-white p-5 rounded-2xl border border-slate-200 shadow-soft', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-primary-600" />
        <h3 className="font-semibold text-slate-800 text-sm">Category Market Breakdown</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const catStat = stats[cat.id] || { count: 0, avgBounty: 0 };
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className={cn('p-1.5 rounded-lg text-xs font-semibold', cat.colorClass)}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                </span>
                <span className="text-[11px] font-medium text-slate-400">{catStat.count} tasks</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800 line-clamp-1">{cat.name}</div>
                <div className="text-[11px] text-slate-500">Avg ${catStat.avgBounty || 25}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
