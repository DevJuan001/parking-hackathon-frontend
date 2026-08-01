// Utils
import { extractTimeFromValue, padZero, to12h } from "@/utils/timeUtils";
// Constantes
import { reservationField } from "@/modules/calendar/constants/reservationField";
// Componentes
import Icon from "@components/ui/Icon";

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
      className={`flex flex-col font-dmsans text-[#1b1b1e]
      hover:cursor-pointer
      dark:text-[#E4E2E5]
      ${reservationField[reservation?.level]?.styles}
      ${miniVersion ? "h-5 flex-row items-center px-2 rounded-md" : "h-fit p-3 rounded-2xl"}
      ${active ? "opacity-100" : "opacity-40"}`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          {reservation?.level < 2 && (
            <Icon name={"circle"} size={10} fill className="text-blue-700" />
          )}

          <span
            data-shared-id={`reservation-${reservation?.id}-name`}
            className={`font-medium
              ${miniVersion ? "max-w-17 text-xs overflow-hidden" : "max-w-25 overflow-hidden text-lg"}
            `}
          >
            {reservation?.name}
          </span>
        </div>

        <span
          data-shared-id={`reservation-${reservation?.id}-date`}
          className={`font-medium
            ${miniVersion ? "text-xs" : "text-base"}
          `}
        >
          {time ? `${time.hour12}:${padZero(time.minute)} ${time.period}` : ""}
        </span>
      </div>

      {!miniVersion && (
        <div className="flex gap-1">
          <div className="flex items-center py-1 px-3 gap-1 bg-white text-sm text-black rounded-full">
            <Icon name={"crown"} size={20} />

            <span>Cliente VIP</span>
          </div>
        </div>
      )}
    </button>
  );
}
