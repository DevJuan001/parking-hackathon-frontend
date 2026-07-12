// Hooks
import { useEnableUser } from "@/modules/users/hooks/useEnableUser";
import { useInnerModal } from "@hooks/useInnerModal";
// Components
import Loader from "@components/ui/Loader";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@modals/ErrorModal";

export default function EnableUserModal({ onClose, user }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { handleEnable, loading, error } = useEnableUser(user);

  return (
    <section
      className="flex flex-col gap-2
      dark:text-[#E4E2E5]"
    >
      <span>
        Deseas habilitar al usuario{" "}
        <strong>
          {user.name} {user.first_surname}
        </strong>
        ?
      </span>

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmButtonOnClick={(e) =>
          handleEnable(e, openInnerModal, () => {
            closeInnerModal();
            onClose();
          })
        }
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo habilitar el usuario!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
