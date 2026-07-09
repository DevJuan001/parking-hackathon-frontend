import { useState } from "react";

export function useSelectMenu() {
  const [search, setSearch] = useState("");

  function handleSelect(option, name, onChange, closeInnerModal) {
    const parsed =
      option.value !== "" && !isNaN(option.value)
        ? Number(option.value)
        : option.value;
    onChange({ target: { name, value: parsed } });
    setSearch("");
    closeInnerModal();
  }

  return {
    search,
    setSearch,
    handleSelect,
  };
}
