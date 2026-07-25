export default function ExpensesKpi({ expenses }) {
  return (
    <div
      className="flex flex-col gap-2 p-5 rounded-4xl border border-[#E4E2E5]
      dark:border-[#17171a]"
    >
      <span className="text-lg">Gastos</span>

      <div>
        <span className="text-5xl font-medium">${expenses}</span>

        <span className="ml-1.5">COP</span>
      </div>
    </div>
  );
}
