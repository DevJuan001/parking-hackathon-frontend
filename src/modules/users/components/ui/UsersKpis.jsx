import { useUserStats } from "@/modules/users/hooks/useUserStats";
import Kpi from "@/globals/components/ui/Kpi";

export default function UsersKpis() {
  const { stats } = useUserStats();

  return (
    <section
      className="w-full flex flex-wrap items-center justify-center gap-2
      md:flex-nowrap md:gap-4"
    >
      <Kpi title={"Recientes"} value={stats.created_this_week ?? 0} />

      <Kpi title={"Activos"} value={stats.active ?? 0} />

      <Kpi title={"Deshabilitados"} value={stats.disabled ?? 0} />

      <Kpi title={"Total"} value={stats.total ?? 0} />
    </section>
  );
}
