// Components
import EarningsPanel from "@/modules/home/components/ui/EarningsPanel";
import RecentEntriesPanel from "@/modules/home/components/ui/RecentEntriesPanel";
import SpotsPanel from "@/modules/parking/components/ui/SpotsPanel";

export default function HomeSectionsContainer({ openModal }) {
  return (
    <section className="h-full w-full grid grid-cols-2 grid-rows-2 gap-4 animate-blur-up">
      <SpotsPanel openModal={openModal} />

      <RecentEntriesPanel />

      <EarningsPanel />
    </section>
  );
}
