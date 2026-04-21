'use client';

import { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useEmailStore } from '@/lib/store';

export function ErrorDisplay() {
  const { error, setError } = useEmailStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg flex items-start gap-3 z-50">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-red-900">{error}</p>
      </div>
      <button
        onClick={() => setError(null)}
        className="text-red-400 hover:text-red-600 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
