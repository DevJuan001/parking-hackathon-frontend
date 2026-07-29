import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { buildQueryParams } from "@/utils/buildQueryParams";

export async function getAllReservationsService(filters) {
  const params = buildQueryParams(filters);

  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reservations}/?${params}`,
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
