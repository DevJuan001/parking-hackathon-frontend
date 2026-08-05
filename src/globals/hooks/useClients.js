import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllClientsService } from "@/globals/services/getAllClientsService";

export function useClients() {
  const [filters, setFilters] = useState({
    role_order: 3
  });

  const clients = useInfiniteQuery({
    queryKey: ["clients", filters],
    queryFn: ({ pageParam }) => getAllClientsService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 3 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((client) => ({
          ...client,
        })),
      ),
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  return {
    clients: clients.data || [],
    filters,
    setFilters,
    error: clients.error,
    loading: clients.isLoading,
    hasNextPage: clients.hasNextPage,
    fetchNextPage: clients.fetchNextPage,
  };
}
