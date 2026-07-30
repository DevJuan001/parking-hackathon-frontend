import { useInnerModal } from "@hooks/useInnerModal";
import Icon from "@components/ui/Icon";
import TimePickerModal from "../modals/TimePickerModal";

export default function TimeField({
  spanText,
  id,
  value,
  placeholder = "00:00",
  required,
  onChange,
  disabled,
  className,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => openInnerModal("timePickerModal", e)}
      className={`relative w-full h-16.5 flex items-center border border-[#E4E2E5] rounded-2xl
      hover:cursor-pointer
      ${disabled ? "opacity-70" : className}
      dark:border-[#202022] dark:text-[#E4E2E5]`}
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
        value={value}
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
          triggerRef={innerTrigger}
          growDirection={"center"}
          onClose={closeInnerModal}
        />
      )}
    </button>
  );
}
