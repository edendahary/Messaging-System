import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
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
  buttonAction?: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  width,
  content,
  buttonText = "Close",
  buttonAction,
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
    {buttonAction && (
      <DialogActions sx={{ justifyContent: "center", pb: 1 }}>
        <Button
          onClick={buttonAction || onClose}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 4 }}
          autoFocus
        >
          {buttonText}
        </Button>
      </DialogActions>
    )}
  </Dialog>
);

export default CustomDialog;
