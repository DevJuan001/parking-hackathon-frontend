import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/modules/users/services/getAllUsersService";

export function useUsers() {
  const [filters, setFilters] = useState({});

  const query = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getAllUsersService(filters),
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  const users = query.data?.data ?? [];

  return {
    users,
    loading: query.isLoading,
    error: query.error,
    filters,
    setFilters,
    refetch: query.refetch,
  };
}
