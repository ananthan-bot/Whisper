/** @component TaskUrgencyIndicator - Renders a badge indicating task urgency score */
import { calculateTaskUrgencyScore, getUrgencyScoreColorClass } from '../lib/urgencyScoreHelpers';
import { Flame } from 'lucide-react';
import { cn } from '../lib/cn';

export default function TaskUrgencyIndicator({ task, className = '' }) {
  if (!task) return null;
  const score = calculateTaskUrgencyScore(task);
  const colorClass = getUrgencyScoreColorClass(score);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        colorClass,
        className
      )}
      title={`Urgency Score: ${score}/100`}
    >
      <Flame className="w-3.5 h-3.5 shrink-0" />
      <span>{score} pts</span>
    </div>
  );
}
