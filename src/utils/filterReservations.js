export function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function filterReservationsByDate(reservations, year, month, day) {
  const dateKey = formatDateKey(year, month, day);
  return reservations?.filter((reservation) =>
    reservation.start_date.startsWith(dateKey),
  ) ?? [];
}

export function filterReservationsByHour(reservations, year, month, day, hour) {
  return filterReservationsByDate(reservations, year, month, day)
    ?.filter((reservation) => new Date(reservation.start_date).getHours() === hour) ?? [];
}

export function getReservationHeight(start_date, end_date) {
  const start = new Date(start_date);
  const end = new Date(end_date);
  const minutes = (end - start) / (1000 * 60);
  return (minutes / 60) * 50;
}
