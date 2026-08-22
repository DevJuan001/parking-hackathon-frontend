// Hooks
import { useRecentEntries } from "@/modules/home/hooks/useRecentEntries";
// Componentes
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";
import RecentEntriesList from "@/modules/home/components/ui/RecentEntriesListItem";

export default function RecentEntriesPanel() {
  const { entries, loading } = useRecentEntries();
  const noEntries = entries.length === 0 && !loading;
  const isFirstLoad = entries.length === 0 && loading;

  return (
    <section
      className="h-full w-full flex flex-col px-7 py-6 gap-2 rounded-[50px] border border-[#EBE6E7]
      dark:text-white dark:border-[#202022]"
    >
      <span className="font-semibold">Entradas recientes</span>

      <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
        {noEntries && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-[#75777E]">
            <Icon name={"border_clear"} size={90} />

            <span className="text-center text-xl font-semibold">
              Aún no hay entradas registradas
            </span>
          </div>
        )}

        {isFirstLoad && (
          <Skeleton
            count={5}
            width="100%"
            height="100%"
            marginBottom={0}
            shineColor="#C5C1C7"
            borderRadius={"16px"}
            backgroundColor={"#F3EEF5"}
            darkModeShineColor="#1e1e1e"
            darkModeBackgroundColor={"#101012"}
          />
        )}

        {!noEntries && !isFirstLoad && (
          <ul className="w-full h-full flex flex-col gap-2">
            {entries.map((entry) => (
              <RecentEntriesList key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
