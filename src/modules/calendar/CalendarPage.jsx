// Hooks
import { useState } from "react";
import { useModal } from "@hooks/useModal";
import { useCalendar } from "@hooks/useCalendar";
import { useReservations } from "@/modules/calendar/hooks/useReservations";
// Constantes
import { modals } from "@/modules/calendar/constants/modals";
// Componentes
import Calendar from "@/modules/calendar/components/ui/Calendar";
// Modales
import Modal from "@modals/Modal";
import ExportModal from "@modals/ExportModal";
import TopSection from "@/modules/calendar/components/ui/TopSection";
import ShareModal from "@/modules/calendar/components/modals/ShareModal";
import DayInfoModal from "@/modules/calendar/components/modals/DayInfoModal";
import ReservationInfoModal from "@/modules/calendar/components/modals/ReservationInfoModal";
import CreateReservationModal from "@/modules/calendar/components/modals/CreateReservationModal";
import { months } from "@/utils/months";

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
    prevMonth,
    nextMonth,
    prevWeek,
    nextWeek,
    prevDay,
    nextDay,
    getWeekDates,
    getWeekRange,
    isToday,
  } = useCalendar();

  return (
    <main className="w-full h-[91.8%] flex flex-col gap-2">
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
        hours={hours}
        month={month}
        year={year}
        firstDow={firstDow}
        dayNames={dayNames}
        daysInMonth={daysInMonth}
        currentDayName={currentDayName}
        isToday={isToday}
        openModal={openModal}
        getWeekRange={getWeekRange}
        getWeekDates={getWeekDates}
        activeCalendarLayout={activeCalendarLayout}
        setActiveCalendarLayout={setActiveCalendarLayout}
      />

      {modalType && (
        <Modal
          margin={5}
          isOpen={isOpen}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          title={modals[modalType]?.title}
          location={modals[modalType]?.location}
          growDirection={modals[modalType]?.growDirection}
        >
          {modalType === "export" && <ExportModal />}

          {modalType === "share" && <ShareModal />}

          {modalType === "dayInfo" && (
            <DayInfoModal dayInfo={modalData} onClose={closeModal} />
          )}

          {modalType === "reservationInfo" && (
            <ReservationInfoModal
              reservation={modalData}
              onClose={closeModal}
            />
          )}

          {modalType === "createReservation" && <CreateReservationModal />}
        </Modal>
      )}
    </main>
  );
}
