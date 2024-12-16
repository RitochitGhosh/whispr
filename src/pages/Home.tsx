import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Share Your Thoughts
        <br />
        <span className="text-indigo-600">Anonymously</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Send and receive anonymous messages in a safe, modern platform.
        Express yourself freely without revealing your identity.
      </p>
      <Link to="/get-started">
        <Button className="flex items-center space-x-2">
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}