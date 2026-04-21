import { create } from 'zustand';
import { MailtmAccount, MailtmMessage, MailtmFullMessage } from './mailtm';

export interface EmailSession {
  account: MailtmAccount | null;
  messages: MailtmMessage[];
  selectedMessage: MailtmFullMessage | null;
  isLoading: boolean;
  error: string | null;
  autoRefresh: boolean;
  refreshInterval: number;
}

interface EmailStore extends EmailSession {
  setAccount: (account: MailtmAccount | null) => void;
  setMessages: (messages: MailtmMessage[]) => void;
  setSelectedMessage: (message: MailtmFullMessage | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAutoRefresh: (enabled: boolean) => void;
  setRefreshInterval: (interval: number) => void;
  addMessage: (message: MailtmMessage) => void;
  removeMessage: (messageId: string) => void;
  reset: () => void;
}

const initialState: EmailSession = {
  account: null,
  messages: [],
  selectedMessage: null,
  isLoading: false,
  error: null,
  autoRefresh: true,
  refreshInterval: 10000, // 10 seconds
};

export const useEmailStore = create<EmailStore>((set) => ({
  ...initialState,

  setAccount: (account) => set({ account }),
  setMessages: (messages) => set({ messages }),
  setSelectedMessage: (message) => set({ selectedMessage: message }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
  setRefreshInterval: (refreshInterval) => set({ refreshInterval }),

  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),

  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== messageId),
      selectedMessage:
        state.selectedMessage?.id === messageId ? null : state.selectedMessage,
    })),

  reset: () => set(initialState),
}));
