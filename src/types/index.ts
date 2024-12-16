export interface Message {
  id: string;
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  messages: Message[];
}