import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import WhisperLogo from './WhisperLogo';

export default function Navbar() {
  const { viewMode, setViewMode, tasks } = useStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Open task count badge (relevant for helper mode)
  const openTaskCount = tasks.filter((t) => t.status === 'open').length;

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav
      className={cn(
        'w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300',
        scrolled && 'shadow-soft border-slate-200'
      )}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 pr-4 group">
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center justify-center transition-all duration-300"
        >
          <WhisperLogo className="w-8 h-8" />
        </motion.div>
        <span className="font-semibold text-xl tracking-tight text-slate-800 group-hover:text-primary-700 transition-colors duration-300">
          Whisper
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-full">
          {['requester', 'helper'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 capitalize',
                viewMode === mode
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {mode === 'requester' ? 'Requester' : 'Helper'}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        {viewMode === 'requester' ? (
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
        ) : (
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
      </div>
    </nav>
  );
}
