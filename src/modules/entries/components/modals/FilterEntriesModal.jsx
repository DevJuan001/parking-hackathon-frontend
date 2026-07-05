import { useFilterEntries } from "@/modules/entries/hooks/useFilterEntries";
import SelectMenu from "@modals/SelectMenu";
import FilterModal from "@modals/FilterModal";

export default function FilterEntriesModal({ filters, setFilters, onClose }) {
  const { handleChange } = useFilterEntries(setFilters);

  return (
    <FilterModal
      orderByStartDateValue={filters.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={filters.end_date}
      orderByFinishDateOnChange={handleChange}
      applyButtonOnClick={() => {
        setFilters({ ...filters });
        onClose();
      }}
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
    >
      <div className="flex flex-col">
        <SelectMenu
          showAllOption
          id={"plates-menu"}
          spanText={"Placa"}
          value={filters.plate_id}
          onChange={handleChange}
          options={[]}
        />
      </div>
    </FilterModal>
  );
}
