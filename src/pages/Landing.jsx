import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/cn';
import { categories } from '../lib/categories';


const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Post a Task',
    desc: 'Describe what you need done — a call, an email, a negotiation. Stay completely anonymous.',
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
  },
  {
    step: '02',
    title: 'A Helper Claims It',
    desc: 'A vetted community helper picks up your task and connects via secure anonymous chat.',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
    border: 'border-accent-100',
  },
  {
    step: '03',
    title: 'Done & Delivered',
    desc: 'They submit proof of completion. You review, accept, and rate — all anonymously.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
];

// Simple animated gradient orbs for the hero
function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100 rounded-full opacity-40 blur-3xl animate-float" />
      <div className="absolute top-10 -right-20 w-80 h-80 bg-accent-100 rounded-full opacity-30 blur-3xl animate-float [animation-delay:1.5s]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-100 rounded-full opacity-25 blur-3xl animate-float [animation-delay:3s]" />
    </div>
  );
}

export default function Landing() {
  const { setViewMode, tasks } = useStore();
  const navigate = useNavigate();

  const completedCount = tasks.filter((t) => t.status === 'accepted').length;

  const handleCategoryClick = (categoryId) => {
    setViewMode('requester');
    navigate(`/post-task?category=${categoryId}`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-24 md:pt-16 overflow-hidden">
      {/* ── Hero Section ── */}
      <div className="relative w-full max-w-3xl mx-auto text-center mb-20 px-4">
        <HeroBackground />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge row */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 shadow-soft">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-pulse-slow" />
              100% anonymous · no calls required
            </div>

            {completedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium shadow-glow animate-float"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {completedCount} task{completedCount !== 1 ? 's' : ''} whispered ✓
              </motion.div>
            )}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
            Your voice,
            <br />
            <span className="text-primary-600 relative">
              handled for you.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M2 10 Q 75 2, 150 8 T 298 5"
                  stroke="#5DCAA5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            A quiet space to delegate phone calls, difficult emails, and negotiations to helpers.
            Done quietly, on your behalf.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/post-task"
                onClick={() => setViewMode('requester')}
                className="inline-flex items-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-500 transition-colors shadow-glow"
              >
                Post a task <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/helper"
                onClick={() => setViewMode('helper')}
                className="inline-flex items-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 font-semibold hover:bg-slate-50 border border-slate-200 transition-all shadow-soft"
              >
                Become a helper
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Category Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl px-4"
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-3">
          What do you need handled?
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          Pick a category to get started instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                whileHover={{ y: -3 }}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'text-left p-6 rounded-2xl bg-white border shadow-soft transition-all duration-300 group cursor-pointer',
                  category.borderClass,
                  category.hoverClass,
                  'hover:shadow-card'
                )}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110', category.colorClass, category.iconBg)}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-slate-900">
                  {category.name}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">{category.description}</p>
                <div className={cn('mt-4 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity', category.colorClass.split(' ')[1])}>
                  Get started <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── How It Works ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-4xl px-4 mt-20"
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-3">How it works</h2>
        <p className="text-center text-slate-500 text-sm mb-10">Three steps to getting things done quietly.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className={cn('p-6 rounded-2xl border bg-white shadow-soft', item.border)}
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mb-4', item.bg, item.color)}>
                {item.step}
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
