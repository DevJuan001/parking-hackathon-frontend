import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { getValueError } from "@/utils/getValueError";

export async function createEntryService(entry_data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.entries}/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry_data),
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
