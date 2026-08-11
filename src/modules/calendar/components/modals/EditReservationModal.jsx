// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useEditReservation } from "@/modules/calendar/hooks/useEditReservation";
// Componentes
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
import DateField from "@components/ui/DateField";
import TimeField from "@components/ui/TimeField";
import FormField from "@components/ui/FormField";
import LiquidGlass from "@components/ui/LiquidGlass";
import SelectMenu from "@components/modals/SelectMenu";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Modales
import Modal from "@modals/Modal";
import ErrorModal from "@modals/ErrorModal";
import DeleteReservationModal from "@/modules/calendar/components/modals/DeleteReservationModal";

export default function EditReservationModal({ reservation, onClose }) {
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useEditReservation(reservation);
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div
        className="w-full h-fit flex flex-col p-2 border border-[#E4E2E5] rounded-4xl
        dark:border-[#202022]"
      >
        <div className="w-full flex justify-between">
          <LiquidGlass
            role="button"
            onClick={(e) => openInnerModal("delete", e)}
            className="flex items-center justify-center p-3 rounded-3xl group
            active:animate-click-effect
            hover:cursor-pointer hover:bg-[#ff5b5b41]
            dark:text-[#7E8088] dark:border-[#202022]"
          >
            <Icon
              name={"delete"}
              size={20}
              className={`text-[#75777E]
              dark:text-[#7E8088]
              group-hover:text-red-700`}
            />
          </LiquidGlass>

          <LiquidGlass
            role="button"
            onClick={onClose}
            className="flex items-center justify-center p-3 rounded-full
            active:animate-click-effect
            hover:bg-[#9c9a9a2c] hover:cursor-pointer"
          >
            <Icon
              name={"close"}
              size={20}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </LiquidGlass>
        </div>

        <div
          className="h-full flex flex-col justify-center py-8 px-3 gap-2
          dark:text-[#E4E2E5]"
        >
          <span className="text-2xl text-ellipsis font-medium overflow-hidden">
            {reservation?.name}
          </span>
        </div>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, openInnerModal, onClose)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          disabled
          id={"name"}
          name={"name"}
          value={reservation?.name}
          labelText={"Titúlo"}
          onChange={handleChange}
        />

        <FormField
          disabled
          id={"email"}
          name={"email"}
          value={reservation?.email}
          labelText={"Correo"}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <DateField
            disabled
            id={"start_date"}
            name={"start_date"}
            value={reservation?.start_date}
            onChange={handleChange}
            spanText={"Fecha de inicio"}
            className={fieldError("start_date")}
          />

          <DateField
            disabled
            id={"end_date"}
            name={"end_date"}
            value={reservation?.end_date}
            onChange={handleChange}
            spanText={"Fecha de fin"}
            className={fieldError("end_date")}
          />
        </div>

        <div className="flex gap-2">
          <TimeField
            disabled
            id={"start_time"}
            name={"start_time"}
            value={reservation?.start_time}
            onChange={handleChange}
            spanText={"Hora de inicio"}
          />

          <TimeField
            disabled
            id={"end_time"}
            name={"end_time"}
            value={reservation?.end_time}
            onChange={handleChange}
            spanText={"Hora de fin"}
          />
        </div>

        <SelectMenu
          id={"status-menu"}
          name={"status"}
          value={form.status}
          spanText={"Estado"}
          onChange={handleChange}
          options={[
            { value: 1, label: "Cancelada" },
            { value: 2, label: "Activa" },
            { value: 3, label: "En proceso" },
            { value: 4, label: "Completada" },
          ]}
        />

        <ConfirmCancelButtons
          disabled={loading}
          itemsPosition="end"
          confirmText={loading ? <Loader /> : "Guardar"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
          cancelButtonOnClick={onClose}
        />
      </form>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle={"No se pudo editar la reserva"}
          errorText={error}
          onClose={closeInnerModal}
        />
      )}

      {innerType === "delete" && (
        <Modal
          isOpen={true}
          title={"Eliminar reserva"}
          triggerRef={innerTrigger}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        >
          <DeleteReservationModal
            reservation={reservation}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
