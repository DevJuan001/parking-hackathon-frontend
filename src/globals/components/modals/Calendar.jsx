// Hooks
import { useCalendar } from "@hooks/useCalendar";
// Componentes
import CalendarContent from "@components/ui/CalendarContent";
// Modales
import Modal from "@modals/Modal";

export default function Calendar({
  onClose,
  value,
  onChange,
  triggerRef,
  growDirection,
}) {
  const {
    year,
    month,
    firstDow,
    daysInMonth,
    prevMonth,
    nextMonth,
    handleSelect,
    isToday,
    isSelected,
  } = useCalendar(value, onChange, onClose);

  return (
    <Modal
      disableHeader
      isOpen={true}
      z_index="250"
      type="calendar"
      onClose={onClose}
      triggerRef={triggerRef}
      growDirection={growDirection}
      styles={`w-[365px] h-auto rounded-4xl
      md:w-[400px]`}
    >
      <CalendarContent
        year={year}
        month={month}
        firstDow={firstDow}
        daysInMonth={daysInMonth}
        isToday={isToday}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        isSelected={isSelected}
        handleSelect={handleSelect}
      />
    </Modal>
  );
}
