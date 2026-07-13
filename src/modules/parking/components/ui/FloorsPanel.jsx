// Hooks
import { useFloors } from "@/modules/parking/hooks/useFloors";
// Components
import FloorItem from "./FloorItem";
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";
import CreateButton from "@components/ui/CreateButton";

export default function FloorsPanel({ openModal }) {
  const { floors, loading } = useFloors();
  const nofloors = floors.length === 0 && !loading;
  const isFirstLoad = floors.length === 0 && loading;

  return (
    <section
      className="h-full w-full flex flex-col px-6 py-5 rounded-[50px] border-3 border-[#EBE6E7]
      dark:text-white dark:border-[#202022]"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">Pisos</span>

        <CreateButton
          onClick={(e) => openModal(null, "createFloor", e.currentTarget)}
        />
      </div>

      <div className="h-full w-full flex flex-wrap gap-2 pt-2 overflow-y-auto">
        {nofloors && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-[#75777E]">
            <Icon name={"border_clear"} size={90} />

            <span className="text-xl font-semibold">
              Aún no hay pisos registradas
            </span>
          </div>
        )}

        {isFirstLoad ? (
          <Skeleton
            count={6}
            height="60px"
            marginBottom={0}
            shineColor="#C5C1C7"
            borderRadius={"16px"}
            backgroundColor={"#F3EEF5"}
            darkModeShineColor="#1e1e1e"
            darkModeBackgroundColor={"#101012"}
          />
        ) : (

          floors.map((floor) => (
            <FloorItem floor={floor} openModal={openModal} />
          ))
        )}
      </div>
    </section>
  );
}
