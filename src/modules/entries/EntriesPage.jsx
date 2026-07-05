// Hooks
import { useModal } from "@hooks/useModal";
// Constantes
import { modalTitles } from "@/modules/entries/constants/modalTitles";
// Componentes
import EntriesKpis from "@/modules/entries/components/ui/EntriesKpis";
import EntriesTable from "@/modules/entries/components/ui/EntriesTable";
import Layout from "@components/Layout/Layout";
import TopSection from "@components/ui/TopSection";
// Modales
import Modal from "@modals/Modal";
import CreateEntryModal from "@/modules/entries/components/modals/CreateEntryModal";
import FilterEntriesModal from "@/modules/entries/components/modals/FilterEntriesModal";
import { useEntries } from "@/modules/entries/hooks/useEntries";

export default function EntriesPage() {
  const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();
  const { entries, loading, filters, setFilters } = useEntries();

  return (
    <Layout>
      <TopSection
        sectionName={"Ingresos"}
        addButtonText={"Registrar Ingreso"}
        createButtonVisibility={true}
        createOnClick={(e) => openModal(null, "createEntry", e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      <div className="flex flex-col gap-4">
        <EntriesKpis />

        <EntriesTable entries={entries} loading={loading} />
      </div>

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={modalTitles[modalType]}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modalType === "createEntry" ? "center" : "anchored"}
          growDirection="bottom-center"
        >
          {modalType === "createEntry" && (
            <CreateEntryModal onClose={closeModal} />
          )}

          {modalType === "filter" && (
            <FilterEntriesModal
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
