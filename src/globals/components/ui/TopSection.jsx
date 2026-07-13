import FilterButton from "@components/ui/FilterButton";
import CreateButton from "@components/ui/CreateButton";
import ExportButton from "@components/ui/ExportButton";

export default function TopSection({
  sectionVisible = true,
  sectionName,
  addButtonIcon,
  addButtonText,
  children,
  filterButtonOnClick,
  createButtonOnClick,
  exportButtonOnClick,
}) {
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
        className="w-full flex justify-end gap-2
        lg:gap-3"
      >
        {children}

        {filterButtonOnClick && <FilterButton onClick={filterButtonOnClick} />}

        {createButtonOnClick && (
          <CreateButton
            icon={addButtonIcon}
            text={addButtonText}
            onClick={createButtonOnClick}
          />
        )}

        {exportButtonOnClick && <ExportButton onClick={exportButtonOnClick} />}
      </div>
    </section>
  );
}
