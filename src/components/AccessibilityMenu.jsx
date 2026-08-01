import React, { useState } from 'react';
import { Eye, Type, Volume2, X } from 'lucide-react';
import { toggleHighContrastFocus } from '../lib/a11yHelpers';

export default function AccessibilityMenu({ isOpen, onClose }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  if (!isOpen) return null;

  const handleContrastToggle = () => {
    const next = !highContrast;
    setHighContrast(next);
    toggleHighContrastFocus(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-100">Accessibility Settings</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div>
              <div className="text-sm font-semibold text-slate-200">High Contrast Focus</div>
              <div className="text-xs text-slate-400">Highlights active inputs and buttons with strong focus rings</div>
            </div>
            <button
              type="button"
              onClick={handleContrastToggle}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                highContrast ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-slate-950 absolute top-0.5 transition-transform ${
                  highContrast ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div>
              <div className="text-sm font-semibold text-slate-200">Large Typography Mode</div>
              <div className="text-xs text-slate-400">Increases base text size for improved readability</div>
            </div>
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                largeText ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-slate-950 absolute top-0.5 transition-transform ${
                  largeText ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
