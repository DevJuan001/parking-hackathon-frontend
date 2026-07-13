import Icon from "./Icon";

export default function ExportButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-5 py-3 gap-2 rounded-2xl border border-[#E4E2E5]
      focus:animate-click-effect
      hover:bg-[#F5F3F6]
      dark:bg-black dark:hover:bg-[#101012] dark:border-[#202022]"
    >
      <Icon
        data-shared-id="export-icon"
        name={"download"}
        size={24}
        className="text-[#75777E]
        dark:text-[#7E8088]"
      />
    </button>
  );
}
