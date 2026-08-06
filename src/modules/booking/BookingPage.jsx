// Hooks
import { useModal } from "@hooks/useModal";
// Constantes
import { modals } from "@/modules/booking/constants/modals";
// Componentes
import BookingCard from "@/modules/booking/components/ui/BookingCard";

// Modales
import LoginModal from "@modals/LoginModal";
import Modal from "@components/modals/Modal";

export default function BookingPage() {
  const { isOpen, triggerRef, modalType, modalData, openModal, closeModal } =
    useModal();

  return (
    <section className="w-full h-full flex items-center justify-center font-dmsans">
      <BookingCard openModal={openModal} />

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
        </Modal>
      )}
    </section>
  );
}
