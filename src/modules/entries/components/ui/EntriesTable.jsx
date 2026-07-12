// Hooks
import { useInfiniteScroll } from "@/globals/hooks/useInfiniteScroll";
// Constants
import { vehicleTypesConstant } from "@/globals/constants/vehicleTypes";
// Utils
// Componentes
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";
import { formatDateTime, formatTimeDate } from "@/utils/formatDateTime";

export default function EntriesTable({
  entries,
  loading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) {
  const noEntries = entries?.length === 0 && !loading;
  const isFirstLoad = entries?.length === 0 && loading;
  const { getItemRef } = useInfiniteScroll({
    items: entries,
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div
      className={`${noEntries || isFirstLoad ? "h-full" : "h-auto border"} w-full border border-[#E4E2E5] rounded-3xl overflow-y-auto overflow-x-auto
      dark:border-[#17171a] dark:text-[#E4E2E5]`}
    >
      {noEntries && (
        <div
          className="h-full flex flex-col items-center justify-center gap-1 rounded-2xl text-[#7E8088] bg-[#f5f3f6]
          dark:text-[#E4E2E5]"
        >
          <Icon name={"border_clear"} size={64} />

          <span className="text-2xl font-medium text-center">
            No se encontraron ingresos
          </span>
        </div>
      )}

      {isFirstLoad ? (
        <Skeleton
          width="100%"
          height="100%"
          borderRadius={"15px"}
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
        />
      ) : (
        !noEntries && (
          <table className="h-full w-full">
            <thead
              className="sticky top-0 z-10 h-10 border-b border-[#E4E2E5] bg-[#FBF9FC]
              dark:bg-[#000000] dark:border-[#17171a]"
            >
              <tr
                className="text-[#75777E] text-sm text-nowrap text-start
                dark:text-[#7E8088]"
              >
                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"emoji_transportation"} size={18} fill />

                    <span>Placa</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"traffic_jam"} size={18} fill />

                    <span>Tipo de vehículo</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"pin_drop"} size={18} fill />

                    <span>Plaza</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"nest_clock_farsight_analog"} size={18} />

                    <span>Hora de ingreso</span>
                  </div>
                </th>

                <th className="font-medium px-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"calendar_today"} size={18} fill />

                    <span>Fecha de ingreso</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {entries?.map((entry, index) => (
                <tr
                  key={entry.id}
                  ref={getItemRef(index)}
                  className="h-12 transition-colors 
                  hover:bg-[#f5f3f6]
                  dark:hover:bg-[#101012]"
                >
                  <th className="font-medium text-sm pl-4 text-start">
                    {entry.plate}
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    <div className="flex gap-1">
                      <Icon
                        name={vehicleTypesConstant[entry.vehicle_type].icon}
                        size={18}
                        fill
                      />

                      <span>
                        {vehicleTypesConstant[entry.vehicle_type].text}
                      </span>
                    </div>
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    {entry.spot}
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    {formatTimeDate(entry.created_at)}
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    {formatDateTime(entry.created_at)}
                  </th>
                </tr>
              ))}

              {isFetchingNextPage && (
                <tr>
                  <th colSpan={5}>
                    <Skeleton
                      width="100%"
                      height="56px"
                      backgroundColor={"#F3EEF5"}
                      darkModeBackgroundColor={"#101012"}
                      shineColor="#C5C1C7"
                      darkModeShineColor="#1e1e1e"
                    />
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}
