import { useState } from "react";
import { months } from "@utils/months";

export function useCalendar(value, onChange) {
  const today = new Date();
  const dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  function getInitialCurrent() {
    if (value) {
      const [yearStr, monthStr, dayStr] = value.split("-").map(Number);
      if (yearStr && monthStr && dayStr) {
        return { year: yearStr, month: monthStr - 1, day: dayStr };
      }
    }
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    };
  }

  const [current, setCurrent] = useState(getInitialCurrent);

  const { year, month, day } = current;

  const firstDow = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentDayName = dayNames[new Date(year, month, day).getDay()];

  function prevMonth() {
    setCurrent((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11, day: prev.day }
        : { ...prev, month: prev.month - 1 },
    );
  }

  function nextMonth() {
    setCurrent((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0, day: prev.day }
        : { ...prev, month: prev.month + 1 },
    );
  }

  function prevDay() {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month, prev.day - 1);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      };
    });
  }

  function nextDay() {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month, prev.day + 1);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      };
    });
  }

  function getWeekStart(targetYear, targetMonth, targetDay) {
    const date = new Date(targetYear, targetMonth, targetDay);
    return new Date(targetYear, targetMonth, targetDay - date.getDay());
  }

  function prevWeek() {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month, prev.day - 7);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      };
    });
  }

  function nextWeek() {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month, prev.day + 7);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      };
    });
  }

  function getWeekDates() {
    const weekStart = getWeekStart(year, month, day);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + index);
      return date;
    });
  }

  function getWeekRange() {
    const weekDates = getWeekDates();
    const startDay = weekDates[0].getDate();
    const endDay = weekDates[6].getDate();
    const weekMonth = months[weekDates[0].getMonth()];
    return `${startDay} - ${endDay} de ${weekMonth}`;
  }

  function handleSelect(selectedDay, onClose) {
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
    onChange(formatted);
    onClose();
  }

  function goToDate(targetDay, targetMonth, targetYear) {
    setCurrent({ year: targetYear, month: targetMonth, day: targetDay });
  }

  const isToday = (checkDay, checkMonth, checkYear) =>
    checkDay === today.getDate() &&
    checkMonth === today.getMonth() &&
    checkYear === today.getFullYear();

  const isSelected = (checkDay) => {
    if (!value) return false;
    const [yearStr, monthStr, dayStr] = value.split("-").map(Number);
    return checkDay === dayStr && month + 1 === monthStr && year === yearStr;
  };

  return {
    year,
    month,
    day,
    hours,
    dayNames,
    currentDayName,
    firstDow,
    daysInMonth,
    isToday,
    goToDate,
    prevDay,
    nextDay,
    prevWeek,
    nextWeek,
    prevMonth,
    nextMonth,
    isSelected,
    handleSelect,
    getWeekDates,
    getWeekRange,
  };
}
