import { useCurrentUser } from "@/globals/hooks/useCurrentUser";
import AnimatedBackground from "@components/ui/AnimatedBackground";

export default function SubscriptionContent() {
  const { user } = useCurrentUser();

  return (
    <div className="w-full h-full rounded-2xl">
      <AnimatedBackground className="rounded-3xl" />

      <div
        className="w-full flex flex-col px-4 gap-6 text-[#1b1b1eef] font-dmsans animate-blur-up
        dark:text-[#E4E2E5]"
      >
        <div className="w-full flex flex-col">
          <span className="text-2xl font-semibold">
            {user.plan ?? "Plan Gratuito"}
          </span>

          <span>Gratís</span>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Proximo Pago</span>

          <span>15 de julio de 2026</span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="w-full flex items-center justify-center py-3.5 gap-2 rounded-4xl bg-black text-white font-medium
            focus:animate-click-effect
            hover:cursor-pointer hover:text-white/80
            dark:bg-[#F5F3F6] dark:text-black dark:hover:text-black/80"
          >
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
    </div>
  );
}
