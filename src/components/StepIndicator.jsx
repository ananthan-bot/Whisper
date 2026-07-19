import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

const STEP_LABELS = ['Category', 'Describe', 'Script', 'Proof', 'Alias'];

/**
 * Visual multi-step progress indicator for multi-step forms.
 * @param {number} currentStep - 1-indexed current step
 * @param {number} totalSteps  - total number of steps
 * @param {string[]} labels    - optional label overrides
 */
export default function StepIndicator({
  currentStep,
  totalSteps = 5,
  labels = STEP_LABELS,
}) {
  return (
    <div className="w-full flex items-start justify-between relative mb-8 px-1">
      {/* Connecting line behind dots */}
      <div className="absolute top-4 left-0 right-0 h-px bg-slate-200 z-0" />
      <motion.div
        className="absolute top-4 left-0 h-px bg-primary-500 z-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (currentStep - 1) / (totalSteps - 1) }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ width: '100%' }}
      />

      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive    = step === currentStep;

        return (
          <div key={step} className="flex flex-col items-center gap-2 z-10">
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                backgroundColor: isCompleted
                  ? '#1D9E75'
                  : isActive
                  ? '#1D9E75'
                  : '#E2E8F0',
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border-2 transition-all',
                isCompleted
                  ? 'border-primary-600 text-white'
                  : isActive
                  ? 'border-primary-600 text-white ring-4 ring-primary-100'
                  : 'border-slate-200 text-slate-400'
              )}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </motion.div>
            <span
              className={cn(
                'text-[11px] font-medium tracking-wide',
                isActive    ? 'text-primary-700' :
                isCompleted ? 'text-slate-500'    : 'text-slate-400'
              )}
            >
              {labels[i] ?? `Step ${step}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
