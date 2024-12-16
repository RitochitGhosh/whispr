import React from 'react';
import { Card } from './Card';
import type { Message } from '../types';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <p className="text-gray-700">{message.content}</p>
      <p className="text-sm text-gray-400 mt-2">{message.timestamp}</p>
    </Card>
  );
}