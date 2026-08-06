import Icon from "@/globals/components/ui/Icon";
import LiquidGlass from "@/globals/components/ui/LiquidGlass";

export default function HowItWorks({ onClose }) {
  return (
    <div className="flex flex-col items-center gap-5 font-dmsans">
      <LiquidGlass
        role={"button"}
        onClick={onClose}
        className="self-end w-fit flex items-center justify-center p-3.5 rounded-full
        hover:cursor-pointer"
      >
        <Icon
          name={"close"}
          size={22}
          className="text-[#75777E]
          dark:text-[#7E8088]"
        />
      </LiquidGlass>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl">Cómo funcionan las reservas</h1>
      </div>
    </div>
  );
}
