// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useParkingInfo } from "@hooks/useParkingInfo";
import { useUpdateParkingInfo } from "@hooks/useUpdateParkingInfo";
// Utils
import { dayNames } from "@utils/timeUtils";
// Componentes
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
import SelectMenu from "@modals/SelectMenu";
import TimeField from "@components/ui/TimeField";
import FormField from "@components/ui/FormField";
import MapsField from "@components/ui/MapsField";
// Modales
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";

export default function ParkingInfoContent() {
  const { parkingInfo, parkingInfoLoading } = useParkingInfo();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useUpdateParkingInfo(parkingInfo);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal)}
      className="w-full flex flex-col p-3 pt-0 gap-2 font-dmsans overflow-y-auto animate-blur-up
      md:pt-3
      dark:text-[#E4E2E5]"
    >
      <div
        className="relative flex flex-col gap-2 p-7 bg-[#F5F3F6] rounded-[40px]
        dark:bg-[#101012]"
      >
        <div className="w-full flex flex-col gap-1">
          <Icon name={"garage_home"} size={24} fill />

          <span className="text-xl font-medium">Información del parking</span>

          <span
            className="leading-4.5 text-sm text-[#75777E]
            dark:text-[#7E8088]"
          >
            Mantén la información de tu parking siempre actualizada. Puedes
            editar la ubicación, los datos de contacto y otros detalles cuando
            lo necesites.
          </span>
        </div>

        {(form?.name !== parkingInfo?.name ||
          form?.country_id !== parkingInfo?.country_id ||
          form?.address !== parkingInfo?.address) && (
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, openInnerModal)}
            className="absolute top-6 right-7 w-fit flex items-center justify-center p-1.5 rounded-4xl bg-black text-white
            active:animate-click-effect
            hover:bg-black/85
            dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {loading ? <Loader /> : <Icon name="check" />}
          </button>
        )}

        <div className="flex flex-col gap-2">
          <FormField
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            labelText="Nombre del parking"
            disabled={parkingInfoLoading ?? loading}
            placeholder={parkingInfo?.name ?? "Parking hackathon"}
            className={fieldError("name")}
          />

          <MapsField
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            labelText="Dirección del parking"
            disabled={parkingInfoLoading ?? loading}
            placeholder={parkingInfo?.address ?? "Avenida 1, Bogotá"}
            className={fieldError("address")}
          />
        </div>
      </div>

      <div
        className="relative flex flex-col gap-2 p-7 bg-[#F5F3F6] rounded-[40px]
        dark:bg-[#101012]"
      >
        <div className="w-full flex flex-col gap-1">
          <Icon name={"calendar_clock"} fill />

          <span className="text-xl font-medium">Horario</span>

          <span
            className="leading-4.5 text-sm text-[#75777E]
            dark:text-[#7E8088]"
          >
            Cuéntales a tus clientes cuándo pueden usar tu parking. Configura
            tus horarios y cámbialos cuando lo necesites.
          </span>
        </div>

        {(form?.start_day !== parkingInfo?.start_day ||
          form?.end_day !== parkingInfo?.end_day ||
          form?.start_time !== parkingInfo?.start_time ||
          form?.end_time !== parkingInfo?.end_time) && (
          <button
            type="submit"
            disabled={parkingInfoLoading ?? loading}
            onClick={(e) => handleSubmit(e, openInnerModal)}
            className="absolute top-6 right-7 w-fit flex items-center justify-center p-1.5 rounded-4xl bg-black text-white
            active:animate-click-effect
            hover:bg-black/85
            dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {loading ? <Loader /> : <Icon name="check" />}
          </button>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <SelectMenu
              id={"start_day"}
              name="start_day"
              disabled={parkingInfoLoading ?? loading}
              value={form.start_day}
              onChange={handleChange}
              spanText="Dia de inicio"
              options={dayNames.map((day, index) => ({
                value: index,
                label: day,
              }))}
              className={fieldError("start_day")}
            />

            <span
              className="text-3xl text-center text-[#75777E]
              dark:text-[#7E8088]"
            >
              -
            </span>

            <SelectMenu
              id={"end_day"}
              name="end_day"
              value={form.end_day}
              onChange={handleChange}
              spanText="Día de cierre"
              disabled={parkingInfoLoading ?? loading}
              options={dayNames.map((day, index) => ({
                value: index,
                label: day,
              }))}
              className={fieldError("end_day")}
            />
          </div>

          <div className="flex items-center gap-2">
            <TimeField
              id={"start_time"}
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              spanText="Hora de inicio"
              disabled={parkingInfoLoading ?? loading}
              className={fieldError("start_time")}
            />

            <span
              className="text-3xl text-center text-[#75777E]
              dark:text-[#7E8088]"
            >
              -
            </span>

            <TimeField
              id={"end_time"}
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              spanText="Hora de cierre"
              disabled={parkingInfoLoading ?? loading}
              className={fieldError("end_time")}
            />
          </div>
        </div>
      </div>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle={"No se pudo editar la información"}
          errorText={error}
          onClose={closeInnerModal}
        />
      )}

      {innerType === "success" && (
        <SuccessModal
          isOpen={true}
          triggerRef={innerTrigger}
          confirmTitle={"¡Información actualizada!"}
          confirmText={
            "Se ha actualizado con exito la información de tu parqueadero, dale al boton de volver y podrás visualizarla"
          }
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
