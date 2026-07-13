import { useState } from "react";

export function useFilterExits() {
  const [form, setForm] = useState({
    plate_id: "",
    start_date: "",
    end_date: "",
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
