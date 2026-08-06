// Utils
import { months } from "@utils/months";
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
  setActiveSection,
}) {
  return (
    <div
      className="w-full h-full flex border-l border-[#E4E2E5] animate-blur-up
      dark:border-[#202022] dark:text-[#E4E2E5]"
    >
      <div className="w-full h-full flex flex-col gap-2 p-10">
        <span className="text-xl font-medium">Elige una fecha</span>

        <div className="w-full flex justify-between">
          <span>{`${months[month]} ${year}`}</span>

          <div className="flex gap-1">
            <button
              onClick={prevMonth}
              className="flex items-center justify-center p-2 rounded-full
              hover:bg-[#F5F3F6]
              dark:hover:bg-[#202022]"
            >
              <Icon
                name={"arrow_back_ios"}
                size={16}
                className="text-[#75777E]
                dark:text-[#7E8088]"
              />
            </button>

            <button
              onClick={nextMonth}
              className="flex items-center justify-center p-2 rounded-full
              hover:bg-[#F5F3F6]
              dark:hover:bg-[#202022]"
            >
              <Icon
                name={"arrow_forward_ios"}
                size={16}
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
              dark:bg-[#202022]"
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
                key={`prev-${i}`}
                type="button"
                disabled
                style={{ aspectRatio: 1 }}
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
              onClick={() => setActiveSection("time")}
              style={{ aspectRatio: 1 }}
              className={`flex items-center justify-center text-base rounded-2xl transition-colors 
                hover:text-black
                ${
                  isSelected(day)
                    ? `bg-black text-white font-bold text-lg
                    hover:text-white hover:bg-black/90
                    dark:bg-white dark:text-black`
                    : isToday(day, month, year)
                      ? `bg-gray-100 font-medium 
                      hover:bg-gray-200 hover:font-bold
                      dark:bg-[#202022] dark:hover:text-[#E4E2E5] dark:hover:bg-[#202022]`
                      : `text-[#44474e]
                      hover:bg-gray-200 hover:font-bold
                      dark:text-[#E4E2E5] dark:hover:text-[#E4E2E5] dark:hover:bg-[#202022]`
                }`}
            >
              {day}
            </button>
          ))}

          {/* Mes siguiente */}
          {(() => {
            const totalCells = firstDow + daysInMonth;
            const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
            return Array.from({ length: remaining }).map((_, i) => (
              <button
                key={`next-${i}`}
                type="button"
                disabled
                style={{ aspectRatio: 1 }}
                className="flex items-center justify-center text-base rounded-full text-gray-300
                dark:text-[#ffffff25]"
              >
                {i + 1}
              </button>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
