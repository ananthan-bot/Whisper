import { MapPin } from 'lucide-react';

export default function DistanceRadiusSelect({ value, onChange }) {
  return (
    <div className="relative flex items-center">
      <MapPin className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
      <select
        value={value ?? 'all'}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === 'all' ? null : Number(val));
        }}
        className="pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none"
      >
        <option value="all">Any Distance</option>
        <option value="5">Within 5 miles</option>
        <option value="10">Within 10 miles</option>
        <option value="25">Within 25 miles</option>
        <option value="50">Within 50 miles</option>
      </select>
    </div>
  );
}
