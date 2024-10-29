import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <User className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                欢迎, {user?.name}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-5 w-5 mr-2" />
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">个人资料</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">用户名</label>
                <div className="mt-1 text-lg">{user?.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">邮箱</label>
                <div className="mt-1 text-lg">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}