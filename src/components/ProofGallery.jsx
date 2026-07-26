/** @component ProofGallery - Displays task completion proof media, photos, and notes */
import React, { useState } from 'react';
import { Camera, CheckCircle2, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function ProofGallery({ proofs = [], taskTitle = 'Task Completion Proof', helperName = 'Helper' }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const mockDefaultProofs = proofs.length > 0 ? proofs : [
    {
      id: 'p1',
      type: 'photo_after',
      title: 'Completed Setup',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
      timestamp: 'Just now',
      note: 'Finished task cleanly and verified functionality.'
    },
    {
      id: 'p2',
      type: 'photo_before',
      title: 'Initial State',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60',
      timestamp: '1 hour ago',
      note: 'Inspected original setup before commencing task.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 my-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            Proof of Work & Media Gallery
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 size={12} /> Verified Media
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {mockDefaultProofs.map((proof) => (
          <div
            key={proof.id}
            onClick={() => setSelectedImage(proof)}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all hover:shadow-md hover:border-emerald-500"
          >
            <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={proof.url}
                alt={proof.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="truncate">{proof.title}</span>
                <ImageIcon size={12} className="text-slate-400 shrink-0" />
              </div>
              {proof.note && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {proof.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uploaded by {helperName} • {selectedImage.timestamp}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="bg-slate-950 aspect-video w-full overflow-hidden flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/80">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {selectedImage.note || 'No additional note provided for this proof media.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
