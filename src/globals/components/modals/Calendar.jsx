// Hooks
import { useCalendar } from "@hooks/useCalendar";
// Componentes
import CalendarContent from "@/globals/components/ui/CalendarContent";
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
      triggerRef={triggerRef}
      onClose={onClose}
      type="calendar"
      z_index="250"
      growDirection={growDirection}
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
