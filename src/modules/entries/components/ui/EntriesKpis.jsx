import { useEntriesStats } from "@/modules/entries/hooks/useEntriesStats";
import Kpi from "@/globals/components/ui/Kpi";

export default function EntriesKpis() {
  const { stats } = useEntriesStats();

  return (
    <section
      className="w-full flex flex-wrap items-center gap-2
      md:gap-4 md:flex-nowrap"
    >
      <Kpi title={"Hoy"} value={stats.today ?? 0} />

      <Kpi title={"Esta semana"} value={stats.this_week ?? 0} />

      <Kpi title={"Este mes"} value={stats.this_month ?? 0} />

      <Kpi title={"Total"} value={stats.total ?? 0} />
    </section>
  );
}
