import { useState } from 'react';
import { useStore } from '../store/useStore';
import UserStatsSummary from '../components/UserStatsSummary';
import PostedTasksList from '../components/PostedTasksList';
import ClaimedTasksList from '../components/ClaimedTasksList';
import { calculateProfileStats, getEarnedBadges } from '../lib/profileHelpers';
import { User, Award, ListChecks, Handshake } from 'lucide-react';

export default function Profile() {
  const { user, tasks, ratings } = useStore();
  const [activeTab, setActiveTab] = useState('posted');

  const userAlias = user?.alias || 'User #1042';
  const profileStats = calculateProfileStats(tasks, ratings, userAlias);
  const earnedBadges = getEarnedBadges(profileStats);

  const postedTasks = tasks.filter((t) => t.alias === userAlias);
  const claimedTasks = tasks.filter((t) => t.helperAlias === userAlias || t.status === 'completed' || t.status === 'accepted');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-6">
      {/* Header Profile Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-soft flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-soft shrink-0">
          {userAlias.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">{userAlias}</h1>
            <span className="text-xs font-semibold bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full border border-primary-100">
              Verified Anonymous
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Community member in good standing • Encrypted user sessions
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <UserStatsSummary stats={profileStats} />

      {/* Badges Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-soft">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" /> Earned Achievement Badges ({earnedBadges.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {earnedBadges.map((badge) => (
            <div key={badge.id} className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl flex items-center gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <div className="text-xs font-bold text-amber-900">{badge.name}</div>
                <div className="text-[10px] text-amber-700">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
          <button
            onClick={() => setActiveTab('posted')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'posted'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks className="w-4 h-4" /> Posted Tasks ({postedTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('claimed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'claimed'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Handshake className="w-4 h-4" /> Helper Work ({claimedTasks.length})
          </button>
        </div>

        {activeTab === 'posted' ? (
          <PostedTasksList tasks={postedTasks} />
        ) : (
          <ClaimedTasksList tasks={claimedTasks} />
        )}
      </div>
    </div>
  );
}
