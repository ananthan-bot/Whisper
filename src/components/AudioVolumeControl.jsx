import { Volume2, VolumeX } from 'lucide-react';

export default function AudioVolumeControl({ isMuted = false, onToggleMute }) {
  return (
    <button
      type="button"
      onClick={onToggleMute}
      className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
    </button>
  );
}
