const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API utility class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: { name: string; email: string; password: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Food endpoints
  async analyzeFood(input: string) {
    return this.request('/food/analyze', {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
  }

  async logFood(foodData: any) {
    return this.request('/food/log', {
      method: 'POST',
      body: JSON.stringify(foodData),
    });
  }

  async getTodaysFood() {
    return this.request('/food/today');
  }

  async getFoodHistory(page = 1, limit = 20) {
    return this.request(`/food/history?page=${page}&limit=${limit}`);
  }

  async deleteFood(foodId: string) {
    return this.request(`/food/${foodId}`, {
      method: 'DELETE',
    });
  }

  async getWeeklySummary() {
    return this.request('/food/weekly-summary');
  }

  // Recommendations endpoints
  async getRecommendations(mealType: string) {
    return this.request(`/recommendations/${mealType}`);
  }

  async getPersonalizedRecommendations(preferences: any) {
    return this.request('/recommendations/personalized', {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;