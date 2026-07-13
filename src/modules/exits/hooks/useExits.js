import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllExitsService } from "@/modules/exits/services/getAllExitsService";

export function useExits() {
  const [filters, setFilters] = useState({});

  const exits = useInfiniteQuery({
    queryKey: ["exits", filters],
    queryFn: ({ pageParam }) => getAllExitsService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 15 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((user) => ({
          ...user,
        })),
      ),
    refetchInterval: 25_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  return {
    exits: exits.data || [],
    isFetchingNextPage: exits.isFetchingNextPage,
    hasNextPage: exits.hasNextPage,
    fetchNextPage: exits.fetchNextPage,
    loading: exits.isLoading,
    error: exits.error,
    filters,
    setFilters,
  };
}
