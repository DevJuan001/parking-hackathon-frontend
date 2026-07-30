export function buildIsoFromDateTime(date, time) {
  if (!date || !time) return null;

  const d = new Date(`${date}T${time}`);

  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
