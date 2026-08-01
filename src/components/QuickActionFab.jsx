import React, { useState } from 'react';
import { Plus, Mic, HelpCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActionFab() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3 animate-in fade-in slide-in-from-bottom-2">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate('/post');
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 text-slate-950 font-semibold rounded-full shadow-lg hover:bg-amber-400 transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            Post New Task
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate('/tasks');
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 text-slate-100 font-semibold rounded-full shadow-lg border border-slate-700 hover:bg-slate-700 transition-all text-xs"
          >
            <Mic className="w-4 h-4 text-amber-400" />
            Browse Voice Tasks
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3.5 rounded-full shadow-xl transition-transform duration-200 ${
          isOpen
            ? 'bg-slate-800 text-slate-300 border border-slate-700 rotate-90'
            : 'bg-amber-500 text-slate-950 hover:scale-105'
        }`}
        aria-label="Quick actions menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
}
