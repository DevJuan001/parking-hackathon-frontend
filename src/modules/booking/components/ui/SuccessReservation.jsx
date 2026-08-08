// Componentes
import Icon from "@components/ui/Icon";

export default function SuccessReservation({
  form,
  setForm,
  setActiveSection,
}) {
  return (
    <section
      className="w-full h-full flex flex-col items-center justify-center animate-blur-up
      dark:text-[#E4E2E5]"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <Icon
          name={"check_circle"}
          size={72}
          className="text-[#75777E]
          dark:text-[#7E8088]"
        />

        <span className="text-2xl font-medium">
          Tu reserva se ha creado correctamente
        </span>

        <span
          className="text-[#75777E]
          dark:text-[#7E8088]"
        >
          Hemos enviado un correo de confirmación a{" "}
          <strong className="text-[#E4E2E5]">{form?.email}</strong> con toda la
          información de la reserva. <br />
          Dentro estará el QR para poder entrada, si no lo recibiste, revisa en
          el apartado de spam
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setForm({});
              setActiveSection("card");
            }}
            className="px-6 py-4 rounded-full text-sm font-medium bg-[#F5F3F6]
            active:animate-click-effect
            hover:bg-[#E4E2E5]
            dark:bg-[#101012] dark:hover:bg-[#202022]"
          >
            Crear otra reserva
          </button>
        </div>
      </div>
    </section>
  );
}
