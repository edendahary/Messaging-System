import type { Message, MessageStatus } from "../types/messages.types";

const messages = new Map<string, Message>();
const requestToMessageId = new Map<string, string>();

export function getByRequestId(requestId: string) {
  const messageId = requestToMessageId.get(requestId);
  if (!messageId) return null;
  return messages.get(messageId) ?? null;
}

export function linkRequestToMessage(requestId: string, messageId: string) {
  requestToMessageId.set(requestId, messageId);
}


export function addMessage(message: Message) {
  messages.set(message.id, message);
}

export function getAllMessages(): Message[] {
  return Array.from(messages.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateStatus(
  id: string,
  status: MessageStatus
): Message | null {
  const msg = messages.get(id);
  if (!msg) return null;
  msg.status = status;
  messages.set(id, msg);
  return msg;
}
