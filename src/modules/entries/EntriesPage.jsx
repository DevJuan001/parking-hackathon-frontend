// Hooks
import { useModal } from "@hooks/useModal";
import { useEntries } from "@/modules/entries/hooks/useEntries";
// Constantes
import { modals } from "@/modules/entries/constants/modals";
// Componentes
import TopSection from "@components/ui/TopSection";
import EntriesKpis from "@/modules/entries/components/ui/EntriesKpis";
import EntriesTable from "@/modules/entries/components/ui/EntriesTable";
// Modales
import Modal from "@modals/Modal";
import CreateEntryModal from "@/modules/entries/components/modals/CreateEntryModal";
import FilterEntriesModal from "@/modules/entries/components/modals/FilterEntriesModal";

export default function EntriesPage() {
  const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();
  const { entries, loading, filters, setFilters } = useEntries();

  return (
    <main
      className="w-full h-full overflow-hidden
      dark:bg-black"
    >
      <TopSection
        sectionName={"Ingresos"}
        addButtonText={"Registrar Ingreso"}
        createButtonVisibility={true}
        createOnClick={(e) => openModal(null, "createEntry", e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      <div
        className="h-[85%] flex flex-col gap-4
        md:h-[90%]"
      >
        <EntriesKpis />

        <EntriesTable entries={entries} loading={loading} />
      </div>

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={modals[modalType]?.title}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modals[modalType]?.location}
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
    </main>
  );
}
