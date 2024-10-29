import type { LoginCredentials, RegisterCredentials, User } from '../types/auth';

const API_URL = 'http://localhost:3000/api';

async function handleResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '请求失败');
  }
  return data;
}

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);
  localStorage.setItem('auth_token', data.token);
  return data.user;
}

export async function registerUser(credentials: RegisterCredentials): Promise<User> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);
  localStorage.setItem('auth_token', data.token);
  return data.user;
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem('auth_token');
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('auth_token');
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.user;
  } catch {
    localStorage.removeItem('auth_token');
    return null;
  }
}