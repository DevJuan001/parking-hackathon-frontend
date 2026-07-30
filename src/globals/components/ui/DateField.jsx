import { useInnerModal } from "@hooks/useInnerModal";
import Calendar from "@components/ui/Calendar";
import Icon from "@components/ui/Icon";

export default function DateField({
  id,
  spanText,
  value,
  name,
  placeholder = "yyyy/mm/dd",
  onChange,
  growDirection = "center",
  className,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <button
      id={id}
      type="button"
      onClick={(e) => openInnerModal("calendar", e)}
      className={`relative w-full h-16.5 flex px-4 rounded-2xl border border-[#c3c4c794] outline-[#00000028] text-center text-sm cursor-pointer
      focus:shadow-[0_0_2px_1px_#e5e7eb]
      dark:border-[#1e1e20cb] dark:text-white
      ${className}`}
    >
      <div className="min-w-full max-w-full flex items-center pr-3">
        <div className="min-w-full max-w-28 flex flex-col items-start">
          <span className="text-xs text-[#7E7777]">{spanText}</span>

          <input
            id={id}
            className="w-full outline-none cursor-pointer bg-transparent text-base"
            readOnly
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>

        <Icon
          name={"calendar_today"}
          size={14}
          fill
          className="text-[#75777E]
          dark:text-[#7E8088]"
        />
      </div>

      {innerType === "calendar" && (
        <Calendar
          value={value}
          growDirection={growDirection}
          triggerRef={innerTrigger}
          onChange={(formatted) => {
            onChange({ target: { name, value: formatted } });
            closeInnerModal();
          }}
          onClose={closeInnerModal}
        />
      )}
    </button>
  );
}
