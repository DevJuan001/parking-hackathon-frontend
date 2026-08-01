// Componentes
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";
import ReservationField from "@/modules/calendar/components/ui/ReservationField";

export default function DayField({
  day,
  month,
  year,
  active,
  reservations,
  loading,
  isToday,
  openModal,
  setActiveCalendarLayout,
  goToDate,
}) {
  return (
    <div
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        openModal(
          { day, month, year, reservations },
          "dayInfo",
          e.currentTarget,
        );
      }}
      className={`flex flex-col p-3 gap-1 rounded-2xl group
      ${
        active
          ? `font-medium bg-[#F5F3F6]
        hover:bg-[#efedf0]
        dark:bg-[#0a0a0a] dark:hover:bg-[#101012]`
          : `bg-[#f5f3f649] text-[#75777E]
        dark:bg-[#10101248] dark:text-[#7E8088]`
      }
      hover:cursor-pointer`}
    >
      <div className="w-full h-7 flex justify-between">
        <div
          onClick={(e) => {
            e.stopPropagation();
            goToDate(day, month, year);
            setActiveCalendarLayout("dayLayout");
          }}
          className={`w-7 flex items-center justify-center p-1 rounded-full
          ${
            isToday(day, month, year)
              ? `bg-black text-white font-semibold
              hover:bg-black/80
            dark:bg-white dark:text-black dark:hover:bg-white/90`
              : `hover:bg-[#E4E2E5]
              dark:hover:bg-[#202022]`
          }`}
        >
          <span data-shared-id="day-number">{day}</span>
        </div>

        <div className="h-6 flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openModal(
                { day, month, year },
                "createReservation",
                e.currentTarget,
              );
            }}
            className="h-6 w-6 flex items-center justify-center p-0.5 rounded-2xl opacity-0
            group-hover:opacity-100
            hover:bg-[#E2E4E5]
            dark:hover:bg-[#202022]"
          >
            <Icon
              name={"add"}
              size={16}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(
                { day, month, year, reservations },
                "dayInfo",
                e.currentTarget,
              );
            }}
            className="h-6 w-6 flex items-center justify-center p-0.5 rounded-2xl opacity-0
            group-hover:opacity-100
            hover:bg-[#E2E4E5]
            dark:hover:bg-[#202022]"
          >
            <Icon
              name={"open_in_full"}
              size={16}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </button>
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-1">
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              width="100%"
              height="100%"
              backgroundColor={"#F3EEF5"}
              darkModeBackgroundColor={"#101012"}
              shineColor="#C5C1C7"
              darkModeShineColor="#1e1e1e"
              borderRadius={"6px"}
            />
          ))}

        <div className="flex flex-col gap-1">
          {reservations?.slice(0, 3).map((reservation) => (
            <ReservationField
              key={reservation?.id}
              active={active}
              reservation={reservation}
              miniVersion
              onClick={(e) => {
                e.stopPropagation();
                openModal(reservation, "editReservation", e.currentTarget);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
