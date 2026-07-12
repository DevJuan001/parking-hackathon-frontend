import Icon from "@components/ui/Icon";

export default function FilterButton({ onClick, filterButtonVisibility }) {
  return (
    <button
      id="filter-button"
      onClick={onClick}
      className={`flex items-center px-5 py-2.5 gap-2 rounded-3xl bg-[#FBF9FC] transition-all duration-200 border border-[#E4E2E5]
        focus:animate-click-effect
        hover:bg-gray-200
        dark:bg-[#101012] dark:hover:bg-[#38383b9f] dark:shadow-none dark:border-none
        ${filterButtonVisibility ? "block" : "hidden"}`}
    >
      <Icon
        data-shared-id="filter-icon"
        name={"page_info"}
        size={24}
        className="dark:text-[#C5C6CE]"
      />

      <span
        data-shared-id="filter-text"
        className="font-medium
        dark:text-[#C5C6CE]"
      >
        Filtros
      </span>
    </button>
  );
}
