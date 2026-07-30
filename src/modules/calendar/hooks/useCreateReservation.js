import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { createReservationService } from "@/modules/calendar/services/createReservationService";

export function useCreateReservation() {
  const [form, setForm] = useState({
    name: "",
    level: 1,
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
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

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await createReservationService(form);

      if (response.success === true) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(
          "No se pudo crear la reserva, intentalo nuevamente mas tarde.",
        );
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError("No se pudo crear la reserva, intentalo nuevamente mas tarde.");
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit, fieldError };
}
