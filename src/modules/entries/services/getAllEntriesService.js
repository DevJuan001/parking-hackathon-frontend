import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { buildQueryParams } from "@/utils/buildQueryParams";

export async function getAllEntriesService({ pageParam = 1, filters = {} }) {
  const params = buildQueryParams({ ...filters, page: pageParam });

  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.entries}/?${params}`,
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
