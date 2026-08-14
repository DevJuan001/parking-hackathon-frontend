// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useParkingInfo } from "@hooks/useParkingInfo";
// Utils
import { formatDateTime } from "@/utils/formatDateTime";
// Componentes
import Icon from "@components/ui/Icon";
import AnimatedBackground from "@components/ui/AnimatedBackground";
// Modales
import PlansModal from "@modals/profileModal/PlansModal";

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
        <PlansModal
          triggerRef={innerTrigger}
          parkingInfo={parkingInfo}
          onClose={closeInnerModal}
        />
      )}
    </div>
  );
}
