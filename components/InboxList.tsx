'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEmailStore } from '@/lib/store';
import { Mail, Trash2, Eye, RefreshCw } from 'lucide-react';

export function InboxList() {
  const [isLoadingInbox, setIsLoadingInbox] = useState(false);
  const {
    account,
    messages,
    selectedMessage,
    autoRefresh,
    refreshInterval,
    setMessages,
    setSelectedMessage,
    removeMessage,
    setError,
  } = useEmailStore();

  const getBaseParams = () => {
    if (!account) return null;
    const params = new URLSearchParams({
      provider: account.provider || 'mailtm',
    });

    if (!account.token) return null;
    params.set('token', account.token);

    if (account.provider === 'guerrillamail') {
      return params;
    }

    return params;
  };

  const fetchInbox = async () => {
    const params = getBaseParams();
    if (!params) return;

    setIsLoadingInbox(true);
    try {
      const response = await fetch(`/api/email/inbox?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch inbox');
      }
      setMessages(data.messages || []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch inbox'
      );
      console.error('Fetch inbox error:', error);
    } finally {
      setIsLoadingInbox(false);
    }
  };

  const handleReadMessage = async (messageId: string) => {
    const params = getBaseParams();
    if (!params) return;

    try {
      params.set('id', messageId);
      const response = await fetch(`/api/email/message?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to read message');
      }
      setSelectedMessage(data.message);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to read message'
      );
      console.error('Read message error:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    const params = getBaseParams();
    if (!params) return;

    try {
      params.set('id', messageId);
      const response = await fetch(`/api/email/delete?${params.toString()}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete message');
      }
      removeMessage(messageId);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to delete message'
      );
      console.error('Delete message error:', error);
    }
  };

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh || !account) return;

    const interval = setInterval(fetchInbox, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, account, refreshInterval, setMessages, setError]);

  // Initial fetch
  useEffect(() => {
    if (account) {
      fetchInbox();
    }
  }, [account]);

  if (!account) {
    return (
      <Card className="w-full p-12 text-center border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
        <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-700 font-medium">
          Generate a temporary email to see your inbox
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="border-b border-slate-200 p-5 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-bold text-slate-900">Inbox ({messages.length})</h2>
        </div>
        <Button
          onClick={fetchInbox}
          disabled={isLoadingInbox}
          variant="ghost"
          size="sm"
          className="text-slate-600 hover:text-blue-600"
        >
          <RefreshCw
            className={`w-4 h-4 ${isLoadingInbox ? 'animate-spin' : ''}`}
          />
        </Button>
      </div>

      <div className="divide-y divide-slate-200">
        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No emails yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Waiting for incoming emails... enable auto-refresh to stay updated
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 cursor-pointer border-l-4 ${
                selectedMessage?.id === message.id 
                  ? 'bg-blue-50 border-l-blue-600' 
                  : 'border-l-transparent hover:border-l-blue-300'
              }`}
              onClick={() => handleReadMessage(message.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">
                    {message.from?.name || message.from?.address || 'Unknown Sender'}
                  </p>
                  <p className="text-xs text-slate-500 truncate mb-2">
                    {message.from?.address}
                  </p>
                  <p className="text-sm text-slate-700 font-medium line-clamp-2">
                    {message.subject || '(No subject)'}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadMessage(message.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-blue-600 hover:bg-blue-100"
                    title="Read message"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(message.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-red-600 hover:bg-red-100"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
