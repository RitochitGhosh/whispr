// Layout.tsx
import React, { useEffect, useState } from 'react';
import { MessageCircle, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAuth, signOut, User } from 'firebase/auth';
import { app } from '../firebase';

interface LayoutProps {
  children: React.ReactNode;
}

const auth = getAuth(app);

export function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Whispr</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            )}
            {!user && (
              <>
                <Link to="/get-started" className="text-gray-600 hover:text-gray-900">
                  Get Started
                </Link>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">{children}</main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Usage:</h3>
              <p className="mt-4 text-gray-600">
                Copy your unique message link and share it across various social media platforms.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Social</h3>
              <div className="mt-4 space-y-2">
                <a
                  href="https://twitter.com"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://instagram.com"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
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
