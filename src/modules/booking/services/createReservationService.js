import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@utils/fetchWithAuth";
import { getValueError } from "@utils/getValueError";

export async function createReservationService(form) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reservations}/create-self`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
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
