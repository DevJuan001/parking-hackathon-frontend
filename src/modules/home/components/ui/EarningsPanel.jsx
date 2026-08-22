import RevenueChart from "@/modules/home/components/charts/RevenueChart";

export default function EarningsPanel() {
  return (
    <div
      className="h-full w-full flex flex-col px-7 py-6 gap-2 rounded-[50px] border border-[#EBE6E7] overflow-hidden
      dark:text-white dark:border-[#202022]"
    >
      <span className="font-semibold">Ganancias</span>

      <RevenueChart />
    </div>
  );
}
