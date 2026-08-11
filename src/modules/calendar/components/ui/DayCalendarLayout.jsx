// Utils
import { formatTime } from "@/utils/formatTime";
import {
  assignOverlapColumns,
  filterReservationsByHour,
  getReservationHeight,
} from "@/utils/filterReservations";
// Constantes
import { reservationField } from "@/modules/calendar/constants/reservationField";
// Componentes
import { Fragment } from "react";

export default function DayCalendarLayout({
  hours,
  day,
  month,
  year,
  currentDayName,
  reservations,
  isToday,
  openModal,
}) {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto font-dmsans">
      <div
        className="sticky w-full top-0 flex flex-col px-2 pl-0 bg-[#fbf9fc] z-50
        dark:bg-black dark:text-white"
      >
        <div className="w-full h-full grid grid-cols-[50.9px_1fr] gap-2">
          <div className="relative flex items-end text-xs">
            <span>GMT-05</span>

            <div
              className="absolute -bottom-2.5 right-0 w-2 h-5 border-[0px_1px_1px_0px] border-[#E4E2E5]
              dark:border-[#28282B]"
            />
          </div>

          <div className="w-fit text-center">
            <span className="text-sm text-center font-medium">
              {currentDayName}
            </span>

            <div
              className={`h-12 w-12 flex items-center justify-center rounded-full text-2xl
              ${
                isToday(day, month, year)
                  ? `bg-black text-white font-semibold
                dark:bg-white dark:text-black`
                  : `font-medium`
              }
              `}
            >
              <span>{day}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full grid grid-cols-[50px_1fr] grid-rows-[repeat(24,50px)]">
        {hours?.map((hour, index) => (
          <Fragment key={hour}>
            <div className="relative">
              <span
                key={hour}
                className="absolute -bottom-2 right-4 text-xs font-medium
                dark:text-[#E4E2E5]"
              >
                {`${hour}:00`}
              </span>

              <div
                className="absolute bottom-0 right-0 w-2 border-b border-[#E4E2E5]
                dark:border-[#28282B]"
              />
            </div>

            <div
              key={index}
              className="relative flex pr-5 gap-1 border border-t-0 border-[#E4E2E5]
              dark:border-[#202022]"
            >
              {assignOverlapColumns(
                filterReservationsByHour(reservations, year, month, day, hour),
              )?.map((reservation) => {
                const column = reservation?.column;
                const offset = 145;
                const height = getReservationHeight(
                  reservation?.start_date + " " + reservation?.start_time,
                  reservation?.end_date + " " + reservation?.end_time,
                );
                const start = new Date(
                  reservation.start_date + " " + reservation.start_time,
                );
                const minutes = start.getMinutes();
                const topOffset = (minutes / 60) * 90;

                return (
                  <button
                    key={reservation?.id}
                    onClick={(e) =>
                      openModal(reservation, "editReservation", e.currentTarget)
                    }
                    className={`absolute flex flex-col p-2 rounded-xl text-sm ${reservationField[reservation?.status]?.styles}`}
                    style={{
                      top: `${topOffset}px`,
                      left: `${column * offset}px`,
                      width: `calc(100% - ${column * offset}px)`,
                      minHeight: "fit-content",
                      height: `${height}px`,
                      zIndex: column + 1,
                    }}
                  >
                    <span className="font-medium">{reservation?.name}</span>

                    <span className="text-xs">
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
                );
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
