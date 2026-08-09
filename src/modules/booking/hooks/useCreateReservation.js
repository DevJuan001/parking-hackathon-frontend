import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getModalTrigger } from "@utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { createReservationService } from "@/modules/booking/services/createReservationService";

export function useCreateReservation(setActiveSection) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    plate: "",
    start_date: "",
    start_time: "",
    note: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      const response = await createReservationService({
        ...form,
        parking_id: searchParams.get("parkingId") ?? "",
        level: 1,
      });

      if (response.success === true) {
        setActiveSection("success");
      } else {
        setError(
          response?.error ??
            "Lo sentimos, No se pudo crear la reserva, intentalo nuevamente mas tarde.",
        );
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Lo sentimos, No se pudo crear la reserva, intentalo nuevamente mas tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    parkingId: searchParams.get("parkingId"),
    loading,
    error,
    setForm,
    handleChange,
    handleSubmit,
    fieldError,
  };
}
