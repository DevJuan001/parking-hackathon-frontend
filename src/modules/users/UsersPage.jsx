// Hooks
import { useModal } from "@hooks/useModal";
import { useUsers } from "@/modules/users/hooks/useUsers";
// Constantes
import { modalTitles } from "@/modules/users/constants/modalTitles";
// Componentes
import UsersKpis from "@/modules/users/components/ui/UsersKpis";
import UsersTable from "@/modules/users/components/ui/UsersTable";
import Layout from "@components/Layout/Layout";
import TopSection from "@components/ui/TopSection";
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
  const { users, loading, filters, setFilters } = useUsers();

  return (
    <Layout>
      <TopSection
        sectionName={"Usuarios"}
        addButtonText={"Crear Usuario"}
        createOnClick={(e) => openModal(null, "createUser", e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      <div className="flex flex-col gap-4">
        <UsersKpis />

        <UsersTable users={users} loading={loading} openModal={openModal} />
      </div>

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={modalTitles[modalType]}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modalType === "createUser" ? "center" : "anchored"}
          growDirection={modalType === "editUser" ? "center" : "bottom-center"}
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
    </Layout>
  );
}
