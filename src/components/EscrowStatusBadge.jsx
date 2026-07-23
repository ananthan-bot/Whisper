import { Lock, CheckCircle2, ShieldAlert, DollarSign } from 'lucide-react';
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
