/** @component UrgentTaskBadge - Animated pulse badge for high-priority SOS tasks */
import React from 'react';
import { AlertCircle, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UrgentTaskBadge({ pulse = true, label = 'SOS URGENT' }) {
  return (
    <span className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800 shadow-sm overflow-hidden">
      {pulse && (
        <span className="relative flex h-2 w-2">
          <motion.span
            animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
        </span>
      )}
      <Flame size={13} className="text-rose-600 dark:text-rose-400 fill-rose-500" />
      <span>{label}</span>
    </span>
  );
}
