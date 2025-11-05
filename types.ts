export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface Source {
  uri: string;
  title: string;
}

export interface ChatMessage {
  id: string;

  text: string;
  sender: Sender;
  sources?: Source[];
}
