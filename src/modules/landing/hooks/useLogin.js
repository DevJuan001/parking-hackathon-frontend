import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { loginService } from "@/modules/landing/services/loginService";
import { useFormValidation } from "@hooks/useFormValidation";
import { getCurrentUserService } from "@/globals/services/getCurrentUserService";
import { getModalTrigger } from "@/utils/getModalTrigger";

export function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { validate, fieldError, clearError } = useFormValidation();

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
      const response = await loginService(form);

      if (response.success === true) {
        const freshData = await queryClient.fetchQuery({
          queryKey: ["currentUser"],
          queryFn: getCurrentUserService,
        });

        if (freshData.onboarding_completed === false) {
          navigate("/on-boarding");
        } else if (freshData.data?.[0]?.role === "Cliente") {
          navigate("/check-in");
        } else {
          navigate("/home");
        }
      } else {
        setError(
          response.error ??
            "Verifica que tus credenciales esten escritas correctamente e intentalo nuevamente",
        );

        if (
          response.error ===
          "¡Parece que aún no tienes cuenta! Regístrate en unos segundos y empieza a usar la app."
        ) {
          openInnerModal("notRegistered", triggerButton);
        } else {
          openInnerModal("error", triggerButton);
        }
      }
    } catch {
      setError(
        "Verifica que tus credenciales esten escritas correctamente e intentalo nuevamente",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    error,
    fieldError,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  };
}
