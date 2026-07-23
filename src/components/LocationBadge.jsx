import { MapPin, Globe } from 'lucide-react';
import { formatDistanceString } from '../lib/locationHelpers';

export default function LocationBadge({ distanceMiles, locationName }) {
  if (distanceMiles === null || distanceMiles === undefined) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
        <Globe className="w-3 h-3 text-slate-400" />
        <span>Remote</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
      <MapPin className="w-3 h-3 text-teal-500" />
      <span>{locationName ? `${locationName} · ` : ''}{formatDistanceString(distanceMiles)}</span>
    </span>
  );
}
