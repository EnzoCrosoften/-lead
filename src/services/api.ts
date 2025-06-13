
const API_BASE_URL = 'http://localhost:8000/api';

export class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Leads API
  async getLeads() {
    return this.request('/leads');
  }

  async createLead(lead: Omit<Lead, 'id' | 'created_at'>) {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  }

  async updateLead(id: number, lead: Partial<Lead>) {
    return this.request(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lead),
    });
  }

  async deleteLead(id: number) {
    return this.request(`/leads/${id}`, {
      method: 'DELETE',
    });
  }

  // Users API
  async getUsers() {
    return this.request('/users');
  }

  async createUser(user: Omit<User, 'id'>) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: number, user: Partial<User>) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id: number) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Pipelines API
  async getPipelines() {
    return this.request('/pipelines');
  }

  async createPipeline(pipeline: Omit<Pipeline, 'id'>) {
    return this.request('/pipelines', {
      method: 'POST',
      body: JSON.stringify(pipeline),
    });
  }

  async updatePipeline(id: number, pipeline: Partial<Pipeline>) {
    return this.request(`/pipelines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pipeline),
    });
  }

  async deletePipeline(id: number) {
    return this.request(`/pipelines/${id}`, {
      method: 'DELETE',
    });
  }

  // Statuses API
  async getStatuses() {
    return this.request('/statuses');
  }

  async createStatus(status: Omit<Status, 'id'>) {
    return this.request('/statuses', {
      method: 'POST',
      body: JSON.stringify(status),
    });
  }

  async updateStatus(id: number, status: Partial<Status>) {
    return this.request(`/statuses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(status),
    });
  }

  async deleteStatus(id: number) {
    return this.request(`/statuses/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();

export interface Lead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  created_at: string;
  account_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  group_id: number;
  role_id: number;
}

export interface Pipeline {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
  pipeline_id: number;
}
