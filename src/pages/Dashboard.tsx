// Dashboard.tsx
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const auth = getAuth(app);
const firestore = getFirestore(app);

interface Message {
  id: string;
  content: string;
  timestamp: string;
}

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      } else {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(firestore, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      const data = doc.data();
      const fetchedMessages = data?.messages || [];
      setMessages(
        fetchedMessages.map((msg: any, idx: number) => ({
          id: `${idx}`,
          content: msg.content,
          timestamp: new Date(msg.timestamp).toLocaleString(),
        }))
      );
    });
    return () => unsubscribe();
  }, [userId]);

  const userLink = userId ? `${window.location.origin}/msg/${userId}` : '';
  const copyLink = () => {
    if (!userLink) return;

    navigator.clipboard.writeText(userLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Your Message Link</h2>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            value={userLink}
            readOnly
            className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-sm w-full"
          />
          <Button variant="secondary" onClick={copyLink} className="flex items-center space-x-2">
            {copied ? (
              <>
                <Check className="w-4 h-4" /> <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages yet!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
              <MessageDisplayCard key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageDisplayCard({ message }: { message: Message }) {
  return (
    <Card className="p-4 border border-gray-200 rounded-lg">
      <p className="text-gray-800">{message.content}</p>
      <span className="text-sm text-gray-500">{message.timestamp}</span>
    </Card>
  );
}
