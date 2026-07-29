import { Fragment } from "react";

export default function DayCalendarLayout({
  hours,
  day,
  month,
  year,
  currentDayName,
  isToday,
}) {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto font-dmsans">
      <div
        className="sticky w-full top-0 flex flex-col p-2 pl-0 bg-[#fbf9fc] z-50
        dark:bg-black dark:text-white"
      >
        <div className="w-full h-full grid grid-cols-[50px_1fr] gap-2">
          <div className="flex items-end text-xs">
            <span>GMT-05</span>
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
        {hours?.map((hour) => (
          <Fragment>
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
              className="border border-[#E4E2E5]
              dark:border-[#28282B]"
            ></div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
