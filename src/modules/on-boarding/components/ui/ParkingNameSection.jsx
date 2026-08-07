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
      <div className="w-full flex flex-col items-center">
        <span
          className="text-sm text-nowrap font-medium text-[#75777e]
          lg:text-xl
          dark:text-[#7E8088]"
        >
          Ahora configuremos la información de tu parqueadero.
        </span>

        <span
          className="text-[25px] font-semibold tracking-tighter
          lg:text-5xl lg:tracking-normal
          dark:text-[#E4E2E5]"
        >
          ¿Cómo se llama tu parqueadero?
        </span>
      </div>

      <form
        className="w-full flex flex-col gap-2
        md:w-lg"
      >
        <FormField
          name={"parking_name"}
          labelText={"Nombre *"}
          placeholder={"Escribe el nombre aquí"}
          value={form.parking_name}
          onChange={handleChange}
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
