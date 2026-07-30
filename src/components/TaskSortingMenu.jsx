import React from 'react';
import { ArrowUpDown, Flame, DollarSign, Clock } from 'lucide-react';

export default function TaskSortingMenu({ currentSort = 'newest', onSortChange }) {
  const options = [
    { value: 'newest', label: 'Newest First', icon: Clock },
    { value: 'oldest', label: 'Oldest First', icon: ArrowUpDown },
    { value: 'highest_bounty', label: 'Highest Bounty', icon: DollarSign },
    { value: 'urgency', label: 'Most Urgent', icon: Flame },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sort:</span>
      <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = currentSort === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSortChange && onSortChange(opt.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
