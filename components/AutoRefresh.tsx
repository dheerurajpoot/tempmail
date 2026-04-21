'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEmailStore } from '@/lib/store';
import { RotateCw } from 'lucide-react';

export function AutoRefresh() {
  const { autoRefresh, refreshInterval, setAutoRefresh, setRefreshInterval } =
    useEmailStore();

  const intervals = [
    { label: '5s', value: 5000 },
    { label: '10s', value: 10000 },
    { label: '30s', value: 30000 },
    { label: '60s', value: 60000 },
  ];

  return (
    <Card className="w-full p-5 border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100">
            <RotateCw className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Auto Refresh</h3>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              autoRefresh ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-400'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ${
                autoRefresh ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors duration-300 ${
            autoRefresh ? 'text-green-700' : 'text-slate-600'
          }`}>
            {autoRefresh ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {autoRefresh && (
          <div className="space-y-3 p-3 bg-green-50 rounded-lg border border-green-200 animate-in fade-in duration-300">
            <p className="text-xs text-slate-700 font-bold uppercase tracking-wider">
              Refresh Interval
            </p>
            <div className="grid grid-cols-4 gap-2">
              {intervals.map(({ label, value }) => (
                <Button
                  key={value}
                  onClick={() => setRefreshInterval(value)}
                  size="sm"
                  className={`transition-all duration-200 font-semibold ${
                    refreshInterval === value
                      ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
