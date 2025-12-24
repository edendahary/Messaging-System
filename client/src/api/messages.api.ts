import type { Message, SendMessageBody } from "../types/MessageType.config";
import Api from "./api";

export const messagesApi = {
  getMessages: async (): Promise<Message[]> => {
    const res = await Api.get<Message[]>("/messages");
    return res.data;
  },

  sendMessage: async (params: {
    body: SendMessageBody;
    requestId: string;
  }): Promise<Message> => {
    const res = await Api.post<Message>("/messages/send", params.body, {
      headers: {
        "x-request-id": params.requestId,
      },
    });

    return res.data;
  },
};
