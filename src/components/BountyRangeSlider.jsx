import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../lib/walletHelpers';

export default function BountyRangeSlider({ value = 0, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700">
      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      <span>Min: <strong className="text-slate-900">{formatCurrency(value)}</strong></span>
      <input
        type="range"
        min="0"
        max="150"
        step="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 accent-primary-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
      />
    </div>
  );
}
