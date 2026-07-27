// Constantes
import { months } from "@/utils/months";
// Componentes
import Icon from "@components/ui/Icon";
import CreateButton from "@components/ui/CreateButton";
import ExportButton from "@components/ui/ExportButton";
import DayField from "@/modules/calendar/components/ui/DayField";

export default function Calendar({
  year,
  month,
  firstDow,
  daysInMonth,
  isToday,
  nextMonth,
  prevMonth,
  reservations,
  loading,
  openModal,
}) {
  return (
    <section className="w-full h-[98%] flex flex-col gap-2">
      <div
        className="h-[13%] flex items-center justify-between
        sm:h-[9%]
        md:h-[8%]
        dark:text-[#E4E2E5]"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="w-fit h-fit flex items-center justify-center p-2.5 rounded-3xl
            hover:bg-[#EFEDF0]
            dark:hover:bg-[#101012]"
          >
            <Icon name={"keyboard_arrow_left"} />
          </button>

          <span className="text-2xl font-medium font-poppins">
            {months[month]} del {year}
          </span>

          <button
            onClick={nextMonth}
            className="w-fit h-fit flex items-center justify-center text-center p-2.5 rounded-3xl
            hover:bg-[#EFEDF0]
            dark:hover:bg-[#202022]"
          >
            <Icon name={"keyboard_arrow_right"} />
          </button>
        </div>

        <div
          className="flex gap-2
          lg:gap-3"
        >
          <ExportButton
            onClick={(e) => openModal(null, "export", e.currentTarget)}
          />

          <CreateButton
            onClick={(e) =>
              openModal(null, "createReservation", e.currentTarget)
            }
          />
        </div>
      </div>

      <div
        className="w-full h-[90%] grid grid-cols-7 grid-rows-[50px_repeat(6,1fr)] gap-2 font-dmsans
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
          className="p-3 rounded-2xl bg-[#F5F3F6] text-center text-[#1B1B1E] font-medium
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
              reservations={reservations}
              loading={loading}
              isToday={isToday}
              openModal={openModal}
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
              reservations={reservations}
              loading={loading}
              isToday={isToday}
              openModal={openModal}
            />
          ));
        })()}
      </div>
    </section>
  );
}
