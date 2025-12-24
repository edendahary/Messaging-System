export type MessageStatus = "pending" | "sent" | "failed";

export interface SendMessageBody {
  to: string;
  content: string;
}

export interface Message {
  id: string;
  to: string;
  content: string;
  status: MessageStatus;
  createdAt: string;
}
