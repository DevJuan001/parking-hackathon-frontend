// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
import TextArea from "@components/ui/TextArea";
import FormField from "@components/ui/FormField";
// Modales
import ErrorModal from "@components/modals/ErrorModal";

export default function MoreInfoSection({
  form,
  error,
  loading,
  fieldError,
  handleChange,
  handleSubmit,
  setActiveSection,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div
      className="w-full h-full flex flex-col p-5 gap-2 animate-blur-up overflow-hidden overflow-y-auto
      sm:gap-5
      lg:p-10
      dark:text-[#E4E2E5]"
    >
      <button
        onClick={() => setActiveSection("time")}
        className="w-fit flex items-center justify-center p-2.5 border border-[#E4E2E5] rounded-full
        active:animate-click-effect
        hover:bg-[#efedf0]
        dark:border-[#202022] dark:hover:bg-[#101012]"
      >
        <Icon
          name={"arrow_back"}
          className="w-fit text-[#75777E]
          dark:text-[#7E8088]"
        />
      </button>

      <div className="flex flex-col">
        <span
          className="text-xl font-semibold
          md:text-2xl"
        >
          Más información
        </span>

        <span
          className="text-sm text-[#75777E]
          dark:text-[#7E8088]"
        >
          Necesitamos más información acerca de tí para enviarte el correo de
          confirmación
        </span>
      </div>

      <form className="h-full w-full flex flex-col gap-2">
        <FormField
          id={"name"}
          name={"name"}
          value={form.name}
          labelText={"Nombre"}
          onChange={handleChange}
          placeholder={"Miguel Perez Acosta"}
          className={fieldError("name")}
        />

        <FormField
          id={"email"}
          name={"email"}
          value={form.email}
          labelText={"Correo"}
          onChange={handleChange}
          placeholder={"miguel@gmail.com"}
          className={fieldError("email")}
        />

        <FormField
          id={"plate"}
          minLength={6}
          maxLength={6}
          name={"plate"}
          value={form.plate}
          onChange={handleChange}
          labelText={"Placa del vehiculo"}
          placeholder={"ABC123"}
          className={fieldError("name")}
        />

        <TextArea
          id={"note"}
          name={"note"}
          value={form?.note}
          labelText={"Nota"}
          onChange={handleChange}
          placeholder={"Escribe aquí tu mensaje..."}
          className={`h-[30%]
          md:h-[50%]`}
        />

        <button
          type="button"
          onClick={(e) => handleSubmit(e, openInnerModal)}
          className="w-37.5 px-6 py-3 rounded-3xl bg-black text-sm text-white font-medium
          active:animate-click-effect
          lg:text-base
          dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {loading ? <Loader /> : "Crear reserva"}
        </button>
      </form>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle={"No se pudo crear la reserva"}
          errorText={error}
          onClose={closeInnerModal}
        />
      )}
    </div>
  );
}
