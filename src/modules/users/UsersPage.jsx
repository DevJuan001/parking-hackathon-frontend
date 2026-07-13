// Hooks
import { useModal } from "@hooks/useModal";
import { useUsers } from "@/modules/users/hooks/useUsers";
// Constantes
import { modals } from "@/modules/users/constants/modals";
// Componentes
import TopSection from "@components/ui/TopSection";
import UsersKpis from "@/modules/users/components/ui/UsersKpis";
import UsersTable from "@/modules/users/components/ui/UsersTable";
// Modales
import Modal from "@modals/Modal";
import EditUserModal from "@/modules/users/components/modals/EditUserModal";
import CreateUserModal from "@/modules/users/components/modals/CreateUserModal";
import EnableUserModal from "@/modules/users/components/modals/EnableUserModal";
import DisableUserModal from "@/modules/users/components/modals/DisableUserModal";
import FilterUsersModal from "@/modules/users/components/modals/FilterUsersModal";

export default function UsersPage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } =
    useModal();
  const {
    users,
    loading,
    filters,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    setFilters,
  } = useUsers();

  return (
    <main
      className="w-full h-full overflow-hidden overflow-y-auto
      dark:bg-black"
    >
      <TopSection
        sectionName={"Usuarios"}
        addButtonText={"Crear Usuario"}
        createButtonOnClick={(e) => openModal(null, "createUser", e.currentTarget)}
        filterButtonOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      <div
        className="h-[85%] flex flex-col gap-4
        md:h-[90%]"
      >
        <UsersKpis />

        <UsersTable
          users={users}
          loading={loading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          openModal={openModal}
        />
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
          {modalType === "createUser" && (
            <CreateUserModal onClose={closeModal} />
          )}

          {modalType === "editUser" && (
            <EditUserModal user={modalData} onClose={closeModal} />
          )}

          {modalType === "disableUser" && (
            <DisableUserModal user={modalData} onClose={closeModal} />
          )}

          {modalType === "enableUser" && (
            <EnableUserModal user={modalData} onClose={closeModal} />
          )}

          {modalType === "filter" && (
            <FilterUsersModal
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
