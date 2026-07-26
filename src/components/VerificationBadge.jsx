/** @component VerificationBadge - Displays helper verification & trust badges */
import React from 'react';
import { ShieldCheck, Award, Zap, Heart } from 'lucide-react';
import { VERIFICATION_BADGES } from '../lib/reputationHelpers';

const iconMap = {
  ShieldCheck,
  Award,
  Zap,
  Heart
};

export default function VerificationBadge({ type = 'id_verified', size = 'sm', showLabel = true }) {
  const badge = VERIFICATION_BADGES[type] || VERIFICATION_BADGES.id_verified;
  const IconComponent = iconMap[badge.icon] || ShieldCheck;

  const sizeClasses = size === 'xs' 
    ? 'px-1.5 py-0.5 text-xs gap-1' 
    : size === 'lg' 
    ? 'px-3 py-1.5 text-sm gap-2' 
    : 'px-2 py-1 text-xs gap-1.5';

  const iconSizes = size === 'xs' ? 12 : size === 'lg' ? 18 : 14;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${badge.color} ${sizeClasses}`}
      title={badge.description}
    >
      <IconComponent size={iconSizes} className="shrink-0" />
      {showLabel && <span>{badge.label}</span>}
    </span>
  );
}
