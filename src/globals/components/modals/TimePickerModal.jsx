// Hooks
import { useTimePicker } from "@hooks/useTimePicker";
// Utils
import { HOUR_NUMBERS, MINUTE_NUMBERS, padZero } from "@/utils/timeUtils";
// Modales
import Modal from "@modals/Modal";

export default function TimePickerModal({
  isOpen,
  triggerRef,
  location,
  growDirection,
  name,
  value,
  onChange,
  onClose,
}) {
  const {
    unit,
    period,
    hour12,
    minute,
    setUnit,
    setPeriod,
    selectHour,
    selectMinute,
  } = useTimePicker({
    value,
    onChange: (stringValue) =>
      onChange?.({ target: { name, value: stringValue } }),
  });

  const CENTER = 136;
  const isHour = unit === "hour";
  const ringRadius = isHour ? 94 : 48;
  const tipY = 114 - ringRadius;

  const hourPositions = HOUR_NUMBERS.map((_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    return {
      x: CENTER + 115 * Math.cos(angle),
      y: CENTER + 115 * Math.sin(angle),
    };
  });

  const minutePositions = MINUTE_NUMBERS.map((_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    return {
      x: CENTER + 70 * Math.cos(angle),
      y: CENTER + 70 * Math.sin(angle),
    };
  });

  function getHandAngle(number, array) {
    const index = array.indexOf(number);

    return (index / 12) * 360;
  }

  const handleAngle =
    unit === "hour"
      ? getHandAngle(hour12, HOUR_NUMBERS)
      : getHandAngle(minute, MINUTE_NUMBERS);

  return (
    <Modal
      disableHeader
      isOpen={isOpen}
      onClose={onClose}
      location={location}
      type={"timePicker"}
      triggerRef={triggerRef}
      growDirection={growDirection}
    >
      <div className="flex flex-col items-center gap-5 font-dmsans">
        <div className="flex items-center justify-center gap-2 text-[44px] font-medium">
          <button
            onClick={() => setUnit("hour")}
            className={`px-6.5 rounded-3xl transition-colors duration-300
              ${
                unit === "hour"
                  ? `bg-black text-[#E4E2E5]
                dark:bg-white dark:text-black`
                  : `bg-[#F5F3F6] text-[#1B1B1E]
                  dark:bg-[#101012] dark:text-[#C5C6CE]`
              }`}
          >
            {padZero(hour12)}
          </button>

          <span
            className="text-[#75777E]
            dark:text-[#C5C6CE]"
          >
            :
          </span>

          <button
            onClick={() => setUnit("minute")}
            className={`px-6.5 rounded-3xl transition-colors duration-300
              ${
                unit === "minute"
                  ? `bg-black text-[#E4E2E5]
                dark:bg-white dark:text-black`
                  : `bg-[#F5F3F6] text-[#1B1B1E]
                  dark:bg-[#101012] dark:text-[#C5C6CE]`
              }`}
          >
            {padZero(minute)}
          </button>
        </div>

        {/* Reloj */}
        <div
          className="relative w-68 h-68 rounded-full bg-[#F5F3F6]
          dark:bg-[#101012]"
        >
          {hourPositions.map((position, index) => {
            const number = HOUR_NUMBERS[index];
            const isSelected = number === hour12;

            return (
              <button
                key={index}
                disabled={unit === "minute"}
                onClick={() => {
                  selectHour(number);

                  setTimeout(() => setUnit("minute"), 700);
                }}
                style={{ left: position.x, top: position.y }}
                className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-100 transition-colors duration-500
                ${
                  isSelected && unit === "hour"
                    ? `font-semibold text-white
                  dark:text-black`
                    : unit === "minute"
                      ? `text-[#75777E]
                  dark:text-[#7E8088]`
                      : `dark:text-[#E4E2E5]`
                }`}
              >
                {number}
              </button>
            );
          })}

          {minutePositions.map((position, index) => {
            const number = MINUTE_NUMBERS[index];
            const isSelected = number === minute;

            return (
              <button
                key={index}
                disabled={unit === "hour"}
                onClick={() => {
                  selectMinute(number);

                  setTimeout(() => {
                    onClose();
                  }, 800);
                }}
                style={{ left: position.x, top: position.y }}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs z-100 transition-colors duration-500
                ${
                  isSelected && unit === "minute"
                    ? `font-semibold text-white
                  dark:text-black`
                    : unit === "hour"
                      ? `text-[#75777E]
                  dark:text-[#7E8088]`
                      : `dark:text-[#E4E2E5]`
                }`}
              >
                {number}
              </button>
            );
          })}

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 text-black"
            viewBox="0 0 272 272"
          >
            <g
              style={{
                transform: `rotate(${handleAngle}deg)`,
                transformOrigin: "136px 136px",
                transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <line
                x1="136"
                x2="136"
                y1="136"
                y2={tipY}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transition: "y2 1000ms cubic-bezier(0.4, 0, 0.2, 1)" }}
              />

              <circle
                cx="136"
                cy={tipY}
                r={unit === "hour" ? 20 : 15}
                fill="currentColor"
                style={{
                  transition:
                    "cy 300ms cubic-bezier(0.4, 0, 0.2, 1), r 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </g>

            <circle cx="136" cy="136" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="flex gap-2 text-xl font-medium">
          <button
            onClick={() => setPeriod("AM")}
            className={`px-6.5 rounded-2xl transition-colors duration-300
              ${
                period === "AM"
                  ? `bg-black text-[#E4E2E5]
                dark:bg-white dark:text-black`
                  : `bg-[#F5F3F6] text-[#1B1B1E]
                  dark:bg-[#101012] dark:text-[#C5C6CE]`
              }`}
          >
            AM
          </button>

          <button
            onClick={() => setPeriod("PM")}
            className={`px-6.5 py-3 rounded-2xl transition-colors duration-300
              ${
                period === "PM"
                  ? `bg-black text-[#E4E2E5]
                dark:bg-white dark:text-black`
                  : `bg-[#F5F3F6] text-[#1B1B1E]
                  dark:bg-[#101012] dark:text-[#C5C6CE]`
              }`}
          >
            PM
          </button>
        </div>
      </div>
    </Modal>
  );
}
