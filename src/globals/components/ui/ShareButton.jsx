import Icon from "@components/ui/Icon";

export default function ShareButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-5 gap-2 rounded-2xl border border-[#E4E2E5]
      focus:animate-click-effect
      dark:border-[#202022]"
    >
      <Icon
        name={"event_upcoming"}
        size={22}
        className="text-[#75777E]
        dark:text-[#7E8088]"
      />
    </button>
  );
}
