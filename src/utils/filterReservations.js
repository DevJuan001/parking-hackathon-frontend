export function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function filterReservationsByDate(reservations, year, month, day) {
  const dateKey = formatDateKey(year, month, day);

  return (
    reservations?.filter((reservation) =>
      reservation.start_date.startsWith(dateKey),
    ) ?? []
  );
}

export function filterReservationsByHour(reservations, year, month, day, hour) {
  return (
    filterReservationsByDate(reservations, year, month, day)?.filter(
      (reservation) =>
        new Date(
          reservation.start_date + " " + reservation.start_time,
        ).getHours() === hour,
    ) ?? []
  );
}

export function getReservationHeight(start_date, end_date) {
  const start = new Date(start_date);
  const end = new Date(end_date);
  const minutes = (end - start) / (1000 * 60);

  return (minutes / 60) * 50;
}

export function assignOverlapColumns(reservations) {
  if (!reservations || reservations.length === 0) return [];

  const sorted = [...reservations].sort(
    (a, b) =>
      new Date(a.start_date + " " + a.start_time) -
      new Date(b.start_date + " " + b.start_time),
  );

  const columns = [];

  return sorted.map((reservation) => {
    const start = new Date(
      reservation.start_date + " " + reservation.start_time,
    );
    const end = new Date(reservation.end_date + " " + reservation.end_time);

    let columnIndex = columns.findIndex((colEnd) => colEnd <= start);

    if (columnIndex === -1) {
      columnIndex = columns.length;
      columns.push(end);
    } else {
      columns[columnIndex] = end;
    }

    return { ...reservation, column: columnIndex };
  });
}
