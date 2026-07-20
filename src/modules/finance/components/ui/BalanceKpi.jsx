export default function BalanceKpi() {
  return (
    <div
      className="flex flex-col p-5 gap-2 rounded-4xl bg-black text-[#E4E2E5]
      dark:bg-white dark:text-black"
    >
      <span className="text-lg">Balance</span>

      <div>
        <span
          className="text-5xl text-white font-medium
          dark:text-black"
        >
          $4.000
        </span>

        <span className="ml-1.5 text-xs">COP</span>
      </div>
    </div>
  );
}
