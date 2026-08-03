/** @component VerificationStatusBanner - Displays trust and verification badges */
import { getVerificationBadgeInfo } from '../lib/verificationHelpers';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../lib/cn';

export default function VerificationStatusBanner({ badges = ['id_verified', 'top_rated'], className = '' }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80', className)}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-2">
        <ShieldCheck className="w-4 h-4 text-primary-600" />
        <span>Trust Badges:</span>
      </div>

      {badges.map((badgeType) => {
        const info = getVerificationBadgeInfo(badgeType);
        return (
          <div
            key={badgeType}
            title={info.description}
            className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border shadow-2xs', info.color)}
          >
            <span>{info.label}</span>
          </div>
        );
      })}
    </div>
  );
}
