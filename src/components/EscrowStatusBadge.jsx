import { Lock, CheckCircle2, AlertTriangle, RotateCcw, FileQuestion, DollarSign } from 'lucide-react';
import { formatCurrency } from '../lib/walletHelpers';

export default function EscrowStatusBadge({ status, bounty = 25 }) {
  if (status === 'accepted') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold shadow-2xs">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Bounty Released ({formatCurrency(bounty)})</span>
      </div>
    );
  }

  if (status === 'disputed') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-xs font-semibold shadow-2xs">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
        <span>Escrow Disputed ({formatCurrency(bounty)})</span>
      </div>
    );
  }

  if (status === 'refunded') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-xs font-semibold shadow-2xs">
        <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
        <span>Bounty Refunded ({formatCurrency(bounty)})</span>
      </div>
    );
  }

  if (status === 'revision_requested') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-semibold shadow-2xs">
        <FileQuestion className="w-3.5 h-3.5 text-orange-600" />
        <span>Revision Requested ({formatCurrency(bounty)})</span>
      </div>
    );
  }

  if (status === 'claimed' || status === 'completed') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-semibold shadow-2xs">
        <Lock className="w-3.5 h-3.5 text-amber-600" />
        <span>Held in Escrow ({formatCurrency(bounty)})</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-full text-xs font-semibold shadow-2xs">
      <DollarSign className="w-3.5 h-3.5" />
      <span>Bounty Escrow Ready ({formatCurrency(bounty)})</span>
    </div>
  );
}
