const MAILTM_API = 'https://api.mail.tm';

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

// In-memory cache for domains to avoid rate-limiting/500 errors in production
let cachedDomains: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

class MailtmClient {
  /**
   * Universal request wrapper for Mail.tm API
   */
  private async request(path: string, options: RequestInit = {}) {
    const url = `${MAILTM_API}${path}`;
    
    const response = await fetch(url, {
      ...options,
      cache: 'no-store',
      headers: {
        'Accept': 'application/ld+json, application/json',
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
      
      const errorMessage = errorData.message || errorData.error || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    if (response.status === 204) return null;
    return response.json();
  }

  /**
   * Fetch available email domains with caching logic
   */
  async getDomains(): Promise<any[]> {
    const now = Date.now();
    
    // Return cached domains if valid
    if (cachedDomains.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      return cachedDomains;
    }

    try {
      const data = await this.request('/domains');
      const domains = data['hydra:member'] || data['member'] || [];
      
      if (domains.length > 0) {
        cachedDomains = domains;
        lastFetchTime = now;
      }
      
      return domains;
    } catch (error) {
      // If API fails but we have old cache, use it as fallback
      if (cachedDomains.length > 0) {
        return cachedDomains;
      }
      throw error;
    }
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
