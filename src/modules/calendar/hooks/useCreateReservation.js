import { useState } from "react";
import { padZero } from "@/utils/timeUtils";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { createReservationService } from "@/modules/calendar/services/createReservationService";

export function useCreateReservation(dayInfo) {
  const actualDate = new Date();
  const [form, setForm] = useState({
    name: "",
    level: "",
    client_id: "",
    start_date:
      dayInfo?.year && dayInfo?.month && dayInfo?.day
        ? `${dayInfo.year}-${padZero(dayInfo.month + 1)}-${padZero(dayInfo.day)}`
        : `${actualDate.getFullYear()}-${padZero(actualDate.getMonth() + 1)}-${padZero(actualDate.getDate())}`,
    start_time: `${padZero(actualDate.getHours())}:${padZero((Math.round(actualDate.getMinutes() / 5) * 5) % 60)}`,
    end_date: "",
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

  async function handleSubmit(e, openInnerModal, onClose) {
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
        onClose();
      } else {
        setError(response?.error);
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
