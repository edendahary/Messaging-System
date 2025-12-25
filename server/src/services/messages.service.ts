import { randomUUID } from "crypto";
import type { Message } from "../types/messages.types";
import {
  addMessage,
  getAllMessages,
  updateStatus,
} from "../stores/messages.store";
import { FakeProvider } from "../providers/fake.provider";

const provider = new FakeProvider();

export function listMessages() {
  return getAllMessages();
}

export function createPendingMessage(params: {
  to: string;
  content: string;
}): Message {
  const msg: Message = {
    id: randomUUID(),
    to: params.to,
    content: params.content,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  addMessage(msg);
  return msg;
}

export async function sendMessageWithRetry(params: {
  messageId: string;
  to: string;
  content: string;
  maxRetries?: number;
}) {
  const { messageId, to, content, maxRetries = 3 } = params;

  let attempt = 0;
  while (true) {
    attempt += 1;
    try {
      console.log(`[${messageId}] attempt ${attempt} sending...`);
      await provider.send({ to, content });
      updateStatus(messageId, "sent");
      console.log(`[${messageId}] status=sent`);
      return;
    } catch (e: any) {
      console.log(
        `[${messageId}] attempt ${attempt} failed: ${e?.message ?? e}`
      );

      if (attempt >= maxRetries) {
        updateStatus(messageId, "failed");
        console.log(`[${messageId}] status=failed`);
        return;
      }

      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }
}
