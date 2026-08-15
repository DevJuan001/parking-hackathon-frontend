import { useQuery } from "@tanstack/react-query";
import { getParkingInfoService } from "@services/getParkingInfoService";

export function useParkingInfo() {
  const parkingInfo = useQuery({
    queryKey: ["parkingInfo"],
    queryFn: () => getParkingInfoService(),
    staleTime: 60 * 1000 * 60,
  });

  return {
    parkingInfo: parkingInfo.data,
    parkingInfoLoading: parkingInfo.isLoading,
    error: parkingInfo.error,
  };
}
