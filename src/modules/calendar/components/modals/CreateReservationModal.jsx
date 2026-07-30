// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCreateReservation } from "@/modules/calendar/hooks/useCreateReservation";
// Componentes
import Loader from "@components/ui/Loader";
import DateField from "@components/ui/DateField";
import FormField from "@components/ui/FormField";
import TimeField from "@components/ui/TimeField";
import SelectMenu from "@components/modals/SelectMenu";
import ConfirmCancelButtons from "@components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "@modals/ErrorModal";

export default function CreateReservationModal() {
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateReservation();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col gap-2 px-0.5"
    >
      <FormField
        labelText={"Titúlo"}
        id={"name"}
        name={"name"}
        value={form.name}
        onChange={handleChange}
        placeholder={"Escribe un nombre para la reserva"}
        className={fieldError("name")}
      />

      <div className="flex gap-2">
        <DateField
          spanText={"Fecha de inicio"}
          id={"start_date"}
          name={"start_date"}
          className={fieldError("start_date")}
        />

        <DateField
          spanText={"Fecha de fin"}
          id={"end_date"}
          name={"end_date"}
          className={fieldError("end_date")}
        />
      </div>

      <div className="w-full flex gap-2">
        <TimeField
          required
          spanText={"Hora de inicio"}
          id={"start_time"}
          name={"start_time"}
          value={form.start_time}
          onChange={handleChange}
          className={fieldError("start_time")}
        />

        <TimeField
          required
          spanText={"Hora de fin"}
          id={"end_time"}
          name={"end_time"}
          value={form.end_time}
          onChange={handleChange}
          className={fieldError("end_time")}
        />
      </div>

      <SelectMenu
        id={"level-menu"}
        name={"level"}
        value={form.level}
        spanText={"Nivel de importancia"}
        onChange={handleChange}
        options={[
          { value: 1, label: "Normal" },
          { value: 2, label: "Importante" },
        ]}
        className={fieldError("level")}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={closeInnerModal}
      />

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          errorTitle={"No se pudo crear la reserva"}
          errorText={error}
        />
      )}
    </form>
  );
}
