import FilterButton from "@components/ui/FilterButton";
import CreateButton from "@components/ui/CreateButton";

export default function TopSection({
  sectionVisible = true,
  sectionName,
  addButtonIcon,
  addButtonText,
  children,
  filterOnClick,
  filterButton = true,
  createOnClick,
  createButtonVisibility,
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

        <FilterButton
          onClick={filterOnClick}
          filterButtonVisibility={filterButton}
        />

        <CreateButton
          icon={addButtonIcon}
          text={addButtonText}
          onClick={createOnClick}
          createButtonVisibility={createButtonVisibility}
        />
      </div>
    </section>
  );
}
