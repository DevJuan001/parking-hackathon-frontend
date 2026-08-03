// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useDeleteReservation } from "@/modules/calendar/hooks/useDeleteReservation";
// Componentes
import Loader from "@components/ui/Loader";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "@modals/ErrorModal";

export default function DeleteReservationModal({ reservation, onClose }) {
  const { handleDelete, loading, error } = useDeleteReservation(reservation);
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div className="flex flex-col gap-2 text-nowrap font-dmsans">
      <span>
        ¿Estás seguro/a de eliminar la reserva{" "}
        <strong>{reservation?.name}</strong>?
      </span>

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Eliminar"}
        confirmBgColor="#D11C00"
        confirmButtonOnClick={(e) => handleDelete(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle={"No se pudo editar la reserva"}
          errorText={error}
          onClose={closeInnerModal}
        />
      )}
    </div>
  );
}
