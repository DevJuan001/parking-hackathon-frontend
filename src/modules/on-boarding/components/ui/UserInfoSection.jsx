// Componentes
import FormField from "@components/ui/FormField";
import SectionButtons from "@/modules/on-boarding/components/ui/SectionButtons";

export default function UserInfoSection({
  form,
  handleChange,
  fieldError,
  continueButtonOnClick,
}) {
  return (
    <section
      className="h-full w-full flex flex-col items-center justify-center p-4 gap-5 animate-blur-down
      md:w-lg"
    >
      <div className="w-full flex flex-col">
        <span
          className="text-sm font-medium text-[#75777e]
          lg:text-lg lg:text-nowrap
          dark:text-[#7E8088]"
        >
          Estamos a pocos pasos de poner tu parqueadero en marcha.
        </span>

        <span
          className="text-4xl font-semibold
          md:text-6xl
          dark:text-[#E4E2E5]"
        >
          ¿Cómo te llamas?
        </span>
      </div>

      <form className="w-full flex flex-col gap-2">
        <FormField
          labelText={"Nombre *"}
          placeholder={"Escribe tu nombre aquí"}
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          className={fieldError("name")}
        />

        <FormField
          labelText={"Primer apellido *"}
          placeholder={"Escribe tu apellido aqui"}
          name="first_surname"
          value={form.first_surname}
          onChange={handleChange}
          autoComplete="family-name"
          className={fieldError("first_surname")}
        />

        <FormField
          labelText={"Segundo apellido"}
          placeholder={"Opcional"}
          name="second_surname"
          value={form.second_surname}
          onChange={handleChange}
          autoComplete="family-name"
          className={fieldError("second_surname")}
        />

        <SectionButtons
          continueButtonText={"Continuar"}
          continueButtonOnClick={continueButtonOnClick}
        />
      </form>
    </section>
  );
}
