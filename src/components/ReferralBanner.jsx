import React, { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';
import { generateReferralCode } from '../lib/referralHelpers';

export default function ReferralBanner({ username = 'Helper' }) {
  const [copied, setCopied] = useState(false);
  const referralCode = generateReferralCode(username);

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-500/20 rounded-2xl p-4 my-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
          <Gift className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-100 text-sm sm:text-base">Invite Friends & Earn $10 Bonus</h4>
          <p className="text-xs text-slate-400">Share your referral code and get rewarded on their first completed task.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
        <span className="font-mono text-sm font-bold text-amber-400">{referralCode}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          title="Copy Referral Code"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
