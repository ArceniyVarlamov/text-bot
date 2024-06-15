export interface IBotData {
  messages: Message[];
  conversation_id: string;
  code: number;
  msg: string;
}

interface Message {
  role: 'assistant';
  type: MessageType;
  content: string;
  content_type: 'text';
}

type MessageType = 'answer' | 'verbose' | 'follow_up';
