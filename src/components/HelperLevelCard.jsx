/** @component HelperLevelCard - Gamification level progress & XP dashboard widget */
import React from 'react';
import { Award, Flame, Zap, Percent, ChevronRight } from 'lucide-react';
import { calculateUserXP } from '../lib/gamificationHelpers';

export default function HelperLevelCard({ tasks = [], ratings = {}, compact = false }) {
  const xpData = calculateUserXP(tasks, ratings);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium border border-slate-700 shadow-sm">
        <span className="text-base">{xpData.icon}</span>
        <span>Lvl {xpData.level} • {xpData.title}</span>
        <span className="text-emerald-400 font-bold ml-1">{xpData.xp} XP</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 border border-slate-700/80 shadow-lg relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl shadow-inner">
            {xpData.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Level {xpData.level}
              </span>
              {xpData.streakCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Flame size={12} className="fill-amber-400 text-amber-400" />
                  {xpData.streakCount} Day Streak
                </span>
              )}
            </div>
            <h3 className="font-bold text-white text-base">{xpData.title}</h3>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-extrabold text-emerald-400 tracking-tight">
            {xpData.xp} <span className="text-xs font-semibold text-slate-400">XP</span>
          </div>
          <div className="text-xs text-slate-400">
            {xpData.xpToNextLevel > 0 ? `${xpData.xpToNextLevel} XP to Next` : 'Max Level Reached'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 my-3">
        <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${Math.max(6, xpData.progressPercentage)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 font-medium px-0.5">
          <span>{xpData.progressPercentage}% Progress</span>
          <span>{xpData.nextTier ? `Next: ${xpData.nextTier.name}` : 'Tier Max'}</span>
        </div>
      </div>

      {/* Perk pill */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <Percent size={14} className="text-emerald-400" />
          <span>Platform Fee Discount:</span>
          <span className="font-bold text-emerald-400">{xpData.feeDiscount}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer text-xs font-medium transition-colors">
          <span>View Perks</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}
