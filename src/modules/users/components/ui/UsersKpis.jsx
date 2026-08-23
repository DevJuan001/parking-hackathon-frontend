// Hooks
import Skeleton from "@/globals/components/ui/Skeleton";
import { useUserStats } from "@/modules/users/hooks/useUserStats";
// Componentes
import Kpi from "@components/ui/Kpi";
import { Fragment } from "react";

export default function UsersKpis() {
  const { stats, loading } = useUserStats();

  return (
    <section
      className="w-full flex flex-wrap items-center justify-center gap-2
      md:flex-nowrap"
    >
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            width="48%"
            height={"100px"}
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeBackgroundColor={"#101012"}
            shineColor="#C5C1C7"
            darkModeShineColor="#1e1e1e"
          />
        ))
      ) : (
        <Fragment>
          <Kpi title={"Recientes"} value={stats.created_this_week ?? 0} />

          <Kpi title={"Activos"} value={stats.active ?? 0} />

          <Kpi title={"Deshabilitados"} value={stats.disabled ?? 0} />

          <Kpi title={"Total"} value={stats.total ?? 0} />
        </Fragment>
      )}
    </section>
  );
}
