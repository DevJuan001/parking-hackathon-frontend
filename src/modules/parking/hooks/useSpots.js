import { useState } from "react";
import { useFloors } from "./useFloors";
import { useQuery } from "@tanstack/react-query";
import { getAllSpotsService } from "@/modules/parking/services/getAllSpotsService";

export function useSpots() {
  const { floors } = useFloors();
  const [filters, setFilters] = useState({
    floor_id: "",
    spot_status: "",
  });

  const effectiveFilters = {
    ...filters,
    floor_id: filters.floor_id || floors[0]?.id,
  };

  const query = useQuery({
    queryKey: ["spots", effectiveFilters],
    queryFn: () => getAllSpotsService(effectiveFilters),
    refetchInterval: 25_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 10_000,
  });

  const spots = query.data?.data ?? [];

  return {
    spots,
    loading: query.isLoading,
    error: query.error,
    filters: effectiveFilters,
    setFilters,
  };
}
