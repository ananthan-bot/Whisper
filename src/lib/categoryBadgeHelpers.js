/**
 * Task Category Badge Helper Utilities
 */

const CATEGORY_COLORS = {
  negotiator: 'bg-amber-100 text-amber-800 border-amber-200',
  secretary: 'bg-blue-100 text-blue-800 border-blue-200',
  researcher: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  wordsmith: 'bg-purple-100 text-purple-800 border-purple-200',
};

export function getCategoryBadgeClass(category) {
  if (!category || typeof category !== 'string') {
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] || 'bg-slate-100 text-slate-700 border-slate-200';
}

export function formatCategoryLabel(category) {
  if (!category || typeof category !== 'string') return 'General';
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}
