import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { updateParkingInfoService } from "@services/updateParkingInfoService";

export function useUpdateParkingInfo(parkingInfo) {
  const [form, setForm] = useState({
    name: parkingInfo?.name ?? "",
    address: parkingInfo?.address ?? "",
    start_day: parkingInfo?.start_day ?? "",
    start_time: parkingInfo?.start_time ?? "",
    end_day: parkingInfo?.end_day ?? "",
    end_time: parkingInfo?.end_time ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, getChanges, fieldError, clearError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) return;

    const changes = getChanges(parkingInfo, form);

    if (Object.keys(changes).length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await updateParkingInfoService(changes);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["parkingInfo"] });

        openInnerModal("success", triggerButton);
      } else {
        setError(
          response?.error ??
            "Lo sentimos, no se pudo actualizar la información de tu parqueadero, intenta nuevamente más tarde",
        );
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Lo sentimos, no se pudo actualizar la información de tu parqueadero, intenta nuevamente más tarde",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
