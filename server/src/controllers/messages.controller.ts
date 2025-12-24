import crypto from "crypto";
import type { Request, Response } from "express";
import type { SendMessageBody } from "../types/messages.types";
import {
  createPendingMessage,
  listMessages,
  sendMessageWithRetry,
} from "../services/messages.service";
import { getByRequestId, linkRequestToMessage } from "../stores/messages.store";

export function getMessages(_req: Request, res: Response) {
  return res.json(listMessages());
}

export function sendMessage(
  req: Request<{}, {}, SendMessageBody>,
  res: Response
) {
  const { to, content } = req.body ?? {};

  if (!to?.trim() || !content?.trim()) {
    return res.status(400).json({ message: "to and content are required" });
  }
  const headerRequestId = req.header("x-request-id");

  const requestId =
    headerRequestId ||
    crypto.createHash("sha1").update(`${to}|${content}`).digest("hex");

  const existing = getByRequestId(requestId);
  if (existing) {
    return res.status(200).json(existing);
  }

  const msg = createPendingMessage({ to, content });
  linkRequestToMessage(requestId, msg.id);

  sendMessageWithRetry({
    messageId: msg.id,
    to: msg.to,
    content: msg.content,
    maxRetries: 3,
  }).catch((e) => console.log(`[${msg.id}] unexpected:`, e));

  return res.status(202).json(msg);
}
