import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { categories } from '../lib/categories';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { Inbox, SlidersHorizontal } from 'lucide-react';
import { cn } from '../lib/cn';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export default function HelperDashboard() {
  const tasks = useStore((state) => state.tasks);

  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder,    setSortOrder]    = useState('newest');

  // Apply filter
  const filtered = tasks.filter((t) =>
    activeFilter === 'all' ? true : t.category === activeFilter
  );

  // Apply sort
  const sorted = [...filtered].sort((a, b) => {
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    return sortOrder === 'newest' ? -diff : diff;
  });

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Available Tasks</h1>
          <p className="text-slate-500 text-sm mt-1">
            Pick up a task and help someone out quietly.
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((opt) => {
          const cat = categories.find((c) => c.id === opt.value);
          const Icon = cat?.icon;
          const isActive = activeFilter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
                isActive
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      {tasks.length > 0 && (
        <p className="text-xs text-slate-400 mb-4">
          {sorted.length} task{sorted.length !== 1 ? 's' : ''} found
          {activeFilter !== 'all' && ` in "${filterOptions.find(o => o.value === activeFilter)?.label}"`}
        </p>
      )}

      {/* Content */}
      {tasks.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Nothing here yet"
          description="Tasks will appear here as soon as someone posts them. Share Whisper with a friend!"
          ctaLabel="Post the first task"
          ctaTo="/post-task"
        />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No tasks in this category"
          description="Try selecting a different filter, or check back later."
          ctaLabel="Show all tasks"
          ctaOnClick={() => setActiveFilter('all')}
        />
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {sorted.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
