import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import WhisperLogo from './WhisperLogo';
import NotificationCenter from './NotificationCenter';
import UserProfileModal from './UserProfileModal';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const {
    user,
    logout,
    tasks,
    ratings,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openTaskCount = tasks.filter((t) => t.status === 'open').length;
  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav
        className={cn(
          'w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300',
          scrolled && 'shadow-soft border-slate-200'
        )}
      >
        <Link to="/" className="flex items-center gap-3 pr-4 group">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <WhisperLogo className="w-8 h-8" />
          </motion.div>
          <span className="font-semibold text-xl tracking-tight text-slate-800 group-hover:text-primary-700 transition-colors duration-300">
            Whisper
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={markNotificationAsRead}
              onMarkAllAsRead={markAllNotificationsAsRead}
              onClearAll={clearNotifications}
              onNotificationClick={(taskId) => navigate(`/task/${taskId}`)}
            />
          )}

          {user && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative">
              <Link
                to="/helper"
                className={cn(
                  'text-primary-700 bg-primary-50 px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors border border-primary-200',
                  isActive('/helper') && 'bg-primary-100 ring-2 ring-primary-200'
                )}
              >
                View Tasks
              </Link>
              {openTaskCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {openTaskCount > 9 ? '9+' : openTaskCount}
                </motion.span>
              )}
            </motion.div>
          )}

          {user && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/post-task"
                className={cn(
                  'bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-500 transition-colors shadow-sm',
                  isActive('/post-task') && 'bg-primary-700 ring-2 ring-primary-200'
                )}
              >
                Post a task
              </Link>
            </motion.div>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <button
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 hover:bg-slate-100 px-2 py-1 rounded-full transition-colors cursor-pointer"
                title="View Profile"
              >
                <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.alias ? user.alias.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium text-slate-700">{user.alias}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-500 transition-colors shadow-sm"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {user && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          tasks={tasks}
          ratings={ratings}
        />
      )}
    </>
  );
}
