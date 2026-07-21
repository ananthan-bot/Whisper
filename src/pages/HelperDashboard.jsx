import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { categories } from '../lib/categories';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { Inbox, SlidersHorizontal, Search, Filter } from 'lucide-react';
import { cn } from '../lib/cn';
import { filterAndSortTasks } from '../lib/filterHelpers';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const PROOF_OPTIONS = [
  { value: 'all', label: 'All Proof Types' },
  { value: 'screenshot', label: 'Screenshot' },
  { value: 'summary', label: 'Summary' },
  { value: 'transcript', label: 'Transcript' },
];

export default function HelperDashboard() {
  const tasks = useStore((state) => state.tasks);

  const [searchQuery, setSearchQuery]   = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [proofFilter, setProofFilter]   = useState('all');
  const [sortOrder,   setSortOrder]    = useState('newest');

  const filteredAndSorted = filterAndSortTasks(tasks, {
    searchQuery,
    category: activeFilter,
    proofType: proofFilter,
    sortBy: sortOrder,
  });

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
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

        {/* Filters & Search controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* Proof Type Filter */}
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-sm">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={proofFilter}
              onChange={(e) => setProofFilter(e.target.value)}
              className="text-xs text-slate-700 bg-transparent outline-none cursor-pointer"
            >
              {PROOF_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="text-xs text-slate-700 bg-transparent outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
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
          {filteredAndSorted.length} task{filteredAndSorted.length !== 1 ? 's' : ''} found
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
      ) : filteredAndSorted.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No matching tasks"
          description="Try adjusting your search query or filters."
          ctaLabel="Clear search and filters"
          ctaOnClick={() => {
            setSearchQuery('');
            setActiveFilter('all');
            setProofFilter('all');
          }}
        />
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
