// Hooks
import { useState } from "react";
import { useModal } from "@hooks/useModal";
import { useCreateReservation } from "@/modules/booking/hooks/useCreateReservation";
// Constantes
import { modals } from "@/modules/booking/constants/modals";
// Componentes
import BookingCard from "@/modules/booking/components/ui/BookingCard";
import SuccessReservation from "@/modules/booking/components/ui/SuccessReservation";
// Modales
import LoginModal from "@modals/LoginModal";
import Modal from "@components/modals/Modal";
import { useParkingInfo } from "./hooks/useParkingInfo";

export default function BookingPage() {
  const { isOpen, triggerRef, modalType, openModal, closeModal } = useModal();
  const [activeSection, setActiveSection] = useState("card");
  const {
    form,
    parkingId,
    loading,
    error,
    setForm,
    handleChange,
    handleSubmit,
    fieldError,
  } = useCreateReservation(setActiveSection);
  const { parkingInfo } = useParkingInfo(parkingId);

  return (
    <section
      className="w-screen h-screen flex items-center justify-center font-dmsans
      md:p-10"
    >
      {activeSection === "card" && (
        <BookingCard
          form={form}
          error={error}
          loading={loading}
          setForm={setForm}
          openModal={openModal}
          fieldError={fieldError}
          parkingInfo={parkingInfo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      {activeSection === "success" && (
        <SuccessReservation
          form={form}
          setForm={setForm}
          setActiveSection={setActiveSection}
        />
      )}

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
