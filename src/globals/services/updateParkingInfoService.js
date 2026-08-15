import { apiRoutes } from "@/config/apiRoutes";
import { getValueError } from "@utils/getValueError";
import { fetchWithAuth } from "@utils/fetchWithAuth";

export async function updateParkingInfoService(form) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.parking}/update/me`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
