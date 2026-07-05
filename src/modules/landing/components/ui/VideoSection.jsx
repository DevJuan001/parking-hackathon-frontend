import Icon from "@components/ui/Icon";

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
          md:inline-block"
        />

        {/* Mobile video */}
        <img
          src="parking-mobile.png"
          className="w-full h-full rounded-3xl object-contain
          md:hidden"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button className="h-16 w-16 flex items-center justify-center rounded-full bg-[#00000012] backdrop-blur-xs shadow-[0px_0px_5px_2px_#00000003]">
            <Icon name={"play_arrow"} size={40} color={"#FFFFFF"} fill />
          </button>
        </div>
      </div>
    </section>
  );
}
