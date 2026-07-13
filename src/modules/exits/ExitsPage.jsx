// Hooks
import { useModal } from "@hooks/useModal";
import { useExits } from "@/modules/exits/hooks/useExits";
// Constantes
import { modalTitles } from "@/modules/exits/constants/modalTitles";
// Componentes
import TopSection from "@components/ui/TopSection";
import ExitsKpis from "@/modules/exits/components/ui/ExitsKpis";
import ExitsTable from "@/modules/exits/components/ui/ExitsTable";
// Modales
import Modal from "@modals/Modal";
import CreateExitModal from "@/modules/exits/components/modals/CreateExitModal";
import FilterExitsModal from "@/modules/exits/components/modals/FilterExitsModal";

export default function ExitsPage() {
  const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();
  const { exits, loading, filters, setFilters } = useExits();

  return (
    <main className="w-full h-full overflow-hidden">
      <TopSection
        sectionName={"Salidas"}
        addButtonText={"Registrar Salida"}
        createButtonVisibility={true}
        createButtonOnClick={(e) =>
          openModal(null, "createExit", e.currentTarget)
        }
        filterButtonOnClick={(e) => openModal(null, "filter", e.currentTarget)}
        exportButtonOnClick={(e) => openModal(null, "search", e.currentTarget)}
      />

      <div
        className="h-[85%] flex flex-col gap-4
        md:h-[90%]"
      >
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
    </main>
  );
}
