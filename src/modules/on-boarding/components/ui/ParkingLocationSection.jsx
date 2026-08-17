// Componentes
import MapsField from "@components/ui/MapsField";
import SectionButtons from "@/modules/on-boarding/components/ui/SectionButtons";

export default function ParkingLocationSection({
  form,
  fieldError,
  handleChange,
  returnButtonOnClick,
  continueButtonOnClick,
}) {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center p-4 gap-5 animate-blur-down">
      <div className="w-full flex flex-col items-center gap-1">
        <span
          className="text-sm text-nowrap text-center font-medium text-[#75777e]
          lg:text-xl
          dark:text-[#7E8088]"
        >
          Perfecto, ahora queremos conocer su ubicación.
        </span>

        <span
          className="text-4xl text-center font-semibold tracking-tighter
          lg:text-5xl lg:tracking-normal
          dark:text-[#E4E2E5]"
        >
          ¿Dónde se encuentra tu parqueadero?
        </span>
      </div>

      <form
        className="w-full flex flex-col gap-2
        lg:w-lg"
      >
        <MapsField
          id="address"
          name="address"
          labelText="Dirección *"
          value={form.address}
          onChange={handleChange}
          className={fieldError("address")}
          placeholder={"Escribe la dirección aquí"}
        />

        <SectionButtons
          continueButtonText="Continuar"
          continueButtonOnClick={continueButtonOnClick}
          returnButtonOnClick={returnButtonOnClick}
        />
      </form>
    </section>
  );
}
