// Hooks
import { useCountries } from "@/modules/on-boarding/hooks/useCountries";
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import SectionButtons from "@/modules/on-boarding/components/ui/SectionButtons";
import Loader from "@components/ui/Loader";
import SelectMenu from "@modals/SelectMenu";
// Modales
import ErrorModal from "@modals/ErrorModal";

export default function ParkingLocationSection({
  form,
  loading,
  error,
  handleChange,
  fieldError,
  handleSubmit,
  returnButtonOnClick,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { countries } = useCountries();

  return (
    <section className="h-full w-full flex flex-col items-center justify-center p-4 gap-5 animate-blur-down">
      <div className="w-full flex flex-col items-center gap-1">
        <span
          className="text-sm text-nowrap text-center font-medium text-[#75777e]
          lg:text-xl
          dark:text-[#7E8088]"
        >
          Un último paso para completar la configuración inicial.
        </span>

        <span
          className="text-3xl text-center font-semibold tracking-tighter
          lg:text-5xl lg:tracking-normal
          dark:text-[#E4E2E5]"
        >
          ¿En qué país te encuentras?
        </span>
      </div>

      <form
        className="w-full flex flex-col gap-2
        lg:w-lg"
      >
        <SelectMenu
          searchable
          id={"countries-menu"}
          name={"parking_country"}
          spanText={"País"}
          value={form.parking_country}
          onChange={handleChange}
          options={countries.map((country) => ({
            value: country.id,
            label: country.name,
          }))}
          className={fieldError("parking_country")}
        />

        <SectionButtons
          continueButtonText={loading ? <Loader /> : "Continuar"}
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
