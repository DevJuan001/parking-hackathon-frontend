export default function IncomesKpi({ incomes, lastMonthIncomes }) {
  const incomesPercentage = Math.round(
    ((incomes - lastMonthIncomes) / incomes) * 100,
  );

  return (
    <div
      className="flex flex-col gap-2 px-5 py-4 rounded-4xl border border-[#E4E2E5]
      dark:border-[#17171a]"
    >
      <span className="text-lg">Ingresos</span>

      <div>
        <span className="text-5xl font-medium">${incomes || 0}</span>

        <span className="ml-1.5">COP</span>
      </div>

      <span>
        {`${incomesPercentage > 0 ? `${incomesPercentage}% más` : `${incomesPercentage}% menos`}`}{" "}
        que el mes pasado
      </span>
    </div>
  );
}
