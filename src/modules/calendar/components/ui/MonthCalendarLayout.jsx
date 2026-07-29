import DayField from "@/modules/calendar/components/ui/DayField";

export default function MonthCalendarLayout({
  daysInMonth,
  month,
  year,
  loading,
  isToday,
  firstDow,
  openModal,
  reservations,
  setActiveCalendarLayout,
}) {
  return (
    <div
      className="w-full h-full grid grid-cols-7 grid-rows-[50px_repeat(6,1fr)] gap-2
      dark:text-[#E4E2E5]"
    >
      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Domingo
      </div>

      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Lunes
      </div>

      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Martes
      </div>

      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Miercoles
      </div>

      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Jueves
      </div>

      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Viernes
      </div>

      <div
        className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
        dark:bg-[#101012]"
      >
        Sábado
      </div>

      {/* Mes anterior */}
      {Array.from({ length: firstDow }).map((_, i) => {
        const prevMonthDays = new Date(year, month, 0).getDate();
        const day = prevMonthDays - firstDow + i + 1;
        return (
          <DayField
            key={`prev-${i}`}
            day={day}
            month={month - 1}
            year={year}
            reservations={reservations?.filter((reservation) =>
              reservation.start_date.startsWith(
                `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
              ),
            )}
            loading={loading}
            isToday={isToday}
            openModal={openModal}
            setActiveCalendarLayout={setActiveCalendarLayout}
          />
        );
      })}

      {/* Mes actual */}
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
        <DayField
          active
          key={day}
          day={day}
          month={month}
          year={year}
          reservations={reservations?.filter((reservation) =>
            reservation.start_date.startsWith(
              `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
            ),
          )}
          loading={loading}
          isToday={isToday}
          openModal={openModal}
          setActiveCalendarLayout={setActiveCalendarLayout}
        />
      ))}

      {/* Mes siguiente */}
      {(() => {
        const totalCells = firstDow + daysInMonth;
        const remaining = totalCells >= 42 ? 0 : 42 - totalCells;
        return Array.from({ length: remaining }).map((_, i) => (
          <DayField
            key={`next-${i}`}
            day={i + 1}
            month={month + 1}
            year={year}
            reservations={reservations?.filter((reservation) =>
              reservation.start_date.startsWith(
                `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
              ),
            )}
            loading={loading}
            isToday={isToday}
            openModal={openModal}
            setActiveCalendarLayout={setActiveCalendarLayout}
          />
        ));
      })()}
    </div>
  );
}
