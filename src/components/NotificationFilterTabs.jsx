/** @component NotificationFilterTabs - Filter tab selector for notification center */
import { countUnreadNotifications } from '../lib/notificationFilterHelpers';
import { Bell, BellOff, ListFilter } from 'lucide-react';
import { cn } from '../lib/cn';

export default function NotificationFilterTabs({ notifications = [], activeFilter = 'all', onChange, className = '' }) {
  const unreadCount = countUnreadNotifications(notifications);

  const TABS = [
    { id: 'all', label: 'All', icon: ListFilter, count: notifications.length },
    { id: 'unread', label: 'Unread', icon: Bell, count: unreadCount },
    { id: 'read', label: 'Read', icon: BellOff, count: notifications.length - unreadCount },
  ];

  return (
    <div className={cn('flex items-center gap-1 p-1 bg-slate-100/70 rounded-xl border border-slate-200/50 text-xs font-medium', className)}>
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange && onChange(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer',
              isActive
                ? 'bg-white text-slate-800 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            <span
              className={cn(
                'px-1.5 py-0.2 text-[10px] rounded-full font-bold',
                isActive ? 'bg-slate-100 text-slate-700' : 'bg-slate-200/60 text-slate-500'
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
