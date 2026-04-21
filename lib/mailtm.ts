import axios from 'axios';

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
  async getDomains() {
    try {
      const response = await axios.get(`${MAILTM_API}/domains`);
      return response.data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching domains:', error);
      throw error;
    }
  }

  async createAccount(email: string, password: string) {
    try {
      const response = await axios.post(`${MAILTM_API}/accounts`, {
        address: email,
        password,
      });

      const loginResponse = await axios.post(`${MAILTM_API}/token`, {
        address: email,
        password,
      });

      return {
        id: response.data.id,
        address: response.data.address,
        password,
        token: loginResponse.data.token,
      };
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async getMessages(token: string) {
    try {
      const response = await axios.get(`${MAILTM_API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async getMessage(token: string, messageId: string) {
    try {
      const response = await axios.get(`${MAILTM_API}/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  }

  async deleteMessage(token: string, messageId: string) {
    try {
      await axios.delete(`${MAILTM_API}/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  async markAsRead(token: string, messageId: string) {
    try {
      await axios.patch(
        `${MAILTM_API}/messages/${messageId}`,
        { isRead: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }
}

export const mailtmClient = new MailtmClient();
