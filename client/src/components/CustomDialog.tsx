import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

interface CustomDialogProps {
  open: boolean;
  width?: string;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
  buttonText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  width,
  content,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    slotProps={{
      paper: {
        sx: {
          borderRadius: 3,
          p: 3,
          minWidth: width ?? 350,
          textAlign: "center",
          boxShadow: 8,
          bgcolor: "background.paper",
        },
      },
    }}
  >
    <DialogTitle sx={{ fontWeight: 700, color: "primary.main", pb: 1 }}>
      {title}
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{ pb: 2 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {content}
      </Typography>
    </DialogContent>

  </Dialog>
);

export default CustomDialog;
