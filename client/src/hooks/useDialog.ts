import { useState } from "react";

export function useDialog() {
  const [open, setOpen] = useState(false);

  const showDialog = () => setOpen(true);
  const hideDialog = () => setOpen(false);

  return { open, showDialog, hideDialog };
}
