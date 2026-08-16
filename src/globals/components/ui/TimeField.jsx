// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Utils
import { formatTimeForDisplay } from "@/utils/timeUtils";
// Componentes
import Icon from "@components/ui/Icon";
// Modales
import TimePickerModal from "@modals/TimePickerModal";

export default function TimeField({
  id,
  name,
  value,
  spanText,
  required,
  onChange,
  disabled,
  placeholder = "00:00",
  className,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div
      role="button"
      disabled={disabled}
      onClick={disabled ? null : (e) => openInnerModal("timePickerModal", e)}
      className={`relative w-full h-16.5 flex items-center border border-[#E4E2E5] rounded-2xl bg-[#FBF9FC]
      hover:cursor-pointer
      ${disabled ? "opacity-60" : className}
      dark:bg-black dark:border-[#1e1e20cb] dark:text-[#E4E2E5]`}
    >
      <span
        className="absolute top-3 left-4 text-xs text-[#75777E]
        dark:text-[#7E8088]"
      >
        {spanText}
      </span>

      <input
        readOnly
        id={id}
        name={name}
        value={formatTimeForDisplay(value)}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-10 pl-4 pt-5 pointer-events-none"
      />

      <Icon
        name={"nest_clock_farsight_analog"}
        size={14}
        className="absolute right-3 text-[#75777E]
        dark:text-[#7E8088]"
      />

      {innerType === "timePickerModal" && (
        <TimePickerModal
          isOpen={true}
          name={name}
          value={value}
          onChange={onChange}
          triggerRef={innerTrigger}
          growDirection={"center"}
          onClose={closeInnerModal}
        />
      )}
    </div>
  );
}
