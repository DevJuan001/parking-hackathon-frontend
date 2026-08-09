// Utils
import { months } from "@utils/months";
import { actualDate, isBeforeToday } from "@/utils/timeUtils";
// Componentes
import Icon from "@components/ui/Icon";

export default function BookingCalendar({
  year,
  month,
  dayNames,
  firstDow,
  daysInMonth,
  prevMonth,
  nextMonth,
  isToday,
  isSelected,
  handleSelect,
  setActiveSection,
}) {
  return (
    <div
      className="w-full h-full flex flex-col gap-2 p-5 animate-blur-up
      md:p-10
      dark:border-[#202022] dark:text-[#E4E2E5]"
    >
      <span
        className="text-xl text-nowrap font-semibold
        md:text-2xl"
      >
        Elige una fecha
      </span>

      <div className="w-full flex items-center justify-between">
        <span>{`${months[month]} ${year}`}</span>

        <div className="flex gap-1">
          {month !== actualDate.getMonth && (
            <button
              onClick={prevMonth}
              className="w-10 h-10 flex items-center justify-center rounded-full
              active:bg-[#E4E2E5]
              hover:bg-[#F5F3F6]
              dark:hover:bg-[#202022]"
            >
              <Icon
                name={"arrow_back"}
                size={22}
                className="w-fit text-[#75777E]
                dark:text-[#7E8088]"
              />
            </button>
          )}

          <button
            onClick={nextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full
            active:bg-[#E4E2E5]
            hover:bg-[#F5F3F6]
            dark:hover:bg-[#202022] dark:active:bg-[#303033]"
          >
            <Icon
              name={"arrow_forward"}
              size={22}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </button>
        </div>
      </div>

      <div className="w-full h-full grid grid-cols-7 grid-rows-[50px_repeat(6,1fr)] gap-2">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-2 rounded-2xl text-sm font-medium bg-[#F5F3F6]
            dark:bg-[#101012]"
          >
            <span
              className="hidden
              xl:inline"
            >
              {day}
            </span>

            <span className="xl:hidden">{day.slice(0, 2)}</span>
          </div>
        ))}

        {/* Mes anterior */}
        {Array.from({ length: firstDow }).map((_, i) => {
          const prevMonthDays = new Date(year, month, 0).getDate();
          const day = prevMonthDays - firstDow + i + 1;
          return (
            <button
              id={i}
              disabled
              key={`prev-${i}`}
              type="button"
              className="flex items-center justify-center text-base rounded-full text-gray-300 
              dark:text-[#ffffff25]"
            >
              {day}
            </button>
          );
        })}

        {/* Mes actual */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            type="button"
            disabled={isBeforeToday(year, month, day)}
            onClick={() =>
              handleSelect(day, () =>
                setTimeout(() => setActiveSection("time"), 500),
              )
            }
            className={`flex items-center justify-center rounded-2xl transition-all duration-200 subpixel-antialiased
              active:animate-click-effect
                ${
                  isSelected(day)
                    ? `bg-black text-xl text-white font-bold
                    hover:text-white hover:bg-black/90
                    dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:text-black`
                    : isToday(day, month, year)
                      ? `bg-[#efedf0] text-lg font-semibold
                      hover:text-xl hover:font-bold
                      dark:bg-[#202022] dark:hover:text-[#E4E2E5]`
                      : isBeforeToday(year, month, day)
                        ? `text-gray-300
                        dark:text-[#ffffff25]`
                        : `bg-[#F5F3F6] text-black
                      hover:bg-[#efedf0] hover:text-black hover:text-xl hover:font-bold
                      dark:bg-[#101012] dark:text-[#E4E2E5] dark:hover:text-[#E4E2E5] dark:hover:bg-[#202022]`
                }`}
          >
            {day}
          </button>
        ))}

        {/* Mes siguiente */}
        {(() => {
          const totalCells = firstDow + daysInMonth;
          const remaining = totalCells >= 42 ? 0 : 42 - totalCells;
          return Array.from({ length: remaining }).map((_, i) => (
            <button
              key={`next-${i}`}
              type="button"
              disabled
              className="flex items-center justify-center text-base rounded-full text-gray-300
              dark:text-[#ffffff25]"
            >
              {i + 1}
            </button>
          ));
        })()}
      </div>
    </div>
  );
}
