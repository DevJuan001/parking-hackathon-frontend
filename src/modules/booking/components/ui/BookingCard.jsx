// Hooks
import { useState } from "react";
import { useCalendar } from "@hooks/useCalendar";
// Componentes
import BookingCalendar from "@/modules/booking/components/ui/BookingCalendar";
import BookingTimeSection from "@/modules/booking/components/ui/BookingTimeSection";
import Icon from "@/globals/components/ui/Icon";

export default function BookingCard({ openModal }) {
  const [activeSection, setActiveSection] = useState("calendar");
  const {
    day,
    year,
    month,
    dayNames,
    firstDow,
    daysInMonth,
    isToday,
    prevDay,
    nextDay,
    prevMonth,
    nextMonth,
    isSelected,
    handleSelect,
    getWeekDates,
  } = useCalendar();

  return (
    <section
      className="w-full h-full flex border border-[#E4E2E5] rounded-4xl
      dark:border-[#202022] dark:text-[#E4E2E5]"
    >
      <div className="w-fit h-full flex flex-col p-10 gap-5 justify-between">
        <div className="flex flex-col">
          <span className="text-lg text-nowrap">Test</span>

          <span
            className="text-sm text-[#75777E]
            dark:text-[#7E8088]"
          >
            Reserva de plaza
          </span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-nowrap text-[#75777E]
            dark:text-[#7E8088]"
          >
            Duración estimada
          </span>

          <span className="text-sm">...</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-nowrap text-[#75777E]
            dark:text-[#7E8088]"
          >
            Fecha estimada
          </span>

          <span className="text-sm">...</span>
        </div>

        <a
          href="/"
          className="flex items-center gap-2
          dark:text-[#E4E2E5]"
        >
          <Icon name={"parking_sign"} fill />

          <span className="text-lg text-nowrap tracking-tighter font-semibold">
            Parking hackathon
          </span>
        </a>
      </div>

      {activeSection === "calendar" && (
        <BookingCalendar
          year={year}
          month={month}
          firstDow={firstDow}
          dayNames={dayNames}
          daysInMonth={daysInMonth}
          isToday={isToday}
          openModal={openModal}
          isSelected={isSelected}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          weekDates={getWeekDates()}
          setActiveSection={setActiveSection}
        />
      )}

      {activeSection === "time" && (
        <BookingTimeSection
          day={day}
          month={month}
          dayNames={dayNames}
          setActiveSection={setActiveSection}
        />
      )}
    </section>
  );
}
