import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getIncomesChartData(period) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.payments}/growth/${period}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  const data = await response.json();

  return data.data;
}
