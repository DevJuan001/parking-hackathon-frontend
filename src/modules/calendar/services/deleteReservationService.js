import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { getValueError } from "@/utils/getValueError";

export async function deleteReservationService(reservation_id) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reservations}/delete/${reservation_id}`,
    {
      method: "DELETE",
    },
  );

  const json = await response.json();

  const error = getValueError(json, response.status);

  if (!response.ok) {
    return {
      error: error || json.detail || "Error en la petición",
      data: null,
    };
  }

  return json;
}
