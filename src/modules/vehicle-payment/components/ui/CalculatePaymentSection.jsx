// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Modales
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
import ErrorModal from "@modals/ErrorModal";

export default function CalculatePaymentSection({
  paymentData,
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
          <span
            className="text-3xl text-start text-[#75777E]
            dark:text-[7E8088]"
          >
            Hola, de nuevo
          </span>

          <div className="flex items-center gap-2">
            <span
              className="text-5xl font-semibold
              md:text-6xl"
            >
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
          value={paymentData?.plate}
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
        href="/check-in"
        className="self-end justify-self-end px-12 py-3 rounded-4xl bg-[#00000008] text-nowrap font-semibold transition-colors outline-0
        active:animate-click-effect
        hover:bg-[#00000018]
        dark:bg-[#101012] dark:hover:bg-[#202022]"
      >
        Ir a entradas
      </a>

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          location="center"
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          errorTitle={"No se pudo calcular el pago"}
          errorText={error}
        />
      )}
    </section>
  );
}
