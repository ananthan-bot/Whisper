import React from 'react';
import { highlightKeywords } from '../lib/textHelpers';

export default function TextHighlight({ text = '', query = '', className = '', highlightClassName = 'bg-amber-200 text-amber-950 dark:bg-amber-800/60 dark:text-amber-200 font-semibold px-0.5 rounded' }) {
  const parts = highlightKeywords(text, query);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.match ? (
          <mark key={index} className={highlightClassName}>
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </span>
  );
}
