// Hooks
import { useDisableUser } from "@/modules/users/hooks/useDisableUser";
import { useInnerModal } from "@hooks/useInnerModal";
// Components
import Loader from "@components/ui/Loader";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@modals/ErrorModal";

export default function DisableUserModal({ onClose, user }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { handleDisable, loading, error } = useDisableUser(user);

  return (
    <section
      className="flex flex-col gap-2
      dark:text-[#E4E2E5]"
    >
      <span>
        Deseas deshabilitar al usuario{" "}
        <strong>
          {user.name} {user.first_surname}
        </strong>
        ?
      </span>

      <ConfirmCancelButtons
        disabled={loading}
        confirmBgColor="#ba1a1a"
        cancelButtonOnClick={onClose}
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmButtonOnClick={(e) =>
          handleDisable(e, openInnerModal, () => {
            closeInnerModal();
            onClose();
          })
        }
      />

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorText={error}
          onClose={closeInnerModal}
          confirmButtonText="Volver a intentarlo"
          errorTitle="¡No se pudo deshabilitar el usuario!"
        />
      )}
    </section>
  );
}
