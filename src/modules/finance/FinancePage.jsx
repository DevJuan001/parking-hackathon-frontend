// Hooks
import { useModal } from "@hooks/useModal";
import { useExitsStats } from "@/modules/exits/hooks/useExitsStats";
// Constantes
import { modals } from "@/modules/finance/constants/modals";
// Componentes
import TopSection from "@components/ui/TopSection";
import FinanceLoading from "@/modules/finance/components/ui/FinanceLoading";
import FinanceSectionsContainer from "@/modules/finance/components/ui/FinanceSectionsContainer";
// Modales
import Modal from "@modals/Modal";
import ExportModal from "@modals/ExportModal";
import FilterFinanceModal from "@/modules/finance/components/modals/FilterFinanceModal";

export default function FinancePage() {
  const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();
  const { stats, loading, filters, setFilters } = useExitsStats();

  return (
    <main className="w-full h-full overflow-hidden overflow-y-auto">
      <TopSection
        sectionName={"Finanzas"}
        exportButtonOnClick={(e) => openModal(null, "export", e.currentTarget)}
        filterButtonOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      {loading ? (
        <FinanceLoading inside />
      ) : (
        <FinanceSectionsContainer
          incomes={stats}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      {modalType && (
        <Modal
          isOpen={isOpen}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          title={modals[modalType]?.title}
          styles={modals[modalType]?.styles}
          location={modals[modalType]?.location}
          margin={modals[modalType]?.margin ?? 5}
          disableHeader={modals[modalType]?.disableHeader}
          growDirection={modals[modalType]?.growDirection}
        >
          {modalType === "export" && <ExportModal />}

          {modalType === "filter" && (
            <FilterFinanceModal onClose={closeModal} />
          )}
        </Modal>
      )}
    </main>
  );
}
