import { Award, Zap, DollarSign, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../lib/walletHelpers';

export default function UserStatsSummary({ stats = {} }) {
  const level = stats.level || 1;
  const xpProgress = stats.xpProgress || 0;
  const currentXP = stats.currentXP || 0;
  const tierName = stats.tierName || 'Rookie Helper';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Reputation Status</span>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {tierName} <Award className="w-5 h-5 text-amber-500" />
          </h2>
        </div>
        <div className="bg-primary-50 border border-primary-200 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full">
          Level {level}
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-1 font-medium">
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> {currentXP} XP</span>
          <span>{xpProgress}% to Level {level + 1}</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, xpProgress))}%` }}
          />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Completed
          </div>
          <div className="text-lg font-bold text-slate-800">{stats.completedCount || 0}</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1 font-medium">
            <DollarSign className="w-3.5 h-3.5 text-primary-500" /> Earned
          </div>
          <div className="text-lg font-bold text-slate-800">{formatCurrency(stats.totalBountyEarned || 0)}</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1 font-medium">
            <Award className="w-3.5 h-3.5 text-amber-500" /> Rating
          </div>
          <div className="text-lg font-bold text-slate-800">
            {stats.ratingAverage ? `${stats.ratingAverage}★` : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}
