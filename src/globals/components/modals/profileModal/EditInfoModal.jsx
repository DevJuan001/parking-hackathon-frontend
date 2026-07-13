//Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useUpdateCurrentUserInfo } from "@hooks/useUpdateCurrentUserInfo";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import Modal from "@modals/Modal";
import ErrorModal from "@modals/ErrorModal";

export default function EditInfoModal({ isOpen, onClose, user, triggerRef }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { userData, loading, error, handleChange, handleSubmit } =
    useUpdateCurrentUserInfo(user);

  return (
    <Modal
      z_index="300"
      title={"Editar información"}
      isOpen={isOpen}
      type="innerModal"
      location="center"
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <form
        action={(e) => handleSubmit(e, openInnerModal)}
        className="flex flex-col items-center gap-2"
      >
        <FormField
          id={"name"}
          name={"name"}
          labelText={"Nombre"}
          value={userData.name}
          onChange={handleChange}
          autoComplete="given-name"
          placeholder={user.name ?? "Miguel"}
        />

        <FormField
          id={"first_surname"}
          name={"first_surname"}
          labelText={"Primer Apellido"}
          value={userData.first_surname}
          onChange={handleChange}
          autoComplete="family-name"
          placeholder={user.first_surname ?? "Pérez"}
        />

        <FormField
          id={"second_surname"}
          name={"second_surname"}
          labelText={"Segundo Apellido"}
          value={userData.second_surname}
          onChange={handleChange}
          autoComplete="family-name"
          placeholder={user.second_surname ?? "Contreras"}
        />

        <FormField
          id={"email"}
          name={"email"}
          labelText={"Correo eléctronico"}
          value={userData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder={user.email ?? "Pérez"}
        />

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Editar"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
          cancelButtonOnClick={onClose}
        />
      </form>

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo completar el registro!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </Modal>
  );
}
