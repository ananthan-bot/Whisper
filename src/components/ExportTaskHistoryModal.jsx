import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileJson, X } from 'lucide-react';
import { exportTasksToCsv, exportTasksToJson } from '../lib/exportHelpers';

export default function ExportTaskHistoryModal({ tasks = [], isOpen, onClose }) {
  const [downloadedFormat, setDownloadedFormat] = useState(null);

  if (!isOpen) return null;

  const handleDownloadCsv = () => {
    const csvContent = exportTasksToCsv(tasks);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `whisper-tasks-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadedFormat('CSV');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  const handleDownloadJson = () => {
    const jsonContent = exportTasksToJson(tasks);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `whisper-tasks-${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadedFormat('JSON');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Export Task History</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Download your records ({tasks.length} items)</p>
          </div>
        </div>

        {downloadedFormat && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-800">
            Exported successfully as {downloadedFormat}!
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleDownloadCsv}
            className="w-full flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">CSV Format</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Best for Excel or Google Sheets</div>
              </div>
            </div>
            <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </button>

          <button
            onClick={handleDownloadJson}
            className="w-full flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <FileJson className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">JSON Format</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Raw structured data representation</div>
              </div>
            </div>
            <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
