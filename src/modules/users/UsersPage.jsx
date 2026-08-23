// Hooks
import { useModal } from "@hooks/useModal";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useUsers } from "@/modules/users/hooks/useUsers";
// Constantes
import { modals } from "@/modules/users/constants/modals";
// Componentes
import TopSection from "@components/ui/TopSection";
import UsersList from "@/modules/users/components/ui/UsersList";
import UsersKpis from "@/modules/users/components/ui/UsersKpis";
import UsersTable from "@/modules/users/components/ui/UsersTable";
// Modales
import Modal from "@modals/Modal";
import SearchModal from "@modals/SearchModal";
import ExportModal from "@modals/ExportModal";
import EditUserModal from "@/modules/users/components/modals/EditUserModal";
import CreateUserModal from "@/modules/users/components/modals/CreateUserModal";
import EnableUserModal from "@/modules/users/components/modals/EnableUserModal";
import DisableUserModal from "@/modules/users/components/modals/DisableUserModal";
import FilterUsersModal from "@/modules/users/components/modals/FilterUsersModal";

export default function UsersPage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } =
    useModal();
  const isDesktop = useMediaQuery("(min-width: 48rem)");
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
      className="w-full h-full flex flex-col gap-4 overflow-hidden overflow-y-auto
      dark:bg-black"
    >
      <TopSection
        sectionName={"Usuarios"}
        addButtonText={"Crear usuario"}
        filterButtonOnClick={(e) => openModal(null, "filter", e.currentTarget)}
        exportButtonOnClick={(e) => openModal(null, "export", e.currentTarget)}
        searchButtonOnClick={(e) => openModal(null, "search", e.currentTarget)}
        createButtonOnClick={(e) =>
          openModal(null, "createUser", e.currentTarget)
        }
      />

      <UsersKpis />

      {isDesktop ? (
        <UsersTable
          users={users}
          loading={loading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          openModal={openModal}
        />
      ) : (
        <UsersList
          users={users}
          loading={loading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          openModal={openModal}
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

          {modalType === "export" && <ExportModal />}

          {modalType === "search" && <SearchModal />}
        </Modal>
      )}
    </main>
  );
}
