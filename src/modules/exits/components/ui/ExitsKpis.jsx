// Hooks
import { useExitsStats } from "@/modules/exits/hooks/useExitsStats";
// Componentes
import Kpi from "@components/ui/Kpi";
import Skeleton from "@components/ui/Skeleton";

export default function ExitsKpis() {
  const { stats, loading } = useExitsStats();

  return (
    <section>
      {loading ? (
        <div
          className="w-full flex flex-wrap items-center justify-center gap-2
          md:flex-nowrap md:gap-4"
        >
          <Skeleton
            width="48%"
            height={"92px"}
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeBackgroundColor={"#101012"}
            shineColor="#C5C1C7"
            darkModeShineColor="#1e1e1e"
          />

          <Skeleton
            width="48%"
            height={"92px"}
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeBackgroundColor={"#101012"}
            shineColor="#C5C1C7"
            darkModeShineColor="#1e1e1e"
          />

          <Skeleton
            width="48%"
            height={"92px"}
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeBackgroundColor={"#101012"}
            shineColor="#C5C1C7"
            darkModeShineColor="#1e1e1e"
          />

          <Skeleton
            width="48%"
            height={"92px"}
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeBackgroundColor={"#101012"}
            shineColor="#C5C1C7"
            darkModeShineColor="#1e1e1e"
          />
        </div>
      ) : (
        <div
          className="w-full flex flex-wrap items-center justify-center gap-2
          md:flex-nowrap md:gap-4"
        >
          <Kpi
            title={"Ganancia de hoy"}
            value={`$${stats.today_revenue ?? 0}`}
          />

          <Kpi title={"Hoy"} value={stats.today_exits ?? 0} />

          <Kpi
            title={"Este mes"}
            value={stats.this_month_exits ?? 0}
          />

          <Kpi title={"Total"} value={stats.total_exits ?? 0} />
        </div>
      )}
    </section>
  );
}
