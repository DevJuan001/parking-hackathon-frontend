import { useState } from "react";
import { recoverPasswordService } from "../services/recoverPasswordService";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useRecoverPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fieldError, clearError, validate } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const isValid = validate(form);

    if (!isValid) return;

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await recoverPasswordService(form);

      if (response.success) {
        openInnerModal("sentEmail", triggerButton);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit, fieldError };
}
