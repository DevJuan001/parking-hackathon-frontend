import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getParkingInfoService() {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.parking}/me/private-info`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error al intentar obtener laas reservas");
  }

  const data = await response.json();

  return data.data;
}
