import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import { formatRelativeTime } from '../lib/utils';
import { categories } from '../lib/categories';
import LocationBadge from './LocationBadge';

const STATUS_STYLES = {
  open:      { dot: 'bg-slate-400',    badge: 'bg-slate-100 text-slate-600 border-slate-200',  label: 'Open' },
  claimed:   { dot: 'bg-warning-500 animate-pulse-slow', badge: 'bg-warning-50 text-warning-600 border-warning-100', label: 'In Progress' },
  completed: { dot: 'bg-primary-500', badge: 'bg-primary-50 text-primary-700 border-primary-100', label: 'Awaiting Review' },
  accepted:  { dot: 'bg-primary-500', badge: 'bg-primary-50 text-primary-700 border-primary-100', label: 'Completed' },
};

/**
 * Reusable task card used in HelperDashboard.
 * @param {object} task - task object from the store
 * @param {number} index - used for staggered animation delay
 */
export default function TaskCard({ task, index = 0 }) {
  const category = categories.find((c) => c.id === task.category);
  const Icon = category?.icon;
  const status = STATUS_STYLES[task.status] ?? STATUS_STYLES.open;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className={cn(
        'bg-white p-6 rounded-2xl border shadow-soft flex flex-col transition-all duration-300 group',
        task.status === 'open'
          ? 'border-slate-200 hover:border-primary-300 hover:shadow-card'
          : 'border-slate-100 opacity-75'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {category ? (
          <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium', category.colorClass)}>
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {category.name}
          </div>
        ) : (
          <div className="w-20 h-5 rounded-full bg-slate-100" />
        )}

        <div className="flex items-center gap-2">
          <LocationBadge distanceMiles={task.distanceMiles} locationName={task.locationName} />
          <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border', status.badge)}>
            <div className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
            {status.label}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-700 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-slate-400 font-medium">
            by <span className="text-slate-600">{task.alias}</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {formatRelativeTime(task.createdAt)}
          </span>
        </div>

        <Link
          to={`/task/${task.id}`}
          className="px-4 py-2 bg-slate-50 font-medium text-slate-700 text-sm rounded-full group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors border border-slate-200 group-hover:border-primary-200"
        >
          View Task →
        </Link>
      </div>
    </motion.div>
  );
}
