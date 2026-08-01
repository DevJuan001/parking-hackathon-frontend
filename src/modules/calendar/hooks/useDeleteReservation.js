import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { deleteReservationService } from "@/modules/calendar/services/deleteReservationService";

export function useDeleteReservation(reservation) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleDelete(e, openInnerModal, onClose) {
    setLoading(true);

    const triggerButton = getModalTrigger(e);

    try {
      const response = await deleteReservationService(reservation?.id);

      if (response.success === true) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Lo sentimos, no se pudo eliminar la reserva, intentalo nuevamente mas tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleDelete, loading, error };
}
