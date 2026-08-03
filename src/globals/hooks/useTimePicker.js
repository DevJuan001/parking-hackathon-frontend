import { useState, useEffect, useRef } from "react";
import { HOUR_NUMBERS, MINUTE_NUMBERS, to12h, to24h } from "@/utils/timeUtils";

export function useTimePicker({ value, onChange }) {
  const initial = getInitial(value);
  const [unit, setUnit] = useState("hour");
  const [hour12, setHour12] = useState(initial.hour12);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);
  const CENTER = 136;
  const ringRadius = 93;
  const tipY = 114 - ringRadius;

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

      return to12h(hour, (Math.round(minute / 5) * 5) % 60);
    }

    const now = new Date();

    return to12h(now.getHours(), (Math.round(now.getMinutes() / 5) * 5) % 60);
  }

  function selectHour(number) {
    setHour12(number);
  }

  function selectMinute(number) {
    setMinute(number);
  }

  const hourPositions = HOUR_NUMBERS.map((_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;

    return {
      x: CENTER + 115 * Math.cos(angle),
      y: CENTER + 115 * Math.sin(angle),
    };
  });

  const minutePositions = MINUTE_NUMBERS.map((_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;

    return {
      x: CENTER + 115 * Math.cos(angle),
      y: CENTER + 115 * Math.sin(angle),
    };
  });

  function getHandAngle(number, array) {
    const index = array.indexOf(number);

    return (index / array.length) * 360;
  }

  const handleAngle =
    unit === "hour"
      ? getHandAngle(hour12, HOUR_NUMBERS)
      : getHandAngle(minute, MINUTE_NUMBERS);

  return {
    tipY,
    unit,
    period,
    hour12,
    minute,
    handleAngle,
    hourPositions,
    minutePositions,
    setUnit,
    setPeriod,
    selectHour,
    selectMinute,
  };
}
