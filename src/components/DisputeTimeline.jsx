import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { getDisputeTimelineStatus } from '../lib/disputeTimelineHelpers';

export default function DisputeTimeline({ status = 'filed', className = '' }) {
  const { steps, progressPercentage } = getDisputeTimelineStatus(status);

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Dispute Status Timeline</h4>
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
          {progressPercentage}% Progress
        </span>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-4 h-0.5 bg-indigo-600 dark:bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `calc(${progressPercentage}% - 2rem)` }}
        />

        {steps.map((step) => {
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  step.isCompleted
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500 shadow-sm'
                    : step.isCurrent
                    ? 'bg-white text-indigo-600 border-2 border-indigo-600 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400 ring-4 ring-indigo-50 dark:ring-indigo-900/40'
                    : 'bg-gray-100 text-gray-400 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500'
                }`}
              >
                {step.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : step.isCurrent ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 whitespace-nowrap ${
                  step.isCurrent
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : step.isCompleted
                    ? 'text-gray-800 dark:text-gray-200'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
