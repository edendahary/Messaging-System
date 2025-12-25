import Swal, { type SweetAlertOptions } from "sweetalert2";

export const openApprovePopup = ({ ...props }: SweetAlertOptions) =>
  Swal.fire({
    ...props,
    confirmButtonColor: "#0B7EF8",
    confirmButtonText: "Confirm",
    didOpen: (popup) => {
      popup.setAttribute("data-testid", "successMessage");
    },
    timer: 3000,
  });
