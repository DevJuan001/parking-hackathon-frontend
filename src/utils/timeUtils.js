export const HOUR_NUMBERS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const MINUTE_NUMBERS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export function extractTimeFromValue(value) {
  if (!value) return null;

  if (value instanceof Date)
    return {
      hour: value.getHours(),
      minute: value.getMinutes(),
    };

  if (typeof value !== "string") return null;

  const hhmm = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);

  if (hhmm)
    return {
      hour: Number(hhmm[1]),
      minute: Number(hhmm[2]),
    };

  const date = new Date(value);

  if (!Number.isNaN(date.getTime()))
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };

  return null;
}

export function parseTime12h(value) {
  if (typeof value !== "string") return null;

  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

  let hour = Number(match[1]);

  const minute = Number(match[2]);

  const period = match[3].toUpperCase();

  if (minute < 0 || minute > 59) return null;

  if (period === "AM") hour = hour === 12 ? 0 : hour;
  else hour = hour === 12 ? 12 : hour + 12;

  if (hour < 0 || hour > 23) return null;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function parseTime24h(value) {
  if (typeof value !== "string") return null;

  const match = value.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) return null;

  const hour = Number(match[1]);

  const minute = Number(match[2]);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  const period = hour >= 12 ? "PM" : "AM";

  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatTimeForDisplay(value) {
  if (!value) return "";

  const time = extractTimeFromValue(value);

  if (!time) return "";

  const hhmm = `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;

  return parseTime24h(hhmm) ?? "";
}

export function to12h(hour24, minute) {
  const period = hour24 >= 12 ? "PM" : "AM";

  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return {
    period,
    hour12,
    minute,
  };
}

export function to24h({ period, hour12, minute }) {
  const hour24 =
    hour12 === 12
      ? period === "AM"
        ? 0
        : 12
      : period === "AM"
        ? hour12
        : hour12 + 12;
  return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
