import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Whispr</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
              <div className="mt-4 space-y-2">
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 block">Terms of Service</Link>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 block">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Social</h3>
              <div className="mt-4 space-y-2">
                <a href="https://twitter.com" className="text-sm text-gray-600 hover:text-gray-900 block">Twitter</a>
                <a href="https://instagram.com" className="text-sm text-gray-600 hover:text-gray-900 block">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <p className="text-sm text-gray-400">© 2024 Whispr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}