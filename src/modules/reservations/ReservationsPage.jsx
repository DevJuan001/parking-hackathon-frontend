// Hooks
import { useModal } from "@hooks/useModal";
// Constantes
import { modals } from "@/modules/reservations/constants/modals";
// Modales
import LoginModal from "@modals/LoginModal";
import Modal from "@components/modals/Modal";
import HowItWorks from "@/modules/reservations/components/modals/HowItWorksModal";
import ReservationCard from "@/modules/reservations/components/ui/ReservationCard";

export default function ReservationPage() {
  const { isOpen, triggerRef, modalType, modalData, openModal, closeModal } =
    useModal();

  return (
    <section className="w-full h-dvh flex items-center justify-center p-12 font-dmsans">
      <ReservationCard openModal={openModal} />

      {modalType && (
        <Modal
          isOpen={isOpen}
          type={modalType}
          triggerRef={triggerRef}
          margin={modals[modalType]?.margin}
          location={modals[modalType]?.location}
          disableHeader={modals[modalType]?.disableHeader}
          growDirection={modals[modalType]?.growDirection}
          onClose={closeModal}
        >
          {modalType === "logIn" && <LoginModal />}

          {modalType === "howItWorks" && <HowItWorks />}
        </Modal>
      )}
    </section>
  );
}
