// Hooks
import { useModal } from "@hooks/useModal";
import { useState, useEffect } from "react";
import { useCalendar } from "@hooks/useCalendar";
import { useReservations } from "@/modules/calendar/hooks/useReservations";
// Utils
import { months } from "@/utils/months";
// Constantes
import { modals } from "@/modules/calendar/constants/modals";
// Componentes
import Calendar from "@/modules/calendar/components/ui/Calendar";
import TopSection from "@/modules/calendar/components/ui/TopSection";
// Modales
import Modal from "@modals/Modal";
import ExportModal from "@modals/ExportModal";
import ShareModal from "@/modules/calendar/components/modals/ShareModal";
import DayInfoModal from "@/modules/calendar/components/modals/DayInfoModal";
import EditReservationModal from "@/modules/calendar/components/modals/EditReservationModal";
import CreateReservationModal from "@/modules/calendar/components/modals/CreateReservationModal";

export default function CalendarPage() {
  const { isOpen, triggerRef, modalType, modalData, openModal, closeModal } =
    useModal();
  const [activeCalendarLayout, setActiveCalendarLayout] =
    useState("monthLayout");
  const {
    hours,
    day,
    month,
    year,
    dayNames,
    firstDow,
    currentDayName,
    daysInMonth,
    isToday,
    goToDate,
    prevDay,
    nextDay,
    prevWeek,
    nextWeek,
    prevMonth,
    nextMonth,
    getWeekDates,
    getWeekRange,
  } = useCalendar();
  const { reservations, loading, fetchByMonth } = useReservations(year, month);

  useEffect(() => {
    fetchByMonth(year, month);
  }, [year, month, fetchByMonth]);

  return (
    <main
      className="w-full h-[87.5%] flex flex-col gap-2
      md:h-[91.8%]"
    >
      <TopSection
        text={
          activeCalendarLayout === "monthLayout"
            ? `${months[month]} ${year}`
            : activeCalendarLayout === "weekLayout"
              ? `${getWeekRange()} ${year}`
              : `${day} ${months[month]} ${year}`
        }
        prevButtonOnClick={
          activeCalendarLayout === "monthLayout"
            ? prevMonth
            : activeCalendarLayout === "weekLayout"
              ? prevWeek
              : prevDay
        }
        nextButtonOnClick={
          activeCalendarLayout === "monthLayout"
            ? nextMonth
            : activeCalendarLayout === "weekLayout"
              ? nextWeek
              : nextDay
        }
        activeCalendarLayout={activeCalendarLayout}
        setActiveCalendarLayout={setActiveCalendarLayout}
        openModal={openModal}
      />

      <Calendar
        day={day}
        year={year}
        hours={hours}
        month={month}
        loading={loading}
        firstDow={firstDow}
        dayNames={dayNames}
        daysInMonth={daysInMonth}
        reservations={reservations}
        currentDayName={currentDayName}
        isToday={isToday}
        goToDate={goToDate}
        openModal={openModal}
        getWeekRange={getWeekRange}
        getWeekDates={getWeekDates}
        activeCalendarLayout={activeCalendarLayout}
        setActiveCalendarLayout={setActiveCalendarLayout}
      />

      {modalType && (
        <Modal
          isOpen={isOpen}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          title={modals[modalType]?.title}
          margin={modals[modalType]?.margin ?? 0}
          location={modals[modalType]?.location}
          disableHeader={modals[modalType]?.disableHeader}
          growDirection={modals[modalType]?.growDirection}
        >
          {modalType === "export" && <ExportModal />}

          {modalType === "share" && <ShareModal />}

          {modalType === "dayInfo" && (
            <DayInfoModal dayInfo={modalData} onClose={closeModal} />
          )}

          {modalType === "editReservation" && (
            <EditReservationModal
              reservation={modalData}
              onClose={closeModal}
            />
          )}

          {modalType === "createReservation" && (
            <CreateReservationModal dayInfo={modalData} onClose={closeModal} />
          )}
        </Modal>
      )}
    </main>
  );
}
