import Icon from "@components/ui/Icon";

export default function FilterButton({ onClick }) {
  return (
    <button
      id="filter-button"
      onClick={onClick}
      className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#FBF9FC] transition-all duration-200 border border-[#E4E2E5]
        focus:animate-click-effect
        hover:bg-gray-200
        dark:bg-[#101012] dark:hover:bg-[#38383b9f] dark:shadow-none dark:border-none"
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
