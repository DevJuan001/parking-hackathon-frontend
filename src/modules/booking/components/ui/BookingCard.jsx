// Hooks
import { useState } from "react";
import { useCalendar } from "@hooks/useCalendar";
// Utils
import { formatDateTime } from "@utils/formatDateTime";
import { formatTimeForDisplay } from "@utils/timeUtils";
// Componentes
import Icon from "@components/ui/Icon";
import BookingCalendar from "@/modules/booking/components/ui/BookingCalendar";
import MoreInfoSection from "@/modules/booking/components/ui/MoreInfoSection";
import BookingTimeSection from "@/modules/booking/components/ui/BookingTimeSection";

export default function BookingCard({
  form,
  error,
  loading,
  setForm,
  fieldError,
  parkingInfo,
  handleChange,
  handleSubmit,
  openModal,
}) {
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
    getWeekDates,
    handleSelect,
  } = useCalendar(form?.start_date, (date) =>
    setForm((field) => ({ ...field, start_date: date })),
  );

  return (
    <section
      className="w-full h-full flex flex-col
      md:border md:border-[#E4E2E5] md:rounded-4xl
      lg:flex-row
      dark:border-[#202022] dark:text-[#E4E2E5]"
    >
      <div
        className="w-full h-fit flex items-center justify-between p-5 border-b border-[#E4E2E5]
        md:p-10
        lg:h-full lg:w-fit lg:flex-col lg:border-r lg:border-b-0
        dark:border-[#202022]"
      >
        <div
          className="w-full h-full flex justify-between gap-8
          lg:flex-col lg:justify-normal"
        >
          <div className="flex flex-col">
            <span
              className="text-sm text-nowrap font-medium
              md:text-lg
              lg:text-xl"
            >
              {parkingInfo?.name ?? "..."}
            </span>

            <span
              className="text-sm text-[#75777E]
              md:text-base
              dark:text-[#7E8088]"
            >
              Nombre del parking
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className="text-sm text-nowrap text-[#75777E]
              md:text-base
              dark:text-[#7E8088]"
            >
              Fecha seleccionada
            </span>

            <span
              className="text-sm
              md:text-lg
              lg:text-xl"
            >
              {form?.start_date ? formatDateTime(form?.start_date) : "..."}
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className="text-sm text-nowrap text-[#75777E]
              md:text-base
              dark:text-[#7E8088]"
            >
              Hora de inicio
            </span>

            <span
              className="text-sm
              md:text-lg
              lg:text-xl"
            >
              {form?.start_time
                ? formatTimeForDisplay(form?.start_time)
                : "..."}
            </span>
          </div>
        </div>

        <a
          href="/"
          className="hidden w-full items-center px-4 py-3 gap-2 rounded-full
          lg:flex
          hover:bg-[#F5F3F6]
          dark:text-[#E4E2E5] dark:hover:bg-[#101012]"
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
          handleSelect={handleSelect}
          setActiveSection={setActiveSection}
        />
      )}

      {activeSection === "time" && (
        <BookingTimeSection
          day={day}
          form={form}
          month={month}
          dayNames={dayNames}
          setForm={setForm}
          prevDay={prevDay}
          nextDay={nextDay}
          setActiveSection={setActiveSection}
        />
      )}

      {activeSection === "moreInfo" && (
        <MoreInfoSection
          form={form}
          error={error}
          loading={loading}
          setForm={setForm}
          fieldError={fieldError}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setActiveSection={setActiveSection}
        />
      )}
    </section>
  );
}
