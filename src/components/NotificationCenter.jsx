import { useState } from 'react';
import { Bell, Check, Trash2, X, Info } from 'lucide-react';
import { formatRelativeTime } from '../lib/utils';
import {
  getUnreadNotifications,
  getNotificationBadgeColor,
} from '../lib/notificationHelpers';

export default function NotificationCenter({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadList = getUnreadNotifications(notifications);

  const handleItemClick = (notif) => {
    if (onMarkAsRead) onMarkAsRead(notif.id);
    if (onNotificationClick && notif.taskId) onNotificationClick(notif.taskId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadList.length > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
            {unreadList.length > 9 ? '9+' : unreadList.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white border border-slate-200 shadow-xl z-50 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-slate-800">Notifications</h3>
              {unreadList.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-rose-100 text-rose-700 rounded-full">
                  {unreadList.length} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadList.length > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllAsRead}
                  className="p-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 cursor-pointer"
                  title="Mark all as read"
                >
                  <Check className="w-3.5 h-3.5" /> Read All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-500 flex flex-col items-center gap-2">
                <Info className="w-8 h-8 text-slate-300" />
                <p className="text-sm font-medium">No notifications yet</p>
                <p className="text-xs text-slate-400">Activity on your tasks will appear here.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                    !notif.read ? 'bg-teal-50/40' : ''
                  }`}
                >
                  <div
                    className={`mt-0.5 px-2 py-1 text-[10px] font-bold rounded-md border shrink-0 ${getNotificationBadgeColor(
                      notif.type
                    )}`}
                  >
                    {notif.type ? notif.type.replace('_', ' ') : 'NOTIF'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                      <span className="truncate">{notif.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal shrink-0 ml-2">
                        {formatRelativeTime(notif.createdAt)}
                      </span>
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Clear Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
