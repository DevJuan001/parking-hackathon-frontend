import { useState } from "react";

export function useFilterEntries(filters) {
  const [form, setForm] = useState({
    plate_id: filters.plate_id || "",
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
