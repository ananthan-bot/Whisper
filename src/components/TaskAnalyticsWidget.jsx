import React from 'react';
import { TrendingUp, DollarSign, CheckCircle2, List } from 'lucide-react';
import { calculateTaskMetrics } from '../lib/analyticsHelpers';
import { formatCompactCurrency } from '../lib/utils';

export default function TaskAnalyticsWidget({ tasks = [] }) {
  const metrics = calculateTaskMetrics(tasks);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
          <List className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Total Tasks</div>
          <div className="text-lg font-bold text-slate-100">{metrics.totalTasks}</div>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Total Bounties</div>
          <div className="text-lg font-bold text-slate-100">{formatCompactCurrency(metrics.totalBounty)}</div>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Avg Bounty</div>
          <div className="text-lg font-bold text-slate-100">${metrics.avgBounty}</div>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">Completion Rate</div>
          <div className="text-lg font-bold text-slate-100">{metrics.completionRate}%</div>
        </div>
      </div>
    </div>
  );
}
