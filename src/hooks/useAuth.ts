import { useState, useCallback, useEffect } from 'react';
import type { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authService';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setAuthState({
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await loginUser(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '登录失败',
      }));
      return false;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await registerUser(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '注册失败',
      }));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '登出失败',
      }));
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
  };
}