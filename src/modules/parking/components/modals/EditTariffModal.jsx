// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useUpdateTariff } from "@/modules/parking/hooks/useUpdateTariff";
import { useVehicleTypes } from "@/modules/parking/hooks/useVehicleTypes";
// Constants
import { vehicleTypesConstant } from "@constants/vehicleTypes";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import SelectMenu from "@components/modals/SelectMenu";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Modals
import DeleteTariffModal from "./DeleteTariffModal";
import ErrorModal from "@components/modals/ErrorModal";
import SuccessModal from "@components/modals/SuccessModal";
import ModalHighSection from "@components/modals/ModalHighSection";

export default function EditTariffModal({ onClose, tariff }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { vehicleTypes } = useVehicleTypes();
  const { handleChange, handleSubmit, tariffData, loading, error } =
    useUpdateTariff(tariff);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal, onClose)}
      className="flex flex-col items-center gap-2"
    >
      <ModalHighSection
        icon={"💵"}
        iconDataSharedId={"tariff-icon"}
        text={vehicleTypesConstant[tariffData.vehicle_type]?.text}
        textDataSharedId={"tariff-text"}
        closeButtonOnClick={onClose}
        deleteButtonOnClick={(e) => openInnerModal("deleteTariff", e)}
      />

      <SelectMenu
        id={"vehicle_type"}
        spanText={"Tipo de vehículo"}
        name={"vehicle_type"}
        value={tariffData.vehicle_type}
        onChange={handleChange}
        options={vehicleTypes.map((vehicleType) => ({
          value: vehicleType.id,
          label: vehicleType.name,
        }))}
      />

      <FormField
        id={"value"}
        name={"value"}
        labelText={"Valor"}
        type="number"
        value={tariffData.value}
        onChange={handleChange}
        autoComplete="off"
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Guardar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "deleteTariff" && (
        <DeleteTariffModal
          isOpen={true}
          triggerRef={innerTrigger}
          tariff={tariff}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Tarifa editada con éxito!"}
          confirmText={
            "La tarifa se ha editado correctamente, toca el botón de volver a la pagina para verla"
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
          errorTitle="¡No se pudo editar la tarifa!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
