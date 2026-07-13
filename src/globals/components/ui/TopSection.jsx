import FilterButton from "@components/ui/FilterButton";
import CreateButton from "@components/ui/CreateButton";
import ExportButton from "@components/ui/ExportButton";
import SearchButton from "./SearchButton";
import Icon from "./Icon";
import { useInnerModal } from "@/globals/hooks/useInnerModal";
import Modal from "../modals/Modal";

export default function TopSection({
  sectionVisible = true,
  sectionName,
  addButtonIcon,
  addButtonText,
  children,
  filterButtonOnClick,
  createButtonOnClick,
  exportButtonOnClick,
  searchButtonOnClick,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <section
      className={`h-[13%] w-full flex items-center justify-between pb-2 font-poppins ${sectionVisible ? "block" : "hidden"}
      sm:h-[9%]
      md:h-[8%]
      `}
    >
      <span
        className="text-nowrap text-2xl font-medium bg-linear-to-r from-black to-[#75777e] bg-clip-text text-transparent
        dark:from-[#E2E4E5] dark:to-[#878991]"
      >
        {sectionName}
      </span>

      <div
        className="hidden w-full h-full justify-end gap-2
        md:flex
        lg:gap-3"
      >
        {children}

        {searchButtonOnClick && <SearchButton onClick={searchButtonOnClick} />}

        {exportButtonOnClick && <ExportButton onClick={exportButtonOnClick} />}

        {filterButtonOnClick && <FilterButton onClick={filterButtonOnClick} />}

        {createButtonOnClick && (
          <CreateButton icon={addButtonIcon} onClick={createButtonOnClick} />
        )}
      </div>

      <button
        onClick={(e) => openInnerModal("topSectionMobileOptions", e)}
        className="flex items-center justify-center p-4.5 rounded-4xl border border-[#E4E2E5]
        focus:animate-click-effect
        hover:bg-[#F5F3F6]
        md:hidden"
      >
        <Icon name={"more_horiz"} />
      </button>

      {innerType === "topSectionMobileOptions" && (
        <Modal
          isOpen={true}
          triggerRef={innerTrigger}
          type={innerType}
          onClose={closeInnerModal}
          growDirection="left"
        >
          <div className="flex flex-col gap-1">
            {createButtonOnClick && (
              <button
                onClick={createButtonOnClick}
                className="flex items-center p-4 gap-2 bg-[#F5F3F6] rounded-4xl"
              >
                <Icon name={"add"} />

                <span>{addButtonText}</span>
              </button>
            )}

            {filterButtonOnClick && (
              <button
                onClick={filterButtonOnClick}
                className="flex items-center p-4 gap-2 bg-[#F5F3F6] rounded-4xl"
              >
                <Icon data-shared-id="filter-icon" name={"page_info"} />

                <span data-shared-id="filter-text">Filtros</span>
              </button>
            )}

            {exportButtonOnClick && (
              <button
                onClick={exportButtonOnClick}
                className="flex items-center p-4 gap-2 bg-[#F5F3F6] rounded-4xl"
              >
                <Icon data-shared-id="export-icon" name={"download"} />

                <span>Exportar</span>
              </button>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
