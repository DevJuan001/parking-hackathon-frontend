// Hooks
import { useModal } from "@hooks/useModal";
// Constantes
import { modals } from "./constants/modals";
// Components
import HomeSectionsContainer from "@/modules/home/components/ui/HomeSectionsContainer";
// Modales
import Modal from "@modals/Modal";
import EditSpotModal from "@/modules/parking/components/modals/EditSpotModal";
import CreateSpotModal from "@/modules/parking/components/modals/CreateSpotModal";

export default function HomePage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } =
    useModal();

  return (
    <main className="w-full h-full pb-4 overflow-hidden">
      <HomeSectionsContainer openModal={openModal} />

      {modalType && (
        <Modal
          isOpen={isOpen}
          type={modalType}
          location="anchored"
          onClose={closeModal}
          growDirection="center"
          triggerRef={triggerRef}
          title={modals[modalType]?.title}
          styles={modals[modalType]?.styles}
          margin={modals[modalType]?.margin ?? 0}
          disableHeader={modals[modalType]?.disableHeader}
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
