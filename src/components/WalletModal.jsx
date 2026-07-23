import { X, Wallet, ArrowDownRight, ArrowUpRight, Lock, DollarSign } from 'lucide-react';
import { formatCurrency, calculateWalletSummary } from '../lib/walletHelpers';
import { formatRelativeTime } from '../lib/utils';

export default function WalletModal({ isOpen, onClose, transactions = [] }) {
  if (!isOpen) return null;

  const summary = calculateWalletSummary(transactions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden relative">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Whisper Wallet & Escrow</h2>
              <p className="text-xs text-emerald-100">Bounty hold and payout history</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Cards */}
        <div className="p-5 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium block">Available</span>
              <span className="text-lg font-bold text-slate-800">
                {formatCurrency(summary.balance)}
              </span>
            </div>

            <div className="p-3 bg-white border border-amber-200 bg-amber-50/50 rounded-xl shadow-xs">
              <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> In Escrow
              </span>
              <span className="text-lg font-bold text-amber-900">
                {formatCurrency(summary.inEscrow)}
              </span>
            </div>

            <div className="p-3 bg-white border border-emerald-200 bg-emerald-50/50 rounded-xl shadow-xs">
              <span className="text-[11px] text-emerald-700 font-medium block">Total Earned</span>
              <span className="text-lg font-bold text-emerald-800">
                {formatCurrency(summary.totalEarned)}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="p-5">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Recent Activity
          </h3>

          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                No wallet transactions recorded yet.
              </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-lg ${
                        tx.type === 'ESCROW_RELEASE' || tx.type === 'PAYOUT_RECEIVED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : tx.type === 'ESCROW_HOLD'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tx.type === 'ESCROW_RELEASE' || tx.type === 'PAYOUT_RECEIVED' ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{tx.description}</p>
                      <p className="text-[10px] text-slate-400">
                        {formatRelativeTime(tx.createdAt)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`font-bold ${
                      tx.type === 'ESCROW_RELEASE' || tx.type === 'PAYOUT_RECEIVED'
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {tx.type === 'ESCROW_RELEASE' || tx.type === 'PAYOUT_RECEIVED' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
