// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useDeleteTariff } from "@/modules/parking/hooks/useDeleteTariff";
// Components
import Loader from "@components/ui/Loader";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import Modal from "@modals/Modal";
import ErrorModal from "@modals/ErrorModal";

export default function DeleteTariffModal({
  isOpen,
  triggerRef,
  onClose,
  tariff,
}) {
  const { handleDelete, loading, error } = useDeleteTariff(tariff);
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      type={"deleteTariff"}
      title={"Eliminar tarifa"}
      growDirection="center-right"
      triggerRef={triggerRef}
    >
      <div className="flex flex-col">
        <span>
          Deseas eliminar la tarifa del tipo de vehiculo{" "}
          <strong>{tariff.vehicle_type}</strong>?
        </span>

        <ConfirmCancelButtons
          itemsPosition="end"
          confirmText={loading ? <Loader /> : "Eliminar"}
          confirmBgColor="#ff0000"
          disabled={loading}
          confirmButtonOnClick={(e) => handleDelete(e, openInnerModal, onClose)}
          cancelButtonOnClick={onClose}
        />
      </div>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          errorText={error}
          errorTitle={"No se pudo eliminar la tarifa!"}
        />
      )}
    </Modal>
  );
}
