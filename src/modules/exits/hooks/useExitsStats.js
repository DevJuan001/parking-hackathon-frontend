import { useQuery } from "@tanstack/react-query";
import { getExitsStatsService } from "@/modules/exits/services/getExitsStatsService";

export function useExitsStats() {
  const query = useQuery({
    queryKey: ["exitsStats"],
    queryFn: getExitsStatsService,
    refetchInterval: 20_000,
    staleTime: 60_000,
  });

  const chartStats = [
    { name: "Hoy", value: query?.data?.today_revenue, color: "#a5acfa" },
    {
      name: "Esta semana",
      value: query?.data?.this_week_revenue,
      color: "#5769ff",
    },
    {
      name: "Este mes",
      value: query?.data?.this_month_revenue,
      color: "#4f5ff1",
    },
    {name: ""}
  ];

  return {
    stats: query.data,
    chartStats,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
