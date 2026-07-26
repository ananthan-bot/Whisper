/** @component OfflineBanner - Banner displaying real-time online/offline connection state */
import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-between shadow-inner"
        >
          <div className="flex items-center gap-2">
            <WifiOff size={16} className="animate-pulse" />
            <span>You are currently offline. Tasks & messages will sync automatically once reconnected.</span>
          </div>
          <span className="inline-flex items-center gap-1 opacity-80 text-[11px]">
            <RefreshCw size={12} className="animate-spin" /> Offline Mode
          </span>
        </motion.div>
      )}

      {isOnline && showRestored && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-between shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Wifi size={16} />
            <span>Connection restored! Syncing latest task updates...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
