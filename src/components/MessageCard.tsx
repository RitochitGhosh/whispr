import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { app } from '../firebase';
import { Card } from './Card';

const firestore = getFirestore(app);

export function MessageCard() {
  const { uid } = useParams<{ uid: string }>();
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!uid) {
      console.error('User ID is missing');
      return;
    }
  
    const userDocRef = doc(firestore, 'users', uid);
  
    try {
      const message = {
        content: newMessage,
        timestamp: Date.now(),
      };

      await updateDoc(userDocRef, {
        messages: arrayUnion(message),
      });
  
      setNewMessage('');
    } catch (error: unknown) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Leave a Message</h2>

      <Card className="mt-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={sendMessage}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Send Message
        </button>
      </Card>
    </div>
  );
}
