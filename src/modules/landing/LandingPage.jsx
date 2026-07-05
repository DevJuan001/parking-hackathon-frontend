// Hooks
import { useModal } from "@hooks/useModal";
// Componentes
import Hero from "@/modules/landing/components/ui/Hero";
import NavBar from "@/modules/landing/components/ui/Navbar";
import Footer from "@/modules/landing/components/ui/Footer";
import Pricing from "@/modules/landing/components/ui/Pricing";
import Features from "@/modules/landing/components/ui/Features";
import Questions from "@/modules/landing/components/ui/Questions";
import CTASection from "@/modules/landing/components/ui/CTASection";
import VideoSection from "@/modules/landing/components/ui/VideoSection";
// Modales
import LoginModal from "@/modules/landing/components/modals/LoginModal";
import Modal from "@modals/Modal";
import RegisterModal from "@/modules/landing/components/modals/RegisterModal";

export default function LandingPage() {
  const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();

  return (
    <div className="relative mt-5 flex flex-col items-center font-dmsans">
      <NavBar openModal={openModal} />

      <Hero openModal={openModal} />

      <VideoSection />

      <Features />

      <Pricing openModal={openModal} />

      <Questions />

      <CTASection openModal={openModal} />

      <Footer />

      {modalType && (
        <Modal
          isOpen={isOpen}
          type={modalType}
          triggerRef={triggerRef}
          location="center"
          onClose={closeModal}
        >
          {modalType === "logIn" && <LoginModal />}

          {modalType === "register" && <RegisterModal />}
        </Modal>
      )}
    </div>
  );
}
