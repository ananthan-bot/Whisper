import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getNoiseFilterLabel } from '../lib/audioNoiseHelpers';

export default function AudioNoiseFilterControl({ enabled, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!enabled)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
        enabled
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700/50'
      } ${className}`}
      title={getNoiseFilterLabel(enabled)}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      <span>{enabled ? 'Noise Filter ON' : 'Noise Filter OFF'}</span>
    </button>
  );
}
