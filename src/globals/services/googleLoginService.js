import { apiRoutes } from "@/config/apiRoutes";
import { getValueError } from "@/utils/getValueError";

export async function googleLoginService(code) {
  const response = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.auth}/google-login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
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
