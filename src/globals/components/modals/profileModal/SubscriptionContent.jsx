// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useParkingInfo } from "@hooks/useParkingInfo";
// Constantes
import { pricingPlans } from "@constants/pricingPlans";
// Utils
import { formatDateTime } from "@/utils/formatDateTime";
// Componentes
import Icon from "@components/ui/Icon";
import LiquidGlass from "@components/ui/LiquidGlass";
import AnimatedBackground from "@components/ui/AnimatedBackground";
// Modales
import Modal from "@modals/Modal";

export default function SubscriptionContent() {
  const { user } = useCurrentUser();
  const { parkingInfo } = useParkingInfo(user?.parking_id);
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div className="w-full h-full rounded-2xl">
      <AnimatedBackground className="rounded-3xl" />

      <div
        className="w-full flex flex-col px-4 gap-6 text-[#1b1b1eef] font-dmsans animate-blur-up
        dark:text-[#E4E2E5]"
      >
        <div className="w-full flex flex-col">
          <span
            className="text-2xl bg-linear-to-r from-black to-[#75777e] bg-clip-text text-transparent font-bold
            dark:from-[#E2E4E5] dark:to-[#7E8088]"
          >
            Plan
          </span>

          <span>{parkingInfo?.plan}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-2xl font-semibold">Precio</span>

          <span>
            $<span>{parkingInfo?.plan_value}</span> / mes
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Proximo Pago</span>

          <span>{formatDateTime(parkingInfo?.next_payment_at)}</span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => openInnerModal("plans", e)}
            className="w-full flex items-center justify-center py-3.5 gap-2 rounded-4xl bg-black text-white font-medium
            focus:animate-click-effect
            hover:cursor-pointer hover:text-white/80
            dark:bg-[#F5F3F6] dark:text-black dark:hover:text-black/80"
          >
            <Icon name="bolt_boost" fill />
            Cambiar plan
          </button>

          <div
            className="flex flex-col text-xs text-[#1b1b1ee5]
            dark:text-[#e4e2e5ab]"
          >
            <span>Tu suscripción se renovara automaticamente.</span>

            <span>Puedes cambiar o cancelar tu plan en cualquier momento</span>
          </div>
        </div>
      </div>

      {innerType === "plans" && (
        <Modal
          margin={0}
          disableHeader
          isOpen={true}
          type={innerType}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        >
          <div className="w-full flex flex-col gap-2">
            <LiquidGlass
              role="button"
              onClick={closeInnerModal}
              className="self-end w-fit flex items-center justify-center p-3 rounded-full
              hover:bg-[#afadad23] hover:cursor-pointer"
            >
              <Icon
                name={"close"}
                className="text-[#1B1B1E]
                dark:text-[#E4E2E5]"
              />
            </LiquidGlass>

            <div className="flex flex-col items-center gap-4 font-dmsans">
              <h1
                className="text-5xl font-semibold
                dark:text-white"
              >
                Precios simples y sin complicaciones
              </h1>

              <span
                className="max-w-2xl text-xl text-center text-[#75777E]
                dark:text-[#7E8088]"
              >
                Paga únicamente por el plan que necesitas. Accede a una
                plataforma completa para administrar tu parqueadero, optimizar
                la operación diaria y mejorar el control de tus ingresos desde
                cualquier lugar.
              </span>

              <div className="flex gap-5">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.title}
                    className={`w-full h-full flex flex-col p-7 gap-2 border border-[#e5e7eb] rounded-3xl transition-all duration-500
                    md:h-170
                    ${
                      plan.title === parkingInfo?.plan
                        ? `bg-black text-white
                        dark:bg-white dark:text-black`
                        : "dark:text-white"
                    }
                    dark:border-[#202022]`}
                  >
                    <span className="text-5xl font-medium">{plan.title}</span>

                    <p className="text-xl text-[#758088] leading-7">
                      {plan.description}
                    </p>

                    <span className="mt-4 text-xl text-[#758088]">
                      Incluye:
                    </span>

                    <ul className="list-disc list-inside text-[#758088]">
                      {plan.items.map((item) => (
                        <li key={item.text}>
                          <Icon
                            name={item.icon}
                            size={18}
                            fill
                            className={"align-middle mr-1.5"}
                          />

                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>

                    <span
                      className="mt-6 flex flex-nowrap items-end gap-1 text-6xl font-semibold
                      md:mt-auto"
                    >
                      {plan.price}
                      <span
                        className="mb-1 text-xl
                        md:text-3xl"
                      >
                        / mes
                      </span>
                    </span>

                    <span className="text-xs text-[#758088]">IVA incluido</span>

                    <a
                      className={`w-full p-5 text-xl text-center rounded-2xl font-medium transition-transform duration-500
                      active:animate-click-effect
                      hover:cursor-pointer
                      ${
                        plan.title === parkingInfo?.plan
                          ? `bg-white text-black
                          dark:bg-black dark:text-white`
                          : `bg-black text-white
                          dark:bg-white dark:text-black`
                      }
                      `}
                    >
                      {plan.title === parkingInfo?.plan
                        ? "Plan Actual"
                        : "Elegir plan"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
