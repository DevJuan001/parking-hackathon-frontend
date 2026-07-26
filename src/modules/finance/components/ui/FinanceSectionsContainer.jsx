// Hooks
import { useExitsStats } from "@/modules/exits/hooks/useExitsStats";
// Componentes
import BalanceKpi from "@/modules/finance/components/ui/BalanceKpi";
import IncomesKpi from "@/modules/finance/components/ui/IncomesKpi";
import ExpensesKpi from "@/modules/finance/components/ui/ExpensesKpi";
import IncomesChart from "@/modules/finance/components/ui/IncomesChart";
import FinanceLoading from "@/modules/finance/components/ui/FinanceLoading";
import HistorialSection from "@/modules/finance/components/ui/HistorialSection";

export default function FinanceSectionsContainer() {
  const { stats, loading } = useExitsStats();

  return (
    <section className="w-full h-[90%]">
      {loading && <FinanceLoading />}

      {stats && (
        <div
          className="w-full h-full grid grid-cols-1 grid-rows-[150px_150px_150px_300px] gap-3 font-dmsans
          md:grid-cols-3 md:grid-rows-5
          dark:text-[#E4E2E5]"
        >
          <BalanceKpi
            incomes={stats?.total_revenue || 0}
            expenses={stats?.expenses || 0}
          />

          <IncomesKpi
            incomes={stats?.total_revenue || 0}
            lastMonthIncomes={stats?.last_month_incomes || 0}
          />

          <ExpensesKpi
            expenses={stats?.expenses || 0}
            lastMonthExpenses={stats?.last_month_expenses || 0}
          />

          <IncomesChart />

          <HistorialSection expenses={stats?.expenses || 0} />
        </div>
      )}
    </section>
  );
}
