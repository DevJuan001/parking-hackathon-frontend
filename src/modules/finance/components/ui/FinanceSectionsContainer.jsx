// Componentes
import BalanceKpi from "@/modules/finance/components/ui/BalanceKpi";
import IncomesKpi from "@/modules/finance/components/ui/IncomesKpi";
import ExpensesKpi from "@/modules/finance/components/ui/ExpensesKpi";
import IncomesChart from "@/modules/finance/components/ui/IncomesChart";
import HistorialSection from "@/modules/finance/components/ui/HistorialSection";

export default function FinanceSectionsContainer({
  incomes,
  filters,
  setFilters,
}) {
  return (
    <section className="w-full h-[90%]">
      {incomes && (
        <div
          className="w-full h-full grid grid-cols-1 grid-rows-[150px_150px_150px_300px] gap-3 font-dmsans
          md:grid-cols-3 md:grid-rows-5
          dark:text-[#E4E2E5]"
        >
          <BalanceKpi
            incomes={incomes?.total_revenue || 0}
            expenses={incomes?.expenses || 0}
            filters={filters}
            setFilters={setFilters}
          />

          <IncomesKpi
            incomes={incomes?.this_month_revenue || 0}
            lastMonthIncomes={incomes?.last_month_incomes || 0}
          />

          <ExpensesKpi
            expenses={incomes?.this_month_expenses || 0}
            lastMonthExpenses={incomes?.last_month_expenses || 0}
          />

          <IncomesChart />

          <HistorialSection />
        </div>
      )}
    </section>
  );
}
