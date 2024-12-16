import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export function MessageForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Anonymous Message</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              required
            />
          </div>
          <Button type="submit" className="w-full flex items-center justify-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}