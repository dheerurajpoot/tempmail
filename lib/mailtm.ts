const MAILTM_API = 'https://api.mail.tm';
const GUERRILLA_MAIL_API = 'https://api.guerrillamail.com/ajax.php';
const REQUEST_TIMEOUT_MS = 10000;
const MAX_RETRIES = 4;
const DOMAIN_CACHE_TTL_MS = 10 * 60 * 1000;
const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

export type EmailProvider = 'mailtm' | 'guerrillamail';

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

interface GuerrillaMailMessageItem {
  mail_id: number;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_date: string;
  mail_timestamp: number;
  mail_read: number;
  mail_body?: string;
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

interface GuerrillaMailListResponse {
  list?: GuerrillaMailMessageItem[];
}

class GuerrillaMailClient {
  private async request(params: URLSearchParams) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${GUERRILLA_MAIL_API}?${params.toString()}`, {
        cache: 'no-store',
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Guerrilla Mail request failed with status ${response.status}`);
      }

      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
  }

  private toMessage(item: GuerrillaMailMessageItem): MailtmMessage {
    const date =
      item.mail_timestamp && item.mail_timestamp > 0
        ? new Date(item.mail_timestamp * 1000).toISOString()
        : new Date().toISOString();

    return {
      id: String(item.mail_id),
      from: {
        address: item.mail_from || 'unknown@sender',
        name: item.mail_from || 'Unknown Sender',
      },
      subject: item.mail_subject || '(No subject)',
      intro: item.mail_excerpt || '',
      createdAt: date,
      updatedAt: date,
      isRead: item.mail_read === 1,
    };
  }

  async createAccount(): Promise<MailtmAccount> {
    const data = (await this.request(
      new URLSearchParams({ f: 'get_email_address' })
    )) as { email_addr?: string; sid_token?: string };

    const address = data?.email_addr;
    const sidToken = data?.sid_token;
    if (!address || !address.includes('@') || !sidToken) {
      throw new Error('Failed to generate email address from secondary provider');
    }

    return {
      id: `guerrillamail-${address}`,
      address,
      password: '',
      token: sidToken,
      provider: 'guerrillamail',
    };
  }

  async getMessages(token: string): Promise<MailtmMessage[]> {
    const data = (await this.request(
      new URLSearchParams({ f: 'get_email_list', offset: '0', sid_token: token })
    )) as GuerrillaMailListResponse;
    const items = Array.isArray(data.list) ? data.list : [];
    return items.map((item) => this.toMessage(item));
  }

  async getMessage(token: string, messageId: string): Promise<MailtmFullMessage> {
    const data = (await this.request(
      new URLSearchParams({
        f: 'fetch_email',
        sid_token: token,
        email_id: messageId,
      })
    )) as GuerrillaMailMessageItem;

    const mapped = this.toMessage(data);
    const body = data.mail_body || '';
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(body);

    return {
      ...mapped,
      text: data.mail_body || '',
      html: [],
    };
  }

  async deleteMessage(token: string, messageId: string): Promise<void> {
    await this.request(
      new URLSearchParams({
        f: 'del_email',
        sid_token: token,
        'email_ids[]': messageId,
      })
    );
  }
}

export const guerrillaMailClient = new GuerrillaMailClient();
