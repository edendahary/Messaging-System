import { Chip } from "@mui/material";
import type { MessageStatus } from "../types/MessageType.config";

type Props = {
  status: MessageStatus;
};

const StatusChip = ({ status }: Props) => {
  const color =
    status === "sent" ? "success" : status === "failed" ? "error" : "warning";
  return <Chip size="small" label={status} color={color} />;
};

export default StatusChip;
