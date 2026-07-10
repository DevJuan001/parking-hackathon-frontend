// Hooks
import { useSpots } from "@/modules/parking/hooks/useSpots";
import { useFloors } from "@/modules/parking/hooks/useFloors";
import { useInfiniteScroll } from "@/globals/hooks/useInfiniteScroll";
import { useFilterSpots } from "@/modules/parking/hooks/useFilterSpots";
// Constants
import { vehicleTypesConstant } from "@/globals/constants/vehicleTypes";
// Components
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";
import SpotItem from "@/modules/parking/components/ui/SpotItem";
// Modales
import SelectMenu from "@modals/SelectMenu";
import CreateButton from "@components/ui/CreateButton";

export default function SpotsPanel({ openModal }) {
  const { floors } = useFloors();
  const {
    spots,
    loading,
    hasNextPage,
    isFetchingNextPage,
    filters,
    fetchNextPage,
    setFilters,
  } = useSpots();
  const { handleChange } = useFilterSpots(filters, setFilters);
  const { getItemRef } = useInfiniteScroll({
    items: spots,
    hasNextPage,
    fetchNextPage,
  });
  const noSpots = spots?.length === 0 && !loading;
  const isFirstLoad = spots?.length === 0 && loading;

  return (
    <section
      className="h-full w-full px-6.5 py-6 flex flex-col gap-1 col-span-1 row-span-2 border-3 border-[#EBE6E7] rounded-[50px]
      dark:text-white dark:border-[#202022]"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">Plazas</span>

        <SelectMenu
          id={"floors-menu"}
          name={"floor_id"}
          value={filters.floor_id}
          onChange={handleChange}
          miniVersion={true}
          options={floors.map((floor) => ({
            value: floor.id,
            label: floor.name,
          }))}
        />
      </div>

      {noSpots && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <Icon
            name={"border_clear"}
            size={90}
            className={"text-[#75777E] dark:text-[#7E8088]"}
          />

          <span
            className="text-xl font-semibold text-[#75777E]
            dark:text-[#7E8088]"
          >
            Aún no hay plazas registradas
          </span>

          <CreateButton
            onClick={(e) =>
              openModal(filters.floor_id, "createSpot", e.currentTarget)
            }
          />
        </div>
      )}

      {isFirstLoad ? (
        <Skeleton
          height="95%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"16px"}
        />
      ) : (
        !noSpots && (
          <div
            className="h-full w-full grid grid-cols-8 auto-rows-[100px] pt-2 p-0.5 gap-2 scrollbar-thumb-[#E4E2E5] overflow-hidden overflow-y-auto
            md:grid-cols-4
            lg:grid-cols-6 lg:gap-x-2 lg:gap-y-4
            2xl:grid-cols-8 2xl:gap-2.5"
          >
            {spots?.map((spot, index) => (
              <SpotItem
                ref={getItemRef(index)}
                key={spot.spot_id}
                name={spot.spot}
                status={spot.spot_status}
                icon={vehicleTypesConstant[spot.vehicle_type_id]?.icon}
                onClick={(e) => openModal(spot, "editSpot", e.currentTarget)}
              />
            ))}

            {isFetchingNextPage && (
              <Skeleton count={2} width="100%" height={"100%"} />
            )}

            <button
              onClick={(e) =>
                openModal(filters.floor_id, "createSpot", e.currentTarget)
              }
              className="h-full w-full flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-[#E4E2E5] transition-colors 
              hover:bg-[#efedf0] hover:cursor-pointer
              dark:hover:bg-[#5f585815] dark:border-3 dark:border-[#202022]"
            >
              <Icon name={"add"} size={35} />
            </button>
          </div>
        )
      )}
    </section>
  );
}
