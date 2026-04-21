'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEmailStore } from '@/lib/store';
import { X, Copy } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

export function EmailViewer() {
  const { selectedMessage, setSelectedMessage } = useEmailStore();

  if (!selectedMessage) {
    return (
      <Card className="w-full p-12 text-center border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
        <p className="text-slate-600 font-medium">Select an email to read its full content</p>
      </Card>
    );
  }

  const sanitizedHtml =
    selectedMessage.html && selectedMessage.html.length > 0
      ? DOMPurify.sanitize(selectedMessage.html[0])
      : null;

  const copyToClipboard = () => {
    const text = `${selectedMessage.subject}\n\nFrom: ${selectedMessage.from?.address}\n\n${selectedMessage.text || ''}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="border-b border-slate-200 p-5 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 line-clamp-2 text-lg">
            {selectedMessage.subject || '(No subject)'}
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            <span className="font-semibold">From:</span> {selectedMessage.from?.address}
          </p>
        </div>
        <Button
          onClick={() => setSelectedMessage(null)}
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all flex-shrink-0 ml-2"
          title="Close message"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <Button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            size="sm"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Email
          </Button>
        </div>

        <div className="space-y-4">
          {sanitizedHtml ? (
            <div
              className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-6 border border-slate-200 max-h-96 overflow-y-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          ) : selectedMessage.text ? (
            <div className="bg-slate-900 text-slate-100 rounded-lg p-6 border border-slate-800 max-h-96 overflow-y-auto font-mono text-sm whitespace-pre-wrap break-words">
              {selectedMessage.text}
            </div>
          ) : (
            <p className="text-slate-500 italic text-center py-8">No content available</p>
          )}
        </div>
      </div>
    </Card>
  );
}
