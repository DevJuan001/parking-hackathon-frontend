import { useQuery } from "@tanstack/react-query";
import { getParkingInfoService } from "@/modules/booking/services/getParkingInfoService";

export function useParkingInfo(parking_id) {
  const parkingInfo = useQuery({
    queryKey: ["parkingInfo"],
    queryFn: () => getParkingInfoService(parking_id),
    staleTime: 60 * 1000 * 60,
  });

  return {
    parkingInfo: parkingInfo.data,
    loading: parkingInfo.isLoading,
    error: parkingInfo.error,
  };
}
