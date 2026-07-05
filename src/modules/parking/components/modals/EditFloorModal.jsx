// Hooks
import { useUpdateFloor } from "@/modules/parking/hooks/useUpdateFloor";
import { useInnerModal } from "@hooks/useInnerModal";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import DeleteFloorModal from "@/modules/parking/components/modals/DeleteFloorModal";
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";
import ModalHighSection from "@modals/ModalHighSection";

export default function EditFloorModal({ onClose, floor }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { handleChange, handleSubmit, floorData, loading, error } =
    useUpdateFloor(floor);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <ModalHighSection
        icon={"stairs"}
        text={floorData.name}
        deleteButtonOnClick={(e) => openInnerModal("delete", e)}
        closeButtonOnClick={onClose}
      />

      <FormField
        id={"name"}
        name={"name"}
        labelText={"Nombre"}
        value={floorData.name}
        onChange={handleChange}
        autoComplete="off"
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Guardar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "delete" && (
        <DeleteFloorModal
          isOpen={true}
          floor={floor}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          onDeleted={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Piso editado con éxito!"}
          confirmText={
            "El piso se ha editado correctamente, toca el botón de volver a la pagina para verlo"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo editar el piso!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </form>
  );
}
