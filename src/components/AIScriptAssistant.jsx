import { useState } from 'react';
import { Sparkles, X, Check } from 'lucide-react';
import { getScriptTemplates, generateScriptDraft } from '../lib/aiScriptHelpers';

export default function AIScriptAssistant({ category = 'negotiator', description = '', onSelectScript, onClose }) {
  const templates = getScriptTemplates(category);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const handleApply = () => {
    const script = generateScriptDraft(category, description);
    onSelectScript(script);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary-700 font-bold text-base">
            <Sparkles className="w-5 h-5 text-amber-500" /> AI Script Generator
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          Select a recommended talking script template for your <strong className="capitalize text-slate-700">{category}</strong> task:
        </p>

        <div className="flex flex-col gap-2 mb-4">
          {templates.map((tmpl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTemplate(tmpl)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedTemplate?.title === tmpl.title
                  ? 'bg-primary-50 border-primary-300 ring-2 ring-primary-100'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-800 mb-1">{tmpl.title}</div>
              <p className="text-slate-600 line-clamp-2 font-mono text-[11px]">{tmpl.script}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-full shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-4 h-4" /> Insert Script Draft
          </button>
        </div>
      </div>
    </div>
  );
}
