import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import WhisperLogo from './WhisperLogo';

export default function Navbar() {
  const { viewMode, setViewMode } = useStore();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-500">
      <Link to="/" className="flex items-center gap-3 pr-4 group">
        <motion.div
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           transition={{ duration: 0.2 }}
           className="relative flex items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100"
        >
          <WhisperLogo className="w-8 h-8" />
        </motion.div>
        <span className="font-medium text-xl tracking-tight text-slate-800 transition-colors duration-300 opacity-90 group-hover:opacity-100">
          Whisper
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {/* Toggle Mode for Demo purposes */}
        <div className="flex bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setViewMode('requester')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === 'requester' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Requester Mode
          </button>
          <button
            onClick={() => setViewMode('helper')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === 'helper' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Helper Mode
          </button>
        </div>
        
        {viewMode === 'requester' ? (
          <Link to="/post-task" className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-500 transition-colors">
            Post a task
          </Link>
        ) : (
          <Link to="/helper" className="text-primary-600 bg-primary-50 px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors">
            View Tasks
          </Link>
        )}
      </div>
    </nav>
  );
}
