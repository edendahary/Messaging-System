import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messagesApi } from "../api/messages.api";
import type { Message, SendMessageBody } from "../types/MessageType.config";
import type { AxiosError } from "axios";
import { openApprovePopup } from "../utils/popup.util";

export const messagesKeys = {
  all: ["messages"] as const,
};

export const useMessagesQuery = () => {
  return useQuery({
    queryKey: messagesKeys.all,
    queryFn: messagesApi.getMessages,
    refetchInterval: 1000, // כדי לראות pending->sent/failed
    refetchOnWindowFocus: false,
  });
};

export const useSendMessageMutation = (
  onSuccess?: (messageData: Message) => void,
  onError?: (error: AxiosError<{ message: string }>) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: SendMessageBody) => {
      const requestId = crypto.randomUUID();
      return messagesApi.sendMessage({ body, requestId });
    },
    onError,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: messagesKeys.all });
    },
  });
};

export const onMessageError = (error: AxiosError<{ message: string }>) => {
  const title = error?.response?.data?.message || "שגיאה ביצירת משתמש";
  openApprovePopup({ icon: "error", title, topLayer: true });
};
