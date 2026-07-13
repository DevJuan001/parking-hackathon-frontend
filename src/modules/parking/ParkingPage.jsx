// Hooks
import { useModal } from "@hooks/useModal";
// Constants
import { modals } from "@/modules/parking/constants/modals";
// Components
import Modal from "@modals/Modal";
import ParkingSectionsContainer from "@/modules/parking/components/ui/ParkingSectionsContainer";
// Modals
import EditSpotModal from "@/modules/parking/components/modals/EditSpotModal";
import EditFloorModal from "@/modules/parking/components/modals/EditFloorModal";
import EditTariffModal from "@/modules/parking/components/modals/EditTariffModal";
import CreateSpotModal from "@/modules/parking/components/modals/CreateSpotModal";
import CreateFloorModal from "@/modules/parking/components/modals/CreateFloorModal";
import CreateTariffModal from "@/modules/parking/components/modals/CreateTariffModal";

export default function ParkingPage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } =
    useModal();

  return (
    <main
      className="w-full h-full overflow-hidden
      dark:bg-black"
    >
      <ParkingSectionsContainer openModal={openModal} />

      {modalType && (
        <Modal
          isOpen={isOpen}
          type={modalType}
          title={modals[modalType]?.title}
          onClose={closeModal}
          location="anchored"
          growDirection={modals[modalType]?.growDirection}
          triggerRef={triggerRef}
        >
          {modalType === "editSpot" && (
            <EditSpotModal onClose={closeModal} spot={modalData} />
          )}

          {modalType === "createSpot" && (
            <CreateSpotModal floor={modalData} onClose={closeModal} />
          )}

          {modalType === "editFloor" && (
            <EditFloorModal onClose={closeModal} floor={modalData} />
          )}

          {modalType === "createFloor" && (
            <CreateFloorModal onClose={closeModal} />
          )}

          {modalType === "editTariff" && (
            <EditTariffModal onClose={closeModal} tariff={modalData} />
          )}

          {modalType === "createTariff" && (
            <CreateTariffModal onClose={closeModal} />
          )}
        </Modal>
      )}
    </main>
  );
}
