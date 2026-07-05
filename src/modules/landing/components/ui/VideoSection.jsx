import Icon from "@components/ui/Icon";
import LiquidGlass from "@/globals/components/ui/LiquidGlass";

export default function VideoSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-3">
      <div
        className="relative w-auto h-[620px] rounded-[36px] border-14 border-[#e5e7eb]
        md:h-auto md:border-15
        xl:w-6xl
        2xl:w-7xl
        dark:border-[#28282b]"
      >
        {/* Desktop video */}
        <img
          src="/parking-2.webp"
          alt="Video demostrativo del sistema"
          className="hidden w-full h-full rounded-3xl object-contain
          md:inline-block
          dark:hidden"
        />

        <img
          src="/parking-dark-3.png"
          alt="Video demostrativo del sistema"
          className="hidden w-full h-full rounded-3xl object-contain
          md:dark:inline-block"
        />

        {/* Mobile video */}
        <img
          src="parking-mobile.webp"
          className="w-full h-full rounded-3xl object-contain
          md:hidden"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <LiquidGlass
            className="h-24 w-24 flex items-center justify-center rounded-full bg-[#99999910]
            hover:cursor-pointer"
          >
            <Icon name={"play_arrow"} size={70} color={"#FFFFFF"} fill />
          </LiquidGlass>
        </div>
      </div>
    </section>
  );
}
