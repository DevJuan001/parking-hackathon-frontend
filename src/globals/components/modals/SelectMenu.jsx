// Hooks
import { useSelectMenu } from "@hooks/useSelectMenu";
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import SelectMenuContent from "@components/ui/SelectMenuContent";
// Modales
import Modal from "@modals/Modal";

export default function SelectMenu({
  id,
  name,
  onChange,
  value,
  disabled,
  spanText,
  options = [],
  optionOnClick,
  addIconFunction,
  addIconRef,
  seeAddButton = false,
  searchable = false,
  growDirection = "center",
  className,
  showAllOption = false,
  miniVersion = false,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { search, setSearch, handleSelect } = useSelectMenu();

  const allOptions = showAllOption
    ? [{ value: "", label: "Todos" }, ...options]
    : options;

  const filteredOptions = searchable
    ? allOptions.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : allOptions;

  return (
    <div
      className={`relative flex flex-col gap-1
      ${miniVersion ? "w-36" : disabled ? "opacity-50" : "w-full"}
      `}
    >
      <div
        className={`${miniVersion ? "h-10" : "h-16.5"} w-full flex items-center gap-1.5`}
      >
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={(e) => {
            setSearch("");
            openInnerModal("select", e);
          }}
          className={`relative w-full pr-2 flex items-center bg-[#FBF9FC] border border-[#E4E2E5]
            ${spanText ? "h-full pt-1.5 rounded-2xl" : miniVersion ? "h-9 rounded-xl" : "h-14 rounded-2xl"}
            cursor-pointer text-sm
            dark:bg-black dark:border-[#1e1e20cb]
            ${className}`}
        >
          {spanText && (
            <div className="absolute top-2 left-3 px-1">
              <span
                className="text-xs bg-[#FBF9FC] text-[#7E777E]
                dark:bg-black dark:text-[#7E8088]"
              >
                {spanText}
              </span>
            </div>
          )}

          <div
            className={`w-full flex pl-4
            ${spanText ? "pt-3" : "pt-0"} 
            dark:text-[#E4E2E5]`}
          >
            <div
              className={`w-full flex items-center
              ${miniVersion ? "text-sm" : "text-base"}
              `}
            >
              {allOptions.find((opt) => {
                if (opt.value !== "" && !isNaN(opt.value)) {
                  return Number(opt.value) === Number(value);
                }
                return String(opt.value) === String(value);
              })?.label ?? "Seleccionar"}
            </div>
          </div>

          <Icon
            name={"arrow_drop_down"}
            className={`text-black
            dark:text-[#7e8088]`}
          />
        </button>

        {seeAddButton && (
          <button
            ref={addIconRef}
            onClick={(e) => {
              e.stopPropagation();
              if (addIconFunction) addIconFunction(e);
            }}
            type="button"
            className={`h-16 flex items-center justify-center px-5 border border-[#E4E2E5] rounded-2xl bg-[#FBF9FC] transition-colors duration-200
            active:animate-click-effect
            hover:bg-gray-200 hover:cursor-pointer
            dark:bg-black dark:border-[#1e1e20cb] dark:hover:bg-[#28282bbd]`}
          >
            <Icon name={"add"} size={22} className="dark:text-[#E4E2E5]" />
          </button>
        )}
      </div>

      {innerType === "select" && (
        <Modal
          disableHeader
          type="select"
          isOpen={true}
          z_index="600"
          onClose={() => {
            setSearch("");
            closeInnerModal();
          }}
          triggerRef={innerTrigger}
          growDirection={growDirection}
        >
          <SelectMenuContent
            id={id}
            name={name}
            value={value}
            search={search}
            onChange={onChange}
            setSearch={setSearch}
            searchable={searchable}
            handleSelect={handleSelect}
            optionOnClick={optionOnClick}
            filteredOptions={filteredOptions}
          />
        </Modal>
      )}
    </div>
  );
}
