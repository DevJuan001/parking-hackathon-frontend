// Hooks
import { useClients } from "@hooks/useClients";
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

export default function CreateReservationModal({ dayInfo, onClose }) {
  const { clients } = useClients();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateReservation(dayInfo);
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal, onClose)}
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

      <SelectMenu
        id={"clients-menu"}
        name={"client_id"}
        spanText={"Cliente"}
        value={form.client_id}
        onChange={handleChange}
        options={clients?.map((client) => ({
          value: client.id,
          label: `${client.name} ${client.first_surname} ${client.second_surname}`,
        }))}
        className={fieldError("client_id")}
      />

      <div className="flex gap-2">
        <DateField
          id={"start_date"}
          name={"start_date"}
          value={form.start_date}
          spanText={"Fecha de inicio"}
          onChange={handleChange}
          className={fieldError("start_date")}
        />

        <DateField
          id={"end_date"}
          name={"end_date"}
          value={form.end_date}
          spanText={"Fecha de fin"}
          onChange={handleChange}
          className={fieldError("end_date")}
        />
      </div>

      <div className="w-full flex gap-2">
        <TimeField
          required
          id={"start_time"}
          name={"start_time"}
          value={form.start_time}
          onChange={handleChange}
          spanText={"Hora de inicio"}
          className={fieldError("start_time")}
        />

        <TimeField
          required
          id={"end_time"}
          name={"end_time"}
          value={form.end_time}
          onChange={handleChange}
          spanText={"Hora de fin"}
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
          { value: 2, label: "Alto" },
        ]}
        className={fieldError("level")}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
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
