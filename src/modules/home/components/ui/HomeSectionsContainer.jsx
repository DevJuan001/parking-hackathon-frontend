// Components
import EarningsPanel from "@/modules/home/components/ui/EarningsPanel";
import RecentEntriesPanel from "@/modules/home/components/ui/RecentEntriesPanel";
import SpotsPanel from "@/modules/parking/components/ui/SpotsPanel";

export default function HomeSectionsContainer({ openModal }) {
  return (
    <section
      className="h-full w-full grid grid-cols-1 grid-rows-[repeat(3,315px)] gap-4 overflow-y-auto animate-blur-up
      md:grid-cols-2 md:grid-rows-2"
    >
      <SpotsPanel openModal={openModal} />

      <RecentEntriesPanel />

      <EarningsPanel />
    </section>
  );
}
