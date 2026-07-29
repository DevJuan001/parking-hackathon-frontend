import { formatTime } from "@/utils/formatTime";
import { reservationField } from "@/modules/calendar/constants/reservationField";
import Icon from "@/globals/components/ui/Icon";

export default function ReservationField({
  active,
  reservation,
  miniVersion,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col font-dmsans text-[#1b1b1e]
      hover:cursor-pointer
      dark:text-[#E4E2E5]
      ${reservationField[reservation?.level]?.styles}
      ${miniVersion ? "h-5 flex-row items-center px-2 text-sm rounded-md" : "h-fit p-3 rounded-2xl"}
      ${active ? "opacity-100" : "opacity-40"}`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          {reservation?.level < 2 && (
            <Icon name={"circle"} size={10} fill className="text-blue-700" />
          )}

          <span
            className={`font-medium text-ellipsis overflow-hidden
            ${miniVersion ? "" : "text-lg"}
          `}
          >
            {reservation?.name}
          </span>
        </div>

        <span
          className={`font-medium text-ellipsis overflow-hidden
            ${miniVersion ? "text-xs" : "text-lg"}
          `}
        >
          {formatTime(reservation?.start_date)}
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
