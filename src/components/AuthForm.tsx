import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, LogIn, ArrowRight, Lock, Mail, User } from 'lucide-react';
import FormInput from './FormInput';
import { useAuth } from '../hooks/useAuth';

type AuthMode = 'login' | 'register';

export default function AuthForm() {
  const { login, register, isLoading, error } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      await login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? '欢迎回来' : '创建新账号'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' ? '登录您的账号' : '开始您的旅程'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'register' && (
              <FormInput
                id="name"
                name="name"
                type="text"
                label="用户名"
                value={formData.name}
                onChange={handleChange}
                placeholder="用户名"
                required
                Icon={User}
              />
            )}

            <FormInput
              id="email"
              name="email"
              type="email"
              label="邮箱地址"
              value={formData.email}
              onChange={handleChange}
              placeholder="邮箱地址"
              required
              Icon={Mail}
            />

            <FormInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="密码"
              value={formData.password}
              onChange={handleChange}
              placeholder="密码"
              required
              Icon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
            />
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-end">
              <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                忘记密码?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {mode === 'login' ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
            </span>
            {isLoading ? '处理中...' : (mode === 'login' ? '登录' : '注册')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {mode === 'login' ? '没有账号? 立即注册' : '已有账号? 立即登录'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}