import { User, LoginCredentials, SignupCredentials } from '../types/auth';
import apiClient from './api';

const AUTH_STORAGE_KEY = 'calorie_buddy_user';

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const user = JSON.parse(stored);
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      lastLogin: new Date(user.lastLogin)
    };
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  apiClient.setToken(null);
}

export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const response: any = await apiClient.login(credentials);
    
    if (response.success) {
      const { user, token } = response.data;
      
      // Set token for future requests
      apiClient.setToken(token);
      
      // Store user data
      setCurrentUser(user);
      
      return user;
    } else {
      throw new Error(response.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function signup(credentials: SignupCredentials): Promise<User> {
  try {
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const response: any = await apiClient.register({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    });
    
    if (response.success) {
      const { user, token } = response.data;
      
      // Set token for future requests
      apiClient.setToken(token);
      
      // Store user data
      setCurrentUser(user);
      
      return user;
    } else {
      throw new Error(response.message || 'Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export function logout(): void {
  clearCurrentUser();
}

// Initialize API client with stored token
const storedToken = localStorage.getItem('auth_token');
if (storedToken) {
  apiClient.setToken(storedToken);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}