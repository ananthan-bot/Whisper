import { motion } from 'framer-motion';

export default function WhisperLogo({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background mint circle with subtle breath animation */}
      <motion.circle
        cx="16"
        cy="16"
        r="16"
        fill="#E1F5EE"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Speech bubble body */}
      <motion.path
        d="M23 11C23 9.34315 21.6569 8 20 8H12C10.3431 8 9 9.34315 9 11V18C9 19.6569 10.3431 21 12 21H13V24.5C13 24.7761 13.2239 25 13.5 25C13.626 25 13.7473 24.9525 13.84 24.8687L17.84 21H20C21.6569 21 23 19.6569 23 18V11Z"
        fill="#1D9E75"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '16px 16px' }}
      />

      {/* Animated wave / whisper line */}
      <motion.path
        d="M12.5 14.5 Q 14.25 12, 16 14.5 T 19.5 14.5"
        stroke="#085041"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}
