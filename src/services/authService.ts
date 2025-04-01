interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  organization: string;
  admin_user: boolean;
}

interface Tokens {
  access: string;
  refresh: string;
}

interface LoginResponse {
  message: string;
  tokens: Tokens;
  user: User;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    this.setTokens(data.tokens);
    this.setUser(data.user);
    return data;
  },

  async refreshToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      this.setTokens(data.tokens);
    } catch (error) {
      this.logout();
      throw error;
    }
  },

  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    let accessToken = this.getAccessToken();
    
    if (!accessToken) {
      throw new Error('No access token available');
    }

    // Add authorization header
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      // If unauthorized, try to refresh token
      if (response.status === 401) {
        await this.refreshToken();
        accessToken = this.getAccessToken();
        
        // Retry the request with new token
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
        };
        return fetch(url, { ...options, headers: newHeaders });
      }

      return response;
    } catch (error) {
      this.logout();
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  setTokens(tokens: Tokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }
}; 