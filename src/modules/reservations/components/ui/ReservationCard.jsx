// Hooks
import { useState } from "react";
import { useCalendar } from "@hooks/useCalendar";
// Componentes
import ReservationCalendar from "@/modules/reservations/components/ui/ReservationCalendar";
import ReservationTimeSection from "./RerservationTimeSection";

export default function ReservationCard({ openModal }) {
  const [activeSection, setActiveSection] = useState("calendar");
  const {
    month,
    year,
    dayNames,
    firstDow,
    daysInMonth,
    handleSelect,
    isSelected,
    isToday,
  } = useCalendar();

  return (
    <section className="w-full h-full flex border border-[#E4E2E5] rounded-4xl">
      <div className="w-[25%] flex flex-col p-5 gap-10">
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
      </div>

      {activeSection === "calendar" && (
        <ReservationCalendar
          year={year}
          month={month}
          dayNames={dayNames}
          daysInMonth={daysInMonth}
          firstDow={firstDow}
          isSelected={isSelected}
          isToday={isToday}
          setActiveSection={setActiveSection}
          openModal={openModal}
        />
      )}

      {activeSection === "time" && <ReservationTimeSection />}
    </section>
  );
}
