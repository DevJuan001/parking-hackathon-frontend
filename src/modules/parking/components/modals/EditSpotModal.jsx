// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useUpdateSpot } from "@/modules/parking/hooks/useUpdateSpot";
import { useVehicleTypes } from "@/modules/parking/hooks/useVehicleTypes";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import SelectMenu from "@components/modals/SelectMenu";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Constants
import { spotStatus } from "@/modules/parking/constants/spotStatus";
import { vehicleTypesConstant } from "@constants/vehicleTypes";
// Modals
import DeleteSpotModal from "./DeleteSpotModal";
import ErrorModal from "@components/modals/ErrorModal";
import SuccessModal from "@components/modals/SuccessModal";
import ModalHighSection from "@components/modals/ModalHighSection";

export default function EditSpotModal({ onClose, spot }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { vehicleTypes } = useVehicleTypes();
  const { handleChange, handleSubmit, spotData, loading, error } =
    useUpdateSpot(spot);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal, onClose)}
      className="flex flex-col items-center gap-2"
    >
      <ModalHighSection
        text={spotData.spot}
        textDataSharedId={"spot-text"}
        iconDataSharedId={"spot-icon"}
        icon={vehicleTypesConstant[spot.vehicle_type_id]?.icon}
        closeButtonOnClick={onClose}
        deleteButtonOnClick={(e) => openInnerModal("delete", e)}
      />

      {!spot.plate && (
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
      )}

      <FormField
        id={"spot"}
        name={"spot"}
        labelText={"Nombre"}
        value={spotData.spot}
        onChange={handleChange}
        autoComplete="off"
      />

      {spot.plate && (
        <FormField
          id={"spot"}
          name={"spot"}
          labelText={"Placa del vehiculo"}
          value={spot.plate}
          disabled={true}
        />
      )}

      <SelectMenu
        id={"spot_status"}
        spanText={"Estado"}
        name={"spot_status"}
        value={spotData.spot_status}
        onChange={handleChange}
        options={Object.entries(spotStatus).map(([index, value]) => ({
          value: index,
          label: value.text,
        }))}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Guardar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Plaza editada con éxito!"}
          confirmText={
            "La plaza se ha editado correctamente, toca el botón de volver a la pagina para verlo"
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
          errorTitle="¡No se pudo editar la plaza!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}

      {innerType === "delete" && (
        <DeleteSpotModal
          isOpen={true}
          spot={spot}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          onDeleted={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}
    </form>
  );
}
