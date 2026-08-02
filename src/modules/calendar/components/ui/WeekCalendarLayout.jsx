// Utils
import {
  filterReservationsByHour,
  getReservationHeight,
} from "@/utils/filterReservations";
import { formatTime } from "@/utils/formatTime";
// Constantes
import { reservationField } from "@/modules/calendar/constants/reservationField";
// Componentes
import { Fragment } from "react";

export default function WeekCalendarLayout({
  weekDates,
  dayNames,
  hours,
  isToday,
  goToDate,
  reservations,
  openModal,
  setActiveCalendarLayout,
}) {
  return (
    <div
      className="w-full h-full overflow-hidden
      dark:text-[#E4E2E5]"
    >
      <div className="w-full h-[10%] grid grid-cols-[50px_repeat(7,1fr)] grid-rows-1 border-collapse">
        <div className="flex items-end">
          <span className="w-full text-xs">GMT-05</span>
        </div>

        {weekDates?.map((date) => (
          <div
            key={date?.toISOString()}
            className="flex flex-col items-center justify-center gap-0.5"
          >
            <span className="text-sm font-medium">
              {dayNames[date?.getDay()]}
            </span>

            <button
              onClick={() => {
                goToDate(
                  date?.getDate(),
                  date?.getMonth(),
                  date?.getFullYear(),
                );
                setActiveCalendarLayout("dayLayout");
              }}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl
                ${
                  isToday(
                    date?.getDate(),
                    date?.getMonth(),
                    date?.getFullYear(),
                  )
                    ? `bg-black text-white font-semibold
                    dark:bg-white dark:text-black`
                    : `font-medium
                    hover:bg-[#F5F3F6]
                    dark:hover:bg-[#202022]`
                }
                `}
            >
              {date?.getDate()}
            </button>
          </div>
        ))}
      </div>

      <div className="w-full h-full grid grid-cols-[50px_repeat(7,1fr)] grid-rows-[repeat(24,50px)] border-collapse overflow-hidden overflow-y-auto">
        {hours?.map((hour) => (
          <Fragment key={hour}>
            <div className="relative flex items-center justify-center text-xs font-medium">
              <span className="absolute -bottom-2 right-4">{hour}:00</span>

              <div
                className="absolute bottom-0 right-0 w-2 border-b border-[#E4E2E5]
                dark:border-[#28282B]"
              />
            </div>

            {weekDates?.map((date, dayIndex) => (
              <div
                key={dayIndex}
                className="relative h-full border border-[#E4E2E5]
                dark:border-[#202022]"
              >
                {filterReservationsByHour(
                  reservations,
                  date?.getFullYear(),
                  date?.getMonth(),
                  date?.getDate(),
                  hour,
                )?.map((reservation) => (
                  <button
                    key={reservation?.id}
                    onClick={(e) =>
                      openModal(reservation, "editReservation", e.currentTarget)
                    }
                    className={`absolute w-full flex flex-col p-2 rounded-xl text-xs
                      ${reservationField[reservation?.level]?.styles}
                      `}
                    style={{
                      height: `${getReservationHeight(reservation?.start_date, reservation?.end_date)}px`,
                    }}
                  >
                    <span
                      data-shared-id="reservation-name"
                      className="font-medium"
                    >
                      {reservation?.name}
                    </span>

                    <span>{`${formatTime(reservation?.start_date)} - ${formatTime(reservation?.end_date)}`}</span>
                  </button>
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
