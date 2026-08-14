// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCreatePayment } from "@/modules/vehicle-payment/hooks/useCreatePayment";
import { usePaymentMethods } from "@/modules/vehicle-payment/hooks/usePaymentMethods";
// Componentes
import Loader from "@components/ui/Loader";
import PaymentMethodCard from "@/modules/vehicle-payment/components/ui/PaymentMethodCard";
// Modales
import ErrorModal from "@modals/ErrorModal";

export default function CreatePaymentSection({
  setActiveSection,
  paymentDetails,
}) {
  const { paymentMethods } = usePaymentMethods();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const {
    activePaymentMethod,
    setActivePaymentMethod,
    loading,
    error,
    handleSubmit,
  } = useCreatePayment(setActiveSection, paymentDetails);

  return (
    <section
      className="w-full h-full flex flex-col
      dark:text-[#E4E2E5]"
    >
      <div
        className="self-center justify-self-center h-full flex flex-col items-center justify-center gap-3 animate-blur-down
        md:gap-7"
      >
        <div className="w-full flex flex-col gap-1.5">
          <span
            className="text-3xl text-start text-[#75777E]
            md:text-5xl
            dark:text-[#7E8088]"
          >
            Valor a pagar
          </span>

          <span
            className="text-5xl font-semibold
            md:text-7xl"
          >
            ${paymentDetails?.total} COP
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <span
            className="text-xl text-[#75777E]
            md:text-4xl
            dark:text-[#7E8088]"
          >
            Elige el metodo de pago
          </span>

          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((paymentMethod) => (
              <PaymentMethodCard
                key={paymentMethod.id}
                id={paymentMethod.id}
                icon={paymentMethod.icon}
                text={paymentMethod.name}
                activePaymentMethod={activePaymentMethod}
                onClick={() => setActivePaymentMethod(paymentMethod.id)}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => handleSubmit(e, openInnerModal)}
          className="w-full py-5 rounded-3xl bg-black text-white font-semibold
          md:text-lg
          active:animate-click-effect
          hover:bg-black/90
          dark:bg-white dark:text-black dark:hover:bg-white/95"
        >
          {loading ? <Loader /> : "Enviar"}
        </button>
      </div>

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
