import { apiRoutes } from "@/config/apiRoutes";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getAllSpotsService({
  pageParam = 1,
  effectiveFilters = {},
}) {
  const params = buildQueryParams({ ...effectiveFilters, page: pageParam });

  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.spots}/?${params}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error al intentar obtener las plazas");
  }

  const data = await response.json();

  return data.data;
}
