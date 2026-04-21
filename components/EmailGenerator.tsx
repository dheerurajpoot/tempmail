'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RefreshCw, Mail } from 'lucide-react';
import { useEmailStore } from '@/lib/store';

export function EmailGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { account, setAccount, setMessages, setError } = useEmailStore();

  const generateEmail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/email/generate', {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate email');
      }

      setAccount({
        id: data.id,
        address: data.address,
        password: data.password,
        token: data.token,
      });

      setMessages([]);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to generate email'
      );
      console.error('Generate email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full p-6 border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Email Generator
          </h2>
        </div>

        {!account ? (
          <Button
            onClick={generateEmail}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            size="lg"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Generate Temporary Email
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-600 mb-2 font-semibold uppercase tracking-wider">
                Your Email Address
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-mono text-slate-900 break-all font-bold">
                  {account.address}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-slate-600 hover:text-blue-600 hover:bg-white transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {copied && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-semibold">
                  ✓ Copied to clipboard
                </p>
              </div>
            )}

            <Button
              onClick={generateEmail}
              disabled={isLoading}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold border border-slate-200 transition-all duration-200"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Email
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
