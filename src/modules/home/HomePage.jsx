// Hooks
import { useModal } from "@hooks/useModal";
// Components
import Layout from "@components/Layout/Layout";
import HomeSectionsContainer from "@/modules/home/components/ui/HomeSectionsContainer";
import Modal from "@modals/Modal";
import EditSpotModal from "@/modules/parking/components/modals/EditSpotModal";
import CreateSpotModal from "@/modules/parking/components/modals/CreateSpotModal";

export default function HomePage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } =
    useModal();

  return (
    <Layout avatarOnClick={(e) => openModal(null, "avatar", e.currentTarget)}>
      <HomeSectionsContainer openModal={openModal} />

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={
            modalType === "editSpot"
              ? "Editar Plaza"
              : modalType === "createSpot"
                ? "Agregar Plaza"
                : ""
          }
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
    </Layout>
  );
}
