import Icon from "@components/ui/Icon";

export default function SelectMenuContent({
  id,
  name,
  value,
  searchable,
  search,
  setSearch,
  filteredOptions,
  handleSelect,
  optionOnClick,
  onChange,
  onClose,
}) {
  return (
    <div
      className="w-full h-fit max-h-100 flex flex-col gap-1 px-1 py-1 overflow-y-auto rounded-3xl bg-[#fbf9fc]
      dark:bg-black dark:text-white"
    >
      {searchable && (
        <div
          className="sticky top-0.5 w-full min-h-13 flex items-center rounded-full border border-[#E4E2E5] bg-[#FBF9FC]
          dark:border-[#28282ba1] dark:bg-black"
        >
          <input
            id="search-menu-bar"
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full h-12.5 px-5 text-sm outline-none
            dark:text-white dark:placeholder:text-[#b4aab4]"
          />

          <Icon
            name={"search"}
            size={20}
            className="pr-5 text-[#75777E]
            dark:text-[#7E8088]"
          />
        </div>
      )}

      {filteredOptions.length === 0 ? (
        <div className="min-h-12.5 flex items-center justify-center text-[#7E777E] gap-2.5">
          <Icon name={"search_off"} />

          <span className="text-center text-sm py-6">
            No se encontraron resultados
          </span>
        </div>
      ) : (
        filteredOptions.map((option) => {
          const isSelected =
            option.value !== "" && !isNaN(option.value)
              ? Number(option.value) === Number(value)
              : String(option.value) === String(value);

          return (
            <button
              id={`${id}-${option.value}-option`}
              key={option.value}
              onClick={() => {
                handleSelect(option, name, onChange, onClose);
                if (optionOnClick) optionOnClick();
              }}
              className={`min-h-13 flex items-center px-5 cursor-pointer text-sm rounded-full transition-colors 
              ${
                isSelected
                  ? `bg-[#efedf0] font-semibold
                  dark:bg-[#ffffff15]`
                  : `hover:bg-[#efedf0] hover:font-medium
                  dark:hover:bg-[#ffffff15]`
              }`}
            >
              <span>{option.label}</span>
            </button>
          );
        })
      )}
    </div>
  );
}
