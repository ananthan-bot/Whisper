/** @component CopyToClipboardButton - Reusable button to copy text with status feedback */
import { useState } from 'react';
import { copyToClipboard } from '../lib/clipboardHelpers';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/cn';

export default function CopyToClipboardButton({ text, className = '', label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer',
        copied
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800',
        className
      )}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
}
