// Hooks
import { useCreateEntry } from "@/modules/entries/hooks/useCreateEntry";
import { useInnerModal } from "@hooks/useInnerModal";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";

export default function CreateEntryModal({ onClose }) {
  const { handleChange, handleSubmit, form, loading, error } = useCreateEntry();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <FormField
        id={"plate"}
        name={"plate"}
        labelText={"Placa"}
        value={form.plate}
        onChange={handleChange}
        autoComplete="off"
        placeholder={"ABC123"}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Registrar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Ingreso registrado con éxito!"}
          confirmText={
            "El ingreso se ha registrado correctamente, toca el botón de volver a la pagina para verlo"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo registrar el ingreso!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
