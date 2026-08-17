import FormField from "@components/ui/FormField";
import SectionButtons from "@/modules/on-boarding/components/ui/SectionButtons";

export default function ParkingNameSection({
  form,
  handleChange,
  fieldError,
  continueButtonOnClick,
  returnButtonOnClick,
}) {
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
          Ahora cuéntanos un poco sobre tu parqueadero.
        </span>

        <span
          className="text-center text-4xl font-semibold tracking-tighter
          lg:text-5xl lg:tracking-normal
          dark:text-[#E4E2E5]"
        >
          ¿Cómo se llama tu parqueadero?
        </span>
      </div>

      <form
        onSubmit={continueButtonOnClick}
        className="w-full flex flex-col gap-2
        md:w-lg"
      >
        <FormField
          id="parking_name"
          name="parking_name"
          labelText="Nombre *"
          onChange={handleChange}
          value={form.parking_name}
          placeholder={"Escribe el nombre aquí"}
          className={fieldError("parking_name")}
        />

        <SectionButtons
          continueButtonText={"Continuar"}
          continueButtonOnClick={continueButtonOnClick}
          returnButtonOnClick={returnButtonOnClick}
        />
      </form>
    </section>
  );
}
