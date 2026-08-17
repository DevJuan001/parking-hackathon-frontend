import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { getCurrentUserService } from "@/globals/services/getCurrentUserService";
import { completeOnBoardingService } from "@/modules/on-boarding/service/completeOnBoardingService";

const SECTION_FIELDS = {
  userInfo: ["name", "first_surname"],
  parkingName: ["parking_name"],
  parkingLocation: ["address"],
};

export function useCompleteOnBoarding(user) {
  const [form, setForm] = useState({
    name: user?.name || "",
    first_surname: user?.first_surname || "",
    second_surname: user?.second_surname || "",
    parking_name: "",
    address: "",
    start_day: 1,
    start_time: "",
    end_day: 5,
    end_time: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { validate, fieldError, clearError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  function validateSection(sectionName) {
    const fields = SECTION_FIELDS[sectionName] ?? [];
    const sectionData = fields.reduce((acc, key) => {
      acc[key] = form[key];
      return acc;
    }, {});
    return validate(sectionData);
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
      const response = await completeOnBoardingService(form);

      if (response.success === true) {
        await queryClient.fetchQuery({
          queryKey: ["currentUser"],
          queryFn: getCurrentUserService,
        });

        navigate("/home");
      } else {
        setError(
          "No se pudo completar el on-boarding, intentalo nuevamente mas tarde.",
        );
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo completar el on-boarding, intentalo nuevamente mas tarde.",
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
    validateSection,
  };
}
