import { Fragment } from "react";

export default function WeekCalendarLayout({
  weekDates,
  dayNames,
  hours,
  reservations,
  loading,
  isToday,
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
            key={date.toISOString()}
            className="flex flex-col items-center justify-center gap-0.5"
          >
            <span className="text-sm font-medium">
              {dayNames[date.getDay()]}
            </span>

            <button
              onClick={() => setActiveCalendarLayout("dayLayout")}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl
                ${
                  isToday(date.getDate(), date.getMonth(), date.getFullYear())
                    ? `bg-black text-white font-semibold
                    dark:bg-white dark:text-black`
                    : `font-medium
                    hover:bg-[#F5F3F6]
                    dark:hover:bg-[#202022]`
                }
                `}
            >
              {date.getDate()}
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

            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="border border-[#E4E2E5]
                dark:border-[#202022]"
              ></div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
