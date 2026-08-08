// Utils
import { months } from "@utils/months";
import { formatTimeForDisplay, padZero } from "@utils/timeUtils";
// Componentes
import Icon from "@components/ui/Icon";

export default function BookingTimeSection({
  form,
  setForm,
  dayNames,
  setActiveSection,
}) {
  const [year, month, day] = form?.start_date?.split("-").map(Number) ?? [];

  const displayDate =
    year && month && day
      ? `${dayNames[new Date(year, month - 1, day).getDay()]}, ${day} de ${months[month - 1]}`
      : "...";

  return (
    <div
      className="w-full h-full flex flex-col p-5 gap-1 animate-blur-up
      md:p-10
      dark:border-[#202022] dark:text-[#E4E2E5]"
    >
      <button
        onClick={() => setActiveSection("calendar")}
        className="w-fit flex items-center justify-center p-2.5 border border-[#E4E2E5] rounded-full
        active:animate-click-effect
        hover:bg-[#efedf0]
        dark:border-[#202022] dark:hover:bg-[#101012]"
      >
        <Icon
          name={"arrow_back"}
          className="w-fit text-[#75777E]
          dark:text-[#7E8088]"
        />
      </button>

      <span
        className="text-xl text-nowrap font-semibold
        md:text-2xl"
      >
        Elige una hora
      </span>

      <span
        className="text-sm 
        md:text-lg"
      >
        {displayDate}
      </span>

      <div className="w-full flex flex-col items-center gap-2 overflow-hidden overflow-y-auto">
        {Array.from({ length: 24 }, (_, index) => index).map((value, index) => {
          const hour = formatTimeForDisplay(padZero(`${value}:00`));
          const formatHour = `${padZero(value)}:00:00`;

          return (
            <button
              key={index}
              onClick={() => {
                setForm((field) => ({ ...field, start_time: formatHour }));

                setTimeout(() => {
                  setActiveSection("moreInfo");
                }, 500);
              }}
              className={`w-full flex flex-col border border-[#efedf0] rounded-2xl
              active:animate-click-effect
                ${
                  form.start_time === formatHour
                    ? `p-4.5 bg-black text-white font-semibold
                    dark:bg-white dark:text-black`
                    : `p-5 text-sm font-medium
                  hover:bg-[#F5F3F6]
                  dark:border-[#202022] dark:hover:bg-[#101012]`
                }
              `}
            >
              {hour}
            </button>
          );
        })}
      </div>
    </div>
  );
}
