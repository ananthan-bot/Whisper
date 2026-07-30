import React from 'react';
import { Star } from 'lucide-react';
import { calculateRatingBreakdown } from '../lib/ratingHelpers';

export default function RatingDistributionChart({ ratings = [] }) {
  const breakdown = calculateRatingBreakdown(ratings);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{breakdown.average}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ 5.0</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(breakdown.average)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
            ({breakdown.total})
          </span>
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const item = breakdown[star];
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-gray-600 dark:text-gray-400 font-medium">{star}</span>
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-400 dark:text-gray-500">{item.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
