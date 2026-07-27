import { Link } from 'react-router-dom';
import EscrowStatusBadge from './EscrowStatusBadge';
import { formatRelativeTime } from '../lib/utils';
import EmptyState from './EmptyState';

export default function PostedTasksList({ tasks = [] }) {
  if (!tasks.length) {
    return (
      <EmptyState
        title="No Posted Tasks Yet"
        description="You haven't requested any anonymous tasks yet. Post a task to get started."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-500">{task.id}</span>
              <span className="text-xs font-semibold text-slate-700 capitalize bg-slate-100 px-2.5 py-0.5 rounded-full">
                {task.category}
              </span>
            </div>
            <p className="text-sm text-slate-700 line-clamp-1 font-medium">{task.description}</p>
            <span className="text-xs text-slate-400">{formatRelativeTime(task.createdAt)}</span>
          </div>

          <div className="flex items-center gap-3">
            <EscrowStatusBadge status={task.status} bounty={task.bounty || 25} />
            <Link
              to={`/task/${task.id}`}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
            >
              View Detail
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
