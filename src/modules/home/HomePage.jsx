// Hooks
import { useModal } from "@hooks/useModal";
// Constantes
// Components
import HomeSectionsContainer from "@/modules/home/components/ui/HomeSectionsContainer";
// Modales
import Modal from "@modals/Modal";
import EditSpotModal from "@/modules/parking/components/modals/EditSpotModal";
import CreateSpotModal from "@/modules/parking/components/modals/CreateSpotModal";
import { modals } from "./constants/modals";

export default function HomePage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } =
    useModal();

  return (
    <main className="w-full h-full overflow-hidden">
      <HomeSectionsContainer openModal={openModal} />

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={modals[modalType]?.title}
          type={modalType}
          onClose={closeModal}
          location="anchored"
          growDirection="center"
          triggerRef={triggerRef}
        >
          {modalType === "editSpot" && (
            <EditSpotModal onClose={closeModal} spot={modalData} />
          )}

          {modalType === "createSpot" && (
            <CreateSpotModal floor={modalData} onClose={closeModal} />
          )}
        </Modal>
      )}
    </main>
  );
}
