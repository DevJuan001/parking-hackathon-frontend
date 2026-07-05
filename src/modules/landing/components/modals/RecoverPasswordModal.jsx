// Hooks
import { useRecoverPassword } from "../../hooks/useRecoverPassword";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Components
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import Loader from "../../../../globals/components/ui/Loader";
import Modal from "../../../../globals/components/modals/Modal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function RecoverPasswordModal({ triggerRef, onClose }) {
  const { innerTrigger, innerType, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { form, loading, handleChange, handleSubmit, fieldError } =
    useRecoverPassword();

  return (
    <Modal
      isOpen={true}
      triggerRef={triggerRef}
      location="center"
      title={"Recuperar contraseña"}
      onClose={onClose}
    >
      <section className="flex flex-col items-center font-poppins">
        <FormField
          id={"email"}
          name={"email"}
          labelText={"Correo electrónico"}
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder={"Escribe tu correo aquí"}
          className={fieldError("email")}
        />

        <ConfirmCancelButtons
          cancelText="Cancelar"
          cancelButtonOnClick={onClose}
          confirmText={loading ? <Loader /> : "Restablecer"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        />

        {innerType === "sentEmail" && (
          <SuccessModal
            isOpen={true}
            triggerRef={innerTrigger}
            confirmTitle={"Correo enviado correctamente"}
            confirmText={`Hemos enviado un correo a ${form.email}, revisa tu bandeja de entrada o en la sección de spam`}
            confirmButtonText={"Volver"}
            onClose={closeInnerModal}
          />
        )}
      </section>
    </Modal>
  );
}
