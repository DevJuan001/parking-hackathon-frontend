import { apiRoutes } from "@/config/apiRoutes";

export async function getParkingInfoService(parking_id) {
  const response = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.parking}/${parking_id}`,
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
