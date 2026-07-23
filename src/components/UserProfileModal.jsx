import { X, Award, Star, CheckCircle, ShieldCheck, User } from 'lucide-react';
import { calculateUserStats } from '../lib/reputationHelpers';

export default function UserProfileModal({ isOpen, onClose, user, tasks = [], ratings = {} }) {
  if (!isOpen || !user) return null;

  const stats = calculateUserStats(user.alias, tasks, ratings);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Header Banner */}
        <div className="h-24 bg-gradient-to-r from-primary-600 via-teal-600 to-accent-600 p-4 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar */}
          <div className="-mt-12 mb-3 flex items-end justify-between">
            <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center text-white text-2xl font-bold">
                {user.alias ? user.alias.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-xs ${stats.tier.color}`}
            >
              {stats.tier.name}
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-800">{user.alias}</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-600" /> Anonymous Whisper Member
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 my-5">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
                <Star className="w-4 h-4 fill-amber-400" />
                {stats.averageRating}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Avg Rating</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-lg">
                <CheckCircle className="w-4 h-4" />
                {stats.completedCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Completed</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="font-bold text-lg text-slate-700">{stats.completionRate}%</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Completion</p>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-primary-600" /> Earned Badges
            </h3>
            {stats.badges.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl text-center">
                Complete tasks and earn top ratings to unlock badges!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {stats.badges.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-medium"
                  >
                    <span>{b.icon}</span>
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
