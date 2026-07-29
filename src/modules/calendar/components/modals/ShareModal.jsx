import Icon from "@/globals/components/ui/Icon";

export default function ShareModal({ link = "aa" }) {
  return (
    <div className="flex flex-col gap-4 font-inter">
      <span
        className="text-[#75777E]
        dark:text-[#7E8088]"
      >
        Invita a tus clientes a que reserven sus plazas antes de llegar a tu
        parqueadero y tengan un experiencia increible
      </span>

      <div></div>

      <div
        className="h-fit w-full flex gap-2 bg-[#F5F3F6] rounded-4xl
        dark:bg-[#101012]"
      >
        <div
          className="w-full p-5
          dark:text-[#E4E2E5]"
        >
          <a href={`${link}`}>{link}</a>
        </div>

        <button
          className="h-full flex items-center gap-2 py-4 p-6 bg-black rounded-4xl text-white
          active:animate-click-effect
          dark:bg-white dark:text-black"
        >
          <Icon name={"content_copy"} />

          <span className="text-nowrap font-medium">Copiar link</span>
        </button>
      </div>
    </div>
  );
}
