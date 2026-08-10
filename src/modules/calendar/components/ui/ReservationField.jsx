// Utils
import { extractTimeFromValue, padZero, to12h } from "@/utils/timeUtils";
// Constantes
import { reservationField } from "@/modules/calendar/constants/reservationField";

export default function ReservationField({
  active,
  reservation,
  miniVersion,
  onClick,
}) {
  const extracted = extractTimeFromValue(reservation?.start_time);
  const time = extracted ? to12h(extracted.hour, extracted.minute) : null;

  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col font-dmsans
      hover:cursor-pointer
      ${reservationField[reservation?.status]?.styles}
      ${
        miniVersion
          ? `h-5 flex-row items-center px-1 rounded-md
        lg:px-2`
          : "h-20 p-3 gap-0.5 rounded-2xl"
      }
      ${active ? "opacity-100" : "opacity-40"}`}
    >
      <div className="w-full flex items-center justify-between gap-0">
        <div
          className="w-[40%] flex items-center gap-0.5
          xl:w-[70%]"
        >
          <span
            className={`text-nowrap text-ellipsis overflow-hidden
              lg:w-full
              ${miniVersion ? "text-xs" : "text-lg"}
            `}
          >
            {reservation?.name}
          </span>
        </div>

        <span
          className={`w-fit text-nowrap overflow-hidden
            ${miniVersion ? "text-xs" : "text-base"}
          `}
        >
          {time ? `${time.hour12}:${padZero(time.minute)} ${time.period}` : ""}
        </span>
      </div>

      {!miniVersion && (
        <div className="flex gap-1">
          {reservation?.labels?.map((label) => (
            <div className="flex items-center py-1 px-3 gap-1 bg-white text-sm text-black rounded-full">
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}
