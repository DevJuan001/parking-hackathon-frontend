import { useState } from "react";
import { useFormValidation } from "@hooks/useFormValidation";

export function useEditReservation(reservation) {
  const [form, setForm] = useState({
    name: reservation?.name || "",
    level: reservation?.level || 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { clearError, fieldError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function handleSubmit(e, openInnerModal) {}

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
