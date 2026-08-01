import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { updateReservationService } from "@/modules/calendar/services/updateReservationService";

export function useEditReservation(reservation) {
  const [form, setForm] = useState({
    name: reservation?.name || "",
    level: reservation?.level || 1,
    start_date: reservation?.start_date || "",
    end_date: reservation?.end_date || "",
    start_time: reservation?.start_time || "",
    end_time: reservation?.end_time || "",
    status: reservation?.status || 2,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, clearError, fieldError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    clearError(name);
  }

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await updateReservationService(form, reservation?.id);

      if (response.success === true) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
        openInnerModal("success", triggerButton);
        onClose();
      } else {
        setError(
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
