// Components
import SpotsPanel from "@/modules/parking/components/ui/SpotsPanel";
import FloorsPanel from "@/modules/parking/components/ui/FloorsPanel";
import TariffsPanel from "@/modules/parking/components/ui/TariffsPanel";

export default function ParkingSectionsContainer({ openModal }) {
  return (
    <div
      className="h-full w-full grid grid-cols-1 grid-rows-[repeat(3,315px)] gap-4 overflow-y-auto animate-blur-up
      md:grid-cols-2 md:grid-rows-2"
    >
      <SpotsPanel openModal={openModal} />

      <FloorsPanel openModal={openModal} />

      <TariffsPanel openModal={openModal} />
    </div>
  );
}
