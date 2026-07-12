import { useState } from "react";

export function useFilterUsers(filters) {
  const [form, setForm] = useState({
    first_surname: filters.first_surname || "",
    start_date: filters.start_date || "",
    end_date: filters.end_date || "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return {
    form,
    handleChange,
  };
}
