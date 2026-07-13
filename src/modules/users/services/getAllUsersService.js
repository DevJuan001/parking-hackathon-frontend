import { apiRoutes } from "@/config/apiRoutes";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getAllUsersService({ pageParam = 1, filters = {} }) {
  const params = buildQueryParams({ ...filters, page: pageParam });

  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/?${params}`,
    { method: "GET" },
  );

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  const data = await response.json();

  return data.data;
}
