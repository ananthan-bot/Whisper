import { getNextPlaybackSpeed } from '../lib/audioPlayerHelpers';

export default function AudioSpeedControl({ speed = 1, onSpeedChange }) {
  return (
    <button
      type="button"
      onClick={() => onSpeedChange(getNextPlaybackSpeed(speed))}
      className="px-2 py-0.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-full transition-colors cursor-pointer"
      title="Toggle playback speed"
    >
      {speed}x
    </button>
  );
}
