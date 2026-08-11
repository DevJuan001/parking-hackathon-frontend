import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { updateReservationService } from "@/modules/calendar/services/updateReservationService";

export function useEditReservation(reservation) {
  const [form, setForm] = useState({
    status: reservation?.status,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { getChanges, clearError, fieldError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    clearError(name);
  }

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const changes = getChanges(reservation, form);

    if (Object.keys(changes).length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await updateReservationService(changes, reservation?.uuid);

      if (response.success === true) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
        onClose();
      } else {
        setError(
          response?.error ??
            "No se pudo editar la reserva, intentalo nuevamente mas tarde.",
        );
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError("No se pudo editar la reserva, intentalo nuevamente mas tarde.");
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit, fieldError };
}
