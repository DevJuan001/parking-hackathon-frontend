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
      className="w-full h-full overflow-hidden overflow-x-auto
      dark:text-[#E4E2E5]"
    >
      <div
        className="w-full h-[12%] grid grid-cols-[50px_repeat(7,1fr)] grid-rows-1 gap-5 border-collapse
        md:h-[10%] md:gap-0"
      >
        <div className="flex items-end">
          <span className="w-full text-xs">GMT-05</span>
        </div>

        {weekDates?.map((date) => (
          <div
            key={date?.toISOString()}
            className="flex flex-col items-center justify-center gap-0.5"
          >
            <span
              className="hidden font-medium
              md:inline-block"
            >
              {dayNames[date?.getDay()]}
            </span>

            <span className="text-sm md:hidden">
              {dayNames[date?.getDay()].slice(0, 2)}
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
              className={`w-8 h-8 flex items-center justify-center rounded-full text-2xl
                md:w-12 md:h-12
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
              <span
                className="text-sm
                md:text-2xl"
              >
                {date?.getDate()}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div
        className="w-full h-full grid grid-cols-[50px_repeat(7,1fr)] grid-rows-[repeat(24,50px)] border-collapse
        md:overflow-hidden md:overflow-y-auto"
      >
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
                      ${reservationField[reservation?.status]?.styles}
                    `}
                    style={{
                      height: `${getReservationHeight(
                        `${reservation?.start_date}` +
                          `${reservation?.start_time}`,
                        `${reservation?.end_date}` + `${reservation?.end_time}`,
                      )}px`,
                    }}
                  >
                    <span data-shared-id="reservation-name">
                      {reservation?.name}
                    </span>

                    <span>
                      {`
                        ${formatTime(`${reservation?.start_date}` + " " + `${reservation?.start_time}`)} - 
                        ${
                          reservation?.end_date
                            ? `${formatTime(`${reservation?.end_date}` + " " + `${reservation?.end_time}`)}`
                            : "N/A"
                        }
                      `}
                    </span>
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
