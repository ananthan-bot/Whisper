/** @component UserActivitySummaryWidget - Widget displaying user task activity and completion rates */
import { calculateUserActivitySummary } from '../lib/userActivityHelpers';
import { Activity, CheckCircle2, DollarSign, Percent } from 'lucide-react';
import { cn } from '../lib/cn';

export default function UserActivitySummaryWidget({ tasks, userAlias, className = '' }) {
  const summary = calculateUserActivitySummary(tasks, userAlias);

  return (
    <div className={cn('bg-white p-5 rounded-2xl border border-slate-200 shadow-soft grid grid-cols-2 sm:grid-cols-4 gap-4', className)}>
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="p-2 rounded-lg bg-primary-100 text-primary-700">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Posted</div>
          <div className="text-base font-bold text-slate-800">{summary.posted}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Completed</div>
          <div className="text-base font-bold text-slate-800">{summary.completed}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
          <DollarSign className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Total Volume</div>
          <div className="text-base font-bold text-slate-800">${summary.totalBounty}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
          <Percent className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Success Rate</div>
          <div className="text-base font-bold text-slate-800">{summary.completionRate}%</div>
        </div>
      </div>
    </div>
  );
}
