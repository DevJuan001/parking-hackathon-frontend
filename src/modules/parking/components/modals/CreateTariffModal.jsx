// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCreateTariff } from "@/modules/parking/hooks/useCreateTariff";
import { useAvailableVehicleTypes } from "@/modules/parking/hooks/useAvailableVehicleTypes";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import SelectMenu from "@components/modals/SelectMenu";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@components/modals/ErrorModal";

export default function CreateTariffModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { availableVehicleTypes } = useAvailableVehicleTypes();
  const { handleChange, handleSubmit, tariffData, loading, error } =
    useCreateTariff();

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <SelectMenu
        id={"vehicle_type"}
        spanText={"Tipo de vehículo"}
        name={"vehicle_type"}
        value={tariffData.vehicle_type}
        onChange={handleChange}
        options={availableVehicleTypes.map((vehicleType) => ({
          value: vehicleType.id,
          label: vehicleType.name,
        }))}
      />

      <FormField
        id={"value"}
        name={"value"}
        labelText={"Valor por hora"}
        type="number"
        placeholder={"$1000"}
        value={tariffData.value}
        onChange={handleChange}
        autoComplete="off"
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          location="anchored"
          growDirection={"top-right"}
          errorTitle="¡No se pudo crear la tarifa!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
