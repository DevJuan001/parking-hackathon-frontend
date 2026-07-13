import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/modules/users/services/getAllUsersService";

export function useUsers() {
  const [filters, setFilters] = useState({});

  const users = useInfiniteQuery({
    queryKey: ["users", filters],
    queryFn: ({ pageParam }) => getAllUsersService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 3 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((user) => ({
          ...user,
        })),
      ),
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  return {
    users: users.data || [],
    loading: users.isLoading,
    hasNextPage: users.hasNextPage,
    isFetchingNextPage: users.isFetchingNextPage,
    fetchNextPage: users.fetchNextPage,
    error: users.error,
    filters,
    setFilters,
    refetch: users.refetch,
  };
}
