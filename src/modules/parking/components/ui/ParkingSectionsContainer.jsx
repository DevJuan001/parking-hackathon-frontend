// Components
import SpotsPanel from "@/modules/parking/components/ui/SpotsPanel";
import FloorsPanel from "@/modules/parking/components/ui/FloorsPanel";
import TariffsPanel from "@/modules/parking/components/ui/TariffsPanel";

export default function ParkingSectionsContainer({ openModal }) {
  return (
    <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-4 animate-blur-up">
      <SpotsPanel openModal={openModal} />

      <FloorsPanel openModal={openModal} />

      <TariffsPanel openModal={openModal} />
    </div>
  );
}
