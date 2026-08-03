import { useState } from "react";

export function useFormValidation(rules = {}, optionalFields = []) {
  const [errors, setErrors] = useState({});

  function validate(data) {
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      if (optionalFields.includes(key)) return;

      const value = data[key];
      const isEmpty =
        value === null || value === undefined || String(value).trim() === "";

      if (isEmpty) newErrors[key] = `El campo ${key} es requerido`;

      if (rules[key] && !isEmpty) {
        const error = rules[key](value);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const fieldError = (name) =>
    errors[name]
      ? `shadow-[0_0_2.5px_1px_#f87171] animate-shake
      dark:shadow-[0_0_4px_1.5px_#7f1d1d]`
      : `shadow-[0_0_2px_0.2px_#E4E2E5]
      dark:shadow-[0_0_2px_0.2px_#202022]`;

  function getChanges(original, updated) {
    const changes = {};

    Object.keys(updated).forEach((key) => {
      if (updated[key] !== original[key]) {
        changes[key] = updated[key];
      }
    });

    return changes;
  }

  function clearError(name) {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const clearErrors = () => setErrors({});

  return {
    errors,
    setErrors,
    validate,
    getChanges,
    clearError,
    clearErrors,
    fieldError,
  };
}
