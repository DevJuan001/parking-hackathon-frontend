import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllReservationsService } from "../services/getAllReservationsService";

export function useReservations() {
  const [filters, setFilters] = useState({});

  const reservations = useInfiniteQuery({
    queryKey: ["reservations", filters],
    queryFn: ({ pageParam }) =>
      getAllReservationsService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 3 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((user) => ({
          ...user,
        })),
      ),
    staleTime: 1000 * 60 * 60,
  });

  return {
    reservations: reservations.data,
    loading: reservations.isLoading,
    error: reservations.error,
    filters,
    setFilters,
  };
}
