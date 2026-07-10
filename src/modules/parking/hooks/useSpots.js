import { useState } from "react";
import { useFloors } from "./useFloors";
import { useInfiniteQuery } from "@tanstack/react-query";
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

  const spots = useInfiniteQuery({
    queryKey: ["spots", effectiveFilters],
    queryFn: ({ pageParam }) =>
      getAllSpotsService({ pageParam, effectiveFilters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((spot) => ({
          ...spot,
        })),
      ),
    refetchInterval: 25_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 10_000,
  });

  console.log(spots);

  return {
    spots: spots.data,
    fetchNextPage: spots.fetchNextPage,
    hasNextPage: spots.hasNextPage,
    isFetchingNextPage: spots.isFetchingNextPage,
    loading: spots.isLoading,
    error: spots.error,
    filters: effectiveFilters,
    setFilters,
  };
}
