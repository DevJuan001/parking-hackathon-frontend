// Hooks
import { useReservations } from "@/modules/calendar/hooks/useReservations";
// Componentes
import DayCalendarLayout from "@/modules/calendar/components/ui/DayCalendarLayout";
import WeekCalendarLayout from "@/modules/calendar/components/ui/WeekCalendarLayout";
import MonthCalendarLayout from "@/modules/calendar/components/ui/MonthCalendarLayout";

export default function Calendar({
  day,
  hours,
  month,
  year,
  firstDow,
  dayNames,
  daysInMonth,
  isToday,
  goToDate,
  openModal,
  getWeekDates,
  currentDayName,
  activeCalendarLayout,
  setActiveCalendarLayout,
}) {
  const { reservations, loading } = useReservations();

  return (
    <section className="w-full h-[89%] font-dmsans">
      {activeCalendarLayout === "monthLayout" && (
        <MonthCalendarLayout
          month={month}
          year={year}
          firstDow={firstDow}
          dayNames={dayNames}
          daysInMonth={daysInMonth}
          reservations={reservations}
          loading={loading}
          isToday={isToday}
          goToDate={goToDate}
          openModal={openModal}
          activeCalendarLayout={activeCalendarLayout}
          setActiveCalendarLayout={setActiveCalendarLayout}
        />
      )}

      {activeCalendarLayout === "weekLayout" && (
        <WeekCalendarLayout
          hours={hours}
          dayNames={dayNames}
          weekDates={getWeekDates()}
          reservations={reservations}
          isToday={isToday}
          goToDate={goToDate}
          openModal={openModal}
          activeCalendarLayout={activeCalendarLayout}
          setActiveCalendarLayout={setActiveCalendarLayout}
        />
      )}

      {activeCalendarLayout === "dayLayout" && (
        <DayCalendarLayout
          day={day}
          month={month}
          year={year}
          hours={hours}
          reservations={reservations}
          weekDates={getWeekDates()}
          currentDayName={currentDayName}
          isToday={isToday}
          openModal={openModal}
          activeCalendarLayout={activeCalendarLayout}
          setActiveCalendarLayout={setActiveCalendarLayout}
        />
      )}
    </section>
  );
}
