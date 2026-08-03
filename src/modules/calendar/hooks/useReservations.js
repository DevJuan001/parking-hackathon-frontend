import { useState, useCallback } from "react";
import { getMonthRange } from "@/utils/timeUtils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllReservationsService } from "@/modules/calendar/services/getAllReservationsService";

export function useReservations(year, month) {
  const [filters, setFilters] = useState(() => getMonthRange(year, month));

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

  const fetchByMonth = useCallback(() => {
    setFilters(getMonthRange(year, month));
  }, [year, month]);

  return {
    reservations: reservations.data,
    loading: reservations.isLoading,
    error: reservations.error,
    filters,
    setFilters,
    fetchByMonth,
  };
}
