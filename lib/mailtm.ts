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

class MailtmClient {
  private async request(path: string, options: RequestInit = {}) {
    const url = `${MAILTM_API}${path}`;
    const defaultHeaders = {
      'Accept': 'application/ld+json, application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'TempMail/1.0 (Next.js Application)',
      'Referer': 'https://mail.tm/',
      'Origin': 'https://mail.tm',
    };

    const config: RequestInit = {
      ...options,
      cache: 'no-store',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = { message: text };
      }
      
      console.error(`API Error Response (${response.status}):`, JSON.stringify(errorData));
      const error = new Error(errorData.message || errorData.error || `Request failed with status ${response.status}`);
      (error as any).status = response.status;
      (error as any).data = errorData;
      throw error;
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async getDomains(retries = 3, delay = 1000): Promise<any[]> {
    for (let i = 0; i < retries; i++) {
      try {
        const data = await this.request('/domains');
        console.log('--- Domain Fetch Debug ---');
        console.log('API Response data:', JSON.stringify(data));
        const domains = data['hydra:member'] || data['member'] || [];
        console.log('Extracted domains:', domains);
        return domains;
      } catch (error) {
        console.error(`Attempt ${i + 1} to fetch domains failed:`, error);
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
    return [];
  }

  async createAccount(email: string, password: string): Promise<MailtmAccount> {
    try {
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
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async getMessages(token: string): Promise<MailtmMessage[]> {
    try {
      const data = await this.request('/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async getMessage(token: string, messageId: string): Promise<MailtmFullMessage> {
    try {
      return await this.request(`/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  }

  async deleteMessage(token: string, messageId: string): Promise<void> {
    try {
      await this.request(`/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  async markAsRead(token: string, messageId: string): Promise<void> {
    try {
      await this.request(`/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/merge-patch+json',
        },
        body: JSON.stringify({ isRead: true }),
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }
}

export const mailtmClient = new MailtmClient();
