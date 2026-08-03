// Utils
import { filterReservationsByDate } from "@/utils/filterReservations";
// Componentes
import DayField from "@/modules/calendar/components/ui/DayField";

export default function MonthCalendarLayout({
  daysInMonth,
  dayNames,
  month,
  year,
  loading,
  isToday,
  firstDow,
  openModal,
  reservations,
  setActiveCalendarLayout,
  goToDate,
}) {
  return (
    <div
      className="w-full h-full grid grid-cols-7 grid-rows-[50px_repeat(6,1fr)] gap-2
      dark:text-[#E4E2E5]"
    >
      {dayNames?.map((day, index) => (
        <div
          key={index}
          className="p-3 rounded-2xl bg-[#F5F3F6] text-center font-medium
          dark:bg-[#101012]"
        >
          <span
            className="hidden
            md:inline-block"
          >
            {day}
          </span>

          <span className="md:hidden">{day?.slice(0, 2)}</span>
        </div>
      ))}

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
            reservations={filterReservationsByDate(
              reservations,
              year,
              month - 1,
              day,
            )}
            loading={loading}
            isToday={isToday}
            openModal={openModal}
            setActiveCalendarLayout={setActiveCalendarLayout}
            goToDate={goToDate}
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
          reservations={filterReservationsByDate(
            reservations,
            year,
            month,
            day,
          )}
          loading={loading}
          isToday={isToday}
          openModal={openModal}
          setActiveCalendarLayout={setActiveCalendarLayout}
          goToDate={goToDate}
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
            reservations={filterReservationsByDate(
              reservations,
              year,
              month + 1,
              i + 1,
            )}
            loading={loading}
            isToday={isToday}
            openModal={openModal}
            setActiveCalendarLayout={setActiveCalendarLayout}
            goToDate={goToDate}
          />
        ));
      })()}
    </div>
  );
}
