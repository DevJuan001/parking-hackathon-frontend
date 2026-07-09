// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCreateSpot } from "@/modules/parking/hooks/useCreateSpot";
import { useVehicleTypes } from "@/modules/parking/hooks/useVehicleTypes";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@components/modals/ErrorModal";
import SelectMenu from "@components/modals/SelectMenu";

export default function CreateSpotModal({ floor, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { vehicleTypes } = useVehicleTypes();
  const { handleChange, handleSubmit, spotData, loading, error } =
    useCreateSpot(floor);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal, onClose)}
      className="flex flex-col items-center gap-2"
    >
      <SelectMenu
        id={"vehicle-types-menu"}
        name={"vehicle_type_id"}
        spanText={"Tipo de vehículo"}
        value={spotData.vehicle_type_id}
        onChange={handleChange}
        options={vehicleTypes.map((vehicleType) => ({
          value: vehicleType.id,
          label: vehicleType.name,
        }))}
      />

      <FormField
        id={"spot"}
        name={"spot"}
        labelText={"Nombre"}
        value={spotData.spot}
        placeholder={"Nombre de la plaza"}
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
          growDirection={"center"}
          errorTitle="¡No se pudo crear la plaza!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
