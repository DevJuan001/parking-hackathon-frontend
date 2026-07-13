// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useUpdateCurrentUserPassword } from "@hooks/useUpdateCurrentUserPassword";
// Components
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import Modal from "@modals/Modal";
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";

export default function ChangePasswordModal({ isOpen, onClose, triggerRef }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const {
    handleChange,
    handleSubmit,
    passwordData,
    passwordsMatch,
    loading,
    showPasswords,
    error,
    togglePassword,
    fieldError,
  } = useUpdateCurrentUserPassword();

  return (
    <Modal
      z_index="300"
      title={"Cambiar contraseña"}
      isOpen={isOpen}
      type="innerModal"
      onClose={onClose}
      location="center"
      triggerRef={triggerRef}
    >
      <form
        action={(e) => handleSubmit(e, openInnerModal)}
        className="flex flex-col items-center w-full gap-2"
      >
        <FormField
          id={"old_password"}
          type={showPasswords.old ? "text" : "password"}
          name="old_password"
          labelText={"Contraseña actual"}
          onChange={handleChange}
          placeholder={"********"}
          className={fieldError("old_password")}
        >
          <button type="button" onClick={() => togglePassword("old")}>
            <Icon
              name={showPasswords.old ? "visibility_off" : "visibility"}
              className={"dark:invert"}
            />
          </button>
        </FormField>

        <FormField
          id={"new_password"}
          type={showPasswords.new ? "text" : "password"}
          name="new_password"
          labelText={"Nueva contraseña"}
          onChange={handleChange}
          placeholder={"********"}
          className={fieldError("new_password")}
        >
          <button type="button" onClick={() => togglePassword("new")}>
            <Icon
              name={showPasswords.new ? "visibility_off" : "visibility"}
              className={"dark:invert"}
            />
          </button>
        </FormField>

        <FormField
          id={"repeat_password"}
          type={showPasswords.repeat ? "text" : "password"}
          name="repeat_password"
          labelText={"Repita la nueva contraseña"}
          onChange={handleChange}
          placeholder={"********"}
          className={fieldError("repeat_password")}
        >
          <button type="button" onClick={() => togglePassword("repeat")}>
            <Icon
              name={showPasswords.repeat ? "visibility_off" : "visibility"}
              className={"dark:invert"}
            />
          </button>
        </FormField>

        {!passwordsMatch && passwordData.repeat_password && (
          <span className="text-sm text-red-700">
            Las contraseñas no coinciden
          </span>
        )}

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Cambiar"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          cancelButtonOnClick={onClose}
          disabled={!passwordsMatch}
        />

        {innerType === "success" && (
          <SuccessModal
            triggerRef={innerTrigger}
            isOpen={true}
            confirmTitle={"Contraseña actualizada con exito"}
            confirmText={"Su contraseña ha sido actualizada con exito"}
            onClose={onClose}
          />
        )}

        {innerType === "error" && (
          <ErrorModal
            triggerRef={innerTrigger}
            isOpen={true}
            errorTitle={"No se pudo actualizar su contraseña!"}
            errorText={error}
            confirmButtonText={"Volver a intentarlo"}
            onClose={closeInnerModal}
          />
        )}
      </form>
    </Modal>
  );
}
