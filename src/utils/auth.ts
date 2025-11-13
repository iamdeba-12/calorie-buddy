import { User, LoginCredentials, SignupCredentials } from '../types/auth';

const AUTH_STORAGE_KEY = 'calorie_buddy_auth';
const USERS_STORAGE_KEY = 'calorie_buddy_users';

// Mock user database
export function getUsers(): User[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveUser(user: User): void {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  
  const authData = JSON.parse(stored);
  return {
    ...authData.user,
    createdAt: new Date(authData.user.createdAt),
    lastLogin: new Date(authData.user.lastLogin)
  };
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function login(credentials: LoginCredentials): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getUsers();
  const user = users.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // In a real app, you'd verify the password hash
  // For demo purposes, we'll accept any password
  
  const updatedUser = {
    ...user,
    lastLogin: new Date()
  };
  
  saveUser(updatedUser);
  setCurrentUser(updatedUser);
  
  return updatedUser;
}

export async function signup(credentials: SignupCredentials): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getUsers();
  const existingUser = users.find(u => u.email === credentials.email);
  
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    email: credentials.email,
    name: credentials.name,
    createdAt: new Date(),
    lastLogin: new Date()
  };
  
  saveUser(newUser);
  setCurrentUser(newUser);
  
  return newUser;
}

export function logout(): void {
  clearCurrentUser();
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