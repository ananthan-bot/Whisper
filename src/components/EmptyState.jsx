import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Reusable empty state component.
 * @param {React.ElementType} icon  - Lucide icon component
 * @param {string} title            - Main heading
 * @param {string} description      - Supporting text
 * @param {string} [ctaLabel]       - Optional CTA button label
 * @param {string} [ctaTo]          - Optional react-router link for CTA
 * @param {Function} [ctaOnClick]   - Optional onClick handler for CTA
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaTo,
  ctaOnClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200 border-dashed p-14 text-center flex flex-col items-center justify-center shadow-soft"
    >
      {Icon && (
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-5 shadow-inner border border-slate-100">
          <Icon className="w-7 h-7 text-slate-400" />
        </div>
      )}

      <p className="text-lg font-semibold text-slate-800 mb-2">{title}</p>
      <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{description}</p>

      {ctaLabel && (
        <div className="mt-6">
          {ctaTo ? (
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-500 transition-colors shadow-sm"
            >
              {ctaLabel}
            </Link>
          ) : (
            <button
              onClick={ctaOnClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-500 transition-colors shadow-sm"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
