// Componentes
import BalanceKpi from "@/modules/finance/components/ui/BalanceKpi";
import IncomesKpi from "@/modules/finance/components/ui/IncomesKpi";
import ExpensesKpi from "@/modules/finance/components/ui/ExpensesKpi";
import IncomesChart from "@/modules/finance/components/ui/IncomesChart";
import HistorialSection from "@/modules/finance/components/ui/HistorialSection";

export default function FinanceSectionsContainer() {
  return (
    <section
      className="w-full h-[90%] grid grid-cols-3 grid-rows-5 gap-3 font-dmsans
      dark:text-[#E4E2E5]"
    >
      <BalanceKpi />

      <IncomesKpi />

      <ExpensesKpi />

      <IncomesChart />

      <HistorialSection />
    </section>
  );
}
