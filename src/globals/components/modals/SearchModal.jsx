import Icon from "../ui/Icon";

export default function SearchModal() {
  return (
    <div className="h-full flex items-center px-4 gap-3">
      <Icon
        data-shared-id="search-icon"
        name={"search"}
        className="text-[#75777E]
        dark:text-[#7E8088]"
      />

      <input
        type="text"
        placeholder="Buscar"
        autoFocus
        className="h-full w-full text-sm outline-0
        dark:text-[#E4E2E5]"
      />
    </div>
  );
}
