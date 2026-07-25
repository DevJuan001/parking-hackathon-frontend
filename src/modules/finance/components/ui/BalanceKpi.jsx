// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import Calendar from "@components/ui/Calendar";

export default function BalanceKpi({ incomes, expenses }) {
  const balancePercentage = Math.round(((incomes - expenses) / incomes) * 100);
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div
      className="relative flex flex-col p-5 gap-2 rounded-4xl bg-black text-[#E4E2E5]
      dark:bg-white dark:text-black"
    >
      <span className="text-lg">Balance</span>

      <div>
        <span
          className="text-5xl text-white font-medium
          dark:text-black"
        >
          ${incomes - expenses}
        </span>

        <span className="ml-1.5">COP</span>
      </div>

      <div className="flex items-center">
        <Icon
          name={balancePercentage ? "arrow_upward_alt" : "arrow_downward_alt"}
          weight={500}
        />

        <span>{balancePercentage}% rentabilidad</span>
      </div>

      <button
        onClick={(e) => openInnerModal("calendar", e)}
        className="absolute right-3.5 bottom-3.5 w-12 h-12 flex items-center justify-center rounded-4xl bg-white
        hover:bg-white/90
        active:animate-click-effect"
      >
        <Icon
          name={"calendar_month"}
          className={`text-black
          dark:text-white`}
          weight={600}
        />
      </button>

      {innerType === "calendar" && (
        <Calendar
          growDirection={"anchored"}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        />
      )}
    </div>
  );
}
