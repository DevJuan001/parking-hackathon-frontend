// Hooks
import { useExitsStats } from "@/modules/exits/hooks/useExitsStats";
// Componentes
import BalanceKpi from "@/modules/finance/components/ui/BalanceKpi";
import IncomesKpi from "@/modules/finance/components/ui/IncomesKpi";
import ExpensesKpi from "@/modules/finance/components/ui/ExpensesKpi";
import IncomesChart from "@/modules/finance/components/ui/IncomesChart";
import HistorialSection from "@/modules/finance/components/ui/HistorialSection";

export default function FinanceSectionsContainer({ openModal }) {
  const { stats } = useExitsStats();

  return (
    <section
      className="w-full h-[85%] grid grid-cols-1 grid-rows-[150px_150px_150px_300px] gap-3 font-dmsans
      md:h-[90%] md:grid-cols-3 md:grid-rows-5
      dark:text-[#E4E2E5]"
    >
      <BalanceKpi incomes={stats?.total_revenue || 0} expenses={80105} />

      <IncomesKpi incomes={stats?.total_revenue || 0} />

      <ExpensesKpi expenses={4000} />

      <IncomesChart />

      <HistorialSection />
    </section>
  );
}
