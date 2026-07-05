// Hooks
import { useModal } from "@hooks/useModal";
// Constantes
import { modalTitles } from "@/modules/exits/constants/modalTitles";
// Componentes
import ExitsKpis from "@/modules/exits/components/ui/ExitsKpis";
import ExitsTable from "@/modules/exits/components/ui/ExitsTable";
import Layout from "@components/Layout/Layout";
import TopSection from "@components/ui/TopSection";
// Modales
import Modal from "@modals/Modal";
import CreateExitModal from "@/modules/exits/components/modals/CreateExitModal";
import FilterExitsModal from "@/modules/exits/components/modals/FilterExitsModal";
import { useExits } from "@/modules/exits/hooks/useExits";

export default function ExitsPage() {
  const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();
  const { exits, loading, filters, setFilters } = useExits();

  return (
    <Layout>
      <TopSection
        sectionName={"Salidas"}
        addButtonText={"Registrar Salida"}
        createButtonVisibility={true}
        createOnClick={(e) => openModal(null, "createExit", e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      <div className="flex flex-col gap-4">
        <ExitsKpis />

        <ExitsTable exits={exits} loading={loading} />
      </div>

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={modalTitles[modalType]}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modalType === "createExit" ? "center" : "anchored"}
          growDirection="bottom-center"
        >
          {modalType === "createExit" && (
            <CreateExitModal onClose={closeModal} />
          )}

          {modalType === "filter" && (
            <FilterExitsModal
              filters={filters}
              setFilters={setFilters}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
