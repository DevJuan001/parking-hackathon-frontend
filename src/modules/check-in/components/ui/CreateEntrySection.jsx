// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
// Modales
import ErrorModal from "@modals/ErrorModal";

export default function CreateEntrySection({
  entryData,
  loading,
  error,
  handleChange,
  handleSubmit,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <section
      className="w-full h-full flex flex-col
      dark:text-[#E4E2E5]"
    >
      <form
        onSubmit={(e) => handleSubmit(e, openInnerModal)}
        className="self-center justify-self-center h-full flex flex-col items-center justify-center gap-6 animate-blur-down"
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-3xl text-start text-[#7E777E]">Bienvenido</span>

          <div className="flex items-center gap-2">
            <span className="text-6xl font-semibold">
              Escribe tu placa aqui
            </span>

            <Icon
              name={"arrow_downward_alt"}
              size={40}
              className={"animate-jump"}
            />
          </div>
        </div>

        <input
          autoFocus
          type="text"
          name="plate"
          maxLength={6}
          autoComplete="off"
          placeholder="ABC123"
          value={entryData?.plate ?? ""}
          onChange={handleChange}
          className="w-full h-44 px-3 rounded-3xl bg-[#00000008] text-7xl text-center font-semibold outline-0
          placeholder:text-[#1b1b1e52]
          dark:bg-[#101012] dark:placeholder:text-[#c5c3c65d]"
        />

        <button
          type="submit"
          onClick={(e) => handleSubmit(e, openInnerModal)}
          className="w-full py-5 rounded-3xl bg-black text-lg text-white font-semibold
          active:animate-click-effect
          hover:bg-black/90
          dark:bg-white dark:text-black dark:hover:bg-white/95"
        >
          {loading ? <Loader /> : "Enviar"}
        </button>
      </form>

      <a
        href="/vehicle-payment"
        className="self-end justify-self-end px-12 py-3 rounded-4xl bg-[#00000008] text-nowrap font-semibold transition-colors outline-0
        active:animate-click-effect
        hover:bg-[#00000018]
        dark:bg-[#101012]"
      >
        Ir a Pagar
      </a>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          errorTitle={"¡No se pudo permitir el ingreso!"}
          errorText={error}
          growDirection={"center"}
        />
      )}
    </section>
  );
}
