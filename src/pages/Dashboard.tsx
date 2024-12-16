import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MessageCard } from '../components/MessageCard';
import type { Message } from '../types';

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const userLink = `${window.location.origin}/msg/user123`;
  
  const messages: Message[] = [
    { id: '1', content: "You're awesome!", timestamp: '2 hours ago' },
    { id: '2', content: "Keep up the great work!", timestamp: '5 hours ago' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(userLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Your Message Link</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={userLink}
            readOnly
            className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-sm"
          />
          <Button
            variant="secondary"
            onClick={copyLink}
            className="flex items-center space-x-2"
          >
            {copied ? (
              <><Check className="w-4 h-4" /> <span>Copied!</span></>
            ) : (
              <><Copy className="w-4 h-4" /> <span>Copy</span></>
            )}
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Messages</h2>
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}