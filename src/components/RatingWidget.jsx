import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { cn } from '../lib/cn';

const STARS = [1, 2, 3, 4, 5];

const EMOJI_MAP = {
  1: { emoji: '??', label: 'Poor' },
  2: { emoji: '??', label: 'Fair' },
  3: { emoji: '??', label: 'Good' },
  4: { emoji: '??', label: 'Great' },
  5: { emoji: '??', label: 'Amazing!' },
};

export default function RatingWidget({ taskId, helperId }) {
  const { rateTask, ratings } = useStore();
  const existing = ratings?.[taskId];

  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(!!existing);
  const [selected, setSelected] = useState(existing || 0);
  const [review, setReview] = useState('');

  const display = hovered || selected;

  const handleSubmit = () => {
    if (!selected) return;
    rateTask(taskId, selected, helperId, review.trim());
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-2 py-4 text-center"
      >
        <span className="text-3xl">{EMOJI_MAP[selected]?.emoji ?? '?'}</span>
        <p className="text-sm font-medium text-primary-700">Thanks for your rating!</p>
        <div className="flex gap-1 mt-1">
          {STARS.map((s) => (
            <svg
              key={s}
              className={cn('w-5 h-5', s <= selected ? 'text-amber-400' : 'text-slate-200')}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-sm font-medium text-slate-700">Rate your helper</p>

      <div className="flex gap-2">
        {STARS.map((s) => (
          <motion.button
            key={s}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setSelected(s)}
            className="focus:outline-none"
          >
            <svg
              className={cn(
                'w-8 h-8 transition-colors duration-150',
                s <= display ? 'text-amber-400' : 'text-slate-200'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {display > 0 && (
          <motion.div
            key={display}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="text-sm text-slate-500 font-medium"
          >
            {EMOJI_MAP[display]?.emoji} {EMOJI_MAP[display]?.label}
          </motion.div>
        )}
      </AnimatePresence>

      {display > 0 && (
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Optional review..."
          className="w-full max-w-xs h-16 p-2.5 text-xs border border-slate-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className="mt-1 px-6 py-2 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
      >
        Submit Rating
      </button>
    </div>
  );
}
