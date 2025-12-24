import * as yup from "yup";
import type {  SendMessageBody } from "../../types/MessageType.config";

export const newMessageValidationSchema: yup.ObjectSchema<SendMessageBody> =
  yup.object({
    to: yup.string().required("Recipient is required"),
    content: yup
      .string()
      .trim()
      .required("Message content is required")
      .min(5, "Message must be at least 5 characters long"),
  });
