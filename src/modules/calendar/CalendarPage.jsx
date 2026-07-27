// Hooks
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
import DayInfoModal from "@/modules/calendar/components/modals/DayInfoModal";
import ReservationInfoModal from "@/modules/calendar/components/modals/ReservationInfoModal";
import CreateReservationModal from "@/modules/calendar/components/modals/CreateReservationModal";

export default function CalendarPage() {
  const { isOpen, triggerRef, modalType, modalData, openModal, closeModal } =
    useModal();
  const { year, month, daysInMonth, firstDow, prevMonth, nextMonth, isToday } =
    useCalendar();
  const { reservations, loading } = useReservations();

  return (
    <main className="w-full h-full overflow-hidden overflow-y-auto">
      <Calendar
        year={year}
        month={month}
        daysInMonth={daysInMonth}
        firstDow={firstDow}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        isToday={isToday}
        loading={loading}
        reservations={reservations}
        openModal={openModal}
      />

      {modalType && (
        <Modal
          margin={0}
          isOpen={isOpen}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modals[modalType]?.location}
          growDirection={modals[modalType]?.growDirection}
        >
          {modalType === "export" && <ExportModal />}

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
