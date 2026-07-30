import React from 'react';
import { Keyboard, X } from 'lucide-react';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', description: 'Focus search input bar' },
    { key: 'N', description: 'Create a new task posting' },
    { key: 'B', description: 'Open wallet modal' },
    { key: 'P', description: 'View user profile' },
    { key: 'Esc', description: 'Close any active modal' },
    { key: '?', description: 'Show keyboard shortcuts guide' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Keyboard Shortcuts</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Quick hotkeys for fast navigation</p>
          </div>
        </div>

        <div className="space-y-2.5 divide-y divide-gray-100 dark:divide-gray-700">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between pt-2.5 first:pt-0">
              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{sc.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold rounded border border-gray-200 dark:border-gray-600 shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
