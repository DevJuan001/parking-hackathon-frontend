import { useState, useEffect, useRef } from "react";
import { to12h, to24h } from "@/utils/timeUtils";

export function useTimePicker({ value, onChange }) {
  const initial = getInitial(value);
  const [unit, setUnit] = useState("hour");
  const [hour12, setHour12] = useState(initial.hour12);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    onChange?.(to24h({ period, hour12, minute }));
  }, [period, hour12, minute]);

  function getInitial(value) {
    if (value) {
      const [hour, minute] = value.split(":").map(Number);

      return to12h(hour, minute);
    }

    const now = new Date();

    return to12h(now.getHours(), now.getMinutes());
  }

  function selectHour(number) {
    setHour12(number);
  }

  function selectMinute(number) {
    setMinute(number);
  }

  return {
    period,
    hour12,
    minute,
    unit,
    setUnit,
    setPeriod,
    selectHour,
    selectMinute,
  };
}
