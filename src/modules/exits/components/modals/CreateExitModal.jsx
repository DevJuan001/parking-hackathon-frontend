// Hooks
import { useCreateExit } from "@/modules/exits/hooks/useCreateExit";
import { useInnerModal } from "@hooks/useInnerModal";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";

export default function CreateExitModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { handleChange, handleSubmit, form, loading, error } = useCreateExit();

  return (
    <section className="flex flex-col items-center gap-2">
      <FormField
        id={"plate"}
        name={"plate"}
        labelText={"Placa"}
        value={form.plate}
        onChange={handleChange}
        autoComplete="off"
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
          confirmTitle={"Salida registrada con éxito!"}
          confirmText={
            "La salida se ha registrado correctamente, toca el botón de volver a la pagina para verla"
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
          errorTitle="¡No se pudo registrar la salida!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
