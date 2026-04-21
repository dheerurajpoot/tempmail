const MAILTM_API = 'https://api.mail.tm';
const ONE_SEC_MAIL_API = 'https://www.1secmail.com/api/v1/';
const REQUEST_TIMEOUT_MS = 10000;
const MAX_RETRIES = 4;
const DOMAIN_CACHE_TTL_MS = 10 * 60 * 1000;
const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

export type EmailProvider = 'mailtm' | '1secmail';

export interface MailtmAccount {
  id: string;
  address: string;
  password: string;
  token?: string;
  provider: EmailProvider;
  login?: string;
  domain?: string;
}

export interface MailtmMessage {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  intro: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
}

export interface MailtmFullMessage extends MailtmMessage {
  text: string;
  html: string[];
}

interface MailtmDomain {
  id: string;
  domain: string;
  isActive?: boolean;
  isPrivate?: boolean;
}

interface OneSecMailMessageItem {
  id: number;
  from: string;
  subject: string;
  date: string;
}

interface OneSecMailMessageBody extends OneSecMailMessageItem {
  textBody?: string;
  htmlBody?: string;
}

let cachedDomains: MailtmDomain[] = [];
let lastDomainFetchAt = 0;

class MailtmClient {
  private async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getBackoffMs(attempt: number): number {
    const baseDelay = 300;
    const jitter = Math.floor(Math.random() * 150);
    return baseDelay * 2 ** attempt + jitter;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Universal request wrapper for Mail.tm API
   */
  private async request(path: string, options: RequestInit = {}) {
    const url = `${MAILTM_API}${path}`;

    let lastError: unknown;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
      try {
        const response = await this.fetchWithTimeout(url, {
          ...options,
          cache: 'no-store',
          headers: {
            Accept: 'application/ld+json, application/json',
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          let errorData;
          try {
            errorData = JSON.parse(text);
          } catch {
            errorData = { message: text };
          }

          const errorMessage =
            errorData.message ||
            errorData.error ||
            `Request failed with status ${response.status}`;
          const error = new Error(errorMessage);
          (error as Error & { status?: number }).status = response.status;

          if (RETRYABLE_STATUSES.has(response.status) && attempt < MAX_RETRIES) {
            lastError = error;
            await this.sleep(this.getBackoffMs(attempt));
            continue;
          }

          throw error;
        }

        if (response.status === 204) return null;
        return response.json();
      } catch (error) {
        lastError = error;
        if (attempt >= MAX_RETRIES) {
          break;
        }
        await this.sleep(this.getBackoffMs(attempt));
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Mail.tm request failed');
  }

  /**
   * Fetch available email domains with fallback logic
   */
  async getDomains(): Promise<MailtmDomain[]> {
    const now = Date.now();

    if (cachedDomains.length > 0 && now - lastDomainFetchAt < DOMAIN_CACHE_TTL_MS) {
      return cachedDomains;
    }

    const data = await this.request('/domains');
    const domains = (data['hydra:member'] || data['member'] || []) as MailtmDomain[];
    const activeDomains = domains.filter((domain) => domain.domain && domain.isActive !== false);

    if (activeDomains.length === 0) {
      throw new Error('No active email domains are currently available');
    }

    cachedDomains = activeDomains;
    lastDomainFetchAt = now;
    return activeDomains;
  }

  /**
   * Create a new temporary email account
   */
  async createAccount(email: string, password: string): Promise<MailtmAccount> {
    const accountData = await this.request('/accounts', {
      method: 'POST',
      body: JSON.stringify({ address: email, password }),
    });

    const tokenData = await this.request('/token', {
      method: 'POST',
      body: JSON.stringify({ address: email, password }),
    });

    return {
      id: accountData.id,
      address: accountData.address,
      password,
      token: tokenData.token,
      provider: 'mailtm',
    };
  }

  async getMessages(token: string): Promise<MailtmMessage[]> {
    const data = await this.request('/messages', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data['hydra:member'] || data['member'] || [];
  }

  async getMessage(token: string, messageId: string): Promise<MailtmFullMessage> {
    return await this.request(`/messages/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteMessage(token: string, messageId: string): Promise<void> {
    await this.request(`/messages/${messageId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async markAsRead(token: string, messageId: string): Promise<void> {
    await this.request(`/messages/${messageId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({ isRead: true }),
    });
  }
}

export const mailtmClient = new MailtmClient();

class OneSecMailClient {
  private async request(query: URLSearchParams) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${ONE_SEC_MAIL_API}?${query.toString()}`, {
        cache: 'no-store',
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`1secmail request failed with status ${response.status}`);
      }

      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
  }

  private toMessage(item: OneSecMailMessageItem): MailtmMessage {
    return {
      id: String(item.id),
      from: {
        address: item.from || 'unknown@sender',
        name: item.from || 'Unknown Sender',
      },
      subject: item.subject || '(No subject)',
      intro: '',
      createdAt: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
      updatedAt: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
      isRead: false,
    };
  }

  async createAccount(): Promise<MailtmAccount> {
    const data = (await this.request(
      new URLSearchParams({ action: 'genRandomMailbox', count: '1' })
    )) as string[];

    const address = data?.[0];
    if (!address || !address.includes('@')) {
      throw new Error('Failed to generate email address from secondary provider');
    }

    const [login, domain] = address.split('@');
    return {
      id: `1secmail-${address}`,
      address,
      password: '',
      provider: '1secmail',
      login,
      domain,
    };
  }

  async getMessages(login: string, domain: string): Promise<MailtmMessage[]> {
    const data = (await this.request(
      new URLSearchParams({ action: 'getMessages', login, domain })
    )) as OneSecMailMessageItem[];
    return (data || []).map((item) => this.toMessage(item));
  }

  async getMessage(
    login: string,
    domain: string,
    messageId: string
  ): Promise<MailtmFullMessage> {
    const data = (await this.request(
      new URLSearchParams({
        action: 'readMessage',
        login,
        domain,
        id: messageId,
      })
    )) as OneSecMailMessageBody;

    const mapped = this.toMessage(data);
    const html = data.htmlBody ? [data.htmlBody] : [];
    return {
      ...mapped,
      text: data.textBody || '',
      html,
    };
  }

  async deleteMessage(login: string, domain: string, messageId: string): Promise<void> {
    await this.request(
      new URLSearchParams({
        action: 'deleteMessage',
        login,
        domain,
        id: messageId,
      })
    );
  }
}

export const oneSecMailClient = new OneSecMailClient();
