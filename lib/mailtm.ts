const MAILTM_API = 'https://api.mail.tm';
const REQUEST_TIMEOUT_MS = 10000;
const MAX_RETRIES = 2;
const DOMAIN_CACHE_TTL_MS = 10 * 60 * 1000;

export interface MailtmAccount {
  id: string;
  address: string;
  password: string;
  token: string;
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

let cachedDomains: MailtmDomain[] = [];
let lastDomainFetchAt = 0;

class MailtmClient {
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
            'User-Agent': 'TempMailNextApp/1.0 (+https://deelzomail.vercel.app)',
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

          // Retry only transient upstream failures
          if (response.status >= 500 && attempt < MAX_RETRIES) {
            lastError = error;
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
