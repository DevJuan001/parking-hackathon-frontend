import Icon from "@components/ui/Icon";

export default function FilterButton({ onClick }) {
  return (
    <button
      id="filter-button"
      onClick={onClick}
      className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#FBF9FC] transition-all duration-200 border border-[#E4E2E5]
        focus:animate-click-effect
        hover:bg-[#F5F3F6]
        dark:bg-black dark:hover:bg-[#101012] dark:border-[#202022]"
    >
      <Icon
        data-shared-id="filter-icon"
        name={"page_info"}
        size={24}
        className="text-[#75777E]
        dark:text-[#7E8088]"
      />
    </button>
  );
}
