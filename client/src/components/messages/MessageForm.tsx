import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { newMessageValidationSchema } from "./MessageForm.schema";
import {
  useSendMessageMutation,
  onMessageError,
} from "../../api/messages.service";
import type { SendMessageBody } from "../../types/MessageType.config";

type Props = {
  onClose: () => void;
};

const MessageForm = ({ onClose }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SendMessageBody>({
    resolver: yupResolver(newMessageValidationSchema),
    defaultValues: { to: "", content: "" },
  });

  const { mutate, isPending } = useSendMessageMutation(() => {
    onClose();
  }, onMessageError);

  const onSubmit = (data: SendMessageBody) => {
    mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      <Controller
        control={control}
        name="to"
        render={({ field }) => (
          <TextField
            sx={{ width: "100%" }}
            {...field}
            label="Send to"
            variant="outlined"
            error={!!errors.to}
            helperText={errors.to?.message ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <TextField
            sx={{ width: "100%" }}
            {...field}
            label="Message Content"
            variant="outlined"
            multiline
            rows={4}
            error={!!errors.content}
            helperText={errors.content?.message ?? ""}
          />
        )}
      />

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "row-reverse",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isPending}>
          {isPending ? "sending..." : "send"}
        </Button>
      </Box>
    </Box>
  );
};

export default MessageForm;
