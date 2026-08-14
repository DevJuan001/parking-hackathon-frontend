// Constantes
import { pricingPlans } from "@constants/pricingPlans";
// Componentes
import Icon from "@components/ui/Icon";
import LiquidGlass from "@components/ui/LiquidGlass";
// Modales
import Modal from "@modals/Modal";

export default function PlansModal({ triggerRef, parkingInfo, onClose }) {
  return (
    <Modal
      margin={0}
      disableHeader
      isOpen={true}
      type={"plans"}
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <div className="w-full flex flex-col gap-2">
        <LiquidGlass
          role="button"
          onClick={onClose}
          className="self-end w-fit flex items-center justify-center p-3 rounded-full
          hover:bg-[#afadad23] hover:cursor-pointer"
        >
          <Icon
            name={"close"}
            className="text-[#1B1B1E]
            dark:text-[#E4E2E5]"
          />
        </LiquidGlass>

        <div className="flex flex-col items-center gap-10 font-dmsans">
          <div className="flex flex-col items-center gap-2">
            <Icon name={"local_florist"} size={64} />

            <h1
              className="text-2xl font-semibold
              md:text-4xl
              dark:text-white"
            >
              Elige el plan ideal para ti
            </h1>

            <span
              className="max-w-xl text-center text-[#75777E]
              md:text-xl
              dark:text-[#7E8088]"
            >
              Cambia tu plan en cualquier momento y accede a las funcionalidades
              que mejor se adapten a las necesidades de tu parqueadero. Paga
              solo por lo que necesitas y lleva el control de tu operación sin
              complicaciones.
            </span>
          </div>

          <div
            className="w-full h-full flex flex-wrap justify-center gap-2
            md:flex-nowrap"
          >
            {pricingPlans.map((plan) => (
              <div
                key={plan.title}
                className={`w-90 flex flex-col justify-between p-7 border border-[#E4E2E5] rounded-3xl
                ${
                  plan.title === parkingInfo?.plan
                    ? `bg-black text-white
                    dark:bg-white dark:text-black`
                    : "dark:text-white"
                }
                dark:border-[#202022]`}
              >
                <div className="w-full flex flex-col gap-2">
                  <span className="text-3xl font-medium">{plan.title}</span>

                  <p
                    className="text-[#75777E] leading-5
                    dark:text-[#7E8088]"
                  >
                    {plan.description}
                  </p>

                  <span
                    className="mt-4 text-[#75777E]
                    dark:text-[#7E8088]"
                  >
                    Incluye:
                  </span>

                  <ul
                    className="list-disc list-inside text-[#75777E]
                    dark:text-[#7E8088]"
                  >
                    {plan.items.map((item, index) => (
                      <li key={index}>{item.text}</li>
                    ))}
                  </ul>
                </div>

                <div className="w-full flex flex-col gap-1.5 mt-5">
                  <span
                    className="text-3xl font-semibold
                    md:text-4xl"
                  >
                    {plan.price} / mes
                  </span>

                  <span
                    className="text-xs text-[#75777E]
                    dark:text-[#7E8088]"
                  >
                    IVA incluido
                  </span>

                  <a
                    className={`w-full text-xl text-center rounded-2xl font-medium
                    active:animate-click-effect
                    hover:cursor-pointer
                    ${
                      plan.title === parkingInfo?.plan
                        ? `p-4.5 bg-white text-black
                        dark:bg-black dark:text-white`
                        : `p-5 bg-black text-white
                        dark:bg-white dark:text-black`
                    }
                    `}
                  >
                    {plan.title === parkingInfo?.plan
                      ? "Plan Actual"
                      : "Elegir plan"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
