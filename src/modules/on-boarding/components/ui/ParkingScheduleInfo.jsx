// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Utils
import { dayNames } from "@utils/timeUtils";
// Componentes
import Loader from "@components/ui/Loader";
import TimeField from "@components/ui/TimeField";
import SelectMenu from "@components/modals/SelectMenu";
// Modales
import ErrorModal from "@modals/ErrorModal";
import SectionButtons from "@/modules/on-boarding/components/ui/SectionButtons";

export default function ParkingScheduleInfo({
  form,
  loading,
  error,
  fieldError,
  handleChange,
  handleSubmit,
  returnButtonOnClick,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <section
      className="h-full w-full flex flex-col items-center justify-center p-4 gap-5 animate-blur-down
      lg:w-5xl"
    >
      <div className="w-full flex flex-col items-center gap-1.5">
        <span
          className="text-sm text-nowrap font-medium text-[#75777e]
          lg:text-xl
          dark:text-[#7E8088]"
        >
          Cuéntanos cuándo pueden visitarte tus clientes.
        </span>

        <span
          className="text-center text-4xl font-semibold tracking-tighter
          lg:text-5xl lg:tracking-normal
          dark:text-[#E4E2E5]"
        >
          Elige tus días y horarios
        </span>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, openInnerModal)}
        className="w-full flex flex-col gap-2
        md:w-2xl"
      >
        <div className="w-full flex items-center gap-2">
          <SelectMenu
            id="start_day"
            name="start_day"
            spanText="Día de inicio *"
            value={form.start_day}
            onChange={handleChange}
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
            id="end_day"
            name="end_day"
            spanText="Día de cierre *"
            value={form.end_day}
            onChange={handleChange}
            options={dayNames.map((day, index) => ({
              value: index,
              label: day,
            }))}
            className={fieldError("end_day")}
          />
        </div>

        <div className="w-full flex items-center gap-2">
          <TimeField
            id="start_time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            spanText="Hora de inicio *"
            className={fieldError("start_time")}
          />

          <span
            className="text-3xl text-center text-[#75777E]
            dark:text-[#7E8088]"
          >
            -
          </span>

          <TimeField
            id="end_time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            spanText="Hora de cierre *"
            className={fieldError("end_time")}
          />
        </div>

        <SectionButtons
          continueButtonText={loading ? <Loader /> : "Finalizar"}
          continueButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          returnButtonOnClick={returnButtonOnClick}
        />
      </form>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          location="center"
          errorTitle={"No se pudo configurar tu parqueadero"}
          errorText={error}
          confirmButtonText={"Volver a intentar"}
          onClose={closeInnerModal}
        />
      )}
    </section>
  );
}
