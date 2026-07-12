import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllEntriesService } from "@/modules/entries/services/getAllEntriesService";

export function useEntries() {
  const [filters, setFilters] = useState({});

  const entries = useInfiniteQuery({
    queryKey: ["entries", filters],
    queryFn: ({ pageParam }) => getAllEntriesService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 15 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((entry) => ({
          ...entry,
        })),
      ),
    refetchInterval: 25_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  return {
    entries: entries.data || [],
    hasNextPage: entries.hasNextPage,
    isFetchingNextPage: entries.isFetchingNextPage,
    fetchNextPage: entries.fetchNextPage,
    loading: entries.isLoading,
    error: entries.error,
    filters,
    setFilters,
  };
}
