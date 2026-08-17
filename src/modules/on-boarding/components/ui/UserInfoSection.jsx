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
          className="text-sm text-center font-medium text-[#75777e]
          lg:text-lg lg:text-nowrap
          dark:text-[#7E8088]"
        >
          Estamos a pocos pasos de poner tu parqueadero en marcha.
        </span>

        <span
          className="text-4xl text-center font-semibold
          md:text-6xl
          dark:text-[#E4E2E5]"
        >
          ¿Cómo te llamas?
        </span>
      </div>

      <form className="w-full flex flex-col gap-2">
        <FormField
          id="name"
          name="name"
          value={form.name}
          autoComplete="name"
          labelText={"Nombre *"}
          onChange={handleChange}
          className={fieldError("name")}
          placeholder={"Escribe tu nombre aquí"}
        />

        <FormField
          id="first_surname"
          name="first_surname"
          onChange={handleChange}
          value={form.first_surname}
          autoComplete="family-name"
          labelText={"Primer apellido *"}
          className={fieldError("first_surname")}
          placeholder={"Escribe tu apellido aqui"}
        />

        <FormField
          id="second_surname"
          name="second_surname"
          placeholder={"Opcional"}
          onChange={handleChange}
          autoComplete="family-name"
          value={form.second_surname}
          labelText={"Segundo apellido"}
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
