import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, FileText, Search, PenTool } from 'lucide-react';
import { useStore } from '../store/useStore';

export const categories = [
  {
    id: 'negotiator',
    name: 'The Negotiator',
    description: 'Calls to landlords, billing departments, ISPs, or service providers. Dispute resolution and fee waivers.',
    icon: Lock,
    colorClass: 'bg-primary-50 text-primary-600',
    borderClass: 'border-primary-100'
  },
  {
    id: 'secretary',
    name: 'The Secretary',
    description: 'Booking appointments, reservations, or joining waitlists over the phone.',
    icon: FileText,
    colorClass: 'bg-accent-50 text-accent-600',
    borderClass: 'border-accent-100'
  },
  {
    id: 'researcher',
    name: 'The Researcher',
    description: 'Quick informational calls — stock checks, business hours, menu questions.',
    icon: Search,
    colorClass: 'bg-amber-50 text-amber-500',
    borderClass: 'border-amber-100' // using built-in standard amber for simplicity
  },
  {
    id: 'wordsmith',
    name: 'The Wordsmith',
    description: 'Drafting difficult emails, formal complaints, awkward follow-ups, or professional replies.',
    icon: PenTool,
    colorClass: 'bg-pink-50 text-pink-500',
    borderClass: 'border-pink-100' // using built-in standard pink for simplicity
  }
];

export default function Landing() {
  const setViewMode = useStore((state) => state.setViewMode);

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-24 md:pt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 mb-8 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-pulse-slow"></div>
          100% anonymous · no calls required
        </div>
        
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6">
          Your voice,<br />
          <span className="text-primary-600">handled for you.</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          A quiet space to delegate phone calls, difficult emails, and negotiations to helpers. Done quietly, on your behalf.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/post-task"
            onClick={() => setViewMode('requester')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-500 transition-colors shadow-sm"
          >
            Post a task
          </Link>
          <Link
            to="/helper"
            onClick={() => setViewMode('helper')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 font-medium hover:bg-slate-50 border border-slate-200 transition-all shadow-sm"
          >
            Become a helper
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-xl font-medium text-center text-slate-800 mb-8">What do you need handled?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className={`p-6 rounded-2xl bg-white border ${category.borderClass} shadow-sm hover:shadow-md transition-all duration-300 group`}>
                <div className={`w-12 h-12 rounded-xl ${category.colorClass} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">{category.name}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {category.description}
                </p>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
}
