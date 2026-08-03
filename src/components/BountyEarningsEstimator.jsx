/** @component BountyEarningsEstimator - Calculator component estimating weekly helper earnings */
import { useState } from 'react';
import { estimateWeeklyEarnings } from '../lib/earningsEstimatorHelpers';
import { Calculator, DollarSign, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/cn';

export default function BountyEarningsEstimator({ feeDiscount = 0, className = '' }) {
  const [tasksPerWeek, setTasksPerWeek] = useState(5);
  const [avgBounty, setAvgBounty] = useState(30);

  const earnings = estimateWeeklyEarnings(tasksPerWeek, avgBounty, feeDiscount);

  return (
    <div className={cn('bg-white p-6 rounded-2xl border border-slate-200 shadow-soft', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
            <Calculator className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">Weekly Earnings Estimator</h3>
        </div>
        {feeDiscount > 0 && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3 h-3" /> {feeDiscount}% Discount Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Tasks completed per week: <span className="font-bold text-slate-800">{tasksPerWeek}</span>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={tasksPerWeek}
            onChange={(e) => setTasksPerWeek(Number(e.target.value))}
            className="w-full accent-primary-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Average bounty reward: <span className="font-bold text-slate-800">${avgBounty}</span>
          </label>
          <input
            type="range"
            min="15"
            max="150"
            step="5"
            value={avgBounty}
            onChange={(e) => setAvgBounty(Number(e.target.value))}
            className="w-full accent-primary-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 font-medium">Estimated Net Payout</div>
          <div className="text-xl font-bold text-slate-800 flex items-center gap-0.5">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            {earnings.net.toFixed(2)} / wk
          </div>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div>Gross: ${earnings.gross.toFixed(2)}</div>
          <div>Fee: ${earnings.feeAmount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
