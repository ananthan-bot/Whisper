/** @component LoadingSpinner - Reusable animated loading spinner with configurable size and label */
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/cn';

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export default function LoadingSpinner({
  size = 'md',
  label = '',
  className = '',
  colorClass = 'text-primary-600 dark:text-primary-400',
}) {
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={cn('flex items-center justify-center gap-2.5 text-gray-600 dark:text-gray-300', className)}>
      <Loader2 className={cn('animate-spin', spinnerSize, colorClass)} />
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}
