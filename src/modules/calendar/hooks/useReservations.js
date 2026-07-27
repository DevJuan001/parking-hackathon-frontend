import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllReservationsService } from "../services/getAllReservationsService";

export function useReservations() {
  const [filters, setFilters] = useState({});

  const reservations = useQuery({
    queryKey: ["reservations", filters],
    queryFn: () => getAllReservationsService(filters),
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
