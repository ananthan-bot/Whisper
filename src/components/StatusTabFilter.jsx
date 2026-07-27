export default function StatusTabFilter({ value = 'all', onChange }) {
  const tabs = [
    { id: 'all', label: 'All Tasks' },
    { id: 'open', label: 'Open' },
    { id: 'claimed', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-semibold">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            value === tab.id
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
