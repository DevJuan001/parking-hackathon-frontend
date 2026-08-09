export const actualDate = new Date();
export const HOUR_NUMBERS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const MINUTE_NUMBERS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export function padZero(value) {
  return String(value).padStart(2, "0");
}

export function isBeforeToday(year, month, day) {
  const today = new Date();
  const candidate = new Date(year, month, day);
  return (
    candidate.getFullYear() < today.getFullYear() ||
    (candidate.getFullYear() === today.getFullYear() &&
      candidate.getMonth() < today.getMonth()) ||
    (candidate.getFullYear() === today.getFullYear() &&
      candidate.getMonth() === today.getMonth() &&
      candidate.getDate() < today.getDate())
  );
}

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

  return `${padZero(hour)}:${padZero(minute)}`;
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

  return `${hour12}:${padZero(minute)} ${period}`;
}

export function formatTimeForDisplay(value) {
  if (!value) return "";

  const time = extractTimeFromValue(value);

  if (!time) return "";

  const hhmm = `${padZero(time.hour)}:${padZero(time.minute)}`;

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
  return `${padZero(hour24)}:${padZero(minute)}`;
}

export function getMonthRange(year, month) {
  const startDate = new Date(year, month - 1, 25);
  const endDate = new Date(year, month + 1, 3);

  return {
    start_date: `${startDate.getFullYear()}-${padZero(startDate.getMonth() + 1)}-${padZero(startDate.getDate())}`,
    end_date: `${endDate.getFullYear()}-${padZero(endDate.getMonth() + 1)}-${padZero(endDate.getDate())}`,
  };
}
