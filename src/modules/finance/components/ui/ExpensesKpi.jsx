export default function ExpensesKpi({ expenses, lastMonthExpenses }) {
  const expensesPercentage = Math.round(
    ((expenses - lastMonthExpenses) / expenses) * 100,
  );

  return (
    <div
      className="flex flex-col gap-2 px-5 py-4 rounded-4xl border border-[#E4E2E5]
      dark:border-[#17171a]"
    >
      <span className="text-lg">Gastos</span>

      <div>
        <span className="text-5xl font-medium">${expenses}</span>

        <span className="ml-1.5">COP</span>
      </div>

      <span>
        {expensesPercentage > 0
          ? `${expensesPercentage}% más`
          : `${expensesPercentage || 0}% menos`}{" "}
        que el mes pasado
      </span>
    </div>
  );
}
