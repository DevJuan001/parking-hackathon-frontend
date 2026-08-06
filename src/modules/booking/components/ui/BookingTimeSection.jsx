// Utils
import { months } from "@utils/months";
// Componentes
import Icon from "@components/ui/Icon";

export default function BookingTimeSection({
  day,
  month,
  dayNames,
  setActiveSection,
}) {
  return (
    <div
      className="w-full h-full flex flex-col p-10 gap-2 border-l border-[#E4E2E5] animate-blur-up
      dark:border-[#202022] dark:text-[#E4E2E5]"
    >
      <button
        onClick={() => setActiveSection("calendar")}
        className="w-fit flex items-center justify-center p-3 border rounded-full
        active:animate-click-effect
        dark:border-[#202022] dark:hover:bg-[#101012]"
      >
        <Icon name={"arrow_back"} />
      </button>

      <span className="text-2xl text-nowrap font-semibold">Elige una hora</span>

      <span className="text-xl">{`${dayNames[day]}, ${day} de ${months[month]}`}</span>

      <div className="w-full flex flex-col items-center gap-2">
        <button
          className="w-full flex flex-col p-5 border border-[#E4E2E5] rounded-2xl text-sm font-medium
          active:animate-click-effect
          dark:border-[#202022] dark:hover:bg-[#101012]"
        >
          <span>1:00 a.m</span>
        </button>
      </div>
    </div>
  );
}
