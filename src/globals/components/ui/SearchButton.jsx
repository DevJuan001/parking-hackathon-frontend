import Icon from "./Icon";

export default function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-5 py-3 gap-2 rounded-2xl border border-[#E2E4E5]
      focus:animate-click-effect"
    >
      <Icon
        data-shared-id="search-icon"
        name={"search"}
        size={24}
        className="text-[#75777E]
        dark:text-[#7E8088]"
      />
    </button>
  );
}
